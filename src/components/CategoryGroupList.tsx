import { Typography } from "@mui/material";
import { useState } from "react";
import CategoryGroupRow from "./CategoryGroupRow";
import { useAppSelector, useAppDispatch, useCategoryGroups } from "data/Hooks";
import { setName } from "data/BudgetSlice";

const CategoryGroupList: React.FC = () => {
    const categoryGroups = useCategoryGroups();

    return (
        <>
            {categoryGroups.map((categoryGroup) => (
                <CategoryGroupRow
                    key={categoryGroup.id}
                    categoryGroup={categoryGroup}
                />
            ))}
        </>
    );
};

export default CategoryGroupList;
