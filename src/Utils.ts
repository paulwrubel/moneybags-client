export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function def<T>(value: T | undefined, def: T): T {
    return value === undefined ? def : value;
}
