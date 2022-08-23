import { useContext } from "react";
import { WalletConnectClientContext } from "../contexts/WalletConnectClientContext";

export function useWalletConnectClient() {
    const context = useContext(WalletConnectClientContext);
    if (context === undefined) {
      throw new Error(
        "useWalletConnectClient must be used within a WalletConnectClientContext"
      );
    }
    return context;
  }