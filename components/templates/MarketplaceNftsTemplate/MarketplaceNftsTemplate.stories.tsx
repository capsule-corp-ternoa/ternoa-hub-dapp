import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MarketplaceNftsTemplate from ".";
import { mockMarketplaceNftsTemplateProps } from "./MarketplaceNftsTemplate.mocks";
import { IMarketplaceNftsTemplate } from "./types";

export default {
  title: "templates/MarketplaceNftsTemplate",
  component: MarketplaceNftsTemplate,
  argTypes: {},
} as ComponentMeta<typeof MarketplaceNftsTemplate>;

const Template: ComponentStory<typeof MarketplaceNftsTemplate> = (args) => (
  <MarketplaceNftsTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockMarketplaceNftsTemplateProps.base,
} as IMarketplaceNftsTemplate;
