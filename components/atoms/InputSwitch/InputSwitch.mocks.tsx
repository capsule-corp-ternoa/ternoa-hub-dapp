import { IInputSwitch } from "./types";

const primary: IInputSwitch = {
  value: "Hello World!",
  type: "primary",
  id: "id"
};

const error: IInputSwitch = {
  value: "Hello World!",
  type: "error",
  id: "id"
};

const disabled: IInputSwitch = {
  value: "Hello World!",
  type: "disabled",
  id: "id"
};

export const mockInputSwitchProps = {
  primary,
  error,
  disabled,
};
