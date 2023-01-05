import { useState } from "react";
import { MarketplaceConfigSetEvent } from "ternoa-js";
import { useDispatch } from "react-redux";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { MarketplaceJsonData, LoadingState, FeeType, TxType } from "../types";
import { AppDispatch } from "../store";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";
import { outdated } from "../store/slices/outdated";
import { uploadToIpfs } from "../store/slices/ipfs";
import {
  createMarketplaceConfiguration,
  submitSignedTx,
} from "../store/slices/blockchainTx";

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
  const dispatch = useDispatch<AppDispatch>();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const uploadJsonToIpfs = async (
    marketplaceConfigData: SetMarketplaceConfigurationParams
  ): Promise<IpfsUploadFileResponse> => {
    const ipfsLogoResponse = await dispatch(
      uploadToIpfs(marketplaceConfigData.logo)
    ).unwrap();
    const json: MarketplaceJsonData = {
      name: marketplaceConfigData.name,
      mainColor: marketplaceConfigData.mainColor,
      logo: ipfsLogoResponse.Hash,
    };
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    return await dispatch(uploadToIpfs(blob)).unwrap();
  };

  const setMarketplaceConfiguration = async (
    marketplaceConfigData: SetMarketplaceConfigurationParams,
    lastUpdatedAt?: string
  ): Promise<MarketplaceConfigSetEvent | undefined> => {
    setLoadingState("loading");
    setError(undefined);
    setIsSuccess(false);
    try {
      let txHash: `0x${string}` | undefined = undefined;
      const ipfsJsonResponse = await uploadJsonToIpfs(marketplaceConfigData);
      txHash = await dispatch(
        createMarketplaceConfiguration({
          id: marketplaceConfigData.marketplaceId,
          commissionFee: marketplaceConfigData.commissionFee,
          commissionFeeType: marketplaceConfigData.commissionFeeType,
          listingFee: marketplaceConfigData.listingFee,
          listingFeeType: marketplaceConfigData.listingFeeType,
          accounts: marketplaceConfigData.accounts,
          offchainData: ipfsJsonResponse.Hash,
        })
      ).unwrap();
      if (txHash) {
        const signedHash = await walletConnectRequest(
          txHash,
          TxType.CreateMarketplace
        );
        if (signedHash) {
          const createdEvent = await dispatch(
            submitSignedTx(MarketplaceConfigSetEvent)({
              signedHash: JSON.parse(signedHash).signedTxHash,
            })
          ).unwrap();
          dispatch(
            outdated.actions.setMarketplaceAsOutdated({
              id: marketplaceConfigData.marketplaceId,
              timestamp: lastUpdatedAt,
            })
          );
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
    setMarketplaceConfiguration,
    loadingState,
    error,
    isSuccess,
  };
};
