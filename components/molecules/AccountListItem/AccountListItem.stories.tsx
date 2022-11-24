import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountListItem from '.';
import { mockAccountListItemProps } from './AccountListItem.mocks'
import { IAccountListItem } from './types';

export default {
  title: 'molecules/AccountListItem',
  component: AccountListItem,
  argTypes: {},
} as ComponentMeta<typeof AccountListItem>;

const Template: ComponentStory<typeof AccountListItem> = (args) => <AccountListItem {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockAccountListItemProps.base
} as IAccountListItem
