import { Container } from "./ManageTable.styled";
import ManageTableFieldView from "./ManageTableField.view";

const ManageTableComponent = (props) => {
    return (
        <Container>
            <ManageTableFieldView
                productFJList={props.productFJList}
            ></ManageTableFieldView>
        </Container>
    )
}

export default ManageTableComponent;