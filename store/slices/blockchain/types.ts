import { Network } from "../../../types";

export type BlockchainState = {
  isConnecting: boolean;
  address?: string;
  isConnected: boolean;
  currentNetwork: Network;
};
