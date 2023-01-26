import React from "react";
import { INftCard } from "./types";
import ImagePreview from "../../atoms/ImagePreview";
import Text from "../../atoms/Text";
import { middleEllipsis } from "../../../utils/strings";
import Avatar from "../../atoms/Avatar";
import NftLoader from "../../atoms/NftLoader";
import Checkbox from "../../atoms/Checkbox";
import Image from "next/image";

const NftCard: React.FC<INftCard> = ({
  creator,
  name,
  isLoading,
  preview,
  className = "",
  isChecked,
  showPrice,
  price,
  isClickable,
  onClick,
  onChangeChecked,
  isSecret,
  isSoulbound,
  isCapsule,
}) => {
  const renderData = () => {
    if (isLoading) {
      return (
        <div>
          <div className="h-s20 w-1/2 rounded-lg bg-gray-100"></div>
          <div className="h-s20 w-3/4 rounded-lg bg-gray-100 mt-s4 md:mt-[10px]"></div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="flex flex-row items-center justify-between">
            <div className="whitespace-nowrap overflow-hidden">
              <div className="flex flex-row items-center">
                {creator && (
                  <React.Fragment>
                    <Avatar
                      pubKey={creator}
                      size={20}
                      theme="polkadot"
                      className="md:scale-125 md:pt-s2 md:pl-s2"
                    />
                    <Text
                      text={middleEllipsis(creator, 12)}
                      weight="light"
                      type="p3"
                      className="ml-[6px] md:ml-[10px]"
                    />
                  </React.Fragment>
                )}
              </div>
              {name && (
                <Text
                  text={name}
                  weight="medium"
                  type="p2"
                  className="mt-s4 md:mt-[10px] overflow-hidden text-ellipsis"
                />
              )}
            </div>
            {onChangeChecked && (
              <div className="mr-s8">
                <Checkbox
                  checked={!!isChecked}
                  onChange={() => onChangeChecked(!isChecked)}
                />
              </div>
            )}
          </div>
          {showPrice && (
            <div className="flex flex-row justify-between items-center bg-gray-100 p-s16 rounded-xl mt-s20">
              <Text
                text={price !== "0" ? "Price" : ""}
                weight="medium"
                type="p2"
                className="mr-s20"
              />
              <Text
                text={price && price !== "0" ? `${price} CAPS` : "NOT IN SELL"}
                weight="medium"
                type="p2"
                className="break-all"
              />
            </div>
          )}
        </React.Fragment>
      );
    }
  };

  return (
    <div
      className={`bg-gray-500 border-gray-200 border border-solid rounded-2xl p-[10px] md:p-s20 inline-block ${className}`}
    >
      <div
        className={`${isClickable && "cursor-pointer"} relative`}
        onClick={() => onClick && onClick()}
      >
        <ImagePreview
          {...preview}
          isLoading={isLoading}
          loader={<NftLoader text="Loading" />}
          imageClassName="rounded-xl"
        />
        <div className="absolute bottom-s8 left-s8">
          <div className="flex flex-row flex-wrap">
            {isSoulbound && (
              <div className="bg-purple-default opacity-50 rounded-[13px] p-s8 border-[2px] flex border-gray-200 mr-s8 mb-s8">
                <div className="w-[14px] h-[18px]">
                  <Image
                    src="/nft-badge-icon.svg"
                    width="14"
                    height="18"
                    alt="nft-badge"
                  />
                </div>
                <Text
                  type="label"
                  text="Soulbound"
                  weight="medium"
                  color="white-default"
                  className="ml-s8"
                />
              </div>
            )}
            {isCapsule && (
              <div className="bg-red-default opacity-50 rounded-[13px] p-s8 border-[2px] flex border-gray-200 mr-s8 mb-s8">
                <div className="w-[14px] h-[18px]">
                  <Image
                    src="/nft-badge-icon.svg"
                    width="14"
                    height="18"
                    alt="nft-badge"
                  />
                </div>
                <Text
                  type="label"
                  text="Capsule"
                  weight="medium"
                  color="white-default"
                  className="ml-s8"
                />
              </div>
            )}
            {isSecret && (
              <div className="bg-blue-500 opacity-50 rounded-[13px] p-s8 border-[2px] flex border-gray-200 mb-s8">
                <div className="w-[14px] h-[18px]">
                  <Image
                    src="/nft-badge-icon.svg"
                    width="14"
                    height="18"
                    alt="nft-badge"
                  />
                </div>
                <Text
                  type="label"
                  text="Secret"
                  weight="medium"
                  color="white-default"
                  className="ml-s8"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`mb-s4 md:mb-s8 mt-[10px] md:mt-s28 overflow-hidden flex flex-col justify-between`}
      >
        {renderData()}
      </div>
    </div>
  );
};

export default NftCard;
