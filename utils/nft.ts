import { INftCard } from "../components/molecules/NftCard/types";
import { TERNOA_CHAIN_DECIMALS } from "../constants/blockchain";
import { Nft } from "../store/slices/nfts/types";
import { NftsData } from "../store/slices/nftsData/types";
import { parseOffchainDataImage } from "./strings";

export const parseNft = (nft: Nft, nftsData: NftsData): INftCard => {
  const nftData = nftsData[nft.id];
  if (nftData && !nftData.state.error) {
    return {
      id: nft.id,
      preview: {
        src:
          nftData.jsonData?.image &&
          parseOffchainDataImage(nftData.jsonData.image),
        alt: nftData.jsonData?.title,
      },
      isLoading: nftData.state.isLoading,
      name: nftData.jsonData?.title,
      creator: nft.creator,
      price: (parseFloat(nft.price) / Math.pow(10, TERNOA_CHAIN_DECIMALS)).toString(),
    };
  } else {
    return {
      id: nft.id,
      creator: nft.creator,
    };
  }
};
