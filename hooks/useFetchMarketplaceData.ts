import { useState } from "react";
import { fetchFromIpfs } from "../services/ipfs";
import { LoadingState, MarketplaceJsonData } from "../types";

export const useMarketplaceData = () => {
  const [isLoading, setIsLoading] = useState<LoadingState>("idle");
  const [marketplaceData, setMarketplaceData] = useState<MarketplaceJsonData>();
  const [logo, setLogo] = useState<File>();

  const fetchMarketplaceData = async (offchainData: string) => {
    setIsLoading("loading");
    const marketplaceOffchainData = await fetchFromIpfs<MarketplaceJsonData>(
      offchainData
    );
    const logo = await fetchFromIpfs<File>(marketplaceOffchainData.logo, {
      responseType: "blob",
    });
    setMarketplaceData(marketplaceOffchainData);
    setLogo(logo);
    setIsLoading("finished");
  };

  return {
    fetchMarketplaceData,
    isLoading,
    marketplaceData,
    logo,
  };
};
