/* eslint-disable import/exports-last */
// eslint-disable-next-line import/no-unresolved
import { CsvError, parse } from "csv-parse/browser/esm";
import dayjs, { Dayjs } from "dayjs";

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

type YNABBudgetRecord = {
    month: string;
    categoryGroupAndCategory: string;
    categoryGroup: string;
    category: string;
    budgeted: number;
    activity: number;
    available: number;
};

export async function parseYNABBudgetFileStringAsync(
    input: string,
): Promise<YNABBudgetRecord[]> {
    return new Promise((resolve, reject) => {
        parse(
            input.replaceAll("\ufeff", "").trim(),
            {
                columns: [
                    "month",
                    "categoryGroupAndCategory",
                    "categoryGroup",
                    "category",
                    "budgeted",
                    "activity",
                    "available",
                ],
                cast: (value, { column }) => {
                    if (
                        column === "budgeted" ||
                        column === "activity" ||
                        column === "available"
                    ) {
                        return Math.round(parseFloat(value) * 100);
                    } else {
                        return value;
                    }
                },
                from: 2,
            },
            (err?: CsvError, records?: YNABBudgetRecord[]) => {
                if (err) {
                    reject(err);
                } else if (records) {
                    resolve(records);
                } else {
                    reject(Error("no budget results returned from csv-parse"));
                }
            },
        );
    });
}

type YNABTransactionRecord = {
    account: string;
    flag: string;
    date: Dayjs;
    payee: string;
    categoryGroupAndCategory: string;
    categoryGroup: string;
    category: string;
    memo: string;
    outflow: number;
    inflow: number;
    cleared: "Uncleared" | "Cleared" | "Reconciled";
};

export async function parseYNABTransactionsFileStringAsync(
    input: string,
): Promise<YNABTransactionRecord[]> {
    return new Promise((resolve, reject) => {
        parse(
            input.replaceAll("\ufeff", "").trim(),
            {
                columns: [
                    "account",
                    "flag",
                    "date",
                    "payee",
                    "categoryGroupAndCategory",
                    "categoryGroup",
                    "category",
                    "memo",
                    "outflow",
                    "inflow",
                    "cleared",
                ],
                cast: (value, { column }) => {
                    if (column === "outflow" || column === "inflow") {
                        return Math.round(parseFloat(value) * 100);
                    } else if (column === "date") {
                        return dayjs(value, "YYYY-MM-DD");
                    } else {
                        return value;
                    }
                },
                from: 2,
            },
            (err?: CsvError, records?: YNABTransactionRecord[]) => {
                if (err) {
                    reject(err);
                } else if (records) {
                    resolve(records);
                } else {
                    reject(
                        Error("no transaction results returned from csv-parse"),
                    );
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
