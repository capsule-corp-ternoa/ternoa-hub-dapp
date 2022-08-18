import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from '.';
import { mockButtonProps } from './Radio.mocks'
import { IRadio } from './types';

export default {
  title: 'templates/Radio',
  component: Radio,
  argTypes: {},
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockButtonProps.base,
} as IRadio
