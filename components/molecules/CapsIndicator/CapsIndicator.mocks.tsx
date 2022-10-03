import { ICapsIndicator } from "./types";

const base: ICapsIndicator = {
  caps: "37276",
  pubKey: "5HmxCDKUzwuNutMdeaNfNtAP5223NhHR8FsCZAT7kmrNb5cz",
  avatarTheme: "polkadot",
  isConnected: true,
  onClickConnect: () => {},
  onClickConnected: () => {},
};

export const mockCapsIndicatorProps = {
  base,
};
