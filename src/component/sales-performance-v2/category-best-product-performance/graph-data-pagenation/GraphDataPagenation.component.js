import PagenationComponentV3 from "../../../module/pagenation/PagenationComponentV3";
import { Container } from "./GraphDataPagenation.styled";

const GraphDataPagenationComponent = (props) => {
    return (
        <Container>
            {props.salesPayAmountData &&
                <PagenationComponentV3
                    align={'right'}
                    pageIndex={props.pageIndex}
                    onChangePrevPageIndex={props.onChangePrevPageIndex}
                    onChangeNextPageIndex={props.onChangeNextPageIndex}
                    totalPages={props.salesPayAmountData?.totalPages}
                    isFirst={props.salesPayAmountData?.first}
                    isLast={props.salesPayAmountData?.last}
                    totalElements={props.salesPayAmountData?.totalElements}
                    sizeElements={10}
                ></PagenationComponentV3>
            }
        </Container>
    );
}
export default GraphDataPagenationComponent;