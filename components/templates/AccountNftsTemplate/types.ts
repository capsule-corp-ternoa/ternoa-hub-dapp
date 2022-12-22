import { Filter } from "../../../store/slices/nfts/types";
import { INftCard } from "../../molecules/NftCard/types";

export interface IAccountNftsTemplate {
  nfts: INftCard[];
  isLoaderVisible?: boolean;
  onEndReached: () => void;
  filters?: Filter[];
  selectedFilter?: Filter;
  onSelectFilter?: (filter: Filter) => void;
  onClickCreateNft?: () => void;
  hideFilters?: boolean;
  selectedIds?: string[];
  onChangeSelectedIds?: (selectedIds: string[]) => void;
}
