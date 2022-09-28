import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../organisms/Navbar";
import { useWalletConnectClient } from "../../../hooks/useWalletConnectClient";
import { RootState, AppDispatch } from "../../../store";
import {
  blockchain,
  getBalances,
} from "../../../store/slices/blockchain/blockchain";
import Footer from "../../organisms/Footer";

export interface IBaseTemplate {
  children: React.ReactNode | React.ReactNode[];
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ children }) => {
  const router = useRouter();
  const {
    connect,
    isInitializing,
    isConnected,
    isConnecting,
    account,
    disconnect,
  } = useWalletConnectClient();
  const { balances, isLoadingBalances } = useSelector(
    (state: RootState) => state.blockchain
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(blockchain.actions.setAddress(account));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const onClickLogout = () => {
    disconnect();
    router.push("/");
  };

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
      <main className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar
          onClickAddress={() => {}}
          onClickMyNfts={() => router.push("/mynfts")}
          onClickLogout={onClickLogout}
          caps={balances?.free.replace("CAPS", "")}
          isLoadingCaps={isLoadingBalances}
          avatarTheme="polkadot"
          isConnected={isConnected}
          onClickConnect={connect}
          isLoading={isConnecting || isInitializing}
          pubKey={account}
        />
        {children}
        <Footer />
      </main>
    </React.Fragment>
  );
};

export default BaseTemplate;
