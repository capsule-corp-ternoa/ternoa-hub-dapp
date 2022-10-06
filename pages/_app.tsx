import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "../styles/globals.css";
import "../components/atoms/Switch/styles.css";
import "../components/atoms/LoaderEllipsis/styles.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { WalletConnectClientContextProvider } from "../contexts/WalletConnectClientContext";
import { AppDispatch, store } from "../store";
import { useRef, useEffect } from "react";
import * as yup from "../utils/yup";
import { connect } from "../store/slices/blockchain/blockchain";

const Initialize = () => {
  const initialized = useRef<boolean>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      yup.init();
      dispatch(connect());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WalletConnectClientContextProvider>
        <Initialize />
        <Component {...pageProps} />
      </WalletConnectClientContextProvider>
    </Provider>
  );
}

export default MyApp;
