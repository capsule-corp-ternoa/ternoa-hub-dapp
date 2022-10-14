import { ControlledMenuProps } from "@szhsin/react-menu";

export interface INavbarMenu extends ControlledMenuProps {
  pubKey: string;
  onClickAddress?: () => void;
  onClickMyNfts: () => void;
  onClickLogout: () => void;
}
