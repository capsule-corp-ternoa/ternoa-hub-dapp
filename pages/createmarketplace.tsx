import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import LoaderEllipsis from "../components/atoms/LoaderEllipsis";
import IconModal from "../components/molecules/IconModal";
import MarketplaceCreationSuccessModal from "../components/organisms/modals/MarketplaceCreationSuccessModal";
import TxModal from "../components/organisms/modals/TxModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import CreateMarketplaceTemplate from "../components/templates/CreateMarketplaceTemplate";
import { onSubmitParams } from "../components/templates/CreateMarketplaceTemplate/types";
import { useCreateMarketplace } from "../hooks/useCreateMarketplace";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
import { WalletConnectRejectedRequest } from "../types";
import { CREATE_MARKETPLACE } from "../constants/features";
import { getMarketplaceMintFee } from "ternoa-js";
import { formatPrice } from "../utils/strings";

const CreateNft: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const {
    isConnecting: isConnectingBlockchain,
    isConnected: isConnectedBlockchain,
  } = useSelector((state: RootState) => state.blockchain);
  const {
    createMarketplace,
    createMarketplaceTxLoadingState,
    createMarketplaceError,
    createMarketplaceLoadingState,
    blockchainError,
    isCreateMarketplaceTxSuccess,
    marketplaceId,
  } = useCreateMarketplace();

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isBlockchainErrorModalVisible, setIsBlockchainErrorModalVisible] =
    useState<boolean>(false);
  const [isTxErrorModalVisible, setIsTxErrorModalVisible] =
    useState<boolean>(false);
  const [kind, setKind] = useState<MarketplaceKind>();
  const [marketplaceMintFee, setMarketplaceMintFee] = useState<string>();

  useEffect(() => {
    const fetchFee = async () => {
      const response = await getMarketplaceMintFee();
      setMarketplaceMintFee(formatPrice(response.toString()));
    };
    if (isConnectedBlockchain) {
      fetchFee();
    }
  }, [isConnectedBlockchain]);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  useEffect(() => {
    setIsSucessModalVisible(isCreateMarketplaceTxSuccess);
  }, [isCreateMarketplaceTxSuccess]);

  useEffect(() => {
    setIsBlockchainErrorModalVisible(Boolean(blockchainError));
  }, [blockchainError]);

  useEffect(() => {
    setIsTxErrorModalVisible(Boolean(createMarketplaceError));
  }, [createMarketplaceError]);

  const parseCreateMarketplaceError = () => {
    if (createMarketplaceError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to create the Marketplace";
    }
  };

  const onSubmit = async ({ result }: onSubmitParams) => {
    setKind(
      result.isPrivate ? MarketplaceKind.Private : MarketplaceKind.Public
    );
    await createMarketplace(result);
  };

  return (
    <React.Fragment>
      <NextSeo
        title="Create Marketplace"
        description={CREATE_MARKETPLACE.description}
      />
      <BaseTemplate>
        <IconModal
          title="Marketplace creation is processing..."
          iconComponent={<LoaderEllipsis />}
          body="it should be confirmed on the blockchain shortly..."
          isOpened={createMarketplaceLoadingState === "loading"}
        />
        <TxModal
          isOpened={createMarketplaceTxLoadingState === "loading"}
          txId={""}
          body={
            "A Marketplace creation proposal has been sent to your Ternoa Wallet App"
          }
          title="Create Marketplace request sent!"
        />
        {marketplaceId && (
          <MarketplaceCreationSuccessModal
            isOpened={isSucessModalVisible}
            onClose={() => setIsSucessModalVisible(false)}
            onClickSetMarketplaceConfiguration={() =>
              router.push({
                pathname: "/configuremarketplace",
                query: { marketplaceId, isRecentlyCreated: true, kind },
              })
            }
          />
        )}
        <IconModal
          iconName="Warning"
          isOpened={isTxErrorModalVisible}
          onClose={() => setIsTxErrorModalVisible(false)}
          title={parseCreateMarketplaceError()}
        />
        <IconModal
          iconName="Warning"
          isOpened={isBlockchainErrorModalVisible}
          onClose={() => setIsBlockchainErrorModalVisible(false)}
          title="There was an error trying to create the Marketplace"
        />
        <div className="flex justify-center bg-gray-100 py-s40 px-s24 flex flex-1">
          <CreateMarketplaceTemplate
            onSubmit={onSubmit}
            disabled={isConnectingBlockchain}
            serviceFee={marketplaceMintFee}
          />
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default CreateNft;
