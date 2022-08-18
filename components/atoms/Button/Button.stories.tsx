import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';
import { mockButtonProps } from './Button.mocks'
import { IButton } from './types';

export default {
  title: 'templates/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Danger = Template.bind({});

Primary.args = {
  ...mockButtonProps.primary,
} as IButton

Secondary.args = {
  ...mockButtonProps.secondary,
} as IButton

Danger.args = {
  ...mockButtonProps.danger,
} as IButton
