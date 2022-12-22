import React, { useState } from "react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { ICreateMarketplaceTemplate } from "./types";
import Image from "next/image";
import ButtonToggle from "../../atoms/ButtonToggle";

const CreateMarketplaceTemplate: React.FC<ICreateMarketplaceTemplate> = ({
  onSubmit,
  disabled,
  serviceFee,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options = [
    { label: "Private", value: true },
    { label: "Public", value: false },
  ];

  const isPrivateSelected = options[selectedIndex].value;

  const onClickSubmit = () => {
    onSubmit({ result: { isPrivate: isPrivateSelected } });
  };

  return (
    <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
      <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full flex flex-col md:w-auto items-center">
        <Text
          text="Create Marketplace"
          type="h3"
          weight="bold"
          className="text-center"
        />
        <Text
          text={`Become the creator of your own marketplace,\nsell and exhibit your NFTs with the Ternoa ecosystem`}
          type="p2"
          weight="light"
          color="text-gray-400"
          className="whitespace-pre-wrap text-center my-s20"
        />
        <Image
          alt="Create Marketplace"
          src="/marketplace-frame.svg"
          width={204}
          height={156}
        />
        <ButtonToggle
          className="mt-s32 mb-s24"
          options={options}
          selectedIndex={selectedIndex}
          onChange={(_value, index) => setSelectedIndex(index)}
        />
        <Text
          text={
            isPrivateSelected
              ? "Private: Only whitelisted account can list on the marketplace"
              : `Public : Any user has permission to sell their NFTs\non your marketplace`
          }
          type="p3"
          weight="light"
          color="text-gray-400"
          className="text-center whitespace-pre-wrap"
        />
        <div className="flex flex-1 items-end flex-col items-center">
          <Button
            text="Continue"
            type="primary"
            size="medium"
            className="mt-s20 md:mt-s32"
            onClick={onClickSubmit}
            disabled={disabled}
          />
          <Text
            type="p3"
            weight="light"
            className="mt-s20"
            text={
              serviceFee
                ? `Service fee: ${serviceFee} CAPS`
                : "Calulating service fee..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CreateMarketplaceTemplate;
