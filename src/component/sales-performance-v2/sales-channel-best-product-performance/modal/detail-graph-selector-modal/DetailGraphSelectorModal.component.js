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
                    상품 상세
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
