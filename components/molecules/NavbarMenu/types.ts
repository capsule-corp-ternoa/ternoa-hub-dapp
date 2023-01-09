import { ControlledMenuProps } from "@szhsin/react-menu";

export interface INavbarMenu extends ControlledMenuProps {
  pubKey: string;
  onClickAddress?: () => void;
  onClickMyNfts: () => void;
  onClickMyMarketplaces?: () => void;
  onClickLogout: () => void;
}
