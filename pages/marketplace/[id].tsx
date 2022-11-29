import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GridWrapper from "../../components/atoms/GridWrapper";
import NftLoader from "../../components/atoms/NftLoader";
import Text from "../../components/atoms/Text";
import { INftCard } from "../../components/molecules/NftCard/types";
import MarketplaceNavbar from "../../components/organisms/MarketplaceNavbar";
import BaseTemplate from "../../components/templates/base/BaseTemplate";
import MarketplaceNftsTemplate from "../../components/templates/MarketplaceNftsTemplate";
import { RootState } from "../../store";
import { marketplaceApi } from "../../store/slices/marketplaces";
import { jsonDataSelector as marketplaceJsonDataSelector } from "../../store/slices/marketplacesData";
import { jsonDataSelector as nftsJsonDataSelector } from "../../store/slices/nftsData";
import { nftApi } from "../../store/slices/nfts";
import { Nft } from "../../store/slices/nfts/types";
import { parseNft } from "../../utils/nft";
import { useWalletConnectClient } from "../../hooks/useWalletConnectClient";

const Marketplace: NextPage = () => {
  const router = useRouter();
  const { account } = useWalletConnectClient();
  const parsedMarketplaceId = parseInt(router.query.id as string);
  const marketplacesData = useSelector(marketplaceJsonDataSelector);
  const { isConnected, isConnecting } = useSelector(
    (state: RootState) => state.blockchain
  );
  const marketplaceData = marketplacesData[parsedMarketplaceId];
  const jsonData = marketplaceData?.jsonData;
  const [trigger, indexerMarketplaceData] =
    marketplaceApi.useLazyGetMarketplaceByIdQuery();

  const nftsData = useSelector(nftsJsonDataSelector);
  const [results, setResults] = useState<Nft[]>([]);
  const [triggerFetchNfts, indexerNfts] =
    nftApi.useLazyGetNftsByMarketplaceQuery();
  const isOwner = indexerMarketplaceData.data?.marketplace.owner === account;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const RESULTS_PER_PAGE = 12;

  useEffect(() => {
    if (router.isReady && parsedMarketplaceId && isConnected) {
      trigger({ id: parsedMarketplaceId });
      fetchPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, trigger, parsedMarketplaceId, isConnected]);

  const fetchPage = (page: number) => {
    setCurrentPage(page);
    triggerFetchNfts({
      marketplaceId: parsedMarketplaceId.toString(),
      pagination: {
        first: RESULTS_PER_PAGE,
        offset: page * RESULTS_PER_PAGE,
      },
    });
  };

  useEffect(() => {
    const data = indexerNfts.data?.nfts;
    if (data) {
      setResults((r) => r.concat(data));
    }
  }, [indexerNfts.data?.nfts]);

  const nftListData: INftCard[] = results.map((nfts) =>
    parseNft(nfts, nftsData)
  );

  if (indexerMarketplaceData.isError) {
    return (
      <BaseTemplate renderCustomNavbar={() => null}>
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <Text
            text="There was an error trying to fetch the marketplace"
            type="h3"
            weight="medium"
          />
        </div>
      </BaseTemplate>
    );
  }

  if (
    marketplaceData?.state.isLoading ||
    indexerNfts.isFetching ||
    isConnecting ||
    !jsonData
  ) {
    return (
      <BaseTemplate renderCustomNavbar={() => null}>
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <NftLoader text="Loading Marketplace" />
        </div>
      </BaseTemplate>
    );
  }

  if (router.isReady && jsonData) {
    return (
      <BaseTemplate
        renderCustomNavbar={(props) => {
          return (
            <MarketplaceNavbar
              {...props}
              marketplaceName={jsonData.name}
              marketplaceLogo={jsonData.logo}
              mainColor={jsonData.mainColor}
              isEditVisible={isOwner}
              onClickEdit={() =>
                router.push({
                  pathname: "/configuremarketplace",
                  query: { marketplaceId: parsedMarketplaceId },
                })
              }
            />
          );
        }}
      >
        <div className="flex justify-center bg-gray-100 py-s40 flex flex-1">
          <GridWrapper>
            <MarketplaceNftsTemplate
              nfts={nftListData}
              isLoaderVisible={
                indexerNfts.data?.hasNextPage || indexerNfts.isFetching
              }
              onEndReached={() => {
                indexerNfts.data?.hasNextPage &&
                  !indexerNfts.isFetching &&
                  fetchPage(currentPage + 1);
              }}
              onClickCreateNft={() => router.push("/createnft")}
              isCreateNftVisible={isOwner}
              mainColor={jsonData.mainColor}
            />
          </GridWrapper>
        </div>
      </BaseTemplate>
    );
  }
  return null;
};

export default Marketplace;
