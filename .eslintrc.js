module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'eol-last': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error', {
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
    }],
    'import/extensions': ['error', { json: 'always', tsx: 'never' }],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
    'lines-between-class-members': 0,
    'max-len': ['error', 140, {
      ignoreStrings: true,
    }],
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    'no-param-reassign': 0,
    'no-redeclare': 0,
    'no-undef': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'object-curly-newline': ['error', {
      consistent: true,
    }],
    radix: 0,
    'react/destructuring-assignment': 0,
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': [2, { reservedFirst: false }],
    'react/require-default-props': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
