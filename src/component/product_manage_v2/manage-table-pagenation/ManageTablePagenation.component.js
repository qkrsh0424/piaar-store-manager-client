import PagenationComponent from "../../module/pagenation/PagenationComponent";
import { Container } from "./ManageTablePagenation.styled";


const ManageTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.productManagementList &&
                <PagenationComponent
                    align={'right'}
                    pageIndex={props.productManagementList?.number}
                    totalPages={props.productManagementList?.totalPages}
                    isFirst={props.productManagementList?.first}
                    isLast={props.productManagementList?.last}
                    totalElements={props.productManagementList?.totalElements}
                    sizeElements={[10, 30, 50, 100, 200]}
                ></PagenationComponent>
            }
        </Container>
    );
}
export default ManageTablePagenationComponent;