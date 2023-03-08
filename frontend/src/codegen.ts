import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/query',
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  ignoreNoDocuments: true,
  pluckConfig: {
    globalGqlIdentifierName: ['gql', 'graphql']
  },
  hooks: { afterOneFileWrite: ['prettier --write', 'eslint --fix'] },
  generates: {
    'src/graphql/': {
      preset: 'client',
      config: {
        withHooks: true
      }
    }
  }
}

export default config
