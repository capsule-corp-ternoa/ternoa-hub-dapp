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
import { Nft, NftDetail } from "../../store/slices/nfts/types";

const Account: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const nftId = router.query.id as string;
  const { isConnected, isConnecting } = useSelector(
    (state: RootState) => state.blockchain
  );

  const [nftDetail, setNftDetail] = useState<NftDetail | undefined>();

  const [trigger, indexerNftDetail] = nftApi.useLazyGetNftByIdQuery();


  useEffect(() => {
    if (router.isReady && nftId && isConnected) {
      trigger({ nftId: nftId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, trigger, nftId, isConnected]);

  useEffect(() => {
    const data = indexerNftDetail.data?.nftDetail;
      setNftDetail(data);
  }, [indexerNftDetail.data?.nftDetail]);


  const {
    nftData,
    isLoaderVisible,
  } = useNftDetail();

  console.log('nftData', nftData);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  return (
    <React.Fragment>
      <NextSeo title="Nft Detail" />
      <BaseTemplate>
       {/*  {account && (
          <NftDetailTemplate
            nftImage={}
            id
            name
            description
            quantity
            collectionName
            collectionLogo
            creator
            onClick
            buttonText
            disabled
            displayButton

          />
        )} */}

      </BaseTemplate>
    </React.Fragment>
  );
};

export default Account;
