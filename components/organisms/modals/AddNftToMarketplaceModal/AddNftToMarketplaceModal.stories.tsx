import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AddNftToMarketplaceModal from ".";
import { mockAddNftToMarketplaceModalProps } from "./AddNftToMarketplaceModal.mocks";
import { IAddNftToMarketplaceModal } from "./types";

export default {
  title: "organisms/modals/AddNftToMarketplaceModal",
  component: AddNftToMarketplaceModal,
  argTypes: {},
} as ComponentMeta<typeof AddNftToMarketplaceModal>;

const Template: ComponentStory<typeof AddNftToMarketplaceModal> = (args) => (
  <AddNftToMarketplaceModal {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAddNftToMarketplaceModalProps.base,
} as IAddNftToMarketplaceModal;
