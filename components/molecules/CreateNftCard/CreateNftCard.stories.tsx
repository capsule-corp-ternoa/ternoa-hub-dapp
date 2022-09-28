import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateNftCard from ".";
import { mockCreateNftCardProps } from "./CreateNftCard.mocks";
import { ICreateNftCard } from "./types";

export default {
  title: "molecules/CreateNftCard",
  component: CreateNftCard,
  argTypes: {},
} as ComponentMeta<typeof CreateNftCard>;

const Template: ComponentStory<typeof CreateNftCard> = (args) => (
  <CreateNftCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCreateNftCardProps.base,
} as ICreateNftCard;
