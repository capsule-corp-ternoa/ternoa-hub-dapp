import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateCollectionTemplate from ".";
import { mockCreateCollectionTemplateProps } from "./CreateCollectionTemplate.mocks";
import { ICreateCollectionTemplate } from "./types";

export default {
  title: "templates/CreateCollectionTemplate",
  component: CreateCollectionTemplate,
  argTypes: {},
} as ComponentMeta<typeof CreateCollectionTemplate>;

const Template: ComponentStory<typeof CreateCollectionTemplate> = (args) => (
  <CreateCollectionTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCreateCollectionTemplateProps.base,
} as ICreateCollectionTemplate;
