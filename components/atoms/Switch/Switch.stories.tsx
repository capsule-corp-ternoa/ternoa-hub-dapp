import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Switch from ".";
import { mockSwitchProps } from "./Switch.mocks";
import { ISwitch } from "./types";

export default {
  title: "atoms/Switch",
  component: Switch,
  argTypes: {
    type: { table: { disable: true } },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  ...mockSwitchProps.primary,
} as ISwitch;

Secondary.args = {
  ...mockSwitchProps.secondary,
} as ISwitch;
