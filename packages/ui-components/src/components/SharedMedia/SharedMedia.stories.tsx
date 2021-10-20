import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import SharedMedia, { ISharedMediaView, TABS } from './SharedMedia';

// export default {
//   title: "Components/Shared Media",
//   component: SharedMedia,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ISharedMediaView> = args => <SharedMedia {...args} />;

// Reuse that template for creating different stories
export const Photos = Template.bind({});
Photos.args = {
  photosProps: {
    photosList: [
      {
        src: 'rectangle778',
        id: 'rectangle-778'
      },
      {
        src: 'rectangle779',
        id: 'rectangle-779'
      },
      {
        src: 'rectangle780',
        id: 'rectangle-780'
      },
      {
        src: 'rectangle781',
        id: 'rectangle-781'
      },
      {
        src: 'rectangle782',
        id: 'rectangle-782'
      },
      {
        src: 'rectangle783',
        id: 'rectangle-783'
      },
      {
        src: 'rectangle778',
        id: 'rectangle-778'
      },
      {
        src: 'rectangle779',
        id: 'rectangle-779'
      },
      {
        src: 'rectangle780',
        id: 'rectangle-780'
      },
      {
        src: 'rectangle781',
        id: 'rectangle-781'
      },
      {
        src: 'rectangle782',
        id: 'rectangle-782'
      },
      {
        src: 'rectangle783',
        id: 'rectangle-783'
      }
    ]
  },
  // linksProps: {
  //   links: [
  //     {
  //       metaImage: rectangle783,
  //       metaTitle:
  //         'Cursus consequat lorem massa | els ma conc loripomfkgjtuehgt',
  //       metaDescription:
  //         'Lorem ipsum dolor sit amet, consect Lorem ipsum dolor etur adipiscing elit.',
  //       metaUrl: 'www.youtube.com',
  //       url: 'www.http:youtube.s/dhahsy'
  //     },
  //     {
  //       metaTitle: 'Link without image',
  //       metaDescription:
  //         'Lorem ipsum dolor sit amet, consect Lorem ipsum dolor etur adipiscing elit.',
  //       metaUrl: 'www.youtube.com',
  //       url: 'www.http:youtube.s/dhahsy'
  //     },
  //     {
  //       metaTitle: 'Link without description',
  //       metaUrl: 'www.youtube.com',
  //       url: 'www.http:youtube.s/dhahsy'
  //     },
  //     {
  //       metaImage: rectangle779,
  //       metaTitle:
  //         'Cursus consequat lorem massa | els ma conc loripomfkgjtuehgt',
  //       metaUrl: 'www.youtube.com',
  //       url: 'www.http:youtube.s/dhahsy'
  //     }
  //   ]
  // },
  docsProps: {
    docs: [
      {
        name: 'abbnn',
        contentType: 'application/pdf',
        size: 13545138,
        blobKey: ''
      },
      {
        name: 'abbnn',
        contentType: 'application/pdf',
        size: 13545138,
        blobKey: ''
      }
    ]
  }
};

export const Links = Template.bind({});
Links.args = {
  ...Photos.args,
  defaultTab: TABS.LINKS
};

export const Docs = Template.bind({});
Docs.args = {
  ...Photos.args,
  defaultTab: TABS.DOCS
};
