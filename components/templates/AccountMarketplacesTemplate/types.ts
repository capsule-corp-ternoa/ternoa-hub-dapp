import { IMarketplaceListItem } from "../../molecules/MarketplaceListItem/types";

export interface IAccountMarketplacesTemplate {
  isLoading: boolean;
  marketplaces?: IMarketplaceListItem[];
  onClickAddNew: () => void;
}
