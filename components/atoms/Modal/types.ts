import React from "react";

export interface IModal {
  children: React.ReactNode[] | React.ReactNode;
  isOpened: boolean;
  onClose?: () => void;
  className?: string;
  closeIconClassName?: string;
  closeIconColor?: string;
}
