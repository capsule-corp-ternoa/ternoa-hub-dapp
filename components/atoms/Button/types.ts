import React from "react";

export type TButtonSize = "large" | "medium" | "small";
export type TButtonType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "danger";

export interface IButton extends Omit<React.ComponentProps<"button">, "type"> {
  text: string;
  size: TButtonSize;
  type: TButtonType;
  autoWidth?: boolean;
  disabled?: boolean;
  className?: string;
  leftComponent?: React.ReactNode | React.ReactNode[];
}
