import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ColorInput from ".";
import { mockColorInputProps } from "./ColorInput.mocks";
import { IColorInput } from "./types";

export const BaseColorInput: React.FC<IColorInput> = (props) => (
  <ColorInput {...props} ref={undefined} />
);

export default {
  title: "atoms/ColorInput",
  component: ColorInput,
  argTypes: {},
} as ComponentMeta<typeof BaseColorInput>;

const Template: ComponentStory<typeof BaseColorInput> = (args) => (
  <BaseColorInput {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockColorInputProps.base,
} as IColorInput;
