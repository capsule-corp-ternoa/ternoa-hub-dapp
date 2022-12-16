import { ImageProps } from "next/image";
import { Accept, DropzoneRef, DropzoneOptions } from "react-dropzone";
import { IconNamesType } from "../Icon/types";

export interface IFileInput
  extends Omit<React.ComponentProps<"input">, "accept" | "value"> {
  label?: string;
  labelIcon?: IconNamesType;
  labelClassName?: string;
  required?: boolean;
  className?: string;
  previewClassName?: string;
  previewProps?: Omit<ImageProps, "src">;
  accept?: Accept;
  onSelectFile: (file: File) => void;
  description?: React.ReactNode | React.ReactNode[];
  dropzoneIcon?: React.ReactNode | React.ReactNode[];
  dropzoneRef?: React.Ref<DropzoneRef>;
  error?: string;
  value?: File;
  dropzoneOptions?: DropzoneOptions;
}
