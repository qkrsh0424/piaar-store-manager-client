import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper } from "./DetailGraphSelectorModal.styled";

function BoxFieldView({ onActionSelectProduct }) {
    return (
        <BoxFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectProduct()}
                >
                    <span>카테고리 별</span>
                    <span className='sub-info-text'>[BEST 상품 & 옵션]</span> 
                </button>
            </div>
        </BoxFieldWrapper>
    )
}


export default function DetailGraphSelectorModalComponent(props) {

    const {
        navigateUrl
    } = useRouterHook();

    const __handle = {
        action: {
            selectProduct: () => {
                let data = {
                    pathname: '/sales-performance/category/product/best',
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
            title={'그래프 선택'}
            element={
                <div>
                    <BoxFieldView
                        onActionSelectProduct={__handle.action.selectProduct}
                    />
                </div>
            }
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
