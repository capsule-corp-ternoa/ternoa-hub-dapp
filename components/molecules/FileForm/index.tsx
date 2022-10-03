import React, { useRef } from "react";
import { DropzoneRef } from "react-dropzone";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import { IFileForm } from "./types";

const FileForm: React.FC<IFileForm> = ({
  description,
  onSelectFile,
  accept,
  className = "",
  ...props
}) => {
  const dropzoneRef = useRef<DropzoneRef>(null);

  const getPaddingTop = () => {
    if (props.label) {
      return "pt-s8";
    } else {
      return "pt-s28 md:pt-s32";
    }
  };

  return (
    <div
      className={`bg-gray-500 px-s16 md:px-s32 pb-s28 md:pb-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto ${getPaddingTop()} ${className}`}
    >
      <FileInput
        {...props}
        onSelectFile={onSelectFile}
        dropzoneRef={dropzoneRef}
        accept={accept}
      />
      <div>
        <Button
          text="Choose File"
          type="tertiary"
          size="small"
          className="px-s28 mt-s20"
          onClick={() => dropzoneRef.current?.open()}
        />
      </div>
    </div>
  );
};

export default FileForm;
