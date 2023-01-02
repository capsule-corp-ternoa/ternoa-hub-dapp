import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateNftFromMarketplaceModal from ".";
import { mockCreateNftFromMarketplaceModalProps } from "./CreateNftFromMarketplaceModal.mocks";
import { ICreateNftFromMarketplaceModal } from "./types";

export default {
  title: "organisms/modals/CreateNftFromMarketplaceModal",
  component: CreateNftFromMarketplaceModal,
  argTypes: {},
} as ComponentMeta<typeof CreateNftFromMarketplaceModal>;

const Template: ComponentStory<typeof CreateNftFromMarketplaceModal> = (
  args
) => <CreateNftFromMarketplaceModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCreateNftFromMarketplaceModalProps.base,
} as ICreateNftFromMarketplaceModal;
