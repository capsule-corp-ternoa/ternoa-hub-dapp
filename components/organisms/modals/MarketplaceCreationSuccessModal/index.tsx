import { CheckCircle } from "phosphor-react";
import React from "react";
import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { IMarketplaceCreationSuccessModal } from "./types";

const MarketplaceCreationSuccessModal: React.FC<IMarketplaceCreationSuccessModal> =
  ({ onClickSetMarketplaceConfiguration, ...props }) => {
    return (
      <Modal {...props}>
        <div className="w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex flex-col justify-center items-center p-s16 md:p-s24 text-center">
          <div className="flex flex-col flex-1 justify-evenly">
            <div className="flex flex-col items-center">
              <CheckCircle size={64} />
              <Text
                type="h5"
                weight="bold"
                text="Creation complete!"
                className="mt-s16"
              />
            </div>
            <Text
              type="p1"
              weight="light"
              text="You have create a marketplace with success! Now you can set-up it!"
              color="text-gray-400 mt-s16"
            />
            <div className="flex items-center justify-center">
              <Button
                text="Set-up my Marketplace"
                autoWidth={true}
                type="primary"
                size="medium"
                onClick={onClickSetMarketplaceConfiguration}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

export default MarketplaceCreationSuccessModal;
