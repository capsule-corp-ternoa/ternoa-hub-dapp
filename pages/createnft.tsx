import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCreateNft } from "../hooks/useCreateNft";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { onSubmitParams } from "../components/templates/CreateNftTemplate/types";
import CreateNftTemplate from "../components/templates/CreateNftTemplate";
import IconModal from "../components/molecules/IconModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { RootState } from "../store";
import { CREATE_BASIC_NFT } from "../constants/features";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const isConnectingBlockchain = useSelector(
    (state: RootState) => state.blockchain.isConnecting
  );
  const { createNft, error, isSuccess } = useCreateNft();
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
          iconName="CheckCircle"
          isOpened={isSucessModalVisible}
          onClose={() => setIsSucessModalVisible(false)}
          title="Creation complete!"
          body="You have created an NFT with success!"
          buttonText="Check it in your profile."
          onClickButton={() => {
            setIsSucessModalVisible(false);
            router.push("/mynfts");
          }}
        />
        <IconModal
          iconName="Warning"
          isOpened={isErrorModalVisible}
          onClose={() => setIsErrorModalVisible(false)}
          title={"There was an error trying to create the NFT"}
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
