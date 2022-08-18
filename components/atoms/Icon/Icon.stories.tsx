import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Icon from '.';
import { mockIconProps } from './Icon.mocks'
import { IIcon } from './types';

export default {
  title: 'templates/Icon',
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockIconProps.base
} as IIcon
