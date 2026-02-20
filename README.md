# Caisy Migrations

Use code as single source of truth for your caisy blueprints.

## Usage

Install this library into your project:

```shell
npm i --save @becklyn/caisy-migrations
```

## Config

Use env variables or a `.env` or `.env.local` file to configure the migrations:

| Variable                    | Description                             | Default                 |
| --------------------------- | --------------------------------------- | ----------------------- |
| CAISY_SKIP_MIGRATIONS       | Set to `true` to skip migrations        | `false`                 |
| CAISY_MIGRATIONS_FILE       | Path to the migrations file             | `./migrations/index.ts` |
| CAISY_PERSONAL_ACCESS_TOKEN | Personal access token for the Caisy API |                         |
| CAISY_PROJECT_ID            | Project ID to use for the migrations    |                         |

## Migration script

Create a migration script in the `migrations` directory (e.g. `migrations/index.ts`). It should be a TypeScript file that exports a function that takes the Caisy SDK as an argument and returns a promise.

```typescript
import { CaisyMigrationScript } from "@/migrations/types";

const migrationScript: CaisyMigrationScript = async sdk => {
    await sdk.PutManyBlueprints({
        input: { projectId: config.projectId, blueprintInputs: backupBlueprints },
    });
};

export default migrationScript;
```

## Contributing

- Please read the [changeset docs](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md) to get familiar with the changeset tooling
- Use PRs for updates
