import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import NftLoader from "../components/atoms/NftLoader";
import IconModal from "../components/molecules/IconModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import SetMarketplaceConfigurationTemplate from "../components/templates/SetMarketplaceConfigurationTemplate";
import { onSubmitParams } from "../components/templates/SetMarketplaceConfigurationTemplate/types";
import { useSetMarketplaceConfiguration } from "../hooks/useSetMarketplaceConfiguration";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { fetchFromIpfs } from "../services/ipfs";
import { RootState } from "../store";
import { marketplaceApi } from "../store/slices/marketplaces";
import { jsonDataSelector } from "../store/slices/marketplacesData";
import { LoadingState } from "../types";

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
  const { setMarketplaceConfiguration, isSuccess, error } =
    useSetMarketplaceConfiguration();
  const [trigger, indexerMarketplaceData] =
    marketplaceApi.useLazyGetMarketplaceByIdQuery();
  const marketplaceData =
    indexerMarketplaceData.data &&
    marketplacesData[indexerMarketplaceData.data?.marketplace.id];

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
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
    setIsSucessModalVisible(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(error));
  }, [error]);

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

  const onSubmit = async ({ result }: onSubmitParams) => {
    await setMarketplaceConfiguration(
      result,
      indexerMarketplaceData?.data?.marketplace.updatedAt
    );
  };

  return (
    <React.Fragment>
      <NextSeo title="Configure Marketplace" />
      <BaseTemplate>
        <IconModal
          iconName="CheckCircle"
          title="Configuration complete!"
          body="You have configured your Marketplace with success!"
          isOpened={isSucessModalVisible}
          onClose={() => setIsSucessModalVisible(false)}
        />
        <IconModal
          iconName="Warning"
          isOpened={isErrorModalVisible}
          onClose={() => setIsErrorModalVisible(false)}
          title="There was an error trying to set marketplace's configuration"
        />
        {indexerMarketplaceData.isFetching ||
        marketplaceData?.state.isLoading ? (
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
    </React.Fragment>
  );
};

export default ConfigureMarketplace;
