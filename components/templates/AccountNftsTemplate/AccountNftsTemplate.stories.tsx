import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AccountNftsTemplate from ".";
import { mockAccountNftsTemplateProps } from "./AccountNftsTemplate.mocks";
import { IAccountNftsTemplate } from "./types";

export default {
  title: "templates/AccountNftsTemplate",
  component: AccountNftsTemplate,
  argTypes: {},
} as ComponentMeta<typeof AccountNftsTemplate>;

const Template: ComponentStory<typeof AccountNftsTemplate> = (args) => (
  <AccountNftsTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAccountNftsTemplateProps.base,
} as IAccountNftsTemplate;
