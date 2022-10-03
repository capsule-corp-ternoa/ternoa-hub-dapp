import { IFileForm } from "./types";

const base: IFileForm = {
  label: "Image",
  labelIcon: "Eye",
  onSelectFile: () => {},
  accept: { "image/*": [".png", ".jpg", ".gif", ".svg"] },
};

export const mockFileFormProps = {
  base,
};
