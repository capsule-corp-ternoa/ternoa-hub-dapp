import { Network } from "../../../types";

export interface INetworkSelectorButton {
  currentNetworkName: string;
  onClick: () => void;
  isLoading: boolean;
  className?: string;
  isOpened?: boolean;
}
