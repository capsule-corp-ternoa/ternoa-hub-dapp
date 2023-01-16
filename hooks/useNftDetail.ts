import { useState } from "react";
import { fetchFromIpfs } from "../services/ipfs";
import { CollectionJsonData, LoadingState, NftJsonData } from "../types";

export const useNftDetail = () => {
  const [isLoading, setIsLoading] = useState<LoadingState>("idle");
  const [nftData, setNftData] = useState<NftJsonData>();
  const [collectionData, setCollectionData] =useState<CollectionJsonData>();

  const fetchNftData = async (offchainData: string) => {
    setIsLoading("loading");
    const nftOffchainData = await fetchFromIpfs<NftJsonData>(
      offchainData
    );
    setNftData(nftOffchainData);
    setIsLoading("finished");
  };

  const fetchCollectionData = async (offchainData: string) => {
    setIsLoading("loading");
    const CollectionOffchainData = await fetchFromIpfs<CollectionJsonData>(
      offchainData
    );
    setCollectionData(CollectionOffchainData);
    setIsLoading("finished");
  };

  return {
    fetchNftData,
    isLoading,
    nftData,
    fetchCollectionData,
    collectionData
  };
};
