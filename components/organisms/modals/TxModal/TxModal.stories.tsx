import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TxModal from '.';
import { mockTxModalProps } from './TxModal.mocks'
import { ITxModal } from './types';

export default {
  title: 'organisms/modals/TxModal',
  component: TxModal,
  argTypes: {},
} as ComponentMeta<typeof TxModal>;

const Template: ComponentStory<typeof TxModal> = (args) => <TxModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockTxModalProps.base
} as ITxModal
