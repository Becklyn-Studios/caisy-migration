import { initSdk } from "@caisy/sdk";

export type CaisySdk = ReturnType<typeof initSdk>;

export type CaisyMigrationScript = (sdk: CaisySdk, projectId: string) => Promise<void>;
