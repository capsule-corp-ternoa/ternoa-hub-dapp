import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import IconButton from "../../atoms/IconButton";
import ImagePreview from "../../atoms/ImagePreview";
import Text from "../../atoms/Text";
import UserAddressBlock from "../../molecules/UserAddressBlock";
import ZoomModal from "../../organisms/modals/ZoomModal";
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
  displayButton,
}) => {
  const [isZoomModalVisible, setIsZoomModalVisible] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="flex flex-col md:mr-s20 mb-s16">
        <div className="relative mt-s24">
          <IconButton
            onClick={() => router.back()}
            text="Back"
            icon="ArrowLeft"
            iconSize={16}
            iconColor="white"
            size="xsmall"
            autoWidth
            type="primary"
            className="rounded-[20px] absolute -left-s8 -top-s16"
          />
          <ImagePreview
            src={nftImage.src}
            alt={nftImage.alt}
            loader={nftImage.loader}
            imageClassName="rounded-[30px]"
            className="h-[500px] md:h-[500px] maxsm:h-[400px] maxxs:h-[300px] border-solid border-[5px] rounded-[35px] border-gray-200"
          />
          <div
            className="absolute right-s16 bottom-s16 cursor-pointer"
            onClick={() => setIsZoomModalVisible(true)}
          >
            <Image src="/zoom.svg" width="51" height="51" alt="zoom" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px]">
          <div className="flex items-center">
            <div className="flex grow">
              <Text text={name} type="h5" weight="bold" />
            </div>
            <div className="flex shrink rounded-[10px] bg-gray-200 p-s8 justify-center items-center">
              <Image
                src="/quantity.svg"
                width="17"
                height="22"
                alt="quantity"
              />
              <Text
                type="label"
                weight="bold"
                text={quantity.toString()}
                className="pl-s4"
              />
            </div>
          </div>

          <div className="py-s16">
            <Text type="p3" weight="light" text={description} />
          </div>
          <div className="flex">
            {collectionName && (
              <div className="flex flex-auto flex-col  pr-s16">
                <Text text="Collection" type="p3" weight="bold" />
                <div className="flex flex-row py-s16 items-center">
                  {collectionLogo && (
                    <ImagePreview
                      src={collectionLogo.src}
                      alt={collectionLogo.alt}
                      loader={collectionLogo.loader}
                      imageClassName="rounded-[12px]"
                      className="h-[40px] md:h-[40px] pr-s8"
                    />
                  )}
                  <Text text={collectionName} type="label" weight="bold" />
                </div>
              </div>
            )}

            <div className="flex flex-auto flex-col grow">
              <Text text="Creator" type="p3" weight="bold" />
              <div className="flex py-s16 grow">
                <UserAddressBlock pubKey={creator.pubKey} />
              </div>
            </div>
          </div>
          {displayButton && buttonText && (
            <div className="flex flex-col mt-s28">
              <Button
                type="primary"
                text={buttonText}
                disabled={disabled}
                onClick={onClick}
                size="large"
                autoWidth
              />
            </div>
          )}
        </div>
      </div>
      {nftImage.src && nftImage.alt && (
        <ZoomModal
          isOpened={isZoomModalVisible}
          imageSrc={nftImage.src}
          imageAlt={nftImage.alt}
          loader={nftImage.loader}
          onClose={() => setIsZoomModalVisible(false)}
        />
      )}
    </div>
  );
};

export default NftDetailTemplate;
