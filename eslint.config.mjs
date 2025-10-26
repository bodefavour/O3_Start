import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';

// For Next.js specific rules
const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: nextPlugin.configs.recommended,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: [
      'node_modules/**', 
      '.next/**', 
      'out/**', 
      'build/**', 
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts'
    ],
  },
  // Next.js specific configuration
  ...compat.extends('plugin:@next/next/core-web-vitals'),
  
  // JavaScript/JSX files (no TypeScript parsing)
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-typos': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      
      // Best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error'
    },
  },
  
  // TypeScript files (with TypeScript parsing and project)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-typos': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_', 
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      
      // Best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error'
    },
  },
  
  // Additional configuration for app directory
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off', // Allow default exports in app directory
    },
  },
];

export default config;