import { useState, useEffect } from "react";
import { ProvideBase } from "@applozic/ui-components";
import { addons } from "@storybook/addons";
import { FORCE_RE_RENDER } from "@storybook/core-events";

export const parameters = {
  // layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "lightning",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
  environment: {
    name: "Environment",
    description: "The application environment",
    defaultValue: "development",
    toolbar: {
      icon: "wrench",
      // Array of plain string values or MenuItem shape (see below)
      items: ["development", "production"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    useEffect(() => {
      addons.getChannel().emit(FORCE_RE_RENDER);
    }, [context.globals.theme]);

    return (
      <ProvideBase
        useSystemColorMode={false}
        colorMode={'light'}
        environment={context.globals.environment}
      >
        <Story />
      </ProvideBase>
    );
  },
];
