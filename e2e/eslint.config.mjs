import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';

export default [
  { ignores: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    'playwright-report',
    'test-results'
  ] },

  js.configs.recommended,

  // Playwright rules applied to tests/**/*.js
  {
    files: ['tests/**/*.js'],
    plugins: { playwright },
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    rules: {
      ...playwright.configs['playwright-test'].rules,
    },
  },
  {
    files: ['playwright.config.{js,cjs,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
  },
  prettier,
];
