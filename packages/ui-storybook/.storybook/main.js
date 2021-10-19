const path = require("path");

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        target: "es5",
        module: "es2015",
        lib: ["es2015", "es2016", "es2017", "dom", "dom.iterable"],
        sourceMap: true,
        declaration: true,
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react",
      },
    },
  },
  stories: ["../stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
  ],
};
