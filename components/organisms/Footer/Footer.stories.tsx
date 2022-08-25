import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from ".";
import { mockFooterProps } from "./Footer.mocks";
import { IFooter } from "./types";

export default {
  title: "organisms/Footer",
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockFooterProps.base,
} as IFooter;
