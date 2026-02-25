interface CaisyError {
    errorMessage?: string | null;
}

type CaisyErrors = (CaisyError | null)[] | null;

export const ensureNoErrors = (errors?: CaisyErrors) => {
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
