import { useState } from "react";
import { createTxHex } from "ternoa-js";
import mime from "mime-types";
import * as IpfsService from "../services/ipfs";
import { useWalletConnectClient } from "./useWalletConnectClient";
import { LoadingState, NftJSON } from "../types";

export interface CreatNftParams {
  file: File;
  preview?: File;
  title: string;
  description: string;
  royalty: number;
  quantity: number;
}

export class WalletConnectRejectedRequest extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, WalletConnectRejectedRequest.prototype);
  }
}

export const useCreateNft = () => {
  const { request: walletConnectRequest } = useWalletConnectClient();
  const [mintNftLoadingState, setNftMintLoadingState] =
    useState<LoadingState>("idle");
  const [createNftLoadingState, setCreateNftLoadingState] =
    useState<LoadingState>("idle");
  const [mintNftError, setMintNftError] = useState<Error>();
  const [ipfsError, setIpfsError] = useState<Error>();
  const [txId, setTxId] = useState<string>();

  const isMintNtfSuccess = mintNftLoadingState === "finished" && !mintNftError;
  const ipfsIsSuccess = createNftLoadingState === "finished" && !ipfsError;

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
  }): Promise<IpfsService.IpfsUploadFileResponse> => {
    const ipfsFileResponse = await IpfsService.uploadFile(file);
    const ipfsPreviewResonse =
      preview && (await IpfsService.uploadFile(preview));
    const json: NftJSON = {
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
    return await IpfsService.uploadFile(blob);
  };

  const createNft = async ({
    file,
    preview,
    title,
    description,
    royalty,
  }: CreatNftParams) => {
    setCreateNftLoadingState("loading");
    setNftMintLoadingState("idle");
    setIpfsError(undefined);
    setMintNftError(undefined);
    let txHash: string = "";
    try {
      const ipfsJsonResponse = await uploadJsonToIpfs({
        file,
        preview,
        title,
        description,
      });
      txHash = await createTxHex("nft", "createNft", [
        ipfsJsonResponse.Hash,
        `000${royalty * 10000}`,
        undefined,
        false,
      ]);
      await setTxId(ipfsJsonResponse.Hash);
    } catch (err) {
      if (err instanceof Error) {
        setIpfsError(err);
      }
    } finally {
      setCreateNftLoadingState("finished");
    }
    if (txHash) {
      try {
        setNftMintLoadingState("loading");
        await walletConnectRequest(txHash);
      } catch (err) {
        if (err && (err as any).code === -32000) {
          setMintNftError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else {
          if (err instanceof Error) {
            setMintNftError(err);
          }
        }
      } finally {
        setNftMintLoadingState("finished");
      }
    }
  };

  return {
    createNft,
    mintNftLoadingState,
    mintNftError,
    isMintNtfSuccess,
    createNftLoadingState,
    ipfsError,
    ipfsIsSuccess,
    txId,
  };
};
