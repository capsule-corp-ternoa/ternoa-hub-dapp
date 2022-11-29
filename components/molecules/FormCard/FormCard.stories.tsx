import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormCard from ".";
import { mockFormCardProps } from "./FormCard.mocks";
import { IFormCard } from "./types";

export default {
  title: "atoms/FormCard",
  component: FormCard,
  argTypes: {},
} as ComponentMeta<typeof FormCard>;

const Template: ComponentStory<typeof FormCard> = (args) => (
  <FormCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockFormCardProps.base,
} as IFormCard;
