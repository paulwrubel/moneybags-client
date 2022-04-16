import { HTTPError } from "ky";
import ErrorResponse from "models/ErrorResponse";

export function def<T>(value: T | undefined, def: T): T {
    return value === undefined ? def : value;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function isHTTPError(error: unknown): error is HTTPError {
    return error instanceof HTTPError;
}

export function processAPIError(
    error: unknown,
    callback: (errString: string) => void,
): void {
    if (isError(error)) {
        if (isHTTPError(error)) {
            error.response
                ?.json()
                ?.then((errResponse: ErrorResponse) => {
                    callback(
                        errResponse.errors.map((e) => e.message).join("\n"),
                    );
                })
                .catch((err: Error) => {
                    callback(err.message);
                });
            return;
        }
        callback(error.message);
        return;
    }
    callback(String(error));
}
