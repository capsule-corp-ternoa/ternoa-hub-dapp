import Image from "next/image";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import ImagePreview from "../../atoms/ImagePreview";
import Text from "../../atoms/Text";
import UserAddressBlock from "../../molecules/UserAddressBlock";
import { INftDetailTemplate } from "./types";


const NftDetailTemplate: React.FC<INftDetailTemplate> = ({
  nftImage,
  id,
  name,
  description,
  quantity,
  collectionName,
  collectionLogo,
  creator,
  onClick,
  buttonText,
  disabled,
  displayButton
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>();

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="flex flex-col md:mr-s20 mb-s16">
        <ImagePreview src={nftImage.src}
          alt={nftImage.alt}
          loader={nftImage.loader}
          imageClassName="rounded-[30px]"
          className="h-[500px] md:h-[500px] maxsm:h-[400px] maxxs:h-[300px]"
        />
      </div>

      <div className="flex flex-col">
        <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px]">
          <div className="flex items-center">
            <div className="flex grow"><Text text={name} type="h5" weight="bold" />
            </div>
            <div className="flex shrink rounded-[10px] bg-gray-200 p-s8 justify-center items-center">
              <Image src="/quantity.svg" width="17" height="22" />
              <Text type="label" weight="bold" text={quantity.toString()} className="pl-s4" />
            </div>
          </div>

          <div className="py-s16">
            <Text type="p3" weight="light" text={description} />
          </div>
          <div className="flex">
            {collectionName &&
              <div className="flex flex-auto flex-col  pr-s16">
                <Text text="Collection" type="p3" weight="bold" />
                <div className="flex flex-row py-s16 items-center">
                  {collectionLogo &&

                    <ImagePreview src={collectionLogo.src}
                      alt={collectionLogo.alt}
                      loader={collectionLogo.loader}
                      imageClassName="rounded-[12px]"
                      className="h-[40px] md:h-[40px] pr-s8"
                    />
                  }
                  <Text text={collectionName} type="label" weight="bold" />
                </div>
              </div>}

            <div className="flex flex-auto flex-col grow">
              <Text text="Creator" type="p3" weight="bold" />
              <div className="flex py-s16 grow">
                <UserAddressBlock pubKey={creator.pubKey} />
              </div>
            </div>
          </div>
          {displayButton && buttonText &&
            <div className="flex flex-col mt-s28">
              <Button type="primary" text={buttonText} disabled={disabled} onClick={onClick} size="large" autoWidth />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default NftDetailTemplate;
