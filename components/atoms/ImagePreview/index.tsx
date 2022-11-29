import React, { useState } from "react";
import { IImagePreview } from "./types";
import Image from "next/image";
import NftLoader from "../NftLoader";
import Text from "../Text";

const ImagePreview: React.FC<IImagePreview> = ({
  isLoading,
  src,
  alt,
  loader,
  className = "",
}) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);


  const renderImage = () => {
    if (isLoading) {
      return loader;
    } else {
      if (src) {
        return (
          <React.Fragment>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className={`bg-cover bg-no-repeat bg-center w-auto object-contain h-full rounded-xl ${
                  imgLoaded ? "" : "hidden"
                }`}
                onLoad={() => setImgLoaded(true)}
              />
            }
            {!imgLoaded && loader}
          </React.Fragment>
        );
      } else {
        return (
          <div className="flex items-center justify-center flex-col h-full">
            <div className="w-s48 h-s48 md:w-s136 md:h-s136 relative mb-s16 md:mb-s20">
              <Image src="/cards.svg" alt="Loading NFT" layout="fill" />
            </div>
            <Text
              text={"Image not available"}
              weight="medium"
              type="p5"
              color="text-gray-600"
              className="hidden md:block"
            />
          </div>
        );
      }
    }
  };

  return (
    <div
      className={`h-s144 md:h-[290px] rounded-xl flex justify-center items-center ${
        isLoading || !imgLoaded || !src ? "bg-gray-100" : "bg-[tranparent]"
      } ${className}`}
    >
      {renderImage()}
    </div>
  );
};

export default ImagePreview;
