import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CapsIndicator from '.';
import { mockCapsIndicatorProps } from './CapsIndicator.mocks'
import { ICapsIndicator } from './types';

export default {
  title: 'molecules/CapsIndicator',
  component: CapsIndicator,
  argTypes: {},
} as ComponentMeta<typeof CapsIndicator>;

const Template: ComponentStory<typeof CapsIndicator> = (args) => <CapsIndicator {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCapsIndicatorProps.base
} as ICapsIndicator
