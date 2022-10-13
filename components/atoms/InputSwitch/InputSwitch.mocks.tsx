import { IInputSwitch } from "./types";

const primary: IInputSwitch = {
  placeholder: "Hello World!",
  type: "primary",
  id: "id"
};

const error: IInputSwitch = {
  placeholder: "Hello World!",
  type: "error",
  id: "id"
};

const disabled: IInputSwitch = {
  placeholder: "Hello World!",
  type: "disabled",
  id: "id"
};

export const mockInputSwitchProps = {
  primary,
  error,
  disabled,
};
