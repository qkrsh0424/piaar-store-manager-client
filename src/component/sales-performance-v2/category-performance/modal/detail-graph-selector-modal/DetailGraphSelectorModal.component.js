import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import CustomDatePicker from "../../../../module/date-picker/CustomDatePicker";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { BoxFieldWrapper, Container, DateSelectorFieldWrapper } from "./DetailGraphSelectorModal.styled";

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

function DateSelectorFieldView({ startDate, endDate, onChangeStartDateValue, onChangeEndDateValue }) {
    return (
        <DateSelectorFieldWrapper>
            <div className='date-selector-box'>
                <CustomDatePicker
                    valueSize={14}
                    labelSize={12}
                    label={'시작일'}
                    selected={startDate}
                    onChange={value => onChangeStartDateValue(value)}
                ></CustomDatePicker>
            </div>
            <div className='date-selector-box'>
                <CustomDatePicker
                    valueSize={14}
                    labelSize={12}
                    label={'종료일'}
                    selected={endDate}
                    onChange={value => onChangeEndDateValue(value)}
                ></CustomDatePicker>
            </div>
        </DateSelectorFieldWrapper>
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
            selectProduct: () => {
                let data = {
                    pathname: '/sales-performance/category/product/best',
                    state: searchValue
                }

                navigateUrl(data);
            },
            changeStartDateValue: (value) => {
                setSearchValue({
                    ...searchValue,
                    startDate: value
                })
            },
            changeEndDateValue: (value) => {
                setSearchValue({
                    ...searchValue,
                    endDate: value
                })
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
                    <div className='info-text'>
                        <span>검색 기간</span>
                    </div>
                    <DateSelectorFieldView
                        startDate={searchValue.startDate}
                        endDate={searchValue.endDate}
                        onChangeStartDateValue={__handle.action.changeStartDateValue}
                        onChangeEndDateValue={__handle.action.changeEndDateValue}
                    />
                    <BoxFieldView
                        onActionSelectProduct={__handle.action.selectProduct}
                    />
                </Container>
            }
            maxWidth={'md'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}
