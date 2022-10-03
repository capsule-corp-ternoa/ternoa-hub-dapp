import React from "react";
import { INftCard } from "./types";
import NftPreview from "../../atoms/NftPreview";
import Text from "../../atoms/Text";
import { middleEllipsis } from "../../../utils/strings";
import Avatar from "../../atoms/Avatar";

const NftCard: React.FC<INftCard> = ({
  creator,
  name,
  isLoading,
  preview,
  className = '',
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
              className="mt-s4 md:mt-[10px]"
            />
          )}
        </React.Fragment>
      );
    }
  };

  return (
    <div
      className={`bg-gray-500 border-gray-200 border border-solid rounded-2xl p-[10px] md:p-s20 inline-block ${className}`}
    >
      <NftPreview {...preview} isLoading={isLoading} />
      <div className="mb-s4 md:mb-s8 mt-[10px] md:mt-s28 overflow-hidden">
        {renderData()}
      </div>
    </div>
  );
};

export default NftCard;
