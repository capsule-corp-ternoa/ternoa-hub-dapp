import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "../styles/globals.css";
import "../components/atoms/Switch/styles.css";
import "../components/atoms/LoaderEllipsis/styles.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultSeo } from "next-seo";
import { WalletConnectClientContextProvider } from "../contexts/WalletConnectClientContext";
import { AppDispatch, persistor, store } from "../store";
import React, { useRef, useEffect } from "react";
import * as yup from "../utils/yup";
import { connect } from "../store/slices/blockchain/blockchain";
import { useRouter } from "next/router";
import SEO from "../constants/seo";

const Initialize = () => {
  const initialized = useRef<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      yup.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.isReady) {
      dispatch(connect(router.query.network as string));
    }
  }, [dispatch, router.isReady, router.query.network]);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WalletConnectClientContextProvider>
            <Initialize />
            <Component {...pageProps} />
          </WalletConnectClientContextProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
