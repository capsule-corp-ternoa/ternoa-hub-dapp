import { useState } from "react";
import { useSelector } from "react-redux";
import { INftCard } from "../components/molecules/NftCard/types";
import { RootState } from "../store";
import { nftApi } from "../store/slices/nfts";
import { Nft } from "../store/slices/nfts/types";
import { jsonDataSelector } from "../store/slices/nftsData";
import { parseNft } from "../utils/nft";
import { useWalletConnectClient } from "./useWalletConnectClient";

export const useNftDetail = () => {
  const { account } = useWalletConnectClient();
  const [trigger, indexerNfts] = nftApi.useLazyGetNftsByAddressQuery();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const nftData = useSelector(jsonDataSelector);
  const [results, setResults] = useState<Nft[]>([]);
  
  
  const nftDetailData: INftCard[] = results.map((nft) =>
    parseNft(nft, nftData)
  );

  const isLoaderVisible =
    !indexerNfts.isError &&
    (indexerNfts.data?.hasNextPage || indexerNfts.isFetching);

  
  return {
    indexerNfts,
    nftData,
    isLoaderVisible,
  };
};
