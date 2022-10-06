import { INetworkSelectorButton } from "./types";

const base: INetworkSelectorButton = {
  onClick: () => {},
  currentNetworkName: "Alphanet",
  isLoading: false,
};

export const mockNetworkSelectorButtonProps = {
  base,
};
