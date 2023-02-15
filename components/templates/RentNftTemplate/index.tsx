import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Accept } from "react-dropzone";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import Textarea from "../../atoms/Textarea";
import { IRentNftTemplate, INftFormResult } from "./types";
import FileForm from "../../molecules/FileForm";
import Image from "next/image";
import IconButton from "../../atoms/IconButton";
import { useRouter } from "next/router";
import NftCard from "../../molecules/NftCard";
import { isValidAddressPolkadotAddress } from "../../../utils/strings";

const RentNftTemplate: React.FC<IRentNftTemplate> = ({
  nftImage,
  id,
  onSubmit,
  disabled,
  noTitle,
  hasBackBtn,
  action,
}) => {
  const router = useRouter();

  const schema = yup

    .object({
      nft_id: yup.string().required().label("NFT Id"),
      recipient: yup
        .string()
        .test(
          "validRecipientAddress",
          "Unvalid Address",
          (value) => isValidAddressPolkadotAddress(value as string)
        )
        .required()
        .label("Recipient Address"),
    })
    .required();

  const formData = useForm<INftFormResult>({
    resolver: yupResolver(schema),
    defaultValues: {
      nft_id: id,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = formData;

  const onClickSubmit = () => {
    handleSubmit((formResponse) => {
      onSubmit({ result: formResponse, formData });
    })();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center h-[max-content]">
        {action == "delegate" && (
          <div className="bg-gray-500 p-s20 flex-col rounded-[20px] mt-s24 mb-s40 max-w-[896px]">
            <div className="bg-gray-700 rounded-[8px] px-s16 py-s8 inline-flex">
              <Text
                text="Good to know !"
                type="label"
                weight="medium"
                color="gray-500"
              />
            </div>
            <div className="flex sm:flex-col md:flex-row">
              <div className="flex border-[3px] border-gray-300 bg-gray-50 rounded-xl my-s16 p-s8 md:mr-s16  items-center">
                <div className="mr-s16 min-w-[53px]">
                  <Image
                    src="/soulbound-token-illustration1.svg"
                    width="53"
                    height="69"
                    alt="soulbound-token-illustration1"
                  />
                </div>
                <Text
                  text="1- Renting is a powerful tool for the NFT owners to make more out of their NFTs. Give to the renter a temporary access to the NFT properties."
                  type="p3"
                  weight="medium"
                  color="gray-400"
                />
              </div>
              <div className="flex border-[3px] border-gray-300 bg-gray-50 rounded-xl my-s16 p-s8 items-center">
                <div className="mr-s16 min-w-[53px]">
                  <Image
                    src="/soulbound-token-illustration2.svg"
                    width="53"
                    height="69"
                    alt="soulbound-token-illustration2"
                  />
                </div>
                <Text
                  text="2- They can be used to give exclusive content such as gaming, music, ..."
                  type="p3"
                  weight="medium"
                  color="gray-400"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
          <div className="md:ml-s24 md:mb-[0px] flex flex-col justify-start">
            <NftCard id={id} preview={nftImage} isLoading={false} />
          </div>
          <div className="relative">
            <div
              className={`bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto ${
                noTitle ? "!pt-[0px]" : ""
              }`}
            >
              {hasBackBtn && (
                <IconButton
                  onClick={() => router.back()}
                  text="Back"
                  icon="ArrowLeft"
                  iconSize={16}
                  iconColor="white"
                  size="xsmall"
                  autoWidth
                  type="primary"
                  className="rounded-[20px] absolute -left-s8 -top-s16 maxmd:hidden"
                />
              )}
              {!noTitle && action == "rent" ? (
                <Text text="Rent your NFT" type="h3" weight="bold" />
              ) : (
                !noTitle &&
                action == "delegate" && (
                  <Text text="Delegate your NFT" type="h3" weight="bold" />
                )
              )}
              <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
                <Input
                  id="nft_id"
                  label="NFT Id"
                  placeholder={id}
                  required={true}
                  error={errors.nft_id?.message}
                  {...register("nft_id")}
                  disabled={true}
                />
                <Input
                  id="recipient"
                  label="Recipient address"
                  placeholder="Ex: 5cfg4…fDR76"
                  required={true}
                  error={errors.recipient?.message}
                  {...register("recipient")}
                />
                <div className="flex flex-1 items-end">
                  <Button
                    color="gray-50"
                    text={action == "delegate" ? "Delegate NFT" : "Rent NFT"}
                    type="primary"
                    size="medium"
                    className="mt-s20 md:mt-s32 bg-gray-300"
                    onClick={onClickSubmit}
                    disabled={disabled}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RentNftTemplate;
