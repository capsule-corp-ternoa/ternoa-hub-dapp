import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import BaseTemplate from "../../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../../hooks/useWalletConnectClient";
import { useNftDetail } from "../../hooks/useNftDetail";
import NftDetailTemplate from "../../components/templates/NftDetailTemplate";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { nftApi } from "../../store/slices/nfts";
import { Nft, NftDetail, NftDetailWithCollection } from "../../store/slices/nfts/types";
import { parseOffchainDataImage } from "../../utils/strings";
import LoaderEllipsis from "../../components/atoms/LoaderEllipsis";

const Account: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const nftId = router.query.id as string;
  const { isConnected, isConnecting } = useSelector(
    (state: RootState) => state.blockchain
  );

  const [nftDetail, setNftDetail] = useState<NftDetailWithCollection | undefined>();

  const [trigger, indexerNftDetail] = nftApi.useLazyGetNftByIdQuery();

  const {
    fetchNftData,
    isLoading,
    nftData,
    fetchCollectionData,
    collectionData
  } = useNftDetail();

  useEffect(() => {
    if (router.isReady && nftId && isConnected) {
      trigger({ nftId: nftId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, trigger, nftId, isConnected]);

  useEffect(() => {
    const data = indexerNftDetail.data?.nftDetail;
    setNftDetail(data);
    if (data?.offchainData) {
      fetchNftData(data?.offchainData)
    }
    if (data?.collection?.offchainData) {
      fetchCollectionData(data?.collection?.offchainData)
    }
  }, [indexerNftDetail.data?.nftDetail]);


  console.log('nftDetail', nftDetail, 'nftData', nftData, 'collectionData', collectionData);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  return (
    <React.Fragment>
      <NextSeo title="Nft Detail" />
      <BaseTemplate>
        {nftDetail && nftData ? (
          <NftDetailTemplate
            nftImage={{
              src: parseOffchainDataImage(nftData.image),
              alt: nftData.title,
              loader: <LoaderEllipsis />
            }}
            id={nftDetail.id}
            name={nftData.title}
            description={nftData.description}
            quantity={nftDetail.collection?.limit}
            collectionName={collectionData?.name}
            collectionLogo={collectionData?.profile_image ? parseOffchainDataImage(collectionData?.profile_image) : undefined}
            creator={{ pubKey: nftDetail.creator }}
            displayButton={true}
            disabled={!nftDetail.isListed}
          /* onClick
          buttonText
          disabled
          */

          />
        ) : null}

      </BaseTemplate>
    </React.Fragment>
  );
};

export default Account;
