import { IFileInput } from "../../atoms/FileInput/types";

export interface IFileForm extends IFileInput {
  onSelectFile: (file: File) => void;
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
}
