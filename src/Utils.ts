const CurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function formatCurrencyCents(
    value: number,
    { sign = "$" }: { sign: string } = { sign: "$" },
): string {
    let formatted = CurrencyFormatter.format(value / 100);
    if (sign !== "$") {
        formatted = formatted.replace("$", sign);
    }
    return formatted;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

function def<T>(value: T | undefined, def: T): T {
    return value === undefined ? def : value;
}

export { formatCurrencyCents, isError, def };
