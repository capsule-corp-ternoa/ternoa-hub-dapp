import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateCollectionFilesForm from ".";
import { mockCreateCollectionFilesFormProps } from "./CreateCollectionFilesForm.mocks";
import { ICreateCollectionFilesForm } from "./types";
import { useForm } from "react-hook-form";
import { ICollectionFormResult } from "../../templates/CreateCollectionTemplate/types";

export default {
  title: "molecules/CreateCollectionFilesForm",
  component: CreateCollectionFilesForm,
  argTypes: { value: { control: { disabled: true } } },
} as ComponentMeta<typeof CreateCollectionFilesForm>;

const Template: ComponentStory<typeof CreateCollectionFilesForm> = (args) => {
  const [value, setValue] = useState<File>();
  const { control } = useForm<ICollectionFormResult>({});
  return (
    <CreateCollectionFilesForm
      {...args}
      control={control}
      logoValue={value}
      onSelectLogo={(file) => {
        args.onSelectLogo(file);
        setValue(file);
      }}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  ...mockCreateCollectionFilesFormProps.base,
} as ICreateCollectionFilesForm;
