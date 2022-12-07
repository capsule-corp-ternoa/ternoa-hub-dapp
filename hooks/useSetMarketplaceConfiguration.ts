import { useState } from "react";
import { setMarketplaceConfigurationTx, submitTxHex } from "ternoa-js";
import { useDispatch, useSelector } from "react-redux";
import * as IpfsService from "../services/ipfs";
import { useWalletConnectClient } from "./useWalletConnectClient";
import {
  MarketplaceJsonData,
  LoadingState,
  WalletConnectRejectedRequest,
  FeeType,
} from "../types";
import { AppDispatch, RootState } from "../store";
import { MarketplaceConfigAction } from "ternoa-js/marketplace/enum";
import { retry } from "../utils/retry";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";
import { outdated } from "../store/slices/outdated";

export interface SetMarketplaceConfigurationParams {
  marketplaceId: number;
  name: string;
  commissionFee?: string;
  commissionFeeType?: FeeType;
  listingFee?: string;
  listingFeeType?: FeeType;
  mainColor?: string;
  accounts?: string[];
  logo: File;
}

export const useSetMarketplaceConfiguration = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const dispatch = useDispatch<AppDispatch>();

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
      mainColor: marketplaceConfigData.mainColor,
      logo: ipfsLogoResponse.Hash,
    };
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    return await IpfsService.uploadFile(blob, currentNetwork);
  };

  const parseFee = (feeType: FeeType, value: string) => {
    if (feeType === FeeType.Percentage) {
      return { percentage: parseInt(value) };
    } else if (feeType === FeeType.Flat) {
      return { flat: parseInt(value) };
    } else {
      return { percentage: parseInt(value) };
    }
  };

  const createTx = async (
    id: number,
    commissionFee?: string,
    commissionFeeType?: FeeType,
    listingFee?: string,
    listingFeeType?: FeeType,
    accounts?: string[],
    offchainData?: string
  ) => {
    const parsedcommissionFee = commissionFee
      ? {
          [MarketplaceConfigAction.Set]: parseFee(
            commissionFeeType!,
            commissionFee
          ),
        }
      : MarketplaceConfigAction.Remove;
    const parsedListingFee = listingFee
      ? {
          [MarketplaceConfigAction.Set]: parseFee(listingFeeType!, listingFee),
        }
      : MarketplaceConfigAction.Remove;
    const parsedOffchainData = offchainData
      ? {
          [MarketplaceConfigAction.Set]: offchainData,
        }
      : MarketplaceConfigAction.Remove;
    const parsedAccountListData =
      accounts && accounts.length
        ? {
            [MarketplaceConfigAction.Set]: accounts,
          }
        : MarketplaceConfigAction.Remove;
    const txHash = await setMarketplaceConfigurationTx(
      id,
      parsedcommissionFee,
      parsedListingFee,
      parsedAccountListData,
      parsedOffchainData
    );
    return txHash;
  };

  const setMarketplaceConfiguration = async (
    marketplaceConfigData: SetMarketplaceConfigurationParams,
    lastUpdatedAt?: string
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
        marketplaceConfigData.commissionFee,
        marketplaceConfigData.commissionFeeType,
        marketplaceConfigData.listingFee,
        marketplaceConfigData.listingFeeType,
        marketplaceConfigData.accounts,
        ipfsJsonResponse.Hash
      );
      await setTxId(ipfsJsonResponse.Hash);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
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
        dispatch(
          outdated.actions.setMarketplaceAsOutdated({
            id: marketplaceConfigData.marketplaceId,
            timestamp: lastUpdatedAt,
          })
        );
      } catch (err) {
        if (err && (err as any).code === -32000) {
          setMarketplaceTxError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else {
          if (err instanceof Error) {
            console.error(err);
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
