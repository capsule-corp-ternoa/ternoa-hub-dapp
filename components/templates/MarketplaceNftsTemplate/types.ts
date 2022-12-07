import { INftCard } from "../../molecules/NftCard/types";

export interface IMarketplaceNftsTemplate {
  nfts: INftCard[];
  isLoaderVisible?: boolean;
  onEndReached: () => void;
  onClickCreateNft: () => void;
  isCreateNftVisible: boolean;
  mainColor?: string;
}
