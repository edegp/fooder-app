module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    'no-relative-import-paths',
    'import',
    'tailwindcss'
  ],
  rules: {
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        rootDir: './src',
        prefix: '@',
        allowSameFolder: false
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'no-console': ['error', { allow: ['info', 'error'] }],
    // importの並び順設定
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index'
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'API',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: 'graphql/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: 'ui/**',
            group: 'index',
            position: 'after'
          },
          {
            pattern: '**\\.css',
            group: 'index',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react', 'next/**'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: false }
      }
    ],
    // no-var warningをunderscoreで回避する設定
    '@typescript-eslint/no-unused-vars': [
      'error', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    // importをファイル先頭に記述
    'import/first': 'error',
    // 最後のimportの後に空行を追加
    'import/newline-after-import': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.mts', '.cts', '.tsx', '.d.ts']
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true
      }
    }
  }
}
