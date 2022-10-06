import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from '.';
import { mockCardProps } from './Card.mocks'
import { ICard } from './types';

export default {
  title: 'atoms/Card',
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCardProps.base
} as ICard
