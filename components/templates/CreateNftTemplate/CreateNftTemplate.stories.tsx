import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateNftTemplate from ".";
import { mockCreateNftTemplateProps } from "./CreateNftTemplate.mocks";
import { ICreateNftTemplate } from "./types";

export default {
  title: "templates/CreateNftTemplate",
  component: CreateNftTemplate,
  argTypes: {},
} as ComponentMeta<typeof CreateNftTemplate>;

const Template: ComponentStory<typeof CreateNftTemplate> = (args) => (
  <CreateNftTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCreateNftTemplateProps.base,
} as ICreateNftTemplate;
