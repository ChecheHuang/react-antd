module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended'],
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn'
  }
};