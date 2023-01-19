import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZoomModal from ".";
import { mockZoomModalProps } from "./ZoomModal.mocks";
import { IZoomModal } from "./types";

export default {
  title: "organisms/modals/ZoomModal",
  component: ZoomModal,
  argTypes: {},
} as ComponentMeta<typeof ZoomModal>;

const Template: ComponentStory<typeof ZoomModal> = (args) => {
  return <ZoomModal {...args} />;
};

export const Base = Template.bind({});

Base.args = {
  ...mockZoomModalProps.base,
} as IZoomModal;
