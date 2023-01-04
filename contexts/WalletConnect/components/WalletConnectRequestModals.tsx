import React, { useEffect, useState } from "react";
import IconModal from "../../../components/molecules/IconModal";
import TxModal from "../../../components/organisms/modals/TxModal";
import { useWalletConnectClient } from "../../../hooks/useWalletConnectClient";
import { TxType, WalletConnectRejectedRequest } from "../../../types";

const WalletConnectRequestModals: React.FC = () => {
  const { requestLoadingState, requestError, requestTxType, requestHash } =
    useWalletConnectClient();
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(requestError));
  }, [requestError]);

  const parseTxType = (): { body: string; title: string } => {
    switch (requestTxType) {
      case TxType.CreateNFT:
        return {
          body: "An NFT minting proposal has been sent to your Ternoa Wallet App",
          title: "Minting request sent!",
        };
      case TxType.CreateCollection:
        return {
          body: "A collection creation proposal has been sent to your Ternoa Wallet App",
          title: "Create collection request sent!",
        };
      case TxType.CreateMarketplace:
        return {
          body: "A Marketplace creation proposal has been sent to your Ternoa Wallet App",
          title: "Create Marketplace request sent!",
        };
      case TxType.SetMarketplaceConfiguration:
        return {
          body: "A Marketplace configuration proposal has been sent to your Ternoa Wallet App",
          title: "Configure Marketplace request sent!",
        };
      case TxType.ListNft:
        return {
          body: "An NFT listing proposal has been sent to your Ternoa Wallet App",
          title: "List NFT request sent!",
        };
      default:
        return {
          body: "A proposal has been sent to your Ternoa Wallet App",
          title: "Request proposal sent!",
        };
    }
  };

  const parseError = () => {
    if (requestError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to submit the request on Wallet Connect";
    }
  };

  const txModalContent = parseTxType();

  return (
    <React.Fragment>
      <TxModal
        isOpened={requestLoadingState === "loading"}
        txId={requestHash || "Loading..."}
        body={txModalContent.body}
        title={txModalContent.title}
      />
      <IconModal
        iconName="Warning"
        isOpened={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        title={parseError()}
      />
    </React.Fragment>
  );
};

export default WalletConnectRequestModals;
