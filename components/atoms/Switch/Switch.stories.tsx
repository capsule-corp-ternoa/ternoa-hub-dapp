import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Switch from ".";
import { mockSwitchProps } from "./Switch.mocks";
import { ISwitch } from "./types";

const BaseSwitch: React.FC<ISwitch> = (props) => (
  <Switch {...props} ref={undefined} />
);

export default {
  title: "atoms/Switch",
  component: BaseSwitch,
  argTypes: {
    type: { table: { disable: true } },
  },
} as ComponentMeta<typeof BaseSwitch>;

const Template: ComponentStory<typeof BaseSwitch> = (args) => (
  <BaseSwitch {...args} />
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  ...mockSwitchProps.primary,
} as ISwitch;

Secondary.args = {
  ...mockSwitchProps.secondary,
} as ISwitch;
