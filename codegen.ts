import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "./src/GraphQL/Schema.ts": {
        noPluck: true,
      },
    },
  ],
  require: "ts-node/register/transpile-only",
  generates: {
    "./src/GraphQL/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "@/GraphQL/Context#Context",
      },
    },
  },
};
export default config;
