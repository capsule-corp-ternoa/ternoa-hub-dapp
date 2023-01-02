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

const CreateNftTemplate: React.FC<ICreateNftTemplate> = ({
  onSubmit,
  disabled,
  noTitle,
  noQuantity,
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>();

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
      onSubmit({ result: formResponse, formData });
    })();
  };

  return (
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
      <div
        className={`bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto ${
          noTitle ? "!pt-[0px]" : ""
        }`}
      >
        {!noTitle && <Text text="Create your NFT" type="h3" weight="bold" />}
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
              text="Create NFT"
              type="primary"
              size="medium"
              className="mt-s20 md:mt-s32"
              onClick={onClickSubmit}
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNftTemplate;
