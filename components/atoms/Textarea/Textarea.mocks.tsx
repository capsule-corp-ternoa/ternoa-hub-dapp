import { ITextarea } from "./types";

const primary: ITextarea = {
  placeholder: "Hello World!",
  label: 'Label',
  type: "primary",
};

const error: ITextarea = {
  placeholder: "Hello World!",
  type: "error",
};

const disabled: ITextarea = {
  placeholder: "Hello World!",
  type: "disabled",
};

export const mockTextareaProps = {
  primary,
  error,
  disabled,
};
