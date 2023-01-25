import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Accept } from "react-dropzone";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import Textarea from "../../atoms/Textarea";
import { ICreateNftTemplate, INftFormResult } from "./types";
import FileForm from "../../molecules/FileForm";
import Image from "next/image";
import IconButton from "../../atoms/IconButton";
import { useRouter } from "next/router";

const CreateNftTemplate: React.FC<ICreateNftTemplate> = ({
  onSubmit,
  disabled,
  noTitle,
  noQuantity,
  isSoulBound,
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>();
  const router = useRouter();
  const schema = yup
    .object({
      name: yup.string().required().label("Name"),
      description: yup.string().required().label("Description"),
      quantity: yup
        .number()
        .typeError("You must specify a quantity number")
        .integer()
        .positive()
        .required()
        .min(1)
        .max(1000)
        .label("Quantity"),
      collectionId: yup
        .number()
        .integer()
        .positive()
        .nullable(true)
        .transform((_, val) => (val !== "" ? Number(val) : null))
        .label("Collection ID"),
      royalty: yup
        .number()
        .typeError("You must specify a royalty number")
        .min(0)
        .max(100)
        .label("Royalty"),
      file: yup.mixed().required().label("File"),
      preview: yup.lazy(() => {
        if (isPreviewVisible) {
          return yup.mixed().required().label("Preview");
        } else {
          return yup.mixed().notRequired();
        }
      }),
    })
    .required();

  const formData = useForm<INftFormResult>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: noQuantity ? 1 : undefined,
    },
  });

  const fileValue = formData.getValues("file");

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    control,
  } = formData;

  useEffect(() => {
    const isImage = fileValue?.type.includes("image");
    setIsPreviewVisible(fileValue && !isImage);
  }, [fileValue]);

  const _onSelectFile = (file: File) => {
    clearErrors("file");
    setValue("file", file);
  };

  const _onSelectPreview = (file: File) => {
    clearErrors("preview");
    setValue("preview", file);
  };

  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
    "video/mp4": [".mp4"],
    "video/webm": [".webm"],
    "video/quicktime": [".mov"],
    "video/x-msvideo": [".avi"],
    "video/ogg": [".ogg"],
    "audio/mpeg": [".mp3"],
    "audio/wav": [".wav"],
    "application/pdf": [".pdf"],
    "application/zip": [".zip"],
  };

  const acceptedPreviewTypes: Accept = {
    "image/jpeg": [".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
  };

  const onClickSubmit = () => {
    handleSubmit((formResponse) => {
      onSubmit({ result: formResponse, formData, isSoulBound: isSoulBound ?? false });
    })();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center h-[max-content]">
        {isSoulBound && (
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
                  text="1- They are non-transferable and public-verifiable digital tokens. Once you acquire one, it will always be tied to your personal wallet."
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
                  text="2- They can be used for immutable records such as a badge, a DiD, a pass..."
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

            <Controller
              control={control}
              name="file"
              render={({ field: { ref, ...fieldProps } }) => (
                <FileForm
                  label="NFT file"
                  required={true}
                  labelIcon="Eye"
                  onSelectFile={_onSelectFile}
                  accept={acceptedFileTypes}
                  className="mb-s24 md:mb-s8"
                  error={errors.file?.message}
                  {...fieldProps}
                />
              )}
            />
            {isPreviewVisible && (
              <Controller
                control={control}
                name="preview"
                render={({ field: { ref, ...fieldProps } }) => (
                  <FileForm
                    label="NFT preview"
                    required={true}
                    labelIcon="Eye"
                    onSelectFile={_onSelectPreview}
                    accept={acceptedPreviewTypes}
                    className="md:mt-s8 mb-s24 md:mb-[0px]"
                    error={errors.preview?.message}
                    {...fieldProps}
                  />
                )}
              />
            )}
          </div>
          <div className="relative">
            <div
              className={`bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto ${noTitle ? "!pt-[0px]" : ""
                }`}
            >

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
              {!noTitle && !isSoulBound ? (
                <Text text="Create your NFT" type="h3" weight="bold" />
              ) : (
                !noTitle &&
                isSoulBound && (
                  <Text
                    text="Create your soulbound Token"
                    type="h3"
                    weight="bold"
                  />
                )
              )}
              <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
                <Input
                  id="name"
                  label="Name"
                  placeholder="NFT's name"
                  required={true}
                  error={errors.name?.message}
                  {...register("name")}
                />
                <Textarea
                  id="description"
                  label="Description"
                  required={true}
                  placeholder="Tell about the NFT in a few words"
                  rows={5}
                  style={{ resize: "none" }}
                  error={errors.description?.message}
                  {...register("description")}
                />
                <Input
                  id="quantity"
                  label="Quantity"
                  required={true}
                  placeholder="Maximum 1000"
                  error={errors.quantity?.message}
                  inputType="number"
                  min={1}
                  max={1000}
                  type={noQuantity ? "disabled" : "primary"}
                  {...register("quantity")}
                />
                {!isSoulBound && (
                  <Input
                    id="royalty"
                    label="Royalty"
                    placeholder="Ex: 8%"
                    required={true}
                    error={errors.royalty?.message}
                    defaultValue={undefined}
                    inputType="number"
                    min={0}
                    max={100}
                    {...register("royalty")}
                  />
                )}
                <Input
                  id="collectionId"
                  label="Collection ID"
                  placeholder="Id of the collection"
                  error={errors.collectionId?.message}
                  defaultValue={undefined}
                  inputType="number"
                  {...register("collectionId")}
                />


                <div className="flex flex-1 items-end">
                  <Button
                    color="gray-50"
                    text={isSoulBound ? "Create SBT" : "Create NFT"}
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

export default CreateNftTemplate;
