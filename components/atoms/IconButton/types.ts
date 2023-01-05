import React from "react";
import { IconNamesType, IconSizeType } from "../Icon/types";

export type TButtonSize = "large" | "medium" | "small";
export type TButtonType = "primary" | "secondary" | "tertiary" | "danger";

export interface IButton extends Omit<React.ComponentProps<"button">, "type"> {
  text: string;
  icon:IconNamesType;
  iconSize:IconSizeType;
  iconColor:string;
  reversed:boolean;
  size: TButtonSize;
  type: TButtonType;
  autoWidth?: boolean;
  disabled?: boolean;
  className?: string;
  leftComponent?: React.ReactNode | React.ReactNode[];
}
