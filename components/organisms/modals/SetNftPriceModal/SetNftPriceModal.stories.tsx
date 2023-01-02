import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SetNftPriceModal from ".";
import { mockSetNftPriceModalProps } from "./SetNftPriceModal.mocks";
import { ISetNftPriceModal } from "./types";

export default {
  title: "organisms/modals/SetNftPriceModal",
  component: SetNftPriceModal,
  argTypes: {},
} as ComponentMeta<typeof SetNftPriceModal>;

const Template: ComponentStory<typeof SetNftPriceModal> = (args) => (
  <SetNftPriceModal {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSetNftPriceModalProps.base,
} as ISetNftPriceModal;
