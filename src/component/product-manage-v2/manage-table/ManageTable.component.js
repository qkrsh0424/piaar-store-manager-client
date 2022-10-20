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
            />
        </Container>
    )
}

export default ManageTableComponent;