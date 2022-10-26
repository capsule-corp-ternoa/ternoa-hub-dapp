import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SetMarketplaceConfigurationTemplate from ".";
import { mockSetMarketplaceConfigurationTemplateProps } from "./SetMarketplaceConfigurationTemplate.mocks";
import { ISetMarketplaceConfigurationTemplate } from "./types";

export default {
  title: "templates/SetMarketplaceConfigurationTemplate",
  component: SetMarketplaceConfigurationTemplate,
  argTypes: {},
} as ComponentMeta<typeof SetMarketplaceConfigurationTemplate>;

const Template: ComponentStory<typeof SetMarketplaceConfigurationTemplate> = (args) => (
  <SetMarketplaceConfigurationTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSetMarketplaceConfigurationTemplateProps.base,
} as ISetMarketplaceConfigurationTemplate;
