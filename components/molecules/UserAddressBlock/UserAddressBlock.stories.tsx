import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UserAddressBlock from '.';
import { mockUserAddressBlockProps } from './UserAddressBlock.mocks'
import { IUserAddressBlock } from './types';

export default {
  title: 'molecules/UserAddressBlock',
  component: UserAddressBlock,
  argTypes: {},
} as ComponentMeta<typeof UserAddressBlock>;

const Template: ComponentStory<typeof UserAddressBlock> = (args) => <UserAddressBlock {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockUserAddressBlockProps.base
} as IUserAddressBlock
