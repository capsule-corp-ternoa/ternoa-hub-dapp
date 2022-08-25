import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Logo from ".";
import { mockLogoProps } from "./Logo.mocks";
import { ILogo } from "./types";

export default {
  title: "atoms/Logo",
  component: Logo,
  argTypes: {},
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockLogoProps.logo,
} as ILogo;
