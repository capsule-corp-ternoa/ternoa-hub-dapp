import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NftDetailTemplate from ".";
import { mockNftDetailTemplateProps } from "./NftDetailTemplate.mocks";
import { INftDetailTemplate } from "./types";

export default {
  title: "templates/NftDetailTemplate",
  component: NftDetailTemplate,
  argTypes: {},
} as ComponentMeta<typeof NftDetailTemplate>;

const Template: ComponentStory<typeof NftDetailTemplate> = (args) => (
  <NftDetailTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNftDetailTemplateProps.base,
} as INftDetailTemplate;