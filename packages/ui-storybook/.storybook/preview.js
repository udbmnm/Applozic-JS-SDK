import { useColorMode } from "@applozic/ui-components";
import { useEffect } from "react";

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
};

const withColorMode = (StoryFn, context) => {
  return <StoryFn initialColorMode={context.globals.theme} />;
};

export const decorators = [withColorMode];
