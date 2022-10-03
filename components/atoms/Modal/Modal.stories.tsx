import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from '.';
import { mockModalProps } from './Modal.mocks'
import { IModal } from './types';

export default {
  title: 'atoms/Modal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockModalProps.base
} as IModal
