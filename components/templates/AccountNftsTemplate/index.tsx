import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Filter } from "../../../store/slices/nfts/types";
import Button from "../../atoms/Button";
import NftLoader from "../../atoms/NftLoader";
import Text from "../../atoms/Text";
import CreateNftCard from "../../molecules/CreateNftCard";
import FilterList from "../../molecules/FilterList";
import NftCard from "../../molecules/NftCard";
import { IAccountNftsTemplate } from "./types";

const AccountNftsTemplate: React.FC<IAccountNftsTemplate> = ({
  nfts,
  isLoaderVisible,
  onEndReached,
  filters,
  selectedFilter,
  onSelectFilter,
  onClickCreateNft,
  hideFilters,
  onChangeSelectedIds,
  selectedIds,
}) => {
  const { ref: endReachRef, inView: isEndReached } = useInView();

  useEffect(() => {
    if (isEndReached) {
      onEndReached();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndReached, selectedFilter]);

  const onChangeChecked = (nftId: string) => (isChecked: boolean) => {
    if (!onChangeSelectedIds || !selectedIds) {
      return;
    }
    if (isChecked) {
      onChangeSelectedIds([...selectedIds, nftId]);
    } else {
      onChangeSelectedIds(selectedIds.filter((id) => id !== nftId));
    }
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100 rounded-xl pb-s32 md:pb-s56">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-s32">
        <Text
          text="My NFTs"
          weight="medium"
          type="h3"
          className="mb-s16 sm:mb-[0px]"
        />
        {!hideFilters && onSelectFilter && !!filters?.length && (
          <FilterList
            filters={filters.map((filter) => ({ name: filter }))}
            onSelectFilter={(index) => onSelectFilter(filters[index])}
            selectedIndex={filters.findIndex((f) => f === selectedFilter)}
          />
        )}
      </div>
      <div className="bg-gray-100 grid grid-cols-nftList md:grid-cols-nftListDesktop md:gap-s24 gap-s16">
        {nfts.map((nftCard) => (
          <div key={nftCard.id} className="w-full">
            <NftCard
              {...nftCard}
              className="w-full"
              isChecked={selectedIds?.includes(nftCard.id)}
              onChangeChecked={
                onChangeSelectedIds ? onChangeChecked(nftCard.id) : undefined
              }
            />
          </div>
        ))}
        {!isLoaderVisible && Boolean(nfts.length) && !!onClickCreateNft && (
          <CreateNftCard
            onClickCreate={onClickCreateNft}
            className="md:block hidden"
          />
        )}
      </div>
      {isLoaderVisible && <NftLoader text="Loading NFTs" className="mt-s64" />}
      <div ref={endReachRef} />
      {!isLoaderVisible && (
        <div className="flex justify-center items-center flex-col">
          {!Boolean(nfts.length) && (
            <React.Fragment>
              <div className="w-s136 h-s136 relative mb-s16 mt-s28 md:mt-s56 md:mb-s20">
                <Image
                  src="/cards.svg"
                  alt="No results"
                  layout="fill"
                  color="white"
                />
              </div>
              <Text
                type="p2"
                color="text-gray-600"
                weight="medium"
                text="Nothing to display"
              />
            </React.Fragment>
          )}
          <Button
            text="Create NFT"
            type="primary"
            size="medium"
            autoWidth={true}
            className={`${
              Boolean(nfts.length) && "md:hidden"
            } mt-s40 md:mt-s32`}
            onClick={onClickCreateNft}
          />
        </div>
      )}
    </div>
  );
};

export default AccountNftsTemplate;
