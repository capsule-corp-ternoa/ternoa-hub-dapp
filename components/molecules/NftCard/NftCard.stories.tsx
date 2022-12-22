import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NftCard from ".";
import { mockNftCardProps } from "./NftCard.mocks";
import { INftCard } from "./types";

export default {
  title: "molecules/NftCard",
  component: NftCard,
  argTypes: {},
} as ComponentMeta<typeof NftCard>;

const Template: ComponentStory<typeof NftCard> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <NftCard {...args} onChangeChecked={setIsChecked} isChecked={isChecked} />
  );
};

export const Base = Template.bind({});

Base.args = {
  ...mockNftCardProps.base,
} as INftCard;
