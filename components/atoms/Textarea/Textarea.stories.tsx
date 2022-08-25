import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Textarea from ".";
import { mockTextareaProps } from "./Textarea.mocks";
import { ITextarea } from "./types";

const BaseTextArea: React.FC<ITextarea> = (props) => (
  <Textarea {...props} ref={undefined} />
);

export default {
  title: "atoms/Textarea",
  component: BaseTextArea,
  argTypes: {
    type: { table: { disable: true } },
    required: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof BaseTextArea>;

const Template: ComponentStory<typeof BaseTextArea> = (args) => (
  <BaseTextArea {...args} />
);

export const Primary = Template.bind({});
export const Error = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
  ...mockTextareaProps.primary,
} as ITextarea;

Error.args = {
  ...mockTextareaProps.error,
} as ITextarea;

Disabled.args = {
  ...mockTextareaProps.disabled,
} as ITextarea;
