export function def<T>(value: T | undefined, def: T): T {
    return value === undefined ? def : value;
}
