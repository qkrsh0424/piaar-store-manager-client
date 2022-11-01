import PagenationComponentV2 from "../../module/pagenation/PagenationComponentV2";
import { Container } from "./ManageTablePagenation.styled";


const ManageTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.productManagementList &&
                <PagenationComponentV2
                    align={'right'}
                    pageIndex={props.productManagementList?.number}
                    totalPages={props.productManagementList?.totalPages}
                    isFirst={props.productManagementList?.first}
                    isLast={props.productManagementList?.last}
                    totalElements={props.productManagementList?.totalElements}
                    sizeElements={[10, 30, 50, 100, 200]}
                ></PagenationComponentV2>
            }
        </Container>
    );
}
export default ManageTablePagenationComponent;