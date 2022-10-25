import { useState } from "react";
import { submitTxHex, createMarketplaceTx } from "ternoa-js";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { LoadingState, WalletConnectRejectedRequest } from "../types";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";

export interface CreatMarketplaceParams {
  isPrivate: boolean;
}

export const useCreateMarketplace = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();

  const [createMarketplaceTxLoadingState, setCreateMarketplaceTxLoadingState] =
    useState<LoadingState>("idle");
  const [createMarketplaceLoadingState, setCreateMarketplaceLoadingState] =
    useState<LoadingState>("idle");
  const [createMarketplaceError, setCreateMarketplaceError] = useState<Error>();
  const [blockchainError, setBlockchainError] = useState<Error>();

  const isCreateMarketplaceTxSuccess =
    createMarketplaceTxLoadingState === "finished" && !createMarketplaceError;
  const isCreateMarketplaceSuccess =
    createMarketplaceLoadingState === "finished" && !blockchainError;

  const createMarketplace = async ({ isPrivate }: CreatMarketplaceParams) => {
    setCreateMarketplaceLoadingState("loading");
    setCreateMarketplaceTxLoadingState("idle");
    setBlockchainError(undefined);
    setCreateMarketplaceError(undefined);
    let txHash: string = "";
    try {
      txHash = await createMarketplaceTx(
        isPrivate ? MarketplaceKind.Private : MarketplaceKind.Public
      );
    } catch (err) {
      if (err instanceof Error) {
        setBlockchainError(err);
      }
    } finally {
      setCreateMarketplaceLoadingState("finished");
    }
    if (txHash) {
      try {
        setCreateMarketplaceTxLoadingState("loading");
        const signedHash = await walletConnectRequest(txHash);
        await submitTxHex(JSON.parse(signedHash).signedTxHash);
      } catch (err) {
        if (err && (err as any).code === -32000) {
          setCreateMarketplaceError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else {
          if (err instanceof Error) {
            setCreateMarketplaceError(err);
          }
        }
      } finally {
        setCreateMarketplaceTxLoadingState("finished");
      }
    }
  };

  return {
    createMarketplace,
    createMarketplaceTxLoadingState,
    createMarketplaceError,
    isCreateMarketplaceTxSuccess,
    createMarketplaceLoadingState,
    blockchainError,
    isCreateMarketplaceSuccess,
  };
};
