interface Category {
    id: string;
    name: string;
    previousBalance: number;
    allocated: number;
    activity: number;
}

interface CategoryGroup {
    id: string;
    name: string;
    categories: Category[];
}

export default interface Budget {
    name: string;
    categoryGroups: CategoryGroup[];
}
