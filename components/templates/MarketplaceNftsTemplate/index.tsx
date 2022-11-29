import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import NftLoader from "../../atoms/NftLoader";
import Text from "../../atoms/Text";
import NftCard from "../../molecules/NftCard";
import { IMarketplaceNftsTemplate } from "./types";

const MarketplaceNftsTemplate: React.FC<IMarketplaceNftsTemplate> = ({
  nfts,
  isLoaderVisible,
  onEndReached,
  onClickCreateNft,
  mainColor,
}) => {
  const { ref: endReachRef, inView: isEndReached } = useInView();

  useEffect(() => {
    if (isEndReached) {
      onEndReached();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndReached]);
  console.log(mainColor);
  return (
    <div className="flex flex-col bg-gray-100 rounded-xl pb-s32 md:pb-s56">
      <div className="bg-gray-100 grid grid-cols-marketplaceNftList md:grid-cols-marketplaceNftListDesktop md:gap-s24 gap-s16 place-items-center">
        {nfts.map((nftCard, i) => (
          <div key={i} className="md:min-w-[290px] min-w-[144px]">
            <NftCard {...nftCard} className="w-full" />
          </div>
        ))}
      </div>
      {isLoaderVisible && <NftLoader text="Loading NFTs" className="mt-s64" />}
      <div ref={endReachRef} />
      {!isLoaderVisible && (
        <div className="flex justify-center items-center flex-col w-full md:mt-s64 mt-[0px]">
          {!Boolean(nfts.length) && (
            <Card className="w-full md:w-[688px] flex flex-col justify-center items-center text-center whitespace-pre-line">
              <Image
                src="/marketplace-frame.svg"
                alt="Marketplace"
                width={204}
                height={156}
              />
              <Text
                className="my-s20"
                type="p4"
                color="text-gray-400"
                weight="medium"
                text={`We do not own your private keys and cannot access your funds \nwithout your confirmation.`}
              />
              <Button
                type="primary"
                text="Create NFT"
                autoWidth={true}
                size="medium"
                className={`bg-[${mainColor}]`}
                style={mainColor ? { backgroundColor: mainColor } : {}}
                onClick={onClickCreateNft}
              />
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketplaceNftsTemplate;
