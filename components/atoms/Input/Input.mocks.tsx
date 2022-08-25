import { IInput } from "./types";

const primary: IInput = {
  placeholder: "Hello World!",
  type: "primary",
};

const error: IInput = {
  placeholder: "Hello World!",
  type: "error",
};

const disabled: IInput = {
  placeholder: "Hello World!",
  type: "disabled",
};

export const mockInputProps = {
  primary,
  error,
  disabled,
};
