import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletConnectClientContextProvider } from "../contexts/WalletConnectClientContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectClientContextProvider>
      <Component {...pageProps} />
    </WalletConnectClientContextProvider>
  );
}

export default MyApp;
