import React, { useCallback } from "react";
import Dropzone, { Accept } from "react-dropzone";
import Image from "next/image";
import Icon from "../Icon";
import Label from "../Label";
import { IFileInput } from "./types";

const FileInput: React.FC<IFileInput> = ({
  label,
  labelIcon,
  required,
  className = "",
  previewClassName = "",
  labelClassName = "",
  previewProps,
  dropzoneRef,
  dropzoneIcon,
  onSelectFile,
  accept,
  description,
  error,
  value: currentFile,
  ...props
}) => {
  const getPreview = useCallback((img: File) => {
    return URL.createObjectURL(img);
  }, []);

  const hasImageFiles = () => currentFile?.type.includes("image");

  const renderContent = (isDragActive: boolean) => {
    if (isDragActive) {
      return (
        <React.Fragment>
          <Icon
            name="ArrowFatLineDown"
            size={32}
            color="#94A3B8"
            className="block m-auto mb-s16"
          />
          Drop it!
        </React.Fragment>
      );
    } else if (currentFile) {
      if (hasImageFiles()) {
        const preview = getPreview(currentFile);
        return (
          <div className={`w-[210px] h-[190px] relative ${previewClassName}`}>
            <Image
              src={preview}
              alt="file-preview"
              layout="fill"
              objectFit="contain"
              onLoad={() => {
                URL.revokeObjectURL(preview);
              }}
              {...previewProps}
            />
          </div>
        );
      } else {
        return (
          <React.Fragment>
            <Icon
              name="File"
              size={32}
              color="#94A3B8"
              className="block m-auto mb-s16"
            />
            <p className="overflow-hidden text-ellipsis leading-loose">{currentFile.name}</p>
          </React.Fragment>
        );
      }
    } else if (dropzoneIcon) {
      return dropzoneIcon;
    } else {
      return (
        <Icon
          name="FileSearch"
          size={32}
          color="#94A3B8"
          className="block m-auto"
        />
      );
    }
  };

  const renderDescription = (accept: Accept) => {
    return (
      <div className="text-fs14 font-AirbnbCerealLight text-gray-400 md:w-[240px] mt-s8">
        <span className="text-gray-700 font-AirbnbCerealMedium">{`File types supported: `}</span>
        {Object.values(accept)
          .reduce((allTypes, types) => {
            types.map((type) => allTypes.push(type.replace(".", "")));
            return allTypes;
          }, [])
          .join(", ")
          .toUpperCase()}
      </div>
    );
  };

  const getContainerClasses = () => {
    if (error) {
      return "!border-red-300 ";
    } else if (hasImageFiles()) {
      return "!bg-[transparent] !border-[transparent] ";
    }
    return "";
  };

  return (
    <Dropzone
      ref={dropzoneRef}
      onDrop={(files) => onSelectFile(files[0])}
      multiple={false}
      accept={accept}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div {...getRootProps()}>
            {label && (
              <div className={`flex flex-row items-center ${labelClassName}`}>
                {labelIcon && (
                  <div className="mr-s8">
                    <Icon name={labelIcon} size={24} />
                  </div>
                )}
                <Label text={label} required={required} />
              </div>
            )}
            <input {...props} {...getInputProps({})} />
            <div
              className={`bg-gray-100 border-[3px] border-dashed border-gray-200 rounded-xl w-full h-[296px] md:w-[240px] md:h-[200px] 
              ${getContainerClasses()} flex items-center justify-center cursor-pointer ${className}`}
            >
              <div className="text-gray-400 font-AirbnbCerealMedium text-fs16 overflow-hidden whitespace-nowrap px-s4 flex">
                {renderContent(isDragActive)}
              </div>
            </div>
            <div className="text-fs12 font-AirbnbCerealMedium text-red-300 mt-s4 pl-s2">
              {error}
            </div>
            {description || (accept && renderDescription(accept))}
          </div>
        );
      }}
    </Dropzone>
  );
};

export default FileInput;
