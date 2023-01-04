import { useState } from "react";
import { NFTCreatedEvent } from "ternoa-js";
import mime from "mime-types";
import { useDispatch } from "react-redux";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { LoadingState, NftJsonData, TxType } from "../types";
import { nftApi } from "../store/slices/nfts";
import { AppDispatch } from "../store";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";
import { uploadToIpfs } from "../store/slices/ipfs";
import {
  createNft as blockchainTxCreateNft,
  submitSignedTx,
} from "../store/slices/blockchainTx";

export interface CreatNftParams {
  file: File;
  preview?: File;
  title: string;
  description: string;
  royalty: number;
  quantity: number;
  collectionId?: number;
}

export const useCreateNft = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const dispatch = useDispatch<AppDispatch>();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const uploadJsonToIpfs = async ({
    file,
    preview,
    title,
    description,
  }: {
    file: File;
    preview?: File;
    title: string;
    description: string;
  }): Promise<IpfsUploadFileResponse> => {
    const ipfsFileResponse = await dispatch(uploadToIpfs(file)).unwrap();
    const ipfsPreviewResonse =
      preview && (await dispatch(uploadToIpfs(preview)).unwrap());
    const json: NftJsonData = {
      title,
      description,
      image: ipfsPreviewResonse
        ? ipfsPreviewResonse.Hash
        : ipfsFileResponse.Hash,
      properties: {
        media: {
          hash: ipfsFileResponse.Hash,
          type: mime.lookup(file.name) || file.type,
          size: ipfsFileResponse.Size,
        },
      },
    };
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    return await dispatch(uploadToIpfs(blob)).unwrap();
  };

  const createNft = async ({
    file,
    preview,
    title,
    description,
    royalty,
    quantity,
    collectionId,
  }: CreatNftParams): Promise<NFTCreatedEvent | undefined> => {
    setLoadingState("loading");
    setError(undefined);
    setIsSuccess(false);
    let txHash: string = "";
    try {
      const ipfsJsonResponse = await uploadJsonToIpfs({
        file,
        preview,
        title,
        description,
      });
      txHash = await dispatch(
        blockchainTxCreateNft({
          hash: ipfsJsonResponse.Hash,
          royalty,
          collectionId,
          quantity,
        })
      ).unwrap();
      if (txHash) {
        const signedHash = await walletConnectRequest(txHash, TxType.CreateNFT);
        if (signedHash) {
          const createdEvent = await dispatch(
            submitSignedTx(NFTCreatedEvent)({
              signedHash: JSON.parse(signedHash).signedTxHash,
            })
          ).unwrap();
          setIsSuccess(true);
          dispatch(nftApi.util.invalidateTags(["Nfts"]));
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
    createNft,
    loadingState,
    error,
    isSuccess,
  };
};
