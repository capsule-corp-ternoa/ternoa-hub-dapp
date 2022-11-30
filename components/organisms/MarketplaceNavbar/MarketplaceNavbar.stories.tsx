import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MarketplaceNavbar from ".";
import { mockMarketplaceNavbarProps } from "./MarketplaceNavbar.mocks";
import { IMarketplaceNavbar } from "./types";

export default {
  title: "organisms/MarketplaceNavbar",
  component: MarketplaceNavbar,
  argTypes: {},
} as ComponentMeta<typeof MarketplaceNavbar>;

const Template: ComponentStory<typeof MarketplaceNavbar> = (args) => <MarketplaceNavbar {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockMarketplaceNavbarProps.base,
} as IMarketplaceNavbar;
