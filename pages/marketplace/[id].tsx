import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import GridWrapper from "../../components/atoms/GridWrapper";
import NftLoader from "../../components/atoms/NftLoader";
import Text from "../../components/atoms/Text";
import { INftCard } from "../../components/molecules/NftCard/types";
import MarketplaceNavbar from "../../components/organisms/MarketplaceNavbar";
import BaseTemplate from "../../components/templates/base/BaseTemplate";
import MarketplaceNftsTemplate from "../../components/templates/MarketplaceNftsTemplate";
import { RootState } from "../../store";
import { marketplaceApi } from "../../store/slices/marketplaces";
import { jsonDataSelector as marketplaceJsonDataSelector } from "../../store/slices/marketplacesData";
import { jsonDataSelector as nftsJsonDataSelector } from "../../store/slices/nftsData";
import { nftApi } from "../../store/slices/nfts";
import { Nft } from "../../store/slices/nfts/types";
import { parseNft } from "../../utils/nft";
import { useWalletConnectClient } from "../../hooks/useWalletConnectClient";
import AddNftToMarketplaceModal from "../../components/organisms/modals/AddNftToMarketplaceModal";
import CreateNftFromMarketplaceModal from "../../components/organisms/modals/CreateNftFromMarketplaceModal";
import { onSubmitParams } from "../../components/templates/CreateNftTemplate/types";
import { onSubmitParams as onSubmitSetPriceParams } from "../../components/organisms/modals/SetNftPriceModal/types";
import { useCreateNft } from "../../hooks/useCreateNft";
import { WalletConnectRejectedRequest } from "../../types";
import IconModal from "../../components/molecules/IconModal";
import LoaderEllipsis from "../../components/atoms/LoaderEllipsis";
import TxModal from "../../components/organisms/modals/TxModal";
import SetNftPriceModal from "../../components/organisms/modals/SetNftPriceModal";
import { ListNftsParams, useListNfts } from "../../hooks/useListNfts";
import { useFetchExchangeRate } from "../../hooks/useFetchExchangeRate";

const Marketplace: NextPage = () => {
  const router = useRouter();
  const { account } = useWalletConnectClient();
  const parsedMarketplaceId = parseInt(router.query.id as string);
  const marketplacesData = useSelector(marketplaceJsonDataSelector);
  const { isConnected, isConnecting } = useSelector(
    (state: RootState) => state.blockchain
  );

  const [isAddNftModalVisible, setIsAddNftModalVisible] =
    useState<boolean>(false);
  const [isCreateNftModalVisible, setIsCreateNftModalVisible] =
    useState<boolean>(false);
  const marketplaceData = marketplacesData[parsedMarketplaceId];
  const jsonData = marketplaceData?.jsonData;
  const [trigger, indexerMarketplaceData] =
    marketplaceApi.useLazyGetMarketplaceByIdQuery();

  const nftsData = useSelector(nftsJsonDataSelector);
  const [results, setResults] = useState<Nft[]>([]);
  const [triggerFetchNfts, indexerNfts] =
    nftApi.useLazyGetNftsByMarketplaceQuery();
  const isOwner =
    !!account && indexerMarketplaceData.data?.marketplace.owner === account;
  const userIsOnList =
    !!account &&
    indexerMarketplaceData.data?.marketplace.accountList?.includes(account);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const RESULTS_PER_PAGE = 12;

  const {
    createNft,
    createNftLoadingState,
    mintNftLoadingState,
    isMintNtfSuccess,
    mintNftError,
    ipfsError,
    txId,
    nftId,
  } = useCreateNft();
  const { listNfts, listNftsLoadingState, listNftError, isListNftTxSuccess } =
    useListNfts();
  const {
    exchangeRate,
    loadingState: fetchExchangeRateLoadingState,
    fetchExchangeRate,
  } = useFetchExchangeRate();

  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const [isIpfsErrorModalVisible, setIsIpfsErrorModalVisible] =
    useState<boolean>(false);
  const [isMintNFTErrorModalVisible, setIsMintNFTErrorModalVisible] =
    useState<boolean>(false);
  const [isSetPriceModalVisible, setIsSetPriceModalVisible] =
    useState<boolean>(false);
  const [isListNftSuccessModalVisible, setIsListNftSuccessModalVisible] =
    useState<boolean>(false);
  const [isListErrorModalVisible, setIsListErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    fetchExchangeRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsSucessModalVisible(isMintNtfSuccess);
    if (isMintNtfSuccess) {
      setIsCreateNftModalVisible(false);
    }
  }, [isMintNtfSuccess]);

  useEffect(() => {
    setIsIpfsErrorModalVisible(Boolean(ipfsError));
  }, [ipfsError]);

  useEffect(() => {
    setIsMintNFTErrorModalVisible(Boolean(mintNftError));
  }, [mintNftError]);

  useEffect(() => {
    setIsListNftSuccessModalVisible(isListNftTxSuccess);
  }, [isListNftTxSuccess]);

  useEffect(() => {
    setIsListErrorModalVisible(Boolean(listNftError));
  }, [listNftError]);

  const parseMintNftError = () => {
    if (mintNftError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to mint the NFT";
    }
  };

  const parseListNftError = () => {
    if (listNftError instanceof WalletConnectRejectedRequest) {
      return "The request has been rejected";
    } else {
      return "There was an error trying to list the NFT";
    }
  };

  useEffect(() => {
    if (router.isReady && parsedMarketplaceId && isConnected) {
      trigger({ id: parsedMarketplaceId });
      fetchPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, trigger, parsedMarketplaceId, isConnected]);

  const fetchPage = (page: number) => {
    setCurrentPage(page);
    triggerFetchNfts({
      marketplaceId: parsedMarketplaceId.toString(),
      pagination: {
        first: RESULTS_PER_PAGE,
        offset: page * RESULTS_PER_PAGE,
      },
    });
  };

  useEffect(() => {
    const data = indexerNfts.data?.nfts;
    if (data) {
      setResults((r) => r.concat(data));
    }
  }, [indexerNfts.data?.nfts]);

  const nftListData: INftCard[] = results.map((nfts) =>
    parseNft(nfts, nftsData)
  );

  const onClickImport = () => {
    setIsAddNftModalVisible(false);
    router.push({
      pathname: "/marketplace/[id]/import",
      query: {
        id: router.query.id,
      },
    });
  };

  const onClickCreate = () => {
    setIsAddNftModalVisible(false);
    setIsCreateNftModalVisible(true);
  };

  const onSubmitCreateNft = async ({ result, formData }: onSubmitParams) => {
    await createNft({
      title: result.name,
      ...result,
    });
    formData.reset();
  };

  const onSetPrice = ({ result, formData }: onSubmitSetPriceParams) => {
    setIsSetPriceModalVisible(false);
    formData.reset();
    if (nftId) {
      const nftsListData: ListNftsParams = [
        {
          nftId: nftId,
          marketplaceId: router.query.id as string,
          price: result.price,
        },
      ];
      listNfts(nftsListData);
    }
  };

  if (indexerMarketplaceData.isError) {
    return (
      <BaseTemplate renderCustomNavbar={() => null}>
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <Text
            text="There was an error trying to fetch the marketplace"
            type="h3"
            weight="medium"
          />
        </div>
      </BaseTemplate>
    );
  }

  if (
    marketplaceData?.state.isLoading ||
    indexerNfts.isFetching ||
    isConnecting ||
    !jsonData
  ) {
    return (
      <BaseTemplate renderCustomNavbar={() => null}>
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <NftLoader text="Loading Marketplace" />
        </div>
      </BaseTemplate>
    );
  }

  if (router.isReady && jsonData) {
    return (
      <React.Fragment>
        <AddNftToMarketplaceModal
          isOpened={isAddNftModalVisible}
          onClose={() => setIsAddNftModalVisible(false)}
          onClickImport={onClickImport}
          onClickCreate={onClickCreate}
        />
        <CreateNftFromMarketplaceModal
          isOpened={isCreateNftModalVisible}
          onClose={() => setIsCreateNftModalVisible(false)}
          onSubmit={onSubmitCreateNft}
        />
        <IconModal
          title="NFT creation is processing..."
          iconComponent={<LoaderEllipsis />}
          body="it should be confirmed on the blockchain shortly..."
          isOpened={createNftLoadingState === "loading"}
        />
        <TxModal
          isOpened={mintNftLoadingState === "loading"}
          txId={txId || "Loading..."}
          body={
            "An NFT minting proposal has been sent to your Ternoa Wallet App"
          }
          title="Minting request sent!"
        />
        <IconModal
          title="Creation complete!"
          body="You have listed your NFT with success!"
          iconName="CheckCircle"
          isOpened={isSucessModalVisible}
          buttonText={"Set Price"}
          onClickButton={() => {
            setIsSucessModalVisible(false);
            setIsSetPriceModalVisible(true);
          }}
        />
        <IconModal
          iconName="Warning"
          isOpened={isMintNFTErrorModalVisible}
          onClose={() => setIsMintNFTErrorModalVisible(false)}
          title={parseMintNftError()}
        />
        <IconModal
          iconName="Warning"
          isOpened={isIpfsErrorModalVisible}
          onClose={() => setIsIpfsErrorModalVisible(false)}
          title="There was an error trying to create the NFT"
        />
        <SetNftPriceModal
          onSubmit={onSetPrice}
          isOpened={isSetPriceModalVisible}
          onClose={() => setIsSetPriceModalVisible(false)}
          mainColor={jsonData.mainColor}
          exchangeRate={exchangeRate}
          isLoadingExchangeRate={fetchExchangeRateLoadingState === "loading"}
        />
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
          isOpened={isListNftSuccessModalVisible}
          onClose={() => setIsListNftSuccessModalVisible(false)}
        />
        <IconModal
          iconName="Warning"
          isOpened={isListErrorModalVisible}
          onClose={() => setIsListErrorModalVisible(false)}
          title={parseListNftError()}
        />
        <BaseTemplate
          renderCustomNavbar={(props) => {
            return (
              <MarketplaceNavbar
                {...props}
                marketplaceName={jsonData.name}
                marketplaceLogo={jsonData.logo}
                mainColor={jsonData.mainColor}
                isEditVisible={isOwner}
                onClickEdit={() =>
                  router.push({
                    pathname: "/configuremarketplace",
                    query: { marketplaceId: parsedMarketplaceId },
                  })
                }
              />
            );
          }}
        >
          <div className="flex justify-center bg-gray-100 py-s40 flex flex-1">
            <GridWrapper>
              <MarketplaceNftsTemplate
                nfts={nftListData}
                isLoaderVisible={
                  indexerNfts.data?.hasNextPage || indexerNfts.isFetching
                }
                onEndReached={() => {
                  indexerNfts.data?.hasNextPage &&
                    !indexerNfts.isFetching &&
                    fetchPage(currentPage + 1);
                }}
                onClickCreateNft={() => setIsAddNftModalVisible(true)}
                isCreateNftVisible={
                  userIsOnList ||
                  indexerMarketplaceData.data?.marketplace.kind ===
                    MarketplaceKind.Public
                }
                mainColor={jsonData.mainColor}
              />
            </GridWrapper>
          </div>
        </BaseTemplate>
      </React.Fragment>
    );
  }
  return null;
};

export default Marketplace;
