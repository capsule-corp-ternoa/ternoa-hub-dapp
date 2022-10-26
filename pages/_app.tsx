import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "../styles/globals.css";
import "../components/atoms/Switch/styles.css";
import "../components/atoms/LoaderEllipsis/styles.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { WalletConnectClientContextProvider } from "../contexts/WalletConnectClientContext";
import { AppDispatch, persistor, store } from "../store";
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
      <PersistGate loading={null} persistor={persistor}>
        <WalletConnectClientContextProvider>
          <Initialize />
          <Component {...pageProps} />
        </WalletConnectClientContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
