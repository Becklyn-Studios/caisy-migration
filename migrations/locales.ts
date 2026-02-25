import { DocumentFieldLocaleUpsertInputInput } from "@caisy/sdk";
import { ensureNoErrors } from "./errors";
import { CaisySdk } from "./types";

export const upsertLocales = async (
    sdk: CaisySdk,
    projectId: string,
    locales: DocumentFieldLocaleUpsertInputInput[]
) => {
    const response = await sdk.PutManyDocumentFieldLocales({
        input: {
            projectId,
            documentFieldLocaleInputs: locales,
            overwriteDefaultLocale: true,
        },
    });

    ensureNoErrors(response?.PutManyDocumentFieldLocales?.errors);
};
