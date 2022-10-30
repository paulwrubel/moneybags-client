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

function getSelectionText(): string {
    if (window.getSelection) {
        try {
            const activeElement = document.activeElement;
            if (
                activeElement &&
                activeElement instanceof HTMLInputElement &&
                activeElement.value
            ) {
                // firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
                return activeElement.value.substring(
                    activeElement.selectionStart ?? 0,
                    activeElement.selectionEnd ?? 0,
                );
            } else {
                return window.getSelection()?.toString() ?? "";
            }
        } catch (e) {
            console.error(e);
            return "";
        }
    } else {
        // const docSel = document.getSelection();
        // if (docSel && docSel.type != "Control") {
        //     // For IE
        //     return docSel.createRange().text;
        // }
        return document.getSelection()?.toString() ?? "";
    }
}

export { formatCurrencyCents, isError, def, getSelectionText };
