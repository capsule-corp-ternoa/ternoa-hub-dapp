import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import IconModal from "../components/molecules/IconModal";
import TxModal from "../components/organisms/modals/TxModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import CreateCollectionTemplate from "../components/templates/CreateCollectionTemplate";
import { onSubmitParams } from "../components/templates/CreateCollectionTemplate/types";
import { useCreateCollection } from "../hooks/useCreateCollection";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { WalletConnectRejectedRequest } from "../types";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const isConnectingBlockchain = useSelector(
    (state: RootState) => state.blockchain.isConnecting
  );
  const {
    createCollection,
    createCollectionLoadingState,
    collectionTxLoadingState,
    isCollectionTxSuccess,
    collectionTxError,
    ipfsError,
    txId,
  } = useCreateCollection();

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isIpfsErrorModalVisible, setIsIpfsErrorModalVisible] =
    useState<boolean>(false);
  const [isTxErrorModalVisible, setIsTxErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    setIsSucessModalVisible(isCollectionTxSuccess);
  }, [isCollectionTxSuccess]);

  useEffect(() => {
    setIsIpfsErrorModalVisible(Boolean(ipfsError));
  }, [ipfsError]);

  useEffect(() => {
    setIsTxErrorModalVisible(Boolean(collectionTxError));
  }, [collectionTxError]);

  const parseCreateCollectionTxError = () => {
    if (collectionTxError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to create the collection";
    }
  };

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    await createCollection(result);
    formData.reset();
  };

  return (
    <BaseTemplate>
      <IconModal
        title="Collection creation is processing..."
        iconComponent={<LoaderEllipsis />}
        body="It should by confirmed on the blockchain shortly..."
        isOpened={createCollectionLoadingState === "loading"}
      />
      <TxModal
        isOpened={collectionTxLoadingState === "loading"}
        txId={txId || "Loading..."}
        body={
          "A collection creation proposal has been sent to your Ternoa Wallet App"
        }
        title="Create collection request sent!"
      />
      <IconModal
        iconName="CheckCircle"
        title="Creation complete!"
        body="You have created your collection with success!"
        isOpened={isSucessModalVisible}
        onClose={() => setIsSucessModalVisible(false)}
      />
      <IconModal
        iconName="Warning"
        isOpened={isTxErrorModalVisible}
        onClose={() => setIsTxErrorModalVisible(false)}
        title={parseCreateCollectionTxError()}
      />
      <IconModal
        iconName="Warning"
        isOpened={isIpfsErrorModalVisible}
        onClose={() => setIsIpfsErrorModalVisible(false)}
        title="There was an error trying to create the NFT"
      />
      <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
        <CreateCollectionTemplate
          onSubmit={onSubmit}
          disabled={isConnectingBlockchain}
        />
      </div>
    </BaseTemplate>
  );
};

export default CreateNft;
