import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FeatureCard, { FeatureCardProps } from './FeatureCard';
import { Database } from 'lucide-react';

export default {
  title: 'Components/FeatureCard',
  component: FeatureCard,
} as Meta;

const Template: StoryFn<FeatureCardProps> = (args) => <FeatureCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <Database className='h-6 w-6' />,
  title: 'Robust Database',
  description: 'Efficient data management with our intuitive ORM.',
};
