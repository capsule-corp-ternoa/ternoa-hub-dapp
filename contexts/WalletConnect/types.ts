import { PairingTypes, SessionTypes } from "@walletconnect/types";
import Client from "@walletconnect/sign-client";
import { LoadingState, TxType } from "../../types";

export interface IContext {
  client: Client | undefined;
  session: SessionTypes.Struct | undefined;
  pairings: PairingTypes.Struct[];
  connect: (pairing?: { topic: string }) => Promise<SessionTypes.Struct | null>;
  disconnect: () => Promise<void>;
  isInitializing: boolean;
  isConnecting: boolean;
  isDisconnecting: boolean;
  isConnected: boolean;
  isCreatingUri: boolean;
  account?: string;
  request: (hash: string, txType: TxType) => Promise<string | undefined>;
  requestTxType?: TxType;
  requestLoadingState: LoadingState;
  requestError?: Error;
  requestHash?: string;
}
