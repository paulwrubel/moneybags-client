// eslint-disable-next-line import/no-unresolved
import { CsvError, parse } from "csv-parse/browser/esm";

const CurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function formatCurrencyCents(
    value: number,
    { sign = "$" }: { sign: string } = { sign: "$" },
): string {
    let formatted = CurrencyFormatter.format(value / 100);
    if (sign !== "$") {
        formatted = formatted.replace("$", sign);
    }
    return formatted;
}

export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function def<T>(value: T | undefined, def: T): T {
    return value === undefined ? def : value;
}

export function getSelectionText(): string {
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

export async function parseYNABBudgetFileStringAsync(
    input: string,
): Promise<number[][]> {
    return new Promise((resolve, reject) => {
        parse(
            input.replaceAll("\ufeff", "").trim(),
            {},
            (err?: CsvError, records?: number[][]) => {
                if (err) {
                    reject(err);
                } else if (records) {
                    resolve(records);
                } else {
                    reject(Error("no results returned from csv-parse"));
                }
            },
        );
    });
}

// export {
//     formatCurrencyCents,
//     isError,
//     def,
//     getSelectionText,
//     parseYNABBudgetFileStringAsync,
// };
