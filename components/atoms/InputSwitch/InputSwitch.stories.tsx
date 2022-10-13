import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputSwitch from "./index";
import { mockInputSwitchProps } from "./InputSwitch.mocks";
import { IInputSwitch } from "./types";

const BaseInputSwitch: React.FC<IInputSwitch> = (props) => (
  <InputSwitch {...props} ref={undefined} />
);

export default {
  title: "atoms/InputSwitch",
  component: BaseInputSwitch,
  argTypes: {
    type: { table: { disable: true } },
    required: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof BaseInputSwitch>;

const Template: ComponentStory<typeof BaseInputSwitch> = (args) => (
  <BaseInputSwitch {...args} />
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
