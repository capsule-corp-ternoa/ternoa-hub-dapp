import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MarketplaceCreationSuccessModal from '.';
import { mockMarketplaceCreationSuccessModalProps } from './MarketplaceCreationSuccessModal.mocks'
import { IMarketplaceCreationSuccessModal } from './types';

export default {
  title: 'organisms/modals/MarketplaceCreationSuccessModal',
  component: MarketplaceCreationSuccessModal,
  argTypes: {},
} as ComponentMeta<typeof MarketplaceCreationSuccessModal>;

const Template: ComponentStory<typeof MarketplaceCreationSuccessModal> = (args) => <MarketplaceCreationSuccessModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockMarketplaceCreationSuccessModalProps.base
} as IMarketplaceCreationSuccessModal
