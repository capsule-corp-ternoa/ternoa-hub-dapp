import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NtfCreationSuccessModal from '.';
import { mockNtfCreationSuccessModalProps } from './NftCreationSuccessModal.mocks'
import { INtfCreationSuccessModal } from './types';

export default {
  title: 'organisms/modals/NtfCreationSuccessModal',
  component: NtfCreationSuccessModal,
  argTypes: {},
} as ComponentMeta<typeof NtfCreationSuccessModal>;

const Template: ComponentStory<typeof NtfCreationSuccessModal> = (args) => <NtfCreationSuccessModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockNtfCreationSuccessModalProps.base
} as INtfCreationSuccessModal
