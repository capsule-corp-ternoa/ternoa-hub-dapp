import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NftMintingModal from '.';
import { mockNftMintingModalProps } from './NftMintingModal.mocks'
import { INftMintingModal } from './types';

export default {
  title: 'organisms/modals/NftMintingModal',
  component: NftMintingModal,
  argTypes: {},
} as ComponentMeta<typeof NftMintingModal>;

const Template: ComponentStory<typeof NftMintingModal> = (args) => <NftMintingModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockNftMintingModalProps.base
} as INftMintingModal
