import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FloatingAction from ".";
import { mockFloatingActionProps } from "./FloatingAction.mocks";
import { IFloatingAction } from "./types";

export default {
  title: "molecules/FloatingAction",
  component: FloatingAction,
  argTypes: {},
} as ComponentMeta<typeof FloatingAction>;

const Template: ComponentStory<typeof FloatingAction> = (args) => (
  <FloatingAction {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockFloatingActionProps.base,
} as IFloatingAction;
