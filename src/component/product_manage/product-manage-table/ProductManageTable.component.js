import ProductManageTableFieldView from "./ProductManageTableField.view";


const ProductManageTableComponent = (props) => {
    return (
        <ProductManageTableFieldView
            productViewList={props.productViewList}
        ></ProductManageTableFieldView>
    )
}

export default ProductManageTableComponent;
