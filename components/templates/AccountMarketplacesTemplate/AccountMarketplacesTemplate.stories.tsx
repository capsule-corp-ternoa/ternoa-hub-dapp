import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AccountMarketplacesTemplate from ".";
import { mockAccountMarketplacesTemplateProps } from "./AccountMarketplacesTemplate.mocks";
import { IAccountMarketplacesTemplate } from "./types";

export default {
  title: "templates/AccountMarketplacesTemplate",
  component: AccountMarketplacesTemplate,
  argTypes: {},
} as ComponentMeta<typeof AccountMarketplacesTemplate>;

const Template: ComponentStory<typeof AccountMarketplacesTemplate> = (args) => (
  <AccountMarketplacesTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAccountMarketplacesTemplateProps.base,
} as IAccountMarketplacesTemplate;
