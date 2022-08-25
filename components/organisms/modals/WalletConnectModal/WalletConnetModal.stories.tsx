import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletConnectModal from '.';
import { mockWalletConnectModalProps } from './WalletConnectModal.mocks'
import { IWalletConnectModal } from './types';

export default {
  title: 'organisms/modals/WalletConnectModal',
  component: WalletConnectModal,
  argTypes: {},
} as ComponentMeta<typeof WalletConnectModal>;

const Template: ComponentStory<typeof WalletConnectModal> = (args) => <WalletConnectModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockWalletConnectModalProps.base
} as IWalletConnectModal
