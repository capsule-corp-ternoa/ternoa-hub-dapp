import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import GridWrapper from "../components/atoms/GridWrapper";
import AccountNftsTemplate from "../components/templates/AccountNftsTemplate";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import { useShowMyNfts } from "../hooks/useShowMyNfts";
import { Filter } from "../store/slices/nfts/types";

const Account: NextPage = () => {
  const router = useRouter();
  const { account, client } = useWalletConnectClient();
  const {
    nftListData,
    selectedFilter,
    setSelectedFilter,
    isLoaderVisible,
    onEndReached,
  } = useShowMyNfts(Filter.Owned);

  useEffect(() => {
    if (client && !account) {
      router.push("/");
    }
  }, [client, account, router]);

  return (
    <React.Fragment>
      <NextSeo title="My Nfts" />
      <BaseTemplate>
        <div className="flex justify-center bg-gray-100 py-s40 flex flex-1">
          <GridWrapper>
            {account && (
              <AccountNftsTemplate
                nfts={nftListData}
                isLoaderVisible={isLoaderVisible}
                onEndReached={onEndReached}
                filters={[Filter.Owned, Filter.Created, Filter["On Sale"]]}
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
                onClickCreateNft={() => router.push("/createnft")}
              />
            )}
          </GridWrapper>
        </div>
      </BaseTemplate>
    </React.Fragment>
  );
};

export default Account;
