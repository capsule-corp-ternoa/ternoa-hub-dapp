import React from "react";
import { IAddressMenuButton } from "./types";
import { middleEllipsis } from "../../../utils/strings";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";

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
        if (isConnected) {
          return (
            <React.Fragment>
              <div className="text-ellipsis overflow-hidden">
                {pubKey &&
                  middleEllipsis(pubKey, isCurrentBreakpoint("md") ? 10 : 8)}
              </div>
            </React.Fragment>
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
        className={`h-s40 bg-black-default py-s8 px-s8 md:px-s40 rounded-[7px] text-fs12 text-white-default font-AirbnbCerealBold inline-flex items-center justify-around overflow-hidden ${connectClasses} ${className} ${
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
