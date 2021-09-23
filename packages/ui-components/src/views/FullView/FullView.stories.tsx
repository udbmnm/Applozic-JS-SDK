import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FullView, {IFullViewBare} from './FullView';

const APPLICATION_ID = 'applozic-sample-app';
// const APPLICATION_ID = "13f068513ecc0cc3e432658c9826c0";

export default {
  title: 'Views/FullView',
  component: FullView
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<IFullViewBare> = args => <FullView {...args} />;

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  applicationId: APPLICATION_ID,
  giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM',
  gMapsApiKey: 'AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0',
  loginPage: {
    topHeader: 'Applozic',
    topSubHeader: 'We Are Applozic'
  }
};
