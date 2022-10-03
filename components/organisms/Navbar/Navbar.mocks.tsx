import { INavbar } from "./types";

const base: INavbar = {
  caps: "37276",
  pubKey: "5HmxCDKUzwuNutMdeaNfNtAP5223NhHR8FsCZAT7kmrNb5cz",
  avatarTheme: "polkadot",
  onClickConnect: () => {},
  onClickAddress: () => {},
  onClickMyNfts: () => {},
  onClickLogout: () => {},
  isConnected: true,
};

export const mockNavbarProps = {
  base,
};
