import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from '.';
import { mockAvatarProps } from './Avatar.mocks'
import { IAvatar } from './types';

export default {
  title: 'templates/Avatar',
  component: Avatar,
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockAvatarProps.base
} as IAvatar
