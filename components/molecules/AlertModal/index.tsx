import React from "react";
import Icon from "../../atoms/Icon";
import Modal from "../../atoms/Modal";
import Text from "../../atoms/Text";
import { IAlertModal } from "./types";

const AlertModal: React.FC<IAlertModal> = ({ title, children, ...props }) => {
  return (
    <Modal {...props}>
      <div className="w-[340px] h-[240px] md:w-[450px] md:h-[350px] flex flex-col justify-center items-center p-s16 md:p-s24 text-center">
        <Icon name="Warning" size={64} />
        {title && (
          <Text type="h5" weight="bold" text={title} className="mt-s16" />
        )}
        {children}
      </div>
    </Modal>
  );
};

export default AlertModal;
