import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Filter from ".";
import { mockFilterProps } from "./Filter.mocks";
import { IFilter } from "./types";

export default {
  title: "atoms/Filter",
  component: Filter,
  argTypes: {},
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockFilterProps.base,
} as IFilter;
