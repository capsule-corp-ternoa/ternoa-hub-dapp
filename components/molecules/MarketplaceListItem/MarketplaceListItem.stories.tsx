import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MarketplaceListItem from '.';
import { mockMarketplaceListItemProps } from './MarketplaceListItem.mocks'
import { IMarketplaceListItem } from './types';

export default {
  title: 'molecules/MarketplaceListItem',
  component: MarketplaceListItem,
  argTypes: {},
} as ComponentMeta<typeof MarketplaceListItem>;

const Template: ComponentStory<typeof MarketplaceListItem> = (args) => <MarketplaceListItem {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockMarketplaceListItemProps.base
} as IMarketplaceListItem
