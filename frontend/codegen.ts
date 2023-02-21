import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/query',
  documents: 'src/**/*.tsx',
  generates: {
    './src/gql': {
      preset: 'client',
      plugins: ['typescript', 'typescript-oparations', 'typescript-urql']
    }
  }
}

export default config
