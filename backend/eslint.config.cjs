const globals = require("globals");
const prettierConfig = require("eslint-config-prettier"); 

module.exports = [
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  prettierConfig 
];
