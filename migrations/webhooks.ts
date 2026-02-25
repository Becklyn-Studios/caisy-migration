import { WebhookUpsertInputInput } from "@caisy/sdk";
import { CaisySdk } from "./types";

export const upsertWebhooks = async (
    sdk: CaisySdk,
    projectId: string,
    webhooks: WebhookUpsertInputInput[]
) => {
    await sdk.PutManyWebhooks({
        input: {
            projectId,
            webhooks,
        },
    });

    // at the time of writing the response did not contain an errors field
    // therefore we currently don't ensure no errors
};
