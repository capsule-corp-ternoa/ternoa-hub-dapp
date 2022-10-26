import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import IconModal from "../components/molecules/IconModal";
import TxModal from "../components/organisms/modals/TxModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import SetMarketplaceConfigurationTemplate from "../components/templates/SetMarketplaceConfigurationTemplate";
import { onSubmitParams } from "../components/templates/SetMarketplaceConfigurationTemplate/types";
import { useSetMarketplaceConfiguration } from "../hooks/useSetMarketplaceConfiguration";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { WalletConnectRejectedRequest } from "../types";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { marketplaceId } = router.query;
  console.log(
    marketplaceId,
    parseInt(marketplaceId as string),
    marketplaceId as string
  );
  const { account, client } = useWalletConnectClient();
  const isConnectingBlockchain = useSelector(
    (state: RootState) => state.blockchain.isConnecting
  );
  const {
    setMarketplaceConfiguration,
    marketplaceTxLoadingState,
    configureMarketplaceLoadingState,
    marketplaceTxError,
    isMarketplaceTxSuccess,
    ipfsError,
    txId,
  } = useSetMarketplaceConfiguration();

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
    setIsSucessModalVisible(isMarketplaceTxSuccess);
  }, [isMarketplaceTxSuccess]);

  useEffect(() => {
    setIsIpfsErrorModalVisible(Boolean(ipfsError));
  }, [ipfsError]);

  useEffect(() => {
    setIsTxErrorModalVisible(Boolean(marketplaceTxError));
  }, [marketplaceTxError]);

  const parseConfigureMarketplaceTxError = () => {
    if (marketplaceTxError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to create the Marketplace";
    }
  };

  const onSubmit = async ({ result, formData }: onSubmitParams) => {
    await setMarketplaceConfiguration(result);
    formData.reset();
  };

  return (
    <BaseTemplate>
      <IconModal
        title="Marketplace configuration is processing..."
        iconComponent={<LoaderEllipsis />}
        body="It should by confirmed on the blockchain shortly..."
        isOpened={configureMarketplaceLoadingState === "loading"}
      />
      <TxModal
        isOpened={marketplaceTxLoadingState === "loading"}
        txId={txId || "Loading..."}
        body={
          "A Marketplace configuration proposal has been sent to your Ternoa Wallet App"
        }
        title="Configure Marketplace request sent!"
      />
      <IconModal
        iconName="CheckCircle"
        title="Configuration complete!"
        body="You have configured your Marketplace with success!"
        isOpened={isSucessModalVisible}
        onClose={() => setIsSucessModalVisible(false)}
      />
      <IconModal
        iconName="Warning"
        isOpened={isTxErrorModalVisible}
        onClose={() => setIsTxErrorModalVisible(false)}
        title={parseConfigureMarketplaceTxError()}
      />
      <IconModal
        iconName="Warning"
        isOpened={isIpfsErrorModalVisible}
        onClose={() => setIsIpfsErrorModalVisible(false)}
        title="There was an error trying to set marketplace's configuration"
      />
      {router.isReady && (
        <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
          <SetMarketplaceConfigurationTemplate
            onSubmit={onSubmit}
            disabled={isConnectingBlockchain}
            defaultMarketplaceId={parseInt(marketplaceId as string)}
          />
        </div>
      )}
    </BaseTemplate>
  );
};

export default CreateNft;
