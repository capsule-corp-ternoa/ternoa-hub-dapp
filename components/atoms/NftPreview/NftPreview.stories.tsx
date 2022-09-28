import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NftPreview from ".";
import { mockNftPreviewProps } from "./NftPreview.mocks";
import { INftPreview } from "./types";

export default {
  title: "atoms/NftPreview",
  component: NftPreview,
  argTypes: {},
} as ComponentMeta<typeof NftPreview>;

const Template: ComponentStory<typeof NftPreview> = (args) => (
  <NftPreview {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNftPreviewProps.base,
} as INftPreview;
