import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        global: "readonly",
        stealthbid: "readonly",
        noroff: "readonly",
        fontawesome: "readonly",
        toastr: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["vite.config.js"],
    rules: {
      "no-undef": "off",
      "no-cond-assign": "off",
      "no-control-regex": "off",
      "no-empty": "off",
      "no-useless-escape": "off",
      "no-prototype-builtins": "off",
      "no-self-assign": "off",
    },
  },
];
