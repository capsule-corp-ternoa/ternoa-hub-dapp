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
  limit,
  collectionName,
  collectionLogo,
  creator,
  onClick,
  buttonText,
  disabled,
  displayButton,
  isSoulbound,
  isCapsule,
  isSecret,
  isDelegated,
  onDelegateClick
}) => {
  const [isZoomModalVisible, setIsZoomModalVisible] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-center self-center px-s20 md:max-w-[94%] l:max-w-[85%]">
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
            cover={true}
            imageClassName="rounded-[30px] max-w-[700px]"
            className="border-[3px] md:border-[5px] border-solid border-[5px] rounded-[35px] border-gray-200"
          />
          <div className="absolute bottom-s16 left-s16">
            <div className="flex flex-row">
              {isSoulbound && (
                <div className="bg-purple-default opacity-50 rounded-[13px] p-s8 flex-1 border-[2px] flex border-gray-200 mr-s16">
                  <div className="w-[14px] h-[18px]">
                    <Image
                      src="/nft-badge-icon.svg"
                      width="14"
                      height="18"
                      alt="nft-badge"
                    />
                  </div>
                  <Text
                    type="label"
                    text="Soulbound"
                    weight="medium"
                    color="white-default"
                    className="ml-s8"
                  />
                </div>
              )}
              {isCapsule && (
                <div className="bg-red-default opacity-50 rounded-[13px] p-s8 flex-1 border-[2px] flex border-gray-200 mr-s16">
                  <div className="w-[14px] h-[18px]">
                    <Image
                      src="/nft-badge-icon.svg"
                      width="14"
                      height="18"
                      alt="nft-badge"
                    />
                  </div>
                  <Text
                    type="label"
                    text="Capsule"
                    weight="medium"
                    color="white-default"
                    className="ml-s8"
                  />
                </div>
              )}
              {isSecret && (
                <div className="bg-blue-500 opacity-50 rounded-[13px] p-s8 flex-1 border-[2px] flex border-gray-200">
                  <div className="w-[14px] h-[18px]">
                    <Image
                      src="/nft-badge-icon.svg"
                      width="14"
                      height="18"
                      alt="nft-badge"
                    />
                  </div>
                  <Text
                    type="label"
                    text="Secret"
                    weight="medium"
                    color="white-default"
                    className="ml-s8"
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="absolute right-s16 bottom-s16 cursor-pointer"
            onClick={() => setIsZoomModalVisible(true)}
          >
            <Image src="/zoom.svg" width="51" height="51" alt="zoom" />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-s24">
        <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] lg:w-[400px]">
          <div className="flex items-center">
            <div className="flex grow">
              <Text text={name} type="h5" weight="bold" className="break-all" />
            </div>
            {quantity && (
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
                  text={`${quantity}${limit ? `/${limit}` : ""}`}
                  className="pl-s4"
                />
              </div>
            )}
          </div>

          <div className="py-s16">
            <Text
              type="p3"
              weight="light"
              text={description}
              className="break-all"
            />
          </div>
          <div className="flex">
            {collectionName && (
              <div className="flex flex-col pr-s16">
                <Text text="Collection" type="p3" weight="bold" />
                <div className="flex flex-row py-s16 items-center">
                  {collectionLogo && (
                    <div className="pr-s8 min-w-[48px]">
                      <Image
                        src={collectionLogo}
                        alt={collectionName}
                        width="40"
                        height="40"
                        className="rounded-[12px]"
                      />
                    </div>
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
         {/*  {!isDelegated && (
            <Button
              type="primary"
              text="Delegate"
              disabled={false}
              onClick={onDelegateClick}
              size="large"
              autoWidth
            />
          )} */}
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
