import { Typography } from "@mui/material";
import { useState } from "react";
import CategoryGroup from "./CategoryGroup";
import { useData } from "data/DataProvider";

const CategoryGroupList: React.FC = () => {
    const budget = useData().data;

    return (
        <>
            {budget.categoryGroups.map((categoryGroup) => (
                <CategoryGroup
                    key={categoryGroup.id}
                    categoryGroup={categoryGroup}
                />
            ))}
        </>
    );
};

export default CategoryGroupList;
