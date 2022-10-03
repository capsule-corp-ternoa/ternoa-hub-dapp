import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useCreateNft,
  WalletConnectRejectedRequest,
} from "../hooks/useCreateNft";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { onSubmitParams } from "../components/templates/CreateNftTemplate/types";
import CreateNftTemplate from "../components/templates/CreateNftTemplate";
import NftCreationModal from "../components/organisms/modals/NftCreationModal";
import NftMintingModal from "../components/organisms/modals/NftMintingModal";
import NtfCreationSuccessModal from "../components/organisms/modals/NftCreationSuccessModal";
import AlertModal from "../components/molecules/AlertModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";

const Home: NextPage = () => {
  const { isConnected, connect } = useWalletConnectClient();
  const {
    createNft,
    createNftLoadingState,
    mintNftLoadingState,
    isMintNtfSuccess,
    mintNftError,
    ipfsError,
    txId,
  } = useCreateNft();
  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isIpfsErrorModalVisible, setIsIpfsErrorModalVisible] =
    useState<boolean>(false);
  const [isMintNFTErrorModalVisible, setIsMintNFTErrorModalVisible] =
    useState<boolean>(false);
  const [onSubmitResponse, setSubmitResponse] = useState<onSubmitParams>();

  useEffect(() => {
    setIsSucessModalVisible(isMintNtfSuccess);
  }, [isMintNtfSuccess]);

  useEffect(() => {
    setIsIpfsErrorModalVisible(Boolean(ipfsError));
  }, [ipfsError]);

  useEffect(() => {
    setIsMintNFTErrorModalVisible(Boolean(mintNftError));
  }, [mintNftError]);

  useEffect(() => {
    const _createNft = async (onSubmitResponse: onSubmitParams) => {
      await createNft({
        title: onSubmitResponse.result.name,
        ...onSubmitResponse.result,
      });
      onSubmitResponse.formData.reset();
    };
    if (onSubmitResponse && isConnected) {
      setSubmitResponse(undefined);
      _createNft(onSubmitResponse);
    }
  }, [onSubmitResponse, createNft, isConnected]);

  const parseMintNftError = () => {
    if (mintNftError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to mint the NFT";
    }
  };

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    if (!isConnected) {
      const session = await connect();
      if (session) {
        setSubmitResponse({ result, formData });
      }
    } else {
      setSubmitResponse({ result, formData });
    }
  };

  return (
    <BaseTemplate>
      <NftCreationModal isOpened={createNftLoadingState === "loading"} />
      <NftMintingModal
        isOpened={mintNftLoadingState === "loading"}
        txId={txId || "Loading..."}
      />
      <NtfCreationSuccessModal
        isOpened={isSucessModalVisible}
        onClose={() => setIsSucessModalVisible(false)}
      />
      <AlertModal
        isOpened={isMintNFTErrorModalVisible}
        onClose={() => setIsMintNFTErrorModalVisible(false)}
        title={parseMintNftError()}
      />
      <AlertModal
        isOpened={isIpfsErrorModalVisible}
        onClose={() => setIsIpfsErrorModalVisible(false)}
        title="There was an error trying to create the NFT"
      />
      <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
        <CreateNftTemplate onSubmit={onSubmit} />
      </div>
    </BaseTemplate>
  );
};

export default Home;
