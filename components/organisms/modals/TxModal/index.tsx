import React from "react";
import { middleEllipsis } from "../../../../utils/strings";
import Icon from "../../../atoms/Icon";
import LoaderEllipsis from "../../../atoms/LoaderEllipsis";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { ITxModal } from "./types";

const TxModal: React.FC<ITxModal> = ({ txId, title, body, ...props }) => {
  return (
    <Modal {...props}>
      <div className="w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex flex-col justify-between items-center p-s16 md:p-s24 text-center">
        <div>
          <Icon
            name="DeviceMobile"
            size={16}
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
          />
          <div className="flex items-center justify-center">
            <LoaderEllipsis className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]" />
          </div>
        </div>
        <div>
          <Text type="h5" weight="bold" text={title} />
        </div>
        {body && (
          <div>
            <Text type="p2" weight="light" text={body} color="text-gray-400" />
          </div>
        )}
        {txId && (
          <div className="flex justify-center">
            <Text
              type="p2"
              weight="light"
              text="Transaction ID:"
              color="text-gray-400"
            />
            <Text
              type="p2"
              weight="medium"
              text={middleEllipsis(txId)}
              color="text-gray-800"
              className="ml-s8"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TxModal;
