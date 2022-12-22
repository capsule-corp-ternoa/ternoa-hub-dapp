import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Checkbox from ".";
import { mockCheckboxProps } from "./Checkbox.mocks";
import { ICheckbox } from "./types";

export default {
  title: "atoms/Checkbox",
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCheckboxProps.base,
} as ICheckbox;
