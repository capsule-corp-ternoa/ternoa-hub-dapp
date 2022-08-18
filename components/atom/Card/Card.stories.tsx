import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card, { ICard } from '.';
import { mockCardProps } from './Card.mocks'

export default {
  title: 'templates/Card',
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCardProps.base
} as ICard
