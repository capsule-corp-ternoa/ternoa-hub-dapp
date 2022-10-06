import { isValidUrl } from "@walletconnect/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GridWrapper from "../components/atoms/GridWrapper";
import { INftCard } from "../components/molecules/NftCard/types";
import AccountNftsTemplate from "../components/templates/AccountNftsTemplate";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { nftApi } from "../store/slices/nfts";
import { Filter, Nft } from "../store/slices/nfts/types";
import { jsonDataSelector } from "../store/slices/nftsData";

const Account: NextPage = () => {
  const router = useRouter();
  const { account } = useWalletConnectClient();
  const [trigger, indexerNfts] = nftApi.useLazyGetNftsByAdressQuery();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const nftsData = useSelector(jsonDataSelector);
  const [results, setResults] = useState<Nft[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.Created);
  const RESULTS_PER_PAGE = 12;

  const fetchPage = (page: number) => {
    if (account) {
      setCurrentPage(page);
      trigger(
        {
          address: account,
          pagination: {
            first: RESULTS_PER_PAGE,
            offset: page * RESULTS_PER_PAGE,
          },
          filter: selectedFilter,
        },
        true
      );
    }
  };

  useEffect(() => {
    setResults([]);
    fetchPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, account, currentNetwork]);

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account, router]);

  useEffect(() => {
    const data = indexerNfts.data?.nfts;
    if (data) {
      setResults((r) => r.concat(data));
    }
  }, [indexerNfts.data?.nfts]);

  const parseImage = (urlOrHash: string) => {
    if (isValidUrl(urlOrHash)) {
      return urlOrHash;
    } else {
      return `${process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL}/ipfs/${urlOrHash}`;
    }
  };

  const parseNft = (nft: Nft): INftCard => {
    const nftData = nftsData[nft.id];
    if (nftData && !nftData.state.error) {
      return {
        preview: {
          src: nftData.jsonData?.image && parseImage(nftData.jsonData.image),
          alt: nftData.jsonData?.title,
        },
        isLoading: nftData.state.isLoading,
        name: nftData.jsonData?.title,
        creator: nft.creator,
      };
    } else {
      return {
        creator: nft.creator,
      };
    }
  };

  const nftListData: INftCard[] = results.map(parseNft);

  return (
    <BaseTemplate>
      <div className="flex justify-center bg-gray-100 py-s40 flex flex-1">
        <GridWrapper>
          {account && (
            <AccountNftsTemplate
              nfts={nftListData}
              isLoaderVisible={
                indexerNfts.data?.hasNextPage || indexerNfts.isFetching
              }
              onEndReached={() => {
                indexerNfts.data?.hasNextPage &&
                  !indexerNfts.isFetching &&
                  fetchPage(currentPage + 1);
              }}
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onClickCreateNft={() => router.push("/createnft")}
            />
          )}
        </GridWrapper>
      </div>
    </BaseTemplate>
  );
};

export default Account;