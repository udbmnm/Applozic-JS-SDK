import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { PluginViewWithoutBase as PluginView, ViewProps } from '../src';
import { APPLICATION_ID, GIPHY_API_KEY, GOOGLE_MAPS_API_KEY } from './config';

export default {
  title: 'WIP/PluginView',
  component: PluginView
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ViewProps> = args => <PluginView {...args} />;

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  applicationId: APPLICATION_ID,
  giphyApiKey: GIPHY_API_KEY,
  gMapsApiKey: GOOGLE_MAPS_API_KEY,
  loginPage: {
    topHeader: 'Applozic',
    topSubHeader: 'We Are Applozic'
  }
};
