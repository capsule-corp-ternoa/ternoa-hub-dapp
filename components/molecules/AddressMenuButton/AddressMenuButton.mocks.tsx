import { IAddressMenuButton } from "./types";

const base: IAddressMenuButton = {
  pubKey: "5HmxCDKUzwuNutMdeaNfNtAP5223NhHR8FsCZAT7kmrNb5cz",
  isConnected: true,
  onClickConnect: () => {},
  onClickConnected: () => {},
};

export const mockAddressMenuButtonProps = {
  base,
};
