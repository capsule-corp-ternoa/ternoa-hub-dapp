import React, { useEffect } from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import GridWrapper from "../components/atoms/GridWrapper";
import { IMarketplaceListItem } from "../components/molecules/MarketplaceListItem/types";
import AccountMarketplacesTemplate from "../components/templates/AccountMarketplacesTemplate";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { marketplaceApi } from "../store/slices/marketplaces";
import { jsonDataSelector } from "../store/slices/marketplacesData";
import { parseOffchainDataImage } from "../utils/strings";

const MyMarketplaces: NextPage = () => {
  const router = useRouter();
  const [trigger, marketplaces] =
    marketplaceApi.useLazyGetMarketplacesByOwnerQuery();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const marketplacesData = useSelector(jsonDataSelector);
  const outdated = useSelector(
    (state: RootState) => state.outdated.marketplaces
  );
  const { account } = useWalletConnectClient();

  useEffect(() => {
    if (account) {
      trigger({ owner: account });
    }
  }, [account, trigger]);

  const parseMarketplacesListItems = (): IMarketplaceListItem[] | undefined => {
    if (marketplaces.data && marketplacesData) {
      return marketplaces.data.marketplaces.map((indexerMarketplaceData) => {
        const marketplaceData = marketplacesData[indexerMarketplaceData.id];
        if (marketplaceData) {
          return {
            isLoading: marketplaceData.state.isLoading,
            name: marketplaceData.jsonData?.name,
            marketplaceId: indexerMarketplaceData.id,
            onClickManage: () =>
              router.push({
                pathname: "/configuremarketplace",
                query: { marketplaceId: indexerMarketplaceData.id },
              }),
            onClickPreview: () => {
              const url = `/marketplace/${indexerMarketplaceData.id}/?network=/${currentNetwork.name.toLocaleLowerCase()}`
              window.open(url, '_blank')
            },
            preview: {
              src:
                marketplaceData.jsonData?.logo &&
                parseOffchainDataImage(marketplaceData.jsonData.logo),
              alt: marketplaceData.jsonData?.name,
            },
          };
        } else {
          const hasBeenConfigured = Object.keys(outdated).includes(
            indexerMarketplaceData.id
          );
          if (hasBeenConfigured) {
            return {
              isLoading: false,
              onClickManage: () =>
                router.push({
                  pathname: "/configuremarketplace",
                  query: { marketplaceId: indexerMarketplaceData.id },
                }),
              onClickPreview: () => {
                const url = `/marketplace/${indexerMarketplaceData.id}`
                window.open(url, '_blank')
              },
              name: "Not indexed yet",
            };
          } else {
            return {
              isLoading: false,
              name: "Not configured yet",
              onClickManage: () => {
                router.push({
                  pathname: "/configuremarketplace",
                  query: {
                    marketplaceId: indexerMarketplaceData.id,
                    isRecentlyCreated: true,
                    kind: indexerMarketplaceData.kind,
                  },
                });
              },
            };
          }
        }
      });
    }
  };

  return (
    <React.Fragment>
      <NextSeo title="My Marketplaces" />
      <BaseTemplate>
        <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
          <GridWrapper>
            <AccountMarketplacesTemplate
              isLoading={marketplaces.isFetching}
              marketplaces={parseMarketplacesListItems()}
              onClickAddNew={() => router.push("/createmarketplace")}
            />
          </GridWrapper>
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default MyMarketplaces;
