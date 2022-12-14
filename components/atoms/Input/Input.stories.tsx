import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from ".";
import Icon from "../Icon";
import { mockInputProps } from "./Input.mocks";
import { IInput } from "./types";

export const BaseInput: React.FC<IInput> = (props) => (
  <Input {...props} ref={undefined} />
);

export default {
  title: "atoms/Input",
  component: BaseInput,
  argTypes: {
    type: { table: { disable: true } },
    required: {
      control: "boolean",
    },
    leftComponent: {
      options: ["None", "Eye Icon"],
      mapping: {
        None: null,
        "Eye Icon": <Icon name="Eye" size={24} />,
      },
    },
  },
} as ComponentMeta<typeof BaseInput>;

const Template: ComponentStory<typeof BaseInput> = (args) => <BaseInput {...args} />;

export const Primary = Template.bind({});
export const Error = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
  ...mockInputProps.primary,
} as IInput;

Error.args = {
  ...mockInputProps.error,
} as IInput;

Disabled.args = {
  ...mockInputProps.disabled,
} as IInput;
