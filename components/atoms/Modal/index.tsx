import React, { useEffect } from "react";
import Icon from "../Icon";
import { IModal } from "./types";

const Modal: React.FC<IModal> = ({
  isOpened,
  onClose,
  className = "",
  containerClassName = "",
  closeIconClassName = "",
  closeIconColor = "#CBD5E1",
  children,
}) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened]);

  return isOpened ? (
    <React.Fragment>
      <div
        style={{ inset: 0 }}
        className={
          "fixed flex flex-col justify-center items-center z-[10] bg-white-default/50 backdrop-blur-[4px] w-full h-full inset-0"
        }
        onClick={() => onClose && onClose()}
      />
      <div
        className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[12] ${containerClassName}`}
      >
        <div
          className={`flex flex-inline bg-white-default border-gray-200 border-2 border-solid rounded-xl ${className}`}
        >
          {onClose && (
            <div
              onClick={() => onClose()}
              className={`fixed top-s16 right-s16 cursor-pointer ${closeIconClassName}`}
            >
              <Icon name="X" size={20} color={closeIconColor} weight="bold" />
            </div>
          )}
          {children}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Modal;
