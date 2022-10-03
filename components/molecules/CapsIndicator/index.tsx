import React from "react";
import { ICapsIndicator } from "./types";
import Avatar from "../../atoms/Avatar";

const CapsIndicator = React.forwardRef<HTMLDivElement, ICapsIndicator>(
  (
    {
      caps,
      pubKey,
      avatarTheme,
      isConnected,
      isLoading = false,
      isLoadingCaps = false,
      onClickConnect,
      onClickConnected,
    },
    ref
  ) => {
    const onClickEnabled = !isLoading && !isLoadingCaps;
    const connectClasses = onClickEnabled ? "cursor-pointer" : "";

    const onClick = () => {
      if (onClickEnabled) {
        if (!isConnected) {
          onClickConnect();
        } else {
          onClickConnected();
        }
      }
    };

    const renderAvatar = () =>
      pubKey && (
        <div className="ml-s8 flex justify-center">
          <Avatar pubKey={pubKey} size={25} theme={avatarTheme} />
        </div>
      );

    const renderContent = () => {
      if (isLoading) {
        return <span className="font-AirbnbCerealMedium">Connecting...</span>;
      } else {
        if (isConnected) {
          if (isLoadingCaps || !caps) {
            return (
              <React.Fragment>
                <span className="font-AirbnbCerealMedium">Loading CAPS...</span>
                {renderAvatar()}
              </React.Fragment>
            );
          } else if (caps) {
            return (
              <React.Fragment>
                <div className="text-ellipsis overflow-hidden">{caps}</div>
                <span className="inline-block ml-s4 font-AirbnbCerealLight">
                  CAPS
                </span>
                {renderAvatar()}
              </React.Fragment>
            );
          }
        } else {
          if (!isConnected) {
            return <div>Connect Wallet</div>;
          }
        }
      }
    };

    return (
      <div
        className={`h-s40 bg-black-default py-s8 px-s20 rounded-full text-fs12 text-white-default font-AirbnbCerealBold inline-flex items-center justify-around overflow-hidden ${connectClasses} ml-s16`}
        onClick={onClick}
        ref={ref}
      >
        {renderContent()}
      </div>
    );
  }
);

CapsIndicator.displayName = "CapsIndicator";
export default CapsIndicator;
