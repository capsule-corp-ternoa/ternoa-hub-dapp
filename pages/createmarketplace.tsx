import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import IconModal from "../components/molecules/IconModal";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import CreateMarketplaceTemplate from "../components/templates/CreateMarketplaceTemplate";
import { onSubmitParams } from "../components/templates/CreateMarketplaceTemplate/types";
import { useCreateMarketplace } from "../hooks/useCreateMarketplace";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { RootState } from "../store";
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
  const { createMarketplace, error, isSuccess } = useCreateMarketplace();
  const [marketplaceId, setMarketplaceId] = useState<number>();
  const [kind, setKind] = useState<MarketplaceKind>();
  const [marketplaceMintFee, setMarketplaceMintFee] = useState<string>();
  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

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
    setIsSucessModalVisible(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(error));
  }, [error]);

  const onSubmit = async ({ result }: onSubmitParams) => {
    setKind(
      result.isPrivate ? MarketplaceKind.Private : MarketplaceKind.Public
    );
    const createdEvent = await createMarketplace(result);
    if (createdEvent) {
      setMarketplaceId(createdEvent.marketplaceId);
    }
  };

  return (
    <React.Fragment>
      <NextSeo
        title="Create Marketplace"
        description={CREATE_MARKETPLACE.description}
      />
      <BaseTemplate>
        {marketplaceId && (
          <IconModal
            iconName="CheckCircle"
            isOpened={isSucessModalVisible}
            onClose={() => setIsSucessModalVisible(false)}
            title="Creation complete!"
            body="You have create a marketplace with success! Now you can set-up it!"
            buttonText="Set-up my Marketplace"
            onClickButton={() => {
              setIsSucessModalVisible(false);
              router.push({
                pathname: "/configuremarketplace",
                query: { marketplaceId, isRecentlyCreated: true, kind },
              });
            }}
          />
        )}
        <IconModal
          iconName="Warning"
          isOpened={isErrorModalVisible}
          onClose={() => setIsErrorModalVisible(false)}
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
