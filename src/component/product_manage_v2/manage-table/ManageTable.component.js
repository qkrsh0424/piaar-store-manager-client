import { Container } from "./ManageTable.styled";
import ManageTableFieldView from "./ManageTableField.view";

const ManageTableComponent = (props) => {
    return (
        <Container>
            <ManageTableFieldView
                productManagementList={props.productManagementList}
            ></ManageTableFieldView>
        </Container>
    )
}

export default ManageTableComponent;