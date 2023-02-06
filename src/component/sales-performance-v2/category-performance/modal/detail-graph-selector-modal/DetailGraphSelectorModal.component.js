import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CustomDatePicker from "../../../../module/date-picker/CustomDatePicker";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper, Container } from "./DetailGraphSelectorModal.styled";

function BoxFieldView({ onActionSelectProduct }) {
    return (
        <BoxFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => onActionSelectProduct()}
                >
                    <span>카테고리 별</span>
                    <span className='sub-info-text'>[상품 순위]</span> 
                </button>
            </div>
        </BoxFieldWrapper>
    )
}

export default function DetailGraphSelectorModalComponent(props) {
    const {
        query,
        navigateUrl,
        updateRouteState
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
                let selectedState = {
                    ...props.detailSearchValue,
                    startDate: query.startDate,
                    endDate: query.endDate
                };

                updateRouteState(selectedState);
            },
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
        props.modalOpen && props.detailSearchValue &&
        <CommonModalComponentV2
            open={props.modalOpen}
            title={'그래프 선택'}
            element={
                <Container>
                    <BoxFieldView
                        onActionSelectProduct={__handle.action.selectProduct}
                    />
                </Container>
            }
            maxWidth={'sm'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
