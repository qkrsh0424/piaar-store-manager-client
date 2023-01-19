import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper } from "./DetailSelectorModal.styled";

function BoxFieldView({ onActionSelectSalesChannel, onActionSelectCategory, onActionSelectProduct }) {
    return (
        <BoxFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectSalesChannel()}
                >
                    판매스토어 별
                </button>
            </div>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectCategory()}
                >
                    카테고리 별
                </button>
            </div>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectProduct()}
                >
                    상품 별
                </button>
            </div>
        </BoxFieldWrapper>
    )
}


export default function DetailSelectorModalComponent(props) {

    const {
        navigateUrl
    } = useRouterHook();

    const __handle = {
        action: {
            selectSalesChannel: () => {
                let data = {
                    pathname: '/sales-performance/sales-channel',
                    state: props.detailSearchValue
                }

                navigateUrl(data);
            },
            selectCategory: () => {
                let data = {
                    pathname: '/sales-performance/category',
                    state: props.detailSearchValue
                }

                navigateUrl(data);
            },
            selectProduct: () => {
                let data = {
                    pathname: '/sales-performance/product/best',
                    state: props.detailSearchValue
                }

                navigateUrl(data);
            }
        }
    }

    return (
        props.modalOpen &&
        <CommonModalComponentV2
            open={props.modalOpen}
            title={'확인 그래프 선택'}
            element={
                <div>
                    <BoxFieldView
                        onActionSelectSalesChannel={__handle.action.selectSalesChannel}
                        onActionSelectCategory={__handle.action.selectCategory}
                        onActionSelectProduct={__handle.action.selectProduct}
                    />
                </div>
            }
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
