import { ImageProps } from "next/image";
import React from "react";
import { ICard } from "../../atoms/Card/types";

export interface IActionCard {
  imgComponent?: React.ReactNode | React.ReactNode[];
  imgProps?: ImageProps;
  title: string;
  body?: string;
  action: string;
  onClickAction?: () => void;
  className?: string;
  disabled?: boolean;
}
