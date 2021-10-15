import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { ProvideBase } from "../src/providers/useBase";

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

const withChakra = (StoryFn, context) => {
  return (
    <ProvideBase
      useSystemColorMode={false}
      colorMode={context.globals.theme}
      environment="development"
    >
      <StoryFn />
    </ProvideBase>
  );
};

export const decorators = [withChakra];
