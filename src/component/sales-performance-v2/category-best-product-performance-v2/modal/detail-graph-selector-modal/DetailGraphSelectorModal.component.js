import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
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
    const [searchValue, setSearchValue] = useState(null);

    const {
        navigateUrl
    } = useRouterHook();

    useEffect(() => {
        if(!props.detailSearchValue) {
            return;
        }

        __handle.action.initSearchValue();
    }, [props.detailSearchValue])

    const __handle = {
        action: {
            initSearchValue: () => {
                setSearchValue({...props.detailSearchValue});
            },
            selectProductDetail: () => {
                let data = {
                    pathname: '/sales-performance/product/detail',
                    state: searchValue
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
                <Container>
                    <BoxFieldView
                        onActionSelectProductDetail={__handle.action.selectProductDetail}
                    />
                </Container>
            }
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
