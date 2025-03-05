import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import nextEslint from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs({
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }),
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin, '@next/next': nextEslint },
    rules: { 'prettier/prettier': 'error', 'react/react-in-jsx-scope': 'off' },
    settings: { react: { version: 'detect' } }, // Add this line
  },
];
