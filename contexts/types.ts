import { PairingTypes, SessionTypes } from "@walletconnect/types";
import Client from "@walletconnect/sign-client";

export interface IContext {
  client: Client | undefined;
  session: SessionTypes.Struct | undefined;
  pairings: PairingTypes.Struct[];
  connect: (pairing?: { topic: string }) => Promise<void>;
  disconnect: () => Promise<void>;
  isInitializing: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  account?: string;
}
