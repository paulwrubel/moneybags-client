import CategoryGroupRow from "components/CategoryGroupRow";
import { useCategoryGroups } from "data/Hooks";

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
