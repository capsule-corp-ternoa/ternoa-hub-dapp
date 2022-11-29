import { IMarketplaceListItem } from "./types";

const base: IMarketplaceListItem = {
  isLoading: false,
  name: "MarketplaceName",
  onClickManage: () => {},
};

export const mockMarketplaceListItemProps = {
  base,
};
