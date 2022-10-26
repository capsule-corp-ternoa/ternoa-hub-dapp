import Image from "next/image";
import React, { useRef } from "react";
import { Accept, DropzoneRef } from "react-dropzone";
import { Controller } from "react-hook-form";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import Text from "../../atoms/Text";
import { ISetMarketplaceConfigFilesForm } from "./types";

const SetMarketplaceConfigFilesForm: React.FC<ISetMarketplaceConfigFilesForm> = ({
  onSelectLogo,
  control,
  className = "",
  logoError,
  ...props
}) => {
  const dropzoneRefLogo = useRef<DropzoneRef>(null);

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
              className="!w-[95px] !h-[95px] rounded-full m-auto md:m-[0px]"
              previewClassName="!w-[95px] !h-[95px] rounded-full"
              labelClassName="justify-center md:justify-start"
              previewProps={{
                objectFit: "scale-down",
                height: 95,
                width: 95,
                className: "rounded-full",
              }}
              label="Logo image"
              required={true}
              onSelectFile={onSelectLogo}
              dropzoneRef={dropzoneRefLogo}
              accept={acceptedTypes}
              dropzoneIcon={
                <Image
                  src="/person.svg"
                  alt="Select logo"
                  width={30}
                  height={30}
                />
              }
              description={renderDescription(
                `We recommend an image of at \nleast 300x300px. Gifs work \ntoo. Max 5mb.`
              )}
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
    </div>
  );
};

export default SetMarketplaceConfigFilesForm;
