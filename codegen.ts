import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'roll-a-bowl-api/src/schema.gql',
  documents: ['graphql/operations/**/*.ts'],
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          DateTime: 'string',
          Date: 'string',
          JSON: 'Record<string, any>',
        },
        useTypeImports: true,
        enumsAsTypes: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
