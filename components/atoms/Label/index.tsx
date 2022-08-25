import React from "react";
import { ILabel } from "./types";

const Label: React.FC<ILabel> = ({ text, required, ...props }) => {
  return (
    <label
      {...props}
      className="inline-block	font-AirbnbCerealBold text-f16 md:text-fs20 py-[10px] text-black-default"
    >
      {text}
      {required && <span className="text-fs18 text-red-500">{` *`}</span>}
    </label>
  );
};

export default Label;
