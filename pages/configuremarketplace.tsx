import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import NftLoader from "../components/atoms/NftLoader";
import IconModal from "../components/molecules/IconModal";
import TxModal from "../components/organisms/modals/TxModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import SetMarketplaceConfigurationTemplate from "../components/templates/SetMarketplaceConfigurationTemplate";
import { onSubmitParams } from "../components/templates/SetMarketplaceConfigurationTemplate/types";
import { useSetMarketplaceConfiguration } from "../hooks/useSetMarketplaceConfiguration";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { fetchFromIpfs } from "../services/ipfs";
import { RootState } from "../store";
import { marketplaceApi } from "../store/slices/marketplaces";
import {
  LoadingState,
  MarketplaceJsonData,
  WalletConnectRejectedRequest,
} from "../types";

const ConfigureMarketplace: NextPage = () => {
  const router = useRouter();
  const { marketplaceId, kind, isRecentlyCreated } = router.query;
  const parsedMarketplaceId = parseInt(marketplaceId as string);
  const parsedKind: MarketplaceKind | undefined = kind as MarketplaceKind;
  const parsedIsRecentlyCreated: boolean =
    isRecentlyCreated === "true" ? true : false;
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
  const [trigger, indexerMarketplaceData] =
    marketplaceApi.useLazyGetMarketplaceByIdQuery();

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isIpfsErrorModalVisible, setIsIpfsErrorModalVisible] =
    useState<boolean>(false);
  const [isTxErrorModalVisible, setIsTxErrorModalVisible] =
    useState<boolean>(false);
  const [isFetchingIpfsData, setIsFetchingIpfsData] =
    useState<LoadingState>("idle");
  const [ipfsData, setIpfsData] = useState<MarketplaceJsonData>();
  const [logo, setLogo] = useState<File>();

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    if (router.isReady && parsedMarketplaceId && !parsedIsRecentlyCreated) {
      trigger({ id: parsedMarketplaceId });
    }
  }, [router.isReady, parsedMarketplaceId, trigger, parsedIsRecentlyCreated]);

  useEffect(() => {
    const fetchIpfsData = async () => {
      if (indexerMarketplaceData.data?.marketplace.offchainData) {
        setIsFetchingIpfsData("loading");
        const marketplaceOffchainData =
          await fetchFromIpfs<MarketplaceJsonData>(
            indexerMarketplaceData.data?.marketplace.offchainData
          );
        const logo = await fetchFromIpfs<File>(marketplaceOffchainData.logo, {
          responseType: "blob",
        });
        setIpfsData(marketplaceOffchainData);
        setLogo(logo);
        setIsFetchingIpfsData("finished");
      }
    };
    fetchIpfsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexerMarketplaceData.data?.marketplace.offchainData]);

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

  const onSubmit = async ({ result }: onSubmitParams) => {
    await setMarketplaceConfiguration(
      result,
      indexerMarketplaceData?.data?.marketplace.updatedAt
    );
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
      {(indexerMarketplaceData.isLoading ||
        isFetchingIpfsData === "loading") && (
        <div className="flex flex-1 justify-center items-center">
          <NftLoader text="Loading Marketplace Data" />
        </div>
      )}
      {router.isReady &&
        isFetchingIpfsData !== "loading" &&
        (parsedIsRecentlyCreated ||
          (indexerMarketplaceData.isSuccess &&
            indexerMarketplaceData.data.marketplace)) && (
          <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
            <SetMarketplaceConfigurationTemplate
              onSubmit={onSubmit}
              disabled={isConnectingBlockchain}
              defaultMarketplaceId={parseInt(marketplaceId as string)}
              defaultKind={parsedKind}
              ipfsData={ipfsData}
              logo={logo}
              data={indexerMarketplaceData.data?.marketplace}
            />
          </div>
        )}
    </BaseTemplate>
  );
};

export default ConfigureMarketplace;
