import PagenationComponent from "../../module/pagenation/PagenationComponent";
import { Container } from "./ManageTablePagenation.styled";


const ManageTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.productFJList &&
                <PagenationComponent
                    align={'right'}
                    pageIndex={props.productFJList?.number}
                    totalPages={props.productFJList?.totalPages}
                    isFirst={props.productFJList?.first}
                    isLast={props.productFJList?.last}
                    totalElements={props.productFJList?.totalElements}
                    sizeElements={[30, 50, 100, 200, 500]}
                ></PagenationComponent>
            }
        </Container>
    );
}
export default ManageTablePagenationComponent;