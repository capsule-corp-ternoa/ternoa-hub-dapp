import React from "react";
import { INftCard } from "./types";
import ImagePreview from "../../atoms/ImagePreview";
import Text from "../../atoms/Text";
import { middleEllipsis } from "../../../utils/strings";
import Avatar from "../../atoms/Avatar";
import NftLoader from "../../atoms/NftLoader";
import Checkbox from "../../atoms/Checkbox";

const NftCard: React.FC<INftCard> = ({
  creator,
  name,
  isLoading,
  preview,
  className = "",
  isChecked,
  showPrice,
  price,
  onChangeChecked,
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
      <ImagePreview
        {...preview}
        isLoading={isLoading}
        loader={<NftLoader text="Loading" />}
        imageClassName="rounded-xl"
      />
      <div
        className={`mb-s4 md:mb-s8 mt-[10px] md:mt-s28 overflow-hidden flex flex-col justify-between`}
      >
        {renderData()}
      </div>
    </div>
  );
};

export default NftCard;
