import { PreviewUpsertInputInput } from "@caisy/sdk";
import { ensureNoErrors } from "./errors";
import { CaisySdk } from "./types";

export const upsertPreviews = async (
    sdk: CaisySdk,
    projectId: string,
    previews: PreviewUpsertInputInput[]
) => {
    const response = await sdk.PutManyPreviews({
        input: {
            projectId,
            previewInputs: previews,
        },
    });

    ensureNoErrors(response?.PutManyPreviews?.errors);
};
