import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ActionCard from ".";
import { mockActionCardProps } from "./ActionCard.mocks";
import { IActionCard } from "./types";

export default {
  title: "molecules/ActionCard",
  component: ActionCard,
  argTypes: {},
} as ComponentMeta<typeof ActionCard>;

const Template: ComponentStory<typeof ActionCard> = (args) => (
  <ActionCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockActionCardProps.base,
} as IActionCard;
