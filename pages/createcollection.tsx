import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import IconModal from "../components/molecules/IconModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import CreateCollectionTemplate from "../components/templates/CreateCollectionTemplate";
import { onSubmitParams } from "../components/templates/CreateCollectionTemplate/types";
import { useCreateCollection } from "../hooks/useCreateCollection";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { CREATE_COLLECTION } from "../constants/features";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const isConnectingBlockchain = useSelector(
    (state: RootState) => state.blockchain.isConnecting
  );
  const { createCollection, error, isSuccess } = useCreateCollection();
  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    setIsSucessModalVisible(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(error));
  }, [error]);

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    await createCollection(result);
    formData.reset();
  };

  return (
    <React.Fragment>
      <NextSeo
        title="Create Collection"
        description={CREATE_COLLECTION.description}
      />
      <BaseTemplate>
        <IconModal
          iconName="CheckCircle"
          title="Creation complete!"
          body="You have created your collection with success!"
          isOpened={isSucessModalVisible}
          onClose={() => setIsSucessModalVisible(false)}
        />
        <IconModal
          iconName="Warning"
          isOpened={isErrorModalVisible}
          onClose={() => setIsErrorModalVisible(false)}
          title={"There was an error trying to create the collection"}
        />
        <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
          <CreateCollectionTemplate
            onSubmit={onSubmit}
            disabled={isConnectingBlockchain}
          />
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default CreateNft;
