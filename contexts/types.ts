import { PairingTypes, SessionTypes } from "@walletconnect/types";
import Client from "@walletconnect/sign-client";

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
  request: (hash: string) => Promise<string>;
}
