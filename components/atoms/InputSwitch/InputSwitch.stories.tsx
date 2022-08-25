import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputSwitch from "./index";
import { mockInputSwitchProps } from "./InputSwitch.mocks";
import { IInputSwitch } from "./types";

export default {
  title: "templates/InputSwitch",
  component: InputSwitch,
  argTypes: {
    type: { table: { disable: true } },
    required: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof InputSwitch>;

const Template: ComponentStory<typeof InputSwitch> = (args) => (
  <InputSwitch {...args} />
);

export const Primary = Template.bind({});
export const Error = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
  ...mockInputSwitchProps.primary,
} as IInputSwitch;

Error.args = {
  ...mockInputSwitchProps.error,
} as IInputSwitch;

Disabled.args = {
  ...mockInputSwitchProps.disabled,
} as IInputSwitch;
