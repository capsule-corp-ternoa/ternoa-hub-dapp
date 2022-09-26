import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AlertModal from '.';
import { mockAlertModalProps } from './AlertModal.mocks'
import { IAlertModal } from './types';

export default {
  title: 'molecules/AlertModal',
  component: AlertModal,
  argTypes: {},
} as ComponentMeta<typeof AlertModal>;

const Template: ComponentStory<typeof AlertModal> = (args) => <AlertModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockAlertModalProps.base
} as IAlertModal
