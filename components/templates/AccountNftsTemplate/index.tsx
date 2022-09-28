import Image from "next/image";
import React, { useEffect } from "react";
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
  selectedFilter,
  onSelectFilter,
  onClickCreateNft,
}) => {
  const { ref: endReachRef, inView: isEndReached } = useInView();

  useEffect(() => {
    if (isEndReached) {
      onEndReached();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndReached, selectedFilter]);

  const filtersArray = Object.values(Filter);

  return (
    <div className="flex flex-col justify-center bg-gray-500 rounded-xl pb-s32 md:pb-s56">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-s32">
        <Text
          text="My NFTs"
          weight="medium"
          type="h3"
          className="mb-s16 sm:mb-[0px]"
        />
        <FilterList
          filters={filtersArray.map((filter) => ({ name: filter }))}
          onSelectFilter={(index) => onSelectFilter(filtersArray[index])}
          selectedIndex={filtersArray.findIndex((f) => f === selectedFilter)}
        />
      </div>
      <div className="bg-gray-500 grid grid-cols-nftList md:grid-cols-nftListDesktop md:gap-s24 gap-s16">
        {nfts.map((nftCard, i) => (
          <div key={i} className="w-full">
            <NftCard {...nftCard} className="w-full" />
          </div>
        ))}
        {!isLoaderVisible && Boolean(nfts.length) && (
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
