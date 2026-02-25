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

const migrationScript: CaisyMigrationScript = async (sdk, projectId) => {
    await sdk.PutManyBlueprints({
        input: { projectId, blueprintInputs: backupBlueprints },
    });
};

export default migrationScript;
```

### Migration helper functions

This library provides helper functions for common migration tasks.

Upsert blueprints:

```typescript
import { upsertBlueprints } from "@/migrations/blueprints";

await upsertBlueprints(sdk, projectId, blueprints);
```

Upsert locales:

```typescript
import { upsertLocales } from "@/migrations/locales";

await upsertLocales(sdk, projectId, locales);
```

Upsert previews:

```typescript
import { upsertPreviews } from "@/migrations/previews";

await upsertPreviews(sdk, projectId, previews);
```

Upsert webhooks:

```typescript
import { upsertWebhooks } from "@/migrations/webhooks";

await upsertWebhooks(sdk, projectId, webhooks);
```

In all of these functions it is recommended to use hard coded ids. That way caisy will properly match changes to the existing resources and do proper upserts. Not using ids or auto generating them by code will lead to unexpected behavior.

## Contributing

- Please read the [changeset docs](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md) to get familiar with the changeset tooling
- Use PRs for updates
