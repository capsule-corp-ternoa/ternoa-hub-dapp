import React, { useState } from "react";
import Input from "../Input";
import { IColorInput } from "./types";

const ColorInput = React.forwardRef<HTMLInputElement, IColorInput>(
  ({ initialValue, ...props }, ref) => {
    const [color, setColor] = useState<string | undefined>(initialValue);

    const hasColor = color && color.length === 7;

    return (
      <Input
        {...props}
        ref={ref}
        onChange={(e) => {
          setColor(e.target.value);
          props.onChange && props.onChange(e);
        }}
        maxLength={7}
        leftComponentClassname="!top-[8px]"
        leftPadding={65}
        leftComponent={
          <div
            className={`w-[56px] h-[31px] rounded-lg ${
              !hasColor ? "border-2 border-gray-300 border-solid" : ""
            }`}
            style={{
              backgroundColor: hasColor ? color : undefined,
            }}
          />
        }
      />
    );
  }
);

ColorInput.displayName = "ColorInput";
export default ColorInput;
