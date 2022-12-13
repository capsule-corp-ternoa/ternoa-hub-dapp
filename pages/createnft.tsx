import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCreateNft } from "../hooks/useCreateNft";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { onSubmitParams } from "../components/templates/CreateNftTemplate/types";
import CreateNftTemplate from "../components/templates/CreateNftTemplate";
import TxModal from "../components/organisms/modals/TxModal";
import NtfCreationSuccessModal from "../components/organisms/modals/NftCreationSuccessModal";
import IconModal from "../components/molecules/IconModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { RootState } from "../store";
import { WalletConnectRejectedRequest } from "../types";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import { CREATE_BASIC_NFT } from "../constants/features";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const isConnectingBlockchain = useSelector(
    (state: RootState) => state.blockchain.isConnecting
  );
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

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    setIsSucessModalVisible(isMintNtfSuccess);
  }, [isMintNtfSuccess]);

  useEffect(() => {
    setIsIpfsErrorModalVisible(Boolean(ipfsError));
  }, [ipfsError]);

  useEffect(() => {
    setIsMintNFTErrorModalVisible(Boolean(mintNftError));
  }, [mintNftError]);

  const parseMintNftError = () => {
    if (mintNftError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to mint the NFT";
    }
  };

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    await createNft({
      title: result.name,
      ...result,
    });
    formData.reset();
  };

  return (
    <React.Fragment>
      <NextSeo title="Create NFT" description={CREATE_BASIC_NFT.description} />
      <BaseTemplate>
        <IconModal
          title="NFT creation is processing..."
          iconComponent={<LoaderEllipsis />}
          body="it should be confirmed on the blockchain shortly..."
          isOpened={createNftLoadingState === "loading"}
        />
        <TxModal
          isOpened={mintNftLoadingState === "loading"}
          txId={txId || "Loading..."}
          body={
            "An NFT minting proposal has been sent to your Ternoa Wallet App"
          }
          title="Minting request sent!"
        />
        <NtfCreationSuccessModal
          isOpened={isSucessModalVisible}
          onClose={() => setIsSucessModalVisible(false)}
        />
        <IconModal
          iconName="Warning"
          isOpened={isMintNFTErrorModalVisible}
          onClose={() => setIsMintNFTErrorModalVisible(false)}
          title={parseMintNftError()}
        />
        <IconModal
          iconName="Warning"
          isOpened={isIpfsErrorModalVisible}
          onClose={() => setIsIpfsErrorModalVisible(false)}
          title="There was an error trying to create the NFT"
        />
        <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
          <CreateNftTemplate
            onSubmit={onSubmit}
            disabled={isConnectingBlockchain}
          />
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default CreateNft;
