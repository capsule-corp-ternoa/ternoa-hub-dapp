import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NetworkSelectorButton from ".";
import { mockNetworkSelectorButtonProps } from "./NetworkSelectorButton.mocks";
import { INetworkSelectorButton } from "./types";

export default {
  title: "molecules/NetworkSelectorButton",
  component: NetworkSelectorButton,
  argTypes: {},
} as ComponentMeta<typeof NetworkSelectorButton>;

const Template: ComponentStory<typeof NetworkSelectorButton> = (args) => (
  <NetworkSelectorButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNetworkSelectorButtonProps.base,
} as INetworkSelectorButton;
