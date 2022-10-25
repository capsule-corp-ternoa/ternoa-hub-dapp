import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import IconModal from "../components/molecules/IconModal";
import TxModal from "../components/organisms/modals/TxModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import CreateMarketplaceTemplate from "../components/templates/CreateMarketplaceTemplate";
import { onSubmitParams } from "../components/templates/CreateMarketplaceTemplate/types";
import { useCreateMarketplace } from "../hooks/useCreateMarketplace";
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
    createMarketplace,
    createMarketplaceTxLoadingState,
    createMarketplaceError,
    createMarketplaceLoadingState,
    blockchainError,
    isCreateMarketplaceTxSuccess,
  } = useCreateMarketplace();

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isBlockchainErrorModalVisible, setIsBlockchainErrorModalVisible] =
    useState<boolean>(false);
  const [isTxErrorModalVisible, setIsTxErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    setIsSucessModalVisible(isCreateMarketplaceTxSuccess);
  }, [isCreateMarketplaceTxSuccess]);

  useEffect(() => {
    setIsBlockchainErrorModalVisible(Boolean(blockchainError));
  }, [blockchainError]);

  useEffect(() => {
    setIsTxErrorModalVisible(Boolean(createMarketplaceError));
  }, [createMarketplaceError]);

  const parseCreateMarketplaceError = () => {
    if (createMarketplaceError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to create the Marketplace";
    }
  };

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    await createMarketplace(result);
    formData.reset();
  };

  return (
    <BaseTemplate>
      <IconModal
        title="Marketplace creation is processing..."
        iconComponent={<LoaderEllipsis />}
        body="It should by confirmed on the blockchain shortly..."
        isOpened={createMarketplaceLoadingState === "loading"}
      />
      <TxModal
        isOpened={createMarketplaceTxLoadingState === "loading"}
        txId={""}
        body={
          "A Marketplace creation proposal has been sent to your Ternoa Wallet App"
        }
        title="Create Marketplace request sent!"
      />
      <IconModal
        iconName="CheckCircle"
        title="Creation complete!"
        body="You have created your Marketplace with success!"
        isOpened={isSucessModalVisible}
        onClose={() => setIsSucessModalVisible(false)}
      />
      <IconModal
        iconName="Warning"
        isOpened={isTxErrorModalVisible}
        onClose={() => setIsTxErrorModalVisible(false)}
        title={parseCreateMarketplaceError()}
      />
      <IconModal
        iconName="Warning"
        isOpened={isBlockchainErrorModalVisible}
        onClose={() => setIsBlockchainErrorModalVisible(false)}
        title="There was an error trying to create the Marketplace"
      />
      <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
        <CreateMarketplaceTemplate
          onSubmit={onSubmit}
          disabled={isConnectingBlockchain}
        />
      </div>
    </BaseTemplate>
  );
};

export default CreateNft;