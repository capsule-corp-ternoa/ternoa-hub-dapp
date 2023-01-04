import { useState } from "react";
import { useDispatch } from "react-redux";
import { NFTListedEvent } from "ternoa-js";
import { AppDispatch } from "../store";
import { LoadingState, TxType } from "../types";
import {
  listNft as blockchainTxListNft,
  submitSignedTx,
} from "../store/slices/blockchainTx";
import { useWalletConnectClient } from "./useWalletConnectClient";

export interface ListNftParams {
  nftId: string;
  marketplaceId: string;
  price?: string;
}

export interface ListNftsParams extends Array<ListNftParams> {}

export const useListNfts = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const dispatch = useDispatch<AppDispatch>();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const listNfts = async (
    nftsData: ListNftsParams
  ): Promise<NFTListedEvent | undefined> => {
    setLoadingState("loading");
    setError(undefined);
    setIsSuccess(false);
    try {
      let txHash: `0x${string}` | undefined = undefined;
      txHash = await dispatch(blockchainTxListNft(nftsData)).unwrap();
      if (txHash) {
        const signedHash = await walletConnectRequest(txHash, TxType.ListNft);
        if (signedHash) {
          const createdEvent = await dispatch(
            submitSignedTx(NFTListedEvent)({
              signedHash: JSON.parse(signedHash).signedTxHash,
            })
          ).unwrap();
          setIsSuccess(true);
          return createdEvent;
        }
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoadingState("finished");
    }
  };

  return {
    listNfts,
    loadingState,
    error,
    isSuccess,
  };
};
