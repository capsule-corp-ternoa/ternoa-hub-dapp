import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  batchTxHex,
  BlockchainEvent,
  createCollectionTx,
  createMarketplaceTx,
  createTxHex,
  setMarketplaceConfigurationTx,
  submitTxBlocking,
  WaitUntil,
} from "ternoa-js";
import {
  MarketplaceConfigAction,
  MarketplaceKind,
} from "ternoa-js/marketplace/enum";
import { FeeType, NotRetryableError, TxType } from "../../../types";
import { retry } from "../../../utils/retry";
import { priceWithChainDecimals } from "../../../utils/strings";
import {
  BlockchainTxData,
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "./types";

const initialState: BlockchainTxData = {
  status: { creatingState: "idle", submitState: "idle" },
};

const isPendingCreateTxAction = (
  action: AnyAction
): action is PendingAction => {
  return (
    action.type.startsWith("blockchainTx/create") &&
    action.type.endsWith("/pending")
  );
};

const isFulfilledCreateTxAction = (
  action: AnyAction
): action is FulfilledAction => {
  return (
    action.type.startsWith("blockchainTx/create") &&
    action.type.endsWith("/fulfilled")
  );
};

const isRejectedCreateTxAction = (
  action: AnyAction
): action is RejectedAction => {
  return (
    action.type.startsWith("blockchainTx/create") &&
    action.type.endsWith("/rejected")
  );
};

export const blockchainTx = createSlice({
  name: "blockchainTx",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      submitSignedTx(BlockchainEvent).fulfilled,
      (state, action) => {
        state.status.submitState = "finished";
        state.data = action.payload;
      }
    );
    builder.addCase(submitSignedTx(BlockchainEvent).pending, (state) => {
      state.status.submitState = "loading";
      state.status.submitError = undefined;
      state.data = undefined;
    });
    builder.addCase(
      submitSignedTx(BlockchainEvent).rejected,
      (state, action) => {
        state.status.submitState = "finished";
        state.status.submitError = action.error;
        state.data = undefined;
      }
    );
    builder.addCase(createNft.pending, (state) => {
      state.txType = TxType.CreateNFT;
    });
    builder.addCase(createCollection.pending, (state) => {
      state.txType = TxType.CreateCollection;
    });
    builder.addCase(createMarketplace.pending, (state) => {
      state.txType = TxType.CreateMarketplace;
    });
    builder.addCase(createMarketplaceConfiguration.pending, (state) => {
      state.txType = TxType.SetMarketplaceConfiguration;
    });
    builder.addCase(listNft.pending, (state) => {
      state.txType = TxType.ListNft;
    });
    builder.addMatcher(isPendingCreateTxAction, (state) => {
      state.status = {
        creatingState: "loading",
        creatingError: undefined,
        submitState: "idle",
        submitError: undefined,
      };
      state.hash = undefined;
      state.data = undefined;
    });
    builder.addMatcher(isFulfilledCreateTxAction, (state, action) => {
      state.status.creatingState = "finished";
      state.hash = action.payload;
    });
    builder.addMatcher(isRejectedCreateTxAction, (state, action) => {
      state.status.creatingState = "finished";
      state.status.creatingError = action.error as SerializedError;
    });
  },
});

export const submitSignedTx = <T extends BlockchainEvent>(
  ctor: new (...args: any[]) => T
) =>
  createAsyncThunk<T, { signedHash: `0x${string}` }>(
    "blockchainTx/submitSignedTx",
    async (args) => {
      const submitTx = async (
        signedHash: `0x${string}`
      ): Promise<T> => {
        try {
          const { events } = await submitTxBlocking(
            signedHash,
            WaitUntil.BlockFinalization
          );
          const response = events.findEventOrThrow<T>(ctor);
          return response;
        } catch (err) {
          if (err instanceof Error) {
            throw new NotRetryableError(err.message, err);
          } else {
            throw err;
          }
        }
      };
      return await retry(submitTx, [args.signedHash]);
    }
  );

export const createNft = createAsyncThunk<
  `0x${string}`,
  {
    hash: string;
    royalty: number;
    collectionId: number | undefined;
    quantity: number;
  }
>("blockchainTx/create/nft", async (args) => {
  const txHash = await createTxHex("nft", "createNft", [
    args.hash,
    `000${args.royalty * 10000}`,
    args.collectionId,
    false,
  ]);
  if (args.quantity === 1) {
    return txHash;
  } else {
    const txHashes = Array(args.quantity).fill(txHash);
    return await batchTxHex(txHashes);
  }
});

export const createCollection = createAsyncThunk<
  `0x${string}`,
  { hash: string; limit?: number }
>("blockchainTx/create/collection", async (args) => {
  const txHash = await createCollectionTx(args.hash, args.limit);
  return txHash;
});

export const createMarketplace = createAsyncThunk<
  `0x${string}`,
  { isPrivate: boolean }
>("blockchainTx/create/marketplace", async (args) => {
  const txHash = await createMarketplaceTx(
    args.isPrivate ? MarketplaceKind.Private : MarketplaceKind.Public
  );
  return txHash;
});

export const createMarketplaceConfiguration = createAsyncThunk<
  `0x${string}`,
  {
    id: number;
    commissionFee?: string;
    commissionFeeType?: FeeType;
    listingFee?: string;
    listingFeeType?: FeeType;
    accounts?: string[];
    offchainData?: string;
  }
>("blockchainTx/create/marketplaceConfiguration", async (args) => {
  const parseFee = (feeType: FeeType, value: string) => {
    if (feeType === FeeType.Percentage) {
      return { percentage: parseInt(value) };
    } else if (feeType === FeeType.Flat) {
      return { flat: parseInt(value) };
    } else {
      return { percentage: parseInt(value) };
    }
  };
  const parsedcommissionFee = args.commissionFee
    ? {
        [MarketplaceConfigAction.Set]: parseFee(
          args.commissionFeeType!,
          args.commissionFee
        ),
      }
    : MarketplaceConfigAction.Remove;
  const parsedListingFee = args.listingFee
    ? {
        [MarketplaceConfigAction.Set]: parseFee(
          args.listingFeeType!,
          args.listingFee
        ),
      }
    : MarketplaceConfigAction.Remove;
  const parsedOffchainData = args.offchainData
    ? {
        [MarketplaceConfigAction.Set]: args.offchainData,
      }
    : MarketplaceConfigAction.Remove;
  const parsedAccountListData =
    args.accounts && args.accounts.length
      ? {
          [MarketplaceConfigAction.Set]: args.accounts,
        }
      : MarketplaceConfigAction.Remove;
  const txHash = await setMarketplaceConfigurationTx(
    args.id,
    parsedcommissionFee,
    parsedListingFee,
    parsedAccountListData,
    parsedOffchainData
  );
  return txHash;
});

export const listNft = createAsyncThunk<
  `0x${string}`,
  Array<{
    nftId: string;
    marketplaceId: string;
    price?: string;
  }>
>("blockchainTx/create/listNft", async (nftsData) => {
  const txs = await Promise.all(
    nftsData.map(async (nftData) => {
      const tx = await createTxHex("marketplace", "listNft", [
        nftData.nftId,
        nftData.marketplaceId,
        nftData.price ? priceWithChainDecimals(nftData.price) : undefined,
      ]);
      return tx;
    })
  );
  if (txs.length > 1) {
    return await batchTxHex(txs);
  } else {
    return txs[0];
  }
});
