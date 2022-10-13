import React from "react";
import Icon from "../../atoms/Icon";
import Modal from "../../atoms/Modal";
import Text from "../../atoms/Text";
import { IIconModal } from "./types";

const IconModal: React.FC<IIconModal> = ({
  title,
  className,
  iconName,
  iconComponent,
  body,
  ...props
}) => {
  return (
    <Modal {...props}>
      <div
        className={`w-[340px] h-[240px] md:w-[450px] md:h-[350px] flex flex-col justify-center items-center p-s16 md:p-s24 text-center ${className}`}
      >
        {iconComponent
          ? iconComponent
          : iconName && <Icon name={iconName} size={64} />}
        {title && (
          <Text type="h5" weight="bold" text={title} className="mt-s16" />
        )}
        {body && (
          <Text
            type="p1"
            weight="light"
            text={body}
            color="text-gray-400 mt-s16"
          />
        )}
      </div>
    </Modal>
  );
};

export default IconModal;
