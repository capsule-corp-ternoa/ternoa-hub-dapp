import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from '.';
import { mockTextProps } from './Text.mocks'
import { IText } from './types';

export default {
  title: 'templates/Text',
  component: Text,
  argTypes: {},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockTextProps.base
} as IText
