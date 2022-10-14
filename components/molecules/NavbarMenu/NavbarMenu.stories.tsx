import React, { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NavbarMenu from ".";
import { mockNavbarMenuProps } from "./NavbarMenu.mocks";
import { INavbarMenu } from "./types";

export default {
  title: "molecules/NavbarMenu",
  component: NavbarMenu,
  argTypes: {},
} as ComponentMeta<typeof NavbarMenu>;

const Template: ComponentStory<typeof NavbarMenu> = (args) => {
  return <NavbarMenu {...args} ref={undefined} state={"open"} />;
};

export const Base = Template.bind({});

Base.args = {
  ...mockNavbarMenuProps.base,
} as INavbarMenu;
