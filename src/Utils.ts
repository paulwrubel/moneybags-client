/* eslint-disable import/exports-last */
// eslint-disable-next-line import/no-unresolved
import { CsvError, parse } from "csv-parse/browser/esm";
import dayjs, { Dayjs } from "dayjs";
import JSZip from "jszip";
import { v4 as uuid } from "uuid";

import {
    Account,
    Budget,
    BudgetHeader,
    Category,
    CategoryGroup,
    Transaction,
} from "models/Budget";

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

export async function parseYNABZipFile(zipFile: File): Promise<{
    budgetRecords: YNABBudgetRecord[];
    transactionsRecords: YNABTransactionRecord[];
}> {
    // return new Promise<{
    //     budget: YNABBudgetRecord[];
    //     transactions: YNABTransactionRecord[];
    // }>((resolve, reject) => {
    const zip = await JSZip.loadAsync(zipFile);
    // let budgetContent = "";
    // let transactionsContent = "";
    const budgetEntries = zip.file(/Budget/);
    if (budgetEntries.length !== 1) {
        throw Error(
            `invalid zip file: found ${budgetEntries.length} budget files, expected 1`,
        );
    }
    const budgetContent = await budgetEntries[0].async("string");
    const transactionsEntries = zip.file(/Register/);
    if (transactionsEntries.length !== 1) {
        throw Error(
            `invalid zip file: found ${transactionsEntries.length} transaction files, expected 1`,
        );
    }
    const transactionsContent = await transactionsEntries[0].async("string");
    // zip.
    // zip.forEach(async (relPath, entry) => {
    //     console.log(entry.name);
    //     if (entry.name.includes("Budget")) {
    //         budgetContent = await entry.async("string");
    //     } else if (entry.name.includes("Register")) {
    //         transactionsContent = await entry.async("string");
    //     }
    // });
    // if (budgetContent === "" || transactionsContent === "") {
    //     throw Error("invalid zip file");
    // }
    const ynabBudgetRecords = await parseYNABBudgetFileStringAsync(
        budgetContent,
    );
    const ynabTransactionRecords = await parseYNABTransactionsFileStringAsync(
        transactionsContent,
    );

    return {
        budgetRecords: ynabBudgetRecords,
        transactionsRecords: ynabTransactionRecords,
    };
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

export function createBudgetFromYNABData(
    header: BudgetHeader,
    ynabBudget: YNABBudgetRecord[],
    ynabTransactions: YNABTransactionRecord[],
): Budget {
    // initialize Header
    const categoryGroups: CategoryGroup[] = [];
    const categories: Category[] = [];
    const accounts: Account[] = [];
    const transactions: Transaction[] = [];

    // translate Category Groups
    let categoryGroupSort = 0;
    for (const catAlloc of ynabBudget) {
        if (!categoryGroups.some((cg) => cg.name === catAlloc.categoryGroup)) {
            categoryGroups.push({
                id: uuid(),
                name: catAlloc.categoryGroup,
                sort: categoryGroupSort++,
            });
        }
    }

    // translate Categories
    let categorySort = 0;
    for (const catAlloc of ynabBudget) {
        if (!categories.some((c) => c.name === catAlloc.category)) {
            const categoryGroup = categoryGroups.find(
                (cg) => cg.name === catAlloc.categoryGroup,
            );
            if (!categoryGroup) {
                throw Error(
                    `Category Group ${catAlloc.categoryGroup} not defined`,
                );
            }
            categories.push({
                id: uuid(),
                groupID: categoryGroup.id,
                name: catAlloc.category,
                sort: categorySort++,
                allocations: [],
            });
        }
    }

    // add allocations to Categories
    for (const catAlloc of ynabBudget) {
        const category = categories.find(
            (c) => c.name === catAlloc.category,
        ) as Category;
        category.allocations.push({
            month: dayjs(catAlloc.month, "MMM YYYY").startOf("month").valueOf(),
            amount: catAlloc.budgeted,
        });
    }

    // translate Accounts
    for (const trx of ynabTransactions) {
        if (!accounts.some((a) => a.name === trx.account)) {
            accounts.push({
                id: uuid(),
                name: trx.account,
            });
        }
    }

    // translate Transactions
    for (const trx of ynabTransactions) {
        const account = accounts.find((a) => a.name === trx.account);
        const category = categories.find((c) => c.name === trx.category);
        // if (!category) {
        //     console.error(trx);
        //     throw Error(
        //         `transaction (m:${trx.memo}, a:${trx.account}, p:${trx.payee}) references unknown category: ${trx.category}`,
        //     );
        // }
        transactions.push({
            id: uuid(),
            accountID: account?.id,
            timestamp: 5,
            categoryID: category?.id,
            note: trx.memo,
            amount: trx.outflow === 0 ? trx.inflow : -trx.outflow,
        });
    }
    // console.log("categoryGroups:");
    // console.log(categoryGroups);
    // console.log("categories:");
    // console.log(categories);
    // console.log("accounts:");
    // console.log(accounts);
    // console.log("transactions:");
    // console.log(transactions);

    return {
        ...header,
        categoryGroups: categoryGroups,
        categories: categories,
        accounts: accounts,
        transactions: transactions,
    };
}
