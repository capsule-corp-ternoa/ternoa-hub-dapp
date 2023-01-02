import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ListNftCard from ".";
import { mockListNftCardProps } from "./ListNftCard.mocks";
import { IListNftCard } from "./types";

export default {
  title: "molecules/ListNftCard",
  component: ListNftCard,
  argTypes: {},
} as ComponentMeta<typeof ListNftCard>;

const Template: ComponentStory<typeof ListNftCard> = (args) => (
  <ListNftCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockListNftCardProps.base,
} as IListNftCard;
