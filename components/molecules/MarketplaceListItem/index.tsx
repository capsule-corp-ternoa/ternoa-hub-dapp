import React from "react";
import Button from "../../atoms/Button";
import LoaderEllipsis from "../../atoms/LoaderEllipsis";
import ImagePreview from "../../atoms/ImagePreview";
import Text from "../../atoms/Text";
import { IMarketplaceListItem } from "./types";
import IconButton from "../../atoms/IconButton";

const MarketplaceListItem: React.FC<IMarketplaceListItem> = ({
  name,
  marketplaceId,
  isLoading,
  className = "",
  preview,
  onClickManage,
  onClickPreview,
}) => {
  return (
    <div
      className={`bg-gray-500 py-s16 pt-s24 md:pt-s20 px-s16 md:px-s24 rounded-2xl border-2 border-solid border-gray-200 ${className}`}
    >
      {isLoading ? (
        <div className="flex flex-row justify-between">
          <Text type="p2" weight="medium" text="Loading marketplace data" />
          <LoaderEllipsis width={25} height={25} />
        </div>
      ) : (
        name && (
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-row items-center md:mb-[0px] mb-s16 whitespace-nowrap overflow-hidden text-ellipsis">
              {preview && (
                <ImagePreview
                  {...preview}
                  className="w-[50px] min-w-[50px] h-[50px] md:w-[50px] md:h-[50px] mr-s16"
                  loader={<LoaderEllipsis height={30} width={30} />}
                />
              )}
              <div className="flex flex-col md:items-left justify-between">
              <Text
                type="p2"
                weight="medium"
                text={name}
                className="overflow-hidden text-ellipsis"
              />
              {marketplaceId && (
                <Text
                  type="p3"
                  weight="light"
                  text={`ID: ${marketplaceId}`}
                  className="overflow-hidden text-ellipsis"
                />)
              }
              </div>
            </div>
            <div className="flex flex-row items-center">
              {!!onClickPreview && (
                <IconButton
                  type="secondary"
                  reversed={true}
                  icon="ArrowSquareOut"
                  iconColor="black"
                  iconSize={24}
                  size="small"
                  text="Preview"
                  autoWidth={true}
                  className="md:px-s16 mr-s16 px-[0px] w-full"
                  onClick={onClickPreview}
                />
              )}
              {!!onClickManage && (
                <Button
                  type="primary"
                  size="small"
                  text="Manage"
                  autoWidth={true}
                  className="md:px-s16 px-[0px] w-full"
                  onClick={onClickManage}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MarketplaceListItem;
