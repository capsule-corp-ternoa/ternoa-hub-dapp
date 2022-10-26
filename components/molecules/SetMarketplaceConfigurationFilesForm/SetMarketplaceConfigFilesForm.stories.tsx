import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SetMarketplaceConfigFilesForm from ".";
import { mockSetMarketplaceConfigFilesFormProps } from "./SetMarketplaceConfigFilesForm.mocks";
import { ISetMarketplaceConfigFilesForm } from "./types";
import { useForm } from "react-hook-form";
import { IMarketplaceConfigurationFormResult } from "../../templates/SetMarketplaceConfigurationTemplate/types";

export default {
  title: "molecules/SetMarketplaceConfigFilesForm",
  component: SetMarketplaceConfigFilesForm,
  argTypes: { value: { control: { disabled: true } } },
} as ComponentMeta<typeof SetMarketplaceConfigFilesForm>;

const Template: ComponentStory<typeof SetMarketplaceConfigFilesForm> = (args) => {
  const [value, setValue] = useState<File>();
  const { control } = useForm<IMarketplaceConfigurationFormResult>({});
  return (
    <SetMarketplaceConfigFilesForm
      {...args}
      control={control}
      logoValue={value}
      onSelectLogo={(file: File) => {
        args.onSelectLogo(file);
        setValue(file);
      }}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  ...mockSetMarketplaceConfigFilesFormProps.base,
} as ISetMarketplaceConfigFilesForm;
