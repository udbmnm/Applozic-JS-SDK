import { ProvideBase } from '../src';

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      order: [
        'Views',
        'Components',
        [
          'FeatureTabs',
          'Sidebar',
          'ChatStatusBar',
          'SendMessage',
          'ChatPanel',
          'ChatDetails'
        ],
        'WiredComponents',
        'Core',
        'WIP'
      ]
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'lightning',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true
    }
  },
  brandColors: {
    name: 'Brand Colors',
    description: 'The brand colors',
    defaultValue: { primary: '#6139C0', secondary: '#3D227C' },
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        {
          value: { primary: '#6139C0', secondary: '#3D227C' },
          right: '🟣',
          title: 'Power'
        },
        {
          value: { primary: '#393bc0', secondary: '#22237c' },
          right: '🔵',
          title: 'Space'
        },
        {
          value: { primary: '#bbbd2d', secondary: '#777c22' },
          right: '🟡',
          title: 'Mind'
        },
        {
          value: { primary: '#bd2d2d', secondary: '#7c2222' },
          right: '🔴',
          title: 'Reality'
        },
        {
          value: { primary: '#37bd2d', secondary: '#317c22' },
          right: '🟢',
          title: 'Time'
        },
        {
          value: { primary: '#bd832d', secondary: '#7c5b22' },
          right: '🟤',
          title: 'Soul'
        }
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true
    }
  },
  environment: {
    name: 'Environment',
    description: 'The application environment',
    defaultValue: 'development',
    toolbar: {
      icon: 'wrench',
      // Array of plain string values or MenuItem shape (see below)
      items: ['development', 'production'],
      // Property that specifies if the name of the item will be displayed
      showName: true
    }
  }
};

export const decorators = [
  (Story, context) => {
    return (
      <ProvideBase
        useSystemColorMode={false}
        colorMode={context.globals.theme}
        environment={context.globals.environment}
        brandColors={context.globals.brandColors}
      >
        <Story />
      </ProvideBase>
    );
  }
];
