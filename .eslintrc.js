module.exports = {
  extends: ['@react-native-community', 'eslint-config-prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
