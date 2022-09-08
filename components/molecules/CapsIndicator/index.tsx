import React from "react";
import { ICapsIndicator } from "./types";
import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";

const CapsIndicator: React.FC<ICapsIndicator> = ({
  caps,
  pubKey,
  avatarTheme,
  isConnected,
  isLoading = false,
  isDisconnecting = false,
  isLoadingCaps = false,
  onClickConnect,
  onClickDisconnect,
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
    } else if (isDisconnecting) {
      return <div>Disconnecting...</div>;
    } else {
      if (isConnected) {
        if (isLoadingCaps || !caps) {
          return <div>Loading CAPS...</div>;
        } else if (caps) {
          return (
            <React.Fragment>
              <div className="text-ellipsis overflow-hidden">{caps}</div>
              <span className="inline-block ml-s4 font-AirbnbCerealLight">
                CAPS
              </span>
              <div
                className="bg-red-500 rounded-full p-s2 ml-s8 text-center cursor-pointer"
                onClick={onClickDisconnect}
              >
                <Icon name="Power" color="white" size={16} />
              </div>
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
    >
      {renderContent()}
      {/* <Avatar pubKey={pubKey} size={25} theme={avatarTheme}/> */}
    </div>
  );
};

export default CapsIndicator;
