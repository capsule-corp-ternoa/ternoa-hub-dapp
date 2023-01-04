import { IMarketplaceListItem } from "./types";

const base: IMarketplaceListItem = {
  isLoading: false,
  name: "MarketplaceName",
  marketplaceId:"1234",
  onClickManage: () => {},
  onClickPreview: () => {},
};

export const mockMarketplaceListItemProps = {
  base,
};
