import PagenationComponent from "../../../../module/pagenation/PagenationComponentV2";
import { Container } from "./ReturnItemTablePagenation.styled";

const ReturnItemTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.returnItemPage &&
                <PagenationComponent
                    align={'right'}
                    pageIndex={props.returnItemPage?.number}
                    totalPages={props.returnItemPage?.totalPages}
                    isFirst={props.returnItemPage?.first}
                    isLast={props.returnItemPage?.last}
                    totalElements={props.returnItemPage?.totalElements}
                    sizeElements={[50, 100, 300, 500, 1000]}
                ></PagenationComponent>
            }
        </Container>
    );
}
export default ReturnItemTablePagenationComponent;