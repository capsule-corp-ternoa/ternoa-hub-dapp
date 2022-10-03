import "../styles/globals.css";
import "../components/atoms/Switch/styles.css";
import "../components/atoms/LoaderEllipsis/styles.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { WalletConnectClientContextProvider } from "../contexts/WalletConnectClientContext";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WalletConnectClientContextProvider>
        <Component {...pageProps} />
      </WalletConnectClientContextProvider>
    </Provider>
  );
}

export default MyApp;
