import { useState } from "react";
import { createCollectionTx, submitTxHex } from "ternoa-js";
import { useSelector } from "react-redux";
import * as IpfsService from "../services/ipfs";
import { useWalletConnectClient } from "./useWalletConnectClient";
import {
  CollectionJsonData,
  LoadingState,
  WalletConnectRejectedRequest,
} from "../types";
import { RootState } from "../store";

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
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );

  const [collectionTxLoadingState, setCollectionTxLoadingState] =
    useState<LoadingState>("idle");
  const [createCollectionLoadingState, setCreateCollectionLoadingState] =
    useState<LoadingState>("idle");
  const [collectionTxError, setCollectionTxError] = useState<Error>();
  const [ipfsError, setIpfsError] = useState<Error>();
  const [txId, setTxId] = useState<string>();

  const isCollectionTxSuccess =
    collectionTxLoadingState === "finished" && !collectionTxError;
  const ipfsIsSuccess =
    createCollectionLoadingState === "finished" && !ipfsError;

  const uploadJsonToIpfs = async (
    collectionData: CreateCollectionParams
  ): Promise<IpfsService.IpfsUploadFileResponse> => {
    const ipfsLogoResponse = await IpfsService.uploadFile(
      collectionData.logo,
      currentNetwork
    );
    const ipfsBannerResponse = await IpfsService.uploadFile(
      collectionData.banner,
      currentNetwork
    );
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
    return await IpfsService.uploadFile(blob, currentNetwork);
  };

  const createTx = async (hash: string, limit?: number) => {
    const txHash = await createCollectionTx(hash, limit);
    return txHash;
  };

  const createCollection = async (collectionData: CreateCollectionParams) => {
    setCreateCollectionLoadingState("loading");
    setCollectionTxLoadingState("idle");
    setIpfsError(undefined);
    setCollectionTxError(undefined);
    let txHash: `0x${string}` | undefined = undefined;
    try {
      const ipfsJsonResponse = await uploadJsonToIpfs(collectionData);
      txHash = await createTx(ipfsJsonResponse.Hash, collectionData.limit);
      await setTxId(ipfsJsonResponse.Hash);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setIpfsError(err);
      }
    } finally {
      setCreateCollectionLoadingState("finished");
    }
    if (txHash) {
      try {
        setCollectionTxLoadingState("loading");
        const signedHash = await walletConnectRequest(txHash);
        await submitTxHex(JSON.parse(signedHash).signedTxHash);
      } catch (err) {
        console.log(err);
        if (err && (err as any).code === -32000) {
          setCollectionTxError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else {
          if (err instanceof Error) {
            setCollectionTxError(err);
          }
        }
      } finally {
        setCollectionTxLoadingState("finished");
      }
    }
  };

  return {
    createCollection,
    collectionTxLoadingState,
    createCollectionLoadingState,
    collectionTxError,
    isCollectionTxSuccess,
    ipfsError,
    ipfsIsSuccess,
    txId,
  };
};
