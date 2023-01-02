import Image from "next/image";
import React from "react";
import { useWindowBreakpoint } from "../../../../hooks/useWindowBreakpoint";
import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { IAddNftToMarketplaceModal } from "./types";

const AddNftToMarketplaceModal: React.FC<IAddNftToMarketplaceModal> = ({
  onClickImport,
  onClickCreate,
  ...props
}) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  const renderOption = (
    title: string,
    imageSrc: string,
    onClick: () => void
  ) => {
    return (
      <div
        className="bg-white-default rounded-xl border-2 border-gray-300 border-solid w-[30vh] h-[30vh] md:w-[258px] md:h-[258px] flex flex-col justify-around items-center md:mx-[6px] md:mx-[0x] my-[6px] md:my-[0px] cursor-pointer"
        onClick={onClick}
      >
        <div className="w-[60%] h-[60%] md:w-[117px] md:h-[154px] relative">
          <Image alt={title} src={imageSrc} layout="fill" />
        </div>
        <Text type="p1" text={title} weight="medium" color="text-gray-600" />
      </div>
    );
  };

  return (
    <Modal {...props} className="bg-gray-50 p-s2">
      <div className="w-[90vw] h-[80vh] md:w-[616px] md:h-[398px] flex flex-col items-center p-s16 md:p-s24 text-center bg-gray-50">
        <Text type="h5" text="Add NFTs to your Marketplace" weight="bold" />
        <div className="flex md:flex-row flex-col justify-center items-center h-full">
          {renderOption(
            isCurrentBreakpoint("sm") ? "Import from wallet" : "Import NFTs",
            "/import-nft.svg",
            onClickImport
          )}
          {renderOption("Create new NFT", "/create-nft.svg", onClickCreate)}
        </div>
      </div>
    </Modal>
  );
};

export default AddNftToMarketplaceModal;
