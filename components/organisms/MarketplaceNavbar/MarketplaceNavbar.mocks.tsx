import { IMarketplaceNavbar } from "./types";

const base: IMarketplaceNavbar = {
  pubKey: "5HmxCDKUzwuNutMdeaNfNtAP5223NhHR8FsCZAT7kmrNb5cz",
  onClickConnect: () => {},
  onClickAddress: () => {},
  isConnected: true,
  isEditVisible: true,
  marketplaceName: "MarketplaceName",
  marketplaceLogo: "",
  onClickEdit: () => {},
};

export const mockMarketplaceNavbarProps = {
  base,
};
