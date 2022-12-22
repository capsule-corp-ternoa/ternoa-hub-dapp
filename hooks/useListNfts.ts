import { useState } from "react";
import {
  batchTxHex,
  createTxHex,
  numberToBalance,
  submitTxHex,
} from "ternoa-js";
import { LoadingState, WalletConnectRejectedRequest } from "../types";
import { retry } from "../utils/retry";
import { useWalletConnectClient } from "./useWalletConnectClient";

export interface ListNftParams {
  nftId: string;
  marketplaceId: string;
  price?: number;
}

export interface ListNftsParams extends Array<ListNftParams> {}

export const useListNfts = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const [listNftsLoadingState, setListNftsLoadingState] =
    useState<LoadingState>("idle");
  const [listNftError, setListNftError] = useState<Error>();
  const [txId, setTxId] = useState<string>();

  const isListNftTxSuccess =
    listNftsLoadingState === "finished" && !listNftError;

  const createListTx = async (nftsData: ListNftsParams) => {
    const txs = await Promise.all(
      nftsData.map(async (nftData) => {
        const tx = await createTxHex("marketplace", "listNft", [
          nftData.nftId,
          nftData.marketplaceId,
          nftData.price
            ? (await numberToBalance(nftData.price!)).toString()
            : undefined,
        ]);
        return tx;
      })
    );
    if (txs.length > 1) {
      return await batchTxHex(txs);
    } else {
      return txs[0];
    }
  };

  const listNfts = async (nftsData: ListNftsParams) => {
    setListNftsLoadingState("loading");
    setListNftError(undefined);
    setTxId(undefined);
    try {
      const txHash = await createListTx(nftsData);
      setTxId(txHash);
      const signedHash = await walletConnectRequest(txHash);
      console.log(signedHash);
      const response = await retry(submitTxHex, [
        JSON.parse(signedHash).signedTxHash,
      ]);
      console.log(response);
    } catch (err) {
      console.error(err);
      if (err && (err as any).code === -32000) {
        setListNftError(
          new WalletConnectRejectedRequest("The request has been rejected")
        );
      }
      if (err instanceof Error) {
        setListNftError(err);
      }
    } finally {
      setListNftsLoadingState("finished");
    }
  };

  return {
    listNfts,
    listNftsLoadingState,
    listNftError,
    txId,
    isListNftTxSuccess,
  };
};
