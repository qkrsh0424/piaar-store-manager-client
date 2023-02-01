import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper, Container, DateSelectorFieldWrapper } from "./DetailGraphSelectorModal.styled";

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
            selectSalesChannel: () => {
                let data = {
                    pathname: '/sales-performance/sales-channel',
                    state: searchValue
                }

                navigateUrl(data);
            },
            selectCategory: () => {
                let data = {
                    pathname: '/sales-performance/category',
                    state: searchValue
                }

                navigateUrl(data);
            },
            selectProduct: () => {
                let data = {
                    pathname: '/sales-performance/product/best',
                    state: searchValue
                }

                navigateUrl(data);
            }
        }
    }

    return (
        props.modalOpen && searchValue &&
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
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
