import { useRouter } from "next/router";
import React from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { IFormCard } from "./types";

const FormCard: React.FC<IFormCard> = ({
  children,
  title,
  isBackButtonHidden,
  className = "",
  containerClassName = "",
}) => {
  const router = useRouter();

  return (
    <div
      className={`relative ${
        !isBackButtonHidden ? "top-[-41px]" : ""
      } ${containerClassName}`}
    >
      {!isBackButtonHidden && (
        <div
          className="bg-gray-800 w-[129px] h-[41px] flex flex-row rounded-3xl justify-center items-center relative top-[20px] left-[0px] cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon name="ArrowLeft" size={16} color="white" />
          <Text
            text={"Back"}
            type="p2"
            weight="medium"
            className="!text-fs18 ml-s8"
            color="text-white-default"
          />
        </div>
      )}
      <div
        className={`bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto ${className}`}
      >
        {title && <Text text={title} type="h3" weight="bold" />}
        {children}
      </div>
    </div>
  );
};

export default FormCard;
