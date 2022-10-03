import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NftCreationModal from '.';
import { mockNftCreationModalProps } from './NftCreationModal.mocks'
import { INftCreationModal } from './types';

export default {
  title: 'organisms/modals/NftCreationModal',
  component: NftCreationModal,
  argTypes: {},
} as ComponentMeta<typeof NftCreationModal>;

const Template: ComponentStory<typeof NftCreationModal> = (args) => <NftCreationModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockNftCreationModalProps.base
} as INftCreationModal
