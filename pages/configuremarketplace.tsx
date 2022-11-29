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
import { jsonDataSelector } from "../store/slices/marketplacesData";
import { LoadingState, WalletConnectRejectedRequest } from "../types";

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
  const marketplacesData = useSelector(jsonDataSelector);
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
  const marketplaceData =
    indexerMarketplaceData.data &&
    marketplacesData[indexerMarketplaceData.data?.marketplace.id];

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isIpfsErrorModalVisible, setIsIpfsErrorModalVisible] =
    useState<boolean>(false);
  const [isTxErrorModalVisible, setIsTxErrorModalVisible] =
    useState<boolean>(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState<LoadingState>("idle");
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
    const fetchLogo = async () => {
      const marketplaceId = indexerMarketplaceData.data?.marketplace.id;
      if (marketplaceId) {
        setIsLoadingLogo("loading");
        const logoUrl = marketplacesData[marketplaceId]?.jsonData?.logo;
        if (logoUrl) {
          const logo = await fetchFromIpfs<File>(logoUrl, {
            responseType: "blob",
          });
          setLogo(logo);
          setIsLoadingLogo("finished");
        }
      }
    };
    fetchLogo();
  }, [marketplacesData, indexerMarketplaceData.data?.marketplace.id]);

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
      {indexerMarketplaceData.isFetching || marketplaceData?.state.isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <NftLoader text="Loading Marketplace Data" />
        </div>
      ) : (
        router.isReady &&
        (parsedIsRecentlyCreated ||
          (logo &&
            indexerMarketplaceData.data &&
            marketplaceData &&
            !marketplaceData?.state.isLoading &&
            indexerMarketplaceData.isSuccess &&
            indexerMarketplaceData.data.marketplace)) && (
          <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
            <SetMarketplaceConfigurationTemplate
              onSubmit={onSubmit}
              disabled={isConnectingBlockchain}
              defaultMarketplaceId={parseInt(marketplaceId as string)}
              defaultKind={parsedKind}
              ipfsData={marketplaceData?.jsonData}
              logo={logo}
              data={indexerMarketplaceData.data?.marketplace}
            />
          </div>
        )
      )}
    </BaseTemplate>
  );
};

export default ConfigureMarketplace;
