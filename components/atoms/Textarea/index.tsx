import React from "react";
import { getColorsClassesByType } from "../Input";
import Label from "../Label";
import { ITextarea } from "./types";

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
  ({ error, type = error ? "error" : "primary", label, ...props }, ref) => {
    return (
      <div className="py-[10px] md:pt-[12px] md:pb-s4">
        {label && (
          <Label text={label} htmlFor={props.id} required={props.required} />
        )}
        <div className="group relative w-full md:w-[504px]">
          <textarea
            ref={ref}
            {...props}
            className={`w-full border-2 border-solid rounded-xl px-s16 py-[10px] text-fs18 font-AirbnbCerealMedium ${getColorsClassesByType(
              type
            )}`}
            disabled={type === "disabled"}
          />
          <div className="text-fs12 font-AirbnbCerealMedium text-red-300 pl-s2">
            {error}
          </div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
