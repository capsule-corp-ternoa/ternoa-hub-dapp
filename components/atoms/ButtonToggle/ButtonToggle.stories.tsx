import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonToggle from ".";
import { mockButtonToggleProps } from "./ButtonToggle.mocks";
import { IButtonToggle } from "./types";

export default {
  title: "atoms/ButtonToggle",
  component: ButtonToggle,
  argTypes: {},
} as ComponentMeta<typeof ButtonToggle>;

const Template: ComponentStory<typeof ButtonToggle> = (args) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <ButtonToggle
      {...args}
      selectedIndex={selectedIndex}
      onChange={(value, index) => setSelectedIndex(index)}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  ...mockButtonToggleProps.base,
} as IButtonToggle<string>;
