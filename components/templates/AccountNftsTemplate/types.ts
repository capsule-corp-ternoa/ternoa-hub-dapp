import { Filter } from "../../../store/slices/nfts/types";
import { INftCard } from "../../molecules/NftCard/types";

export interface IAccountNftsTemplate {
  nfts: INftCard[];
  isLoaderVisible?: boolean;
  onEndReached: () => void;
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
  onClickCreateNft: () => void;
}
