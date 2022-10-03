import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FilterList from ".";
import { mockFilterListProps } from "./FilterList.mocks";
import { IFilterList } from "./types";

export default {
  title: "molecules/FilterList",
  component: FilterList,
  argTypes: {},
} as ComponentMeta<typeof FilterList>;

const Template: ComponentStory<typeof FilterList> = (args) => (
  <FilterList {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockFilterListProps.base,
} as IFilterList;
