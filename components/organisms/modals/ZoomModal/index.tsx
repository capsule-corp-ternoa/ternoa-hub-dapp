import React, { useState } from "react";
import Icon from "../../../atoms/Icon";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { IZoomModal } from "./types";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImagePreview from "../../../atoms/ImagePreview";
const ZoomModal: React.FC<IZoomModal> = ({
  imageSrc, imageAlt, loader, ...props
}) => {

  return (
    <Modal {...props} closeIconColor="black">
        <TransformWrapper>
          <TransformComponent wrapperClass="rounded-xl max-h-[92vh] max-w-[92vw]">
            <ImagePreview
              src={imageSrc}
              alt={imageAlt}
              loader={loader}
              cover={true}
              className="rounded-xl"
            />
          </TransformComponent>
        </TransformWrapper>
      </Modal>
  );
};

export default ZoomModal;
