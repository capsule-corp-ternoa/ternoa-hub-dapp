import React from "react";
import { IInputSwitch } from "./types";
import Input from "../Input";
import Switch from "../Switch";

const InputSwitch = React.forwardRef<HTMLInputElement, IInputSwitch>(
  (
    {
      type,
      value,
      placeholder,
      switchType,
      label,
      leftIcon,
      error,
      onClickInput,
      ...props
    },
    ref
  ) => {
    const isDisabledType = type === "disabled";
    return (
      <Input
        type={type}
        readOnly
        value={!isDisabledType ? placeholder : undefined}
        placeholder={isDisabledType ? placeholder : undefined}
        required={props.required}
        onClick={onClickInput}
        className="cursor-pointer"
        label={label}
        leftIcon={leftIcon}
        rightComponent={
          <Switch
            {...props}
            type={switchType}
            disabled={type === "disabled"}
            ref={ref}
          />
        }
        rightPadding={75}
        error={error}
      />
    );
  }
);

InputSwitch.displayName = "InputSwitch";
export default InputSwitch;
