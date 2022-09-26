import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoaderEllipsis from '.';
import { mockLoaderEllipsisProps } from './LoaderEllipsis.mocks'
import { ILoaderEllipsis } from './types';

export default {
  title: 'atoms/LoaderEllipsis',
  component: LoaderEllipsis,
  argTypes: {},
} as ComponentMeta<typeof LoaderEllipsis>;

const Template: ComponentStory<typeof LoaderEllipsis> = (args) => <LoaderEllipsis {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockLoaderEllipsisProps.base
} as ILoaderEllipsis
