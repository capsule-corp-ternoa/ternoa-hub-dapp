import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FileInput from ".";
import { mockFileInputProps } from "./FileInput.mocks";
import { IFileInput } from "./types";

export default {
  title: "atoms/FileInput",
  component: FileInput,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => {
  const [value, setValue] = useState<File>();
  return (
    <FileInput
      {...args}
      value={value}
      onSelectFile={(file) => {
        args.onSelectFile(file);
        setValue(file);
      }}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  ...mockFileInputProps.base,
} as IFileInput;
