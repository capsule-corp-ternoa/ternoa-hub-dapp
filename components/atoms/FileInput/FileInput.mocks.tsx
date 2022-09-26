import { IFileInput } from "./types";

const base: IFileInput = {
  label: "Image",
  labelIcon: "Eye",
  onSelectFile: () => {}
};

export const mockFileInputProps = {
  base,
};
