import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ThemeToggle from './';
import { ThemeToggleProps } from './ThemeToggle';

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
} as Meta;

const Template: StoryFn<ThemeToggleProps> = () => <ThemeToggle />;

export const Default = Template.bind({});
