import { ALPHANET_NETWORK, MAINNET_NETWORK } from "../../../constants/network";
import { INetworkSelectorMenu } from "./types";

const base: INetworkSelectorMenu = {
  networks: [ALPHANET_NETWORK, MAINNET_NETWORK],
  onSelectNetork: () => {},
};

export const mockNetworkSelectorMenuProps = {
  base,
};
