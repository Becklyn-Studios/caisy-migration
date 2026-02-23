import { BlueprintUpsertInputInput } from "@caisy/sdk";
import { CaisySdk } from "./types";

export const upsertBlueprints = async (
    sdk: CaisySdk,
    projectId: string,
    blueprints: BlueprintUpsertInputInput[]
) => {
    const response = await sdk.PutManyBlueprints({
        input: {
            projectId,
            blueprintInputs: blueprints,
        },
    });

    const errors = response?.PutManyBlueprints?.errors;

    if (errors && errors.length > 0) {
        let errorMessage = "";

        for (const error of errors) {
            errorMessage += `\n${error?.errorMessage}`;
        }

        if (errorMessage) {
            throw new Error(errorMessage);
        }
    }
};

export const deleteBlueprintIfExists = async (
    sdk: CaisySdk,
    projectId: string,
    blueprintId: string
) => {
    try {
        await sdk.DeleteBlueprint({
            input: {
                projectId,
                blueprintId,
            },
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (!message.includes("Blueprint Not found")) {
            throw e;
        }
    }
};
