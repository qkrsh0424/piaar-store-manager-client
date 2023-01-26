import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper } from "./DetailGraphSelectorModal.styled";

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
        navigateUrl
    } = useRouterHook();

    const __handle = {
        action: {
            selectProductDetail: () => {
                let data = {
                    pathname: '/sales-performance/product/detail',
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
                        onActionSelectProductDetail={__handle.action.selectProductDetail}
                    />
                </div>
            }
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
