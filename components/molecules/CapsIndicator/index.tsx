import React from "react";
import { ICapsIndicator } from "./types";
import Avatar from "../../atoms/Avatar";

const CapsIndicator: React.FC<ICapsIndicator> = ({
  caps,
  pubKey,
  avatarTheme,
  isConnected,
  isLoading = false,
  isLoadingCaps = false,
  onClickConnect,
}) => {
  const onClickEnabled = !isLoading && !isLoadingCaps && !isConnected;
  const connectClasses = onClickEnabled ? "cursor-pointer" : "";

  const onClick = () => {
    if (onClickEnabled) {
      onClickConnect();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Connecting...</div>;
    } else {
      if (isConnected) {
        if (isLoadingCaps || !caps) {
          return <div>Loading CAPS...</div>;
        } else if (caps) {
          return (
            <div>
              {caps}
              <span className="inline-block ml-s4 font-AirbnbCerealLight">
                CAPS
              </span>
            </div>
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
      className={`h-s40 bg-black-default py-s8 px-s20 rounded-full text-fs12 text-white-default font-AirbnbCerealBold inline-flex items-center justify-around ${connectClasses}`}
      onClick={onClick}
    >
      {renderContent()}
      {/* <Avatar pubKey={pubKey} size={25} theme={avatarTheme}/> */}
    </div>
  );
};

export default CapsIndicator;
