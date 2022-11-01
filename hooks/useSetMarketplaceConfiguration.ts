import { useState } from "react";
import { setMarketplaceConfigurationTx, submitTxHex } from "ternoa-js";
import { useSelector } from "react-redux";
import * as IpfsService from "../services/ipfs";
import { useWalletConnectClient } from "./useWalletConnectClient";
import {
  MarketplaceJsonData,
  LoadingState,
  WalletConnectRejectedRequest,
} from "../types";
import { RootState } from "../store";
import { MarketplaceConfigAction } from "ternoa-js/marketplace/enum";
import { retry } from "../utils/retry";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";

export interface SetMarketplaceConfigurationParams {
  marketplaceId: number;
  name: string;
  comissionFee?: number;
  listingFee?: number;
  logo: File;
}

export const useSetMarketplaceConfiguration = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );

  const [marketplaceTxLoadingState, setMarketplaceTxLoadingState] =
    useState<LoadingState>("idle");
  const [
    configureMarketplaceLoadingState,
    setConfigureMarketplaceLoadingState,
  ] = useState<LoadingState>("idle");
  const [marketplaceTxError, setMarketplaceTxError] = useState<Error>();
  const [ipfsError, setIpfsError] = useState<Error>();
  const [txId, setTxId] = useState<string>();

  const isMarketplaceTxSuccess =
    marketplaceTxLoadingState === "finished" && !marketplaceTxError;
  const ipfsIsSuccess =
    configureMarketplaceLoadingState === "finished" && !ipfsError;

  const uploadJsonToIpfs = async (
    marketplaceConfigData: SetMarketplaceConfigurationParams
  ): Promise<IpfsUploadFileResponse> => {
    const ipfsLogoResponse = await IpfsService.uploadFile(
      marketplaceConfigData.logo,
      currentNetwork
    );
    const json: MarketplaceJsonData = {
      name: marketplaceConfigData.name,
      logo: ipfsLogoResponse.Hash,
    };
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    return await IpfsService.uploadFile(blob, currentNetwork);
  };

  const createTx = async (
    id: number,
    comissionFee?: number,
    listingFee?: number,
    offchainData?: string
  ) => {
    const parsedComissionFee = comissionFee && {
      [MarketplaceConfigAction.Set]: { percentage: comissionFee },
    };
    const parsedListingFee = listingFee && {
      [MarketplaceConfigAction.Set]: { percentage: listingFee },
    };
    const parsedOffchainData = offchainData && {
      [MarketplaceConfigAction.Set]: offchainData,
    };
    const txHash = await setMarketplaceConfigurationTx(
      id,
      parsedComissionFee || undefined,
      parsedListingFee || undefined,
      undefined,
      parsedOffchainData || undefined
    );
    return txHash;
  };

  const setMarketplaceConfiguration = async (
    marketplaceConfigData: SetMarketplaceConfigurationParams
  ) => {
    setConfigureMarketplaceLoadingState("loading");
    setMarketplaceTxLoadingState("idle");
    setIpfsError(undefined);
    setMarketplaceTxError(undefined);
    let txHash: `0x${string}` | undefined = undefined;
    try {
      const ipfsJsonResponse = await uploadJsonToIpfs(marketplaceConfigData);
      txHash = await createTx(
        marketplaceConfigData.marketplaceId,
        marketplaceConfigData.comissionFee,
        marketplaceConfigData.listingFee,
        ipfsJsonResponse.Hash
      );
      await setTxId(ipfsJsonResponse.Hash);
    } catch (err) {
      if (err instanceof Error) {
        setIpfsError(err);
      }
    } finally {
      setConfigureMarketplaceLoadingState("finished");
    }
    if (txHash) {
      try {
        setMarketplaceTxLoadingState("loading");
        const signedHash = await walletConnectRequest(txHash);
        await retry(submitTxHex, [JSON.parse(signedHash).signedTxHash]);
      } catch (err) {
        if (err && (err as any).code === -32000) {
          setMarketplaceTxError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else {
          if (err instanceof Error) {
            setMarketplaceTxError(err);
          }
        }
      } finally {
        setMarketplaceTxLoadingState("finished");
      }
    }
  };

  return {
    setMarketplaceConfiguration,
    marketplaceTxLoadingState,
    configureMarketplaceLoadingState,
    marketplaceTxError,
    isMarketplaceTxSuccess,
    ipfsError,
    ipfsIsSuccess,
    txId,
  };
};
