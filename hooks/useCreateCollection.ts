import { useState } from "react";
import { useDispatch } from "react-redux";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { CollectionJsonData, LoadingState, TxType } from "../types";
import { AppDispatch } from "../store";
import {
  createCollection as blockchainTxCreateCollection,
  submitSignedTx,
} from "../store/slices/blockchainTx";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";
import { uploadToIpfs } from "../store/slices/ipfs";
import { CollectionCreatedEvent } from "ternoa-js";

export interface CreateCollectionParams {
  name: string;
  description: string;
  isSensitive: boolean;
  logo: File;
  banner: File;
  limit?: number;
}

export const useCreateCollection = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const dispatch = useDispatch<AppDispatch>();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const uploadJsonToIpfs = async (
    collectionData: CreateCollectionParams
  ): Promise<IpfsUploadFileResponse> => {
    const ipfsLogoResponse = await dispatch(
      uploadToIpfs(collectionData.logo)
    ).unwrap();
    const ipfsBannerResponse = await dispatch(
      uploadToIpfs(collectionData.banner)
    ).unwrap();
    const json: CollectionJsonData = {
      name: collectionData.name,
      description: collectionData.description,
      profile_image: ipfsLogoResponse.Hash,
      banner_image: ipfsBannerResponse.Hash,
      isSensitive: collectionData.isSensitive,
    };
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    return await dispatch(uploadToIpfs(blob)).unwrap();
  };

  const createCollection = async (
    collectionData: CreateCollectionParams
  ): Promise<CollectionCreatedEvent | undefined> => {
    setLoadingState("loading");
    setError(undefined);
    setIsSuccess(false);
    try {
      let txHash: `0x${string}` | undefined = undefined;
      const ipfsJsonResponse = await uploadJsonToIpfs(collectionData);
      txHash = await dispatch(
        blockchainTxCreateCollection({
          hash: ipfsJsonResponse.Hash,
          limit: collectionData.limit,
        })
      ).unwrap();
      if (txHash) {
        const signedHash = await walletConnectRequest(
          txHash,
          TxType.CreateCollection
        );
        if (signedHash) {
          const createdEvent = await dispatch(
            submitSignedTx(CollectionCreatedEvent)({
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
    createCollection,
    loadingState,
    error,
    isSuccess,
  };
};
