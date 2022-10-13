import { ALPHANET_NETWORK } from "../../../constants/network";
import { INavbar } from "./types";

const base: INavbar = {
  pubKey: "5HmxCDKUzwuNutMdeaNfNtAP5223NhHR8FsCZAT7kmrNb5cz",
  onClickConnect: () => {},
  onClickAddress: () => {},
  onClickMyNfts: () => {},
  onClickLogout: () => {},
  isConnected: true,
  currentNetwork: ALPHANET_NETWORK,
  onSelectNetwork: () => {},
  isLoadingNetwork: false
};

export const mockNavbarProps = {
  base,
};
