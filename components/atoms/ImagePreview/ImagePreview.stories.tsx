import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ImagePreview from ".";
import { mockImagePreviewProps } from "./ImagePreview.mocks";
import { IImagePreview } from "./types";
import NftLoader from "../NftLoader";

export default {
  title: "atoms/ImagePreview",
  component: ImagePreview,
  argTypes: {},
} as ComponentMeta<typeof ImagePreview>;

const Template: ComponentStory<typeof ImagePreview> = (args) => (
  <ImagePreview {...args} loader={<NftLoader text="Loading" />} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockImagePreviewProps.base,
} as IImagePreview;
