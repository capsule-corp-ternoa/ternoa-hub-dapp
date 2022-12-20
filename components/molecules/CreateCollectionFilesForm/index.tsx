import Image from "next/image";
import React, { useRef } from "react";
import { Accept, DropzoneRef } from "react-dropzone";
import { Controller } from "react-hook-form";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { ICreateCollectionFilesForm } from "./types";

const CreateCollectionFilesForm: React.FC<ICreateCollectionFilesForm> = ({
  onSelectBanner,
  onSelectLogo,
  control,
  className = "",
  logoError,
  bannerError,
  ...props
}) => {
  const dropzoneRefLogo = useRef<DropzoneRef>(null);
  const dropzoneRefBanner = useRef<DropzoneRef>(null);

  const acceptedTypes: Accept = {
    "image/jpeg": [".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
  };

  const renderDescription = (description: string) => (
    <div className="md:mt-s20 mt-s8">
      <Text
        type="p3"
        color="text-gray-700"
        text={description}
        weight="medium"
        className="whitespace-pre"
      />
    </div>
  );

  return (
    <div
      className={`bg-gray-500 px-s16 md:px-s32 pb-s28 md:pb-s32 pt-[18px] rounded-[20px] w-full text-center md:text-left md:w-auto md:mb-[0px] mb-s32 pt-s8 h-[fit-content] ${className}`}
    >
      <Controller
        control={control}
        name="logo"
        render={({ field: { ref, ...fieldProps } }) => (
          <React.Fragment>
            <FileInput
              label="Logo image"
              required={true}
              onSelectFile={onSelectLogo}
              dropzoneRef={dropzoneRefLogo}
              accept={acceptedTypes}
              description={`We recommend an image of at least 300x300px. Max 5mb.`}
              error={logoError}
              {...fieldProps}
            />
            <div>
              <Button
                text="Choose File"
                type="tertiary"
                size="small"
                className="px-s28 mt-s20"
                autoWidth
                onClick={() => dropzoneRefLogo.current?.open()}
              />
            </div>
          </React.Fragment>
        )}
      />
      <Controller
        control={control}
        name="banner"
        render={({ field: { ref, ...fieldProps } }) => (
          <div className="mt-s40">
            <FileInput
              className="!w-[237px] !h-[203px] rounded-xl m-auto md:m-[0px]"
              previewClassName="!w-[237px] !h-[137px] rounded-xl"
              labelClassName="justify-center md:justify-start"
              label="Banner image"
              required={true}
              onSelectFile={onSelectBanner}
              dropzoneRef={dropzoneRefBanner}
              description={`The dimensions change on different devices.\n600 x 400px recommended.`}
              dropzoneIcon={
                <Image
                  src="/image.svg"
                  alt="Select logo"
                  width={59}
                  height={47}
                />
              }
              accept={acceptedTypes}
              error={bannerError}
              {...fieldProps}
            />
            <div>
              <Button
                text="Choose File"
                type="tertiary"
                size="small"
                className="px-s28 mt-s20"
                autoWidth
                onClick={() => dropzoneRefBanner.current?.open()}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CreateCollectionFilesForm;
