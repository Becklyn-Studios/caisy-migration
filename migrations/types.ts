import { initSdk } from "@caisy/sdk";

export type CaisyMigrationScript = (
    sdk: ReturnType<typeof initSdk>,
    projectId: string
) => Promise<void>;
