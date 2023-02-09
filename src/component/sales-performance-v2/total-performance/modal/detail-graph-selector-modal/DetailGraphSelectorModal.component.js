import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper, Container } from "./DetailGraphSelectorModal.styled";

function BoxFieldView({ onActionSelectSalesChannel, onActionSelectCategory, onActionSelectProduct }) {
    return (
        <BoxFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectSalesChannel()}
                >
                    <span>판매스토어 별</span>
                    <span className='sub-info-text'>[총 매출액 & 판매 건]</span>
                </button>
            </div>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectCategory()}
                >
                    <span>카테고리 별</span>
                    <span className='sub-info-text'>[총 매출액 & 판매 건]</span>
                </button>
            </div>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectProduct()}
                >
                    <span>상품 별</span>
                    <span className='sub-info-text'>[상품 순위]</span> 
                </button>
            </div>
        </BoxFieldWrapper>
    )
}

export default function DetailSelectorModalComponent(props) {
    const {
        query,
        navigateUrl
    } = useRouterHook();

    const __handle = {
        action: {
            selectSalesChannel: () => {
                let searchValue = props.detailSearchValue;

                let data = {
                    pathname: '/sales-performance/sales-channel',
                    state: searchValue
                }

                query.startDate = dateToYYYYMMDD(searchValue.startDate);
                query.endDate = dateToYYYYMMDD(searchValue.endDate);
                navigateUrl(data);
            },
            selectCategory: () => {
                let searchValue = props.detailSearchValue;

                let data = {
                    pathname: '/sales-performance/category',
                    state: searchValue
                }

                query.startDate = dateToYYYYMMDD(searchValue.startDate);
                query.endDate = dateToYYYYMMDD(searchValue.endDate);
                navigateUrl(data);
            },
            selectProduct: () => {
                let searchValue = props.detailSearchValue;

                let data = {
                    pathname: '/sales-performance/product/best',
                    state: searchValue
                }

                query.startDate = dateToYYYYMMDD(searchValue.startDate);
                query.endDate = dateToYYYYMMDD(searchValue.endDate);
                navigateUrl(data);
            }
        }
    }

    return (
        props.modalOpen && props.detailSearchValue &&
        <CommonModalComponentV2
            open={props.modalOpen}
            title={'그래프 선택'}
            element={
                <Container>
                    <BoxFieldView
                        onActionSelectSalesChannel={__handle.action.selectSalesChannel}
                        onActionSelectCategory={__handle.action.selectCategory}
                        onActionSelectProduct={__handle.action.selectProduct}
                    />
                </Container>
            }
            maxWidth={'sm'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
