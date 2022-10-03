import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navbar from ".";
import { mockNavbarProps } from "./Navbar.mocks";
import { INavbar } from "./types";

export default {
  title: "organisms/Navbar",
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockNavbarProps.base,
} as INavbar;
