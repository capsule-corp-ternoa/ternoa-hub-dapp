import { useState } from "react";
import { submitTxHex, createMarketplaceTx } from "ternoa-js";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { LoadingState, WalletConnectRejectedRequest } from "../types";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import { retry } from "../utils/retry";

export interface CreatMarketplaceParams {
  isPrivate: boolean;
}

export const useCreateMarketplace = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();

  const [createMarketplaceTxLoadingState, setCreateMarketplaceTxLoadingState] =
    useState<LoadingState>("idle");
  const [createMarketplaceLoadingState, setCreateMarketplaceLoadingState] =
    useState<LoadingState>("idle");
  const [marketplaceId, setMarketplaceId] = useState<string>();
  const [createMarketplaceError, setCreateMarketplaceError] = useState<Error>();
  const [blockchainError, setBlockchainError] = useState<Error>();

  const isCreateMarketplaceTxSuccess =
    createMarketplaceTxLoadingState === "finished" && !createMarketplaceError;
  const isCreateMarketplaceSuccess =
    createMarketplaceLoadingState === "finished" && !blockchainError;

  const submitTx = async (signedHash: `0x${string}`): Promise<string> => {
    return new Promise((resolve, reject) => {
      submitTxHex(signedHash, (result) => {
        const marketplaceCreatedEvent = result.events.find(
          (event) => event.event.method === "MarketplaceCreated"
        );
        if (marketplaceCreatedEvent) {
          resolve(marketplaceCreatedEvent.event.data[0].toString());
        }
      }).catch(reject);
    });
  };

  const createMarketplace = async ({ isPrivate }: CreatMarketplaceParams) => {
    setCreateMarketplaceLoadingState("loading");
    setCreateMarketplaceTxLoadingState("idle");
    setBlockchainError(undefined);
    setCreateMarketplaceError(undefined);
    setMarketplaceId(undefined);
    let txHash: string = "";
    try {
      txHash = await createMarketplaceTx(
        isPrivate ? MarketplaceKind.Private : MarketplaceKind.Public
      );
    } catch (err) {
      console.error(err);
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
        const _marketplaceId = await retry(submitTx, [
          JSON.parse(signedHash).signedTxHash,
        ]);
        setMarketplaceId(_marketplaceId);
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
    marketplaceId,
  };
};
