import React from "react";
import Lottie from "react-lottie-player";
import { useWindowBreakpoint } from "../../../../hooks/useWindowBreakpoint";
import lottieJson from "../../../../public/handWithPhone.json";
import { middleEllipsis } from "../../../../utils/strings";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { ITxModal } from "./types";

const TxModal: React.FC<ITxModal> = ({ txId, title, body, ...props }) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();
  const animationDimensions = isCurrentBreakpoint("md") ? 180 : 88;

  return (
    <Modal {...props}>
      <div className="w-[340px] h-[276px] md:w-[450px] md:h-[450px] flex flex-col justify-around items-center p-s16 md:p-s24 text-center">
        <div>
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: animationDimensions, height: animationDimensions }}
          />
        </div>
        <div>
          <Text type="h5" weight="bold" text={title} />
          {body && (
            <Text
              type="p2"
              weight="light"
              text={body}
              color="text-gray-400"
              className="mt-s16"
            />
          )}
        </div>
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
