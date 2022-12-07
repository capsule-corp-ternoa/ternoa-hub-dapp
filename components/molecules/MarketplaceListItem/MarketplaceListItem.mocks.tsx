import { IMarketplaceListItem } from "./types";

const base: IMarketplaceListItem = {
  isLoading: false,
  name: "MarketplaceName",
  onClickManage: () => {},
  onClickPreview: () => {},
};

export const mockMarketplaceListItemProps = {
  base,
};
