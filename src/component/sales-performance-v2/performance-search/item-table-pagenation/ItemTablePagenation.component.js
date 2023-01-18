import PagenationComponentV2 from "../../../module/pagenation/PagenationComponentV2";
import { Container } from "./ItemTablePagenation.styled";

const ItemTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.itemPages &&
                <PagenationComponentV2
                    align={'right'}
                    pageIndex={props.itemPages?.number}
                    totalPages={props.itemPages?.totalPages}
                    isFirst={props.itemPages?.first}
                    isLast={props.itemPages?.last}
                    totalElements={props.itemPages?.totalElements}
                    sizeElements={[50, 100, 300, 500, 1000]}
                ></PagenationComponentV2>
            }
        </Container>
    );
}
export default ItemTablePagenationComponent;