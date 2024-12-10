module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Optional: If you want to integrate Prettier with ESLint
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    'react/prop-types': 'off', // Example: Disable prop-types validation
    'prettier/prettier': 'error', // Optional: Integrate Prettier with ESLint
  },
};
