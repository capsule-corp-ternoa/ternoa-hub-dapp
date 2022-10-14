import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressMenuButton from '.';
import { mockAddressMenuButtonProps } from './AddressMenuButton.mocks'
import { IAddressMenuButton } from './types';

export default {
  title: 'molecules/AddressMenuButton',
  component: AddressMenuButton,
  argTypes: {},
} as ComponentMeta<typeof AddressMenuButton>;

const Template: ComponentStory<typeof AddressMenuButton> = (args) => <AddressMenuButton {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockAddressMenuButtonProps.base
} as IAddressMenuButton
