import React from "react";
import Icon from "../Icon";
import { ICheckbox } from "./types";

const Checkbox: React.FC<ICheckbox> = ({
  checked,
  className = "",
  ...props
}) => {
  const checkedClasses =
    "bg-[#BC3748] border-[#BC3748] before:content-[url('/checked.svg')] before:flex before:scale-[1] before:mt-[4px]";

  return (
    <input
      type="checkbox"
      className={`flex justify-center items-center w-[31px] h-[31px] border-2 border-gray-800 rounded-md cursor-pointer ${
        checked ? checkedClasses : ""
      } ${className}`}
      checked={checked}
      {...props}
    />
  );
};

export default Checkbox;
