import { INftCard } from "../components/molecules/NftCard/types";
import { Nft } from "../store/slices/nfts/types";
import { NftsData } from "../store/slices/nftsData/types";
import { parseOffchainDataImage } from "./strings";

export const parseNft = (nft: Nft, nftsData: NftsData): INftCard => {
  const nftData = nftsData[nft.id];
  if (nftData && !nftData.state.error) {
    return {
      preview: {
        src:
          nftData.jsonData?.image &&
          parseOffchainDataImage(nftData.jsonData.image),
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
