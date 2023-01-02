import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { INftCard } from "../components/molecules/NftCard/types";
import { RootState } from "../store";
import { nftApi } from "../store/slices/nfts";
import { Filter, Nft } from "../store/slices/nfts/types";
import { jsonDataSelector } from "../store/slices/nftsData";
import { parseNft } from "../utils/nft";
import { useWalletConnectClient } from "./useWalletConnectClient";

const RESULTS_PER_PAGE = 12;

export const useShowMyNfts = (defaultFilter: Filter) => {
  const { account } = useWalletConnectClient();
  const [trigger, indexerNfts] = nftApi.useLazyGetNftsByAddressQuery();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const nftsData = useSelector(jsonDataSelector);
  const [results, setResults] = useState<Nft[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(defaultFilter);

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
    const data = indexerNfts.data?.nfts;
    if (data) {
      setResults((r) => r.concat(data));
    }
  }, [indexerNfts.data?.nfts]);

  const nftListData: INftCard[] = results.map((nfts) =>
    parseNft(nfts, nftsData)
  );

  const isLoaderVisible =
    !indexerNfts.isError &&
    (indexerNfts.data?.hasNextPage || indexerNfts.isFetching);

  const onEndReached = () => {
    !indexerNfts.isError &&
      indexerNfts.data?.hasNextPage &&
      !indexerNfts.isFetching &&
      fetchPage(currentPage + 1);
  };

  return {
    results,
    currentPage,
    indexerNfts,
    nftListData,
    selectedFilter,
    setSelectedFilter,
    fetchPage,
    isLoaderVisible,
    onEndReached,
  };
};
