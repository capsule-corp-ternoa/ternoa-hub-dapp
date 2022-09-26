import React from "react";
import LoaderEllipsis from "../../../atoms/LoaderEllipsis";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { INftCreationModal } from "./types";

const NftCreationModal: React.FC<INftCreationModal> = ({ ...props }) => {
  return (
    <Modal {...props}>
      <div className="w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex flex-col justify-center items-center p-s16 md:p-s24 text-center">
        <LoaderEllipsis />
        <Text
          type="h5"
          weight="bold"
          text="NFT creation is processing..."
          className="mt-s16 md:mt-s8"
        />
        <Text
          type="p1"
          weight="light"
          text="It should by confirmed on the blockchain shortly..."
          color="text-gray-400"
          className="mt-s16"
        />
      </div>
    </Modal>
  );
};

export default NftCreationModal;
