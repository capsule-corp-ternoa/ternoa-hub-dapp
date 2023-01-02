import React from "react";
import { IconNamesType } from "../../atoms/Icon/types";
import { IModal } from "../../atoms/Modal/types";

export interface IIconModal extends Omit<IModal, "children"> {
  title?: string;
  iconName?: IconNamesType;
  iconComponent?: React.ReactNode | React.ReactNode[];
  body?: string;
  className?: string;
  buttonText?: string;
  onClickButton?: () => void;
}
