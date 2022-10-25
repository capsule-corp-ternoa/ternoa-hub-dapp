import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateMarketplaceTemplate from ".";
import { mockCreateMarketplaceTemplateProps } from "./CreateMarketplaceTemplate.mocks";
import { ICreateMarketplaceTemplate } from "./types";

export default {
  title: "templates/CreateMarketplaceTemplate",
  component: CreateMarketplaceTemplate,
  argTypes: {},
} as ComponentMeta<typeof CreateMarketplaceTemplate>;

const Template: ComponentStory<typeof CreateMarketplaceTemplate> = (args) => (
  <CreateMarketplaceTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCreateMarketplaceTemplateProps.base,
} as ICreateMarketplaceTemplate;
