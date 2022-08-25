import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Label from '.';
import { mockLabelProps } from './Label.mocks'
import { ILabel } from './types';

export default {
  title: 'atoms/Label',
  component: Label,
  argTypes: {},
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockLabelProps.base
} as ILabel
