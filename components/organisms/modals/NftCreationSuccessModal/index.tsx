import { CheckCircle } from "phosphor-react";
import React from "react";
import LoaderEllipsis from "../../../atoms/LoaderEllipsis";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { INtfCreationSuccessModal } from "./types";

const NtfCreationSuccessModal: React.FC<INtfCreationSuccessModal> = ({
  ...props
}) => {
  return (
    <Modal {...props}>
      <div className="w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex flex-col justify-center items-center p-s16 md:p-s24 text-center">
        <CheckCircle size={64} />
        <Text type="h5" weight="bold" text="Creation complete!" className="mt-s16"/>
        <Text
          type="p1"
          weight="light"
          text="You have created an NFT with success! Check it in your profile."
          color="text-gray-400 mt-s16"
        />
      </div>
    </Modal>
  );
};

export default NtfCreationSuccessModal;
