import React from "react";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { QRCodeSVG } from "qrcode.react";
import { IWalletConnectModal } from "./types";

const WalletConnectModal: React.FC<IWalletConnectModal> = ({
  uri,
  ...props
}) => {
  return (
    <Modal {...props} className="!bg-gray-800 rounded-3xl">
      <div className="w-[340px] h-[420px] md:w-[450px] md:h-[480px] flex flex-col justify-evenly items-center p-s16 md:p-s24 text-center">
        <div>
          <Text
            type="h3"
            weight="bold"
            text="Connect Wallet"
            className="text-white-default"
          />
          <Text
            type="p1"
            weight="light"
            text="Flash the QR Code on your mobile wallet to create the NFT"
            color="text-gray-300 mt-s16"
          />
        </div>
        {props.isOpened && uri && (
          <div className="bg-white-default p-s28 rounded-3xl flex mt-s8">
            <QRCodeSVG value={uri} size={160} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default WalletConnectModal;
