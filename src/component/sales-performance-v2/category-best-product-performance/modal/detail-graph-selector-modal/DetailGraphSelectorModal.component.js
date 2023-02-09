import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper, Container } from "./DetailGraphSelectorModal.styled";

function BoxFieldView({ onActionSelectProductDetail }) {
    return (
        <BoxFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectProductDetail()}
                >
                    <span>상품 별</span>
                    <span className='sub-info-text'>[단일 상품 성과]</span> 
                </button>
            </div>
        </BoxFieldWrapper>
    )
}

export default function DetailGraphSelectorModalComponent(props) {
    const {
        query,
        navigateUrl
    } = useRouterHook();

    const __handle = {
        action: {
            selectProductDetail: () => {
                let searchValue = props.detailSearchValue;

                let data = {
                    pathname: '/sales-performance/product/detail',
                    state: searchValue
                }

                query.startDate = dateToYYYYMMDD(searchValue.startDate);
                query.endDate = dateToYYYYMMDD(searchValue.endDate);
                navigateUrl(data);
            }
        }
    }

    return (
        props.modalOpen &&
        <CommonModalComponentV2
            open={props.modalOpen}
            title={'그래프 선택'}
            element={
                <Container>
                    <BoxFieldView
                        onActionSelectProductDetail={__handle.action.selectProductDetail}
                    />
                </Container>
            }
            maxWidth={'sm'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
