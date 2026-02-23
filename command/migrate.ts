import { config } from "dotenv";
import { register } from "ts-node";
import { register as registerPaths } from "tsconfig-paths";
import { initSdk } from "@caisy/sdk";
import { CaisyMigrationScript } from "../migrations/types";

const loadConfig = () => {
    config({ path: [".env.local", ".env"] });

    return {
        skipMigrations: process.env.CAISY_SKIP_MIGRATIONS === "true",
        migrationsFile: process.env.CAISY_MIGRATIONS_FILE ?? "./migrations/index.ts",
        personalAccessToken: process.env.CAISY_PERSONAL_ACCESS_TOKEN ?? "",
        projectId: process.env.CAISY_PROJECT_ID ?? "",
    };
};

export const executeMigrationCommand = async () => {
    console.log("Checking environment...");

    const config = loadConfig();

    if (config.skipMigrations) {
        console.log("CAISY_SKIP_MIGRATIONS flag set, skipping migrations and exiting early");
        process.exit(0);
    }

    register({
        transpileOnly: true,
        compilerOptions: {
            baseUrl: ".",
            target: "es2017",
            module: "commonjs",
            strict: true,
            skipLibCheck: true,
            esModuleInterop: true,
            moduleResolution: "node",
            lib: ["es2017"],
        },
    });

    registerPaths({
        baseUrl: ".",
        paths: {
            "@/migrations/*": ["./migrations/*"],
        },
    });

    let migrationsFile = process.env.CAISY_MIGRATIONS_FILE ?? "./migrations/index.ts";

    console.log(`Loading migration script from file ${migrationsFile}`);

    if (migrationsFile.startsWith("./")) {
        migrationsFile = process.cwd() + migrationsFile.slice(1);
    }

    let migrationScript: CaisyMigrationScript | null = null;

    try {
        const { default: module } = await import(migrationsFile);

        if (module && typeof module !== "function") {
            throw new Error(`Invalid migrations file ${migrationsFile}`);
        }

        migrationScript = module;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to load migrations from file ${migrationsFile}`);
    }

    if (!migrationScript) {
        throw new Error("No migration script found");
    }

    const sdk = initSdk({
        token: config.personalAccessToken,
    });

    console.log("Executing migration script...");

    await migrationScript(sdk, config.projectId);

    console.log("Done");

    process.exit(0);
};
