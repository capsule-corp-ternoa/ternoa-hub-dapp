import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RentNftTemplate from ".";
import { mockRentNftTemplateProps } from "./RentNftTemplate.mocks";
import { IRentNftTemplate } from "./types";

export default {
  title: "templates/RentNftTemplate",
  component: RentNftTemplate,
  argTypes: {},
} as ComponentMeta<typeof RentNftTemplate>;

const Template: ComponentStory<typeof RentNftTemplate> = (args) => (
  <RentNftTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockRentNftTemplateProps.base,
} as IRentNftTemplate;
