import { useState } from "react";
import { batchTxHex, createTxHex, submitTxHex } from "ternoa-js";
import mime from "mime-types";
import { useDispatch, useSelector } from "react-redux";
import * as IpfsService from "../services/ipfs";
import { useWalletConnectClient } from "./useWalletConnectClient";
import {
  LoadingState,
  NftJsonData,
  WalletConnectRejectedRequest,
} from "../types";
import { nftApi } from "../store/slices/nfts";
import { RootState } from "../store";
import { retry } from "../utils/retry";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";

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
  const { request: walletConnectRequest, account } = useWalletConnectClient();
  const dispatch = useDispatch();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );

  const [mintNftLoadingState, setNftMintLoadingState] =
    useState<LoadingState>("idle");
  const [createNftLoadingState, setCreateNftLoadingState] =
    useState<LoadingState>("idle");
  const [mintNftError, setMintNftError] = useState<Error>();
  const [ipfsError, setIpfsError] = useState<Error>();
  const [txId, setTxId] = useState<string>();
  const [nftId, setNftId] = useState<string>();

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
  }): Promise<IpfsUploadFileResponse> => {
    const ipfsFileResponse = await IpfsService.uploadFile(file, currentNetwork);
    const ipfsPreviewResonse =
      preview && (await IpfsService.uploadFile(preview, currentNetwork));
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
    return await IpfsService.uploadFile(blob, currentNetwork);
  };

  const createTx = async (
    hash: string,
    royalty: number,
    collectionId: number | undefined,
    quantity: number
  ) => {
    const txHash = await createTxHex("nft", "createNft", [
      hash,
      `000${royalty * 10000}`,
      collectionId,
      false,
    ]);
    if (quantity === 1) {
      return txHash;
    } else {
      const txHashes = Array(quantity).fill(txHash);
      return await batchTxHex(txHashes);
    }
  };

  const submitTx = async (signedHash: `0x${string}`): Promise<string> => {
    return new Promise((resolve, reject) => {
      submitTxHex(signedHash, (result) => {
        const nftCreatedEvent = result.events.find(
          (event) => event.event.method === "NFTCreated"
        );
        if (nftCreatedEvent) {
          resolve(nftCreatedEvent.event.data[0].toString());
        }
      }).catch(reject);
    });
  };

  const createNft = async ({
    file,
    preview,
    title,
    description,
    royalty,
    quantity,
    collectionId,
  }: CreatNftParams) => {
    setCreateNftLoadingState("loading");
    setNftMintLoadingState("idle");
    setIpfsError(undefined);
    setMintNftError(undefined);
    setNftId(undefined);
    let txHash: string = "";
    try {
      const ipfsJsonResponse = await uploadJsonToIpfs({
        file,
        preview,
        title,
        description,
      });
      txHash = await createTx(
        ipfsJsonResponse.Hash,
        royalty,
        collectionId,
        quantity
      );
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
        const signedHash = await walletConnectRequest(txHash);
        const _nftId = await retry(submitTx, [
          JSON.parse(signedHash).signedTxHash,
        ]);
        setNftId(_nftId);
        dispatch(nftApi.util.invalidateTags(["Nfts"]));
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
    nftId,
  };
};
