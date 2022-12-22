import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import GridWrapper from "../../../components/atoms/GridWrapper";
import AccountNftsTemplate from "../../../components/templates/AccountNftsTemplate";
import BaseTemplate from "../../../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../../../hooks/useWalletConnectClient";
import { useShowMyNfts } from "../../../hooks/useShowMyNfts";
import { Filter } from "../../../store/slices/nfts/types";
import FloatingAction from "../../../components/molecules/FloatingAction";
import { marketplaceApi } from "../../../store/slices/marketplaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { jsonDataSelector } from "../../../store/slices/marketplacesData";
import TxModal from "../../../components/organisms/modals/TxModal";
import { ListNftsParams, useListNfts } from "../../../hooks/useListNfts";
import IconModal from "../../../components/molecules/IconModal";
import SetNftPriceModal from "../../../components/organisms/modals/SetNftPriceModal";
import { onSubmitParams } from "../../../components/organisms/modals/SetNftPriceModal/types";
import { WalletConnectRejectedRequest } from "../../../types";

const Import: NextPage = () => {
  const router = useRouter();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );
  const { account, client } = useWalletConnectClient();
  const {
    nftListData,
    selectedFilter,
    setSelectedFilter,
    isLoaderVisible,
    onEndReached,
  } = useShowMyNfts(Filter["Not Listed"]);
  const parsedMarketplaceId = parseInt(router.query.id as string);
  const marketplacesData = useSelector(jsonDataSelector);
  const marketplaceData = marketplacesData[parsedMarketplaceId];
  const [trigger] = marketplaceApi.useLazyGetMarketplaceByIdQuery();
  const { isConnected } = useSelector((state: RootState) => state.blockchain);
  const {
    listNfts,
    listNftsLoadingState,
    listNftError,
    txId,
    isListNftTxSuccess,
  } = useListNfts();

  const [isSetPriceModalVisible, setIsSetPriceModalVisible] =
    useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady && parsedMarketplaceId && isConnected) {
      trigger({ id: parsedMarketplaceId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, trigger, parsedMarketplaceId, isConnected]);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(listNftError));
  }, [listNftError]);

  const parseListNftError = () => {
    if (listNftError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to list the NFT";
    }
  };

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  const onClickList = () => {
    if (selectedIds.length === 1) {
      setIsSetPriceModalVisible(true);
    } else {
      const nftsListData: ListNftsParams = selectedIds.map((nftId) => ({
        nftId: nftId,
        marketplaceId: router.query.id as string,
        price: undefined,
      }));
      listNfts(nftsListData);
    }
  };

  const onSetPrice = ({ result, formData }: onSubmitParams) => {
    setIsSetPriceModalVisible(false);
    formData.reset();
    const nftsListData: ListNftsParams = [
      {
        nftId: selectedIds[0],
        marketplaceId: router.query.id as string,
        price: result.price,
      },
    ];
    listNfts(nftsListData);
  };

  return (
    <React.Fragment>
      <NextSeo title="Import NFTs to Marketplace" />
      <BaseTemplate>
        <TxModal
          isOpened={listNftsLoadingState === "loading"}
          txId={txId || "Loading..."}
          body={
            "An NFT listing proposal has been sent to your Ternoa Wallet App"
          }
          title="List NFT request sent!"
        />
        <IconModal
          iconName="CheckCircle"
          title="Listing NFT complete!"
          body="You have listed your NFT with success! It should be ready in a few seconds"
          isOpened={isListNftTxSuccess}
          buttonText={"View Marketplace"}
          onClickButton={() => {
            router.push({
              pathname: `/marketplace/${parsedMarketplaceId}`,
              query: { network: currentNetwork.name.toLocaleLowerCase() },
            });
          }}
        />
        <IconModal
          iconName="Warning"
          isOpened={isErrorModalVisible}
          onClose={() => setIsErrorModalVisible(false)}
          title={parseListNftError()}
        />
        <SetNftPriceModal
          onSubmit={onSetPrice}
          isOpened={isSetPriceModalVisible}
          onClose={() => setIsSetPriceModalVisible(false)}
        />
        {!!selectedIds.length &&
          !isSetPriceModalVisible &&
          listNftsLoadingState !== "loading" &&
          !isListNftTxSuccess && (
            <FloatingAction
              text={`${selectedIds.length} NFT${
                selectedIds.length > 1 ? "s" : ""
              } selected -`}
              buttonText={`Move to ${marketplaceData.jsonData?.name}`}
              onClickAction={onClickList}
              className="fixed bottom-[5%] left-[50%] translate-x-[-50%] z-10"
            />
          )}
        <div className="flex justify-center bg-gray-100 py-s40 flex flex-1">
          <GridWrapper>
            {account && (
              <AccountNftsTemplate
                nfts={nftListData}
                isLoaderVisible={isLoaderVisible}
                onEndReached={onEndReached}
                filters={[Filter["Not Listed"]]}
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
                onClickCreateNft={() => router.push("/createnft")}
                selectedIds={selectedIds}
                onChangeSelectedIds={setSelectedIds}
              />
            )}
          </GridWrapper>
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default Import;
