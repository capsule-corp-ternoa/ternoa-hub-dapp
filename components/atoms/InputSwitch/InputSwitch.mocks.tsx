import { IInputSwitch } from "./types";

const primary: IInputSwitch = {
  placeholder: "Hello World!",
  type: "primary",
  id: "id",
  ref: undefined
};

const error: IInputSwitch = {
  placeholder: "Hello World!",
  type: "error",
  id: "id",
  ref: undefined
};

const disabled: IInputSwitch = {
  placeholder: "Hello World!",
  type: "disabled",
  id: "id",
  ref: undefined
};

export const mockInputSwitchProps = {
  primary,
  error,
  disabled,
};
