import { Accept, DropzoneRef } from "react-dropzone";
import { IconNamesType } from "../Icon/types";

export interface IFileInput
  extends Omit<React.ComponentProps<"input">, "accept" | "value"> {
  label?: string;
  labelIcon?: IconNamesType;
  required?: boolean;
  className?: string;
  accept?: Accept;
  onSelectFile: (file: File) => void;
  description?: React.ReactNode | React.ReactNode[];
  dropzoneRef?: React.Ref<DropzoneRef>;
  error?: string;
  value?: File;
}
