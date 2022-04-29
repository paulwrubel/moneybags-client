import { useCategoryGroups } from "data/Hooks";

import CategoryGroupRow from "./CategoryGroupRow";

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
