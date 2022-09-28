import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NftLoader from ".";
import { mockNftLoaderProps } from "./NftLoader.mocks";
import { INftLoader } from "./types";

export default {
  title: "atoms/NftLoader",
  component: NftLoader,
  argTypes: {},
} as ComponentMeta<typeof NftLoader>;

const Template: ComponentStory<typeof NftLoader> = (args) => (
  <div>
    <NftLoader {...args} />
  </div>
);

export const Base = Template.bind({});

Base.args = {
  ...mockNftLoaderProps.base,
} as INftLoader;
