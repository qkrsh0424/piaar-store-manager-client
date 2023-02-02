import PagenationComponentV3 from "../../../module/pagenation/PagenationComponentV3";
import { Container, OrderBySelectorFieldWrapper } from "./GraphDataPagenation.styled";

function OrderBySelectorField(props) {
    return (
        <OrderBySelectorFieldWrapper>
            <div>
                <button
                    type='button'
                    className={`button-el ${props.pageOrderByColumn === 'payAmount' ? 'checked' : ''}`}
                    onClick={(e) => props.onActionChangePageOrderByColumn(e)}
                    value='payAmount'
                >
                    매출 순
                </button>
            </div>
            <div>
                <button
                    type='button'
                    className={`button-el ${props.pageOrderByColumn === 'unit' ? 'checked' : ''}`}
                    onClick={(e) => props.onActionChangePageOrderByColumn(e)}
                    value='unit'
                >
                    수량 순
                </button>
            </div>
        </OrderBySelectorFieldWrapper>
    )
}

const GraphDataPagenationComponent = (props) => {
    return (
        <Container>
            <OrderBySelectorField
                pageOrderByColumn={props.pageOrderByColumn}
                onActionChangePageOrderByColumn={props.onActionChangePageOrderByColumn}
            />
            <div>
                {props.salesPayAmountData &&
                    <PagenationComponentV3
                        align={'right'}
                        pageIndex={props.pageIndex}
                        totalPages={props.salesPayAmountData?.totalPages}
                        isFirst={props.salesPayAmountData?.first}
                        isLast={props.salesPayAmountData?.last}
                        totalElements={props.salesPayAmountData?.totalElements}
                        sizeElements={10}
                        onChangePrevPageIndex={props.onChangePrevPageIndex}
                        onChangeNextPageIndex={props.onChangeNextPageIndex}
                    ></PagenationComponentV3>
                }
            </div>
        </Container>
    );
}
export default GraphDataPagenationComponent;