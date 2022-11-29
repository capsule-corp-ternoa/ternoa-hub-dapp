import React from "react";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { INetworkSelectorButton } from "./types";

const NetworkSelectorButton = React.forwardRef<
  HTMLDivElement,
  INetworkSelectorButton
>(
  (
    { currentNetworkName, onClick, isLoading, className = "", isOpened },
    ref
  ) => {
    const onClickEnabled = !isLoading;

    return (
      <div
        className={`h-s40 bg-gray-500 min-w-[auto] md:min-w-[140px] rounded-[7px] font-AirbnbCerealBold inline-flex items-center justify-between md:pl-[14px] md:pr-[19px] pl-s8 pr-s8 border-gray-800 border-solid border-2 ${
          onClickEnabled ? "cursor-pointer" : ""
        } ${className}`}
        onClick={onClickEnabled ? onClick : undefined}
        ref={ref}
      >
        <Text
          text={isLoading ? "Connecting..." : currentNetworkName}
          type="p4"
          weight="medium"
          color="text-gray-900"
          className="pr-s8"
        />
        <Icon
          name={isOpened ? "CaretUp" : "CaretDown"}
          size={16}
          color="black"
        />
      </div>
    );
  }
);

NetworkSelectorButton.displayName = "NetworkSelectorButton";
export default NetworkSelectorButton;
