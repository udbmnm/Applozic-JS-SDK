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
        colorMode={'light'}
        environment={context.globals.environment}
      >
        <Story />
      </ProvideBase>
    );
  }
];
