import { useState } from "react";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { LoadingState, TxType } from "../types";
import {
  createMarketplace as blockchainTxCreateMarketplace,
  submitSignedTx,
} from "../store/slices/blockchainTx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { MarketplaceCreatedEvent } from "ternoa-js";

export interface CreatMarketplaceParams {
  isPrivate: boolean;
}

export const useCreateMarketplace = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const dispatch = useDispatch<AppDispatch>();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const createMarketplace = async ({
    isPrivate,
  }: CreatMarketplaceParams): Promise<MarketplaceCreatedEvent | undefined> => {
    setLoadingState("loading");
    setError(undefined);
    setIsSuccess(false);
    let txHash: string = "";
    try {
      txHash = await dispatch(
        blockchainTxCreateMarketplace({
          isPrivate,
        })
      ).unwrap();
      if (txHash) {
        const signedHash = await walletConnectRequest(
          txHash,
          TxType.CreateMarketplace
        );
        if (signedHash) {
          const createdEvent = await dispatch(
            submitSignedTx(MarketplaceCreatedEvent)({
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
    createMarketplace,
    loadingState,
    error,
    isSuccess,
  };
};
