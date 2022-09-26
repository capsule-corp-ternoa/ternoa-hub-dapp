import React from "react";
import { IModal } from "../../atoms/Modal/types";

export interface IAlertModal extends Omit<IModal, "children"> {
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
}
