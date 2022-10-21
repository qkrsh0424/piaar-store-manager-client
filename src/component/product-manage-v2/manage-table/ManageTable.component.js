import useProductHook from "../../../hooks/product/useProductHook";
import { Container } from "./ManageTable.styled";
import ManageTableFieldView from "./ManageTableField.view";

const ManageTableComponent = (props) => {
    return (
        props.productManagementList &&
        <Container>
            <ManageTableFieldView
                productManagementList={props.productManagementList}

                isCheckedOne={props.isCheckedOne}
                isCheckedAll={props.isCheckedAll}
                onActionCheckOne={props.onActionCheckOne}
                onActionCheckAll={props.onActionCheckAll}
                onSubmitDeleteProductOne={props.onSubmitDeleteProductOne}
                onActionModifyProductAndOptions={props.onActionModifyProductAndOptions}
            />
        </Container>
    )
}

export default ManageTableComponent;