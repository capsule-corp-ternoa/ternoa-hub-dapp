import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { initializeApi } from "ternoa-js";
import * as yup from "../../../utils/yup";
import Navbar from "../../organisms/Navbar";
import { useWalletConnectClient } from "../../../hooks/useWalletConnectClient";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { getBalances } from "../../../store/slices/blockchain";
import Footer from "../../organisms/Footer";

export interface IBaseTemplate {
  children: React.ReactNode | React.ReactNode[];
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ children }) => {
  const {
    connect,
    isInitializing,
    isConnected,
    isConnecting,
    account,
    disconnect,
    isDisconnecting,
  } = useWalletConnectClient();
  const { balances, isLoadingBalances } = useSelector(
    (state: RootState) => state.blockchain
  );
  const [isConnectedToBlockchain, setIsConnectedToBlockchain] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isConnectedToBlockchain && account) {
      dispatch(getBalances(account));
    }
  }, [isConnectedToBlockchain, account, dispatch]);

  useEffect(() => {
    yup.init();
    initializeApi().then(() => setIsConnectedToBlockchain(true));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>TernoArt</title>
        <meta name="description" content="TernoArt dApp" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className="bg-gray-100">
        <Navbar
          caps={balances?.free.replace("CAPS", "")}
          isLoadingCaps={isLoadingBalances}
          avatarTheme="polkadot"
          isConnected={isConnected}
          onClickConnect={connect}
          isLoading={isConnecting || isInitializing}
          onClickDisconnect={disconnect}
          isDisconnecting={isDisconnecting}
        />
        {children}
        <Footer />
      </main>
    </React.Fragment>
  );
};

export default BaseTemplate;
