import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IconModal from '.';
import { mockIconModalProps } from './IconModal.mocks'
import { IIconModal } from './types';

export default {
  title: 'molecules/IconModal',
  component: IconModal,
  argTypes: {},
} as ComponentMeta<typeof IconModal>;

const Template: ComponentStory<typeof IconModal> = (args) => <IconModal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockIconModalProps.base
} as IIconModal
