import React, { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NetworkSelectorMenu from ".";
import { mockNetworkSelectorMenuProps } from "./NetworkSelectorMenu.mocks";
import { INetworkSelectorMenu } from "./types";

export default {
  title: "molecules/NetworkSelectorMenu",
  component: NetworkSelectorMenu,
  argTypes: {},
} as ComponentMeta<typeof NetworkSelectorMenu>;

const Template: ComponentStory<typeof NetworkSelectorMenu> = (args) => {
  return <NetworkSelectorMenu {...args} ref={undefined} state={"open"} />;
};

export const Base = Template.bind({});

Base.args = {
  ...mockNetworkSelectorMenuProps.base,
} as INetworkSelectorMenu;
