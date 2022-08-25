import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FileForm from ".";
import { mockFileFormProps } from "./FileForm.mocks";
import { IFileForm } from "./types";

export default {
  title: "molecules/FileForm",
  component: FileForm,
  argTypes: { value: { control: { disabled: true } } },
} as ComponentMeta<typeof FileForm>;

const Template: ComponentStory<typeof FileForm> = (args) => {
  const [value, setValue] = useState<File>();
  return (
    <FileForm
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
  ...mockFileFormProps.base,
} as IFileForm;
