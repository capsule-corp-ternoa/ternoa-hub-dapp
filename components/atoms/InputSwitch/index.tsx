import React from "react";
import { IInputSwitch } from "./types";
import Input from "../Input";
import Switch from "../Switch";

const InputSwitch: React.FC<IInputSwitch> = ({
  type = "primary",
  value,
  switchType,
  label,
  leftIcon,
  ...props
}) => {
  const isDisabledType = type === "disabled";
  return (
    <Input
      type={type}
      readOnly
      value={!isDisabledType ? value : undefined}
      placeholder={isDisabledType ? value : undefined}
      required={props.required}
      label={label}
      leftIcon={leftIcon}
      rightComponent={
        <Switch {...props} type={switchType} disabled={type === "disabled"} />
      }
      rightPadding={75}
    />
  );
};

export default InputSwitch;
