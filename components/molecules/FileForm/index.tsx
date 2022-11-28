import React, { useRef } from "react";
import { DropzoneRef } from "react-dropzone";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import FormCard from "../FormCard";
import { IFileForm } from "./types";

const FileForm: React.FC<IFileForm> = ({
  description,
  onSelectFile,
  accept,
  className = "",
  isBackButtonHidden,
  ...props
}) => {
  const dropzoneRef = useRef<DropzoneRef>(null);

  const getPaddingTop = () => {
    if (props.label) {
      return "!pt-s16";
    } else {
      return "!pt-s28 !md:pt-s32";
    }
  };

  return (
    <FormCard
      isBackButtonHidden={isBackButtonHidden}
      className={`${getPaddingTop()} ${className}`}
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
    </FormCard>
  );
};

export default FileForm;
