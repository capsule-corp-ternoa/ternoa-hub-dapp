import React from "react";
import { IAddressMenuButton } from "./types";
import Avatar from "../../atoms/Avatar";
import { middleEllipsis } from "../../../utils/strings";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";
import Icon from "../../atoms/Icon";

const AddressMenuButton = React.forwardRef<HTMLDivElement, IAddressMenuButton>(
  (
    {
      pubKey,
      isConnected,
      isLoading = false,
      onClickConnect,
      onClickConnected,
      className = "",
      disabled,
      isOpened,
    },
    ref
  ) => {
    const onClickEnabled = !isLoading && !disabled;
    const connectClasses = onClickEnabled ? "cursor-pointer" : "";
    const { isCurrentBreakpoint } = useWindowBreakpoint();

    const onClick = () => {
      if (onClickEnabled) {
        if (!isConnected) {
          onClickConnect();
        } else {
          onClickConnected();
        }
      }
    };

    const renderContent = () => {
      if (isLoading) {
        return <span className="font-AirbnbCerealMedium">Connecting...</span>;
      } else {
        if (isConnected && pubKey) {
          return (
            <div className="flex flex-row justify-between items-center w-full">
              <Avatar pubKey={pubKey} size={25} theme="polkadot" />
              <div className="text-ellipsis overflow-hidden mx-s8">
                {middleEllipsis(pubKey, isCurrentBreakpoint("md") ? 10 : 8)}
              </div>
              <Icon
                name={isOpened ? "CaretUp" : "CaretDown"}
                size={16}
                color="white"
              />
            </div>
          );
        } else {
          if (!isConnected) {
            return (
              <div>
                {isCurrentBreakpoint("md") ? "Connect Wallet" : "Connect"}
              </div>
            );
          }
        }
      }
    };

    return (
      <div
        className={`h-s40 bg-black-default py-s8 px-s8 md:px-s20 rounded-[7px] text-fs12 text-white-default font-AirbnbCerealBold inline-flex items-center justify-around overflow-hidden ${connectClasses} ${className} ${
          disabled ? "bg-gray-400" : ""
        }`}
        onClick={onClick}
        ref={ref}
      >
        {renderContent()}
      </div>
    );
  }
);

AddressMenuButton.displayName = "AddressMenuButton";
export default AddressMenuButton;
