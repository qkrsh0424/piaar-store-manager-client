import CategorySelectorFieldView from "./CategorySelectorField.view";

const CategorySelectorComponent = (props) => {

    const onChangeCategoryValue = (e) => {
        let categoryId =  e.target.value;

        props._onAction_changeCategory(categoryId);
    }

    return (
        <CategorySelectorFieldView
            categoryList={props.categoryList}
            onChangeCategoryValue={(e) => onChangeCategoryValue(e)}
        ></CategorySelectorFieldView>
    )
}

export default CategorySelectorComponent;
