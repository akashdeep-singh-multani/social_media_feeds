import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        jest: true, // Add Jest global variables here
        describe: true,
        it: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
        expect: true,
        test: true,
      },
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'],
  },
]
