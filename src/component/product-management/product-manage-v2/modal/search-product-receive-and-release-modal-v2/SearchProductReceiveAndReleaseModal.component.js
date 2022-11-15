import { useEffect } from "react";
import { useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../../hooks/button-disabled/useDisabledButtonHook";
import { getEndDate, getStartDate } from "../../../../../utils/dateFormatUtils";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import useProductReceiveHook from "./hooks/useProductReceiveHook";
import useProductReleaseHook from "./hooks/useProductReleaseHook";
import DateRangeSelectorFieldView from "./view/DateRangeSelectorField.view";
import ReceiveStatusTableFieldView from "./view/ReceiveStatusTableField.view";
import ReleaseStatusTableFieldView from "./view/ReleaseStatusTableField.view";

const SearchProductReceiveAndReleaseModalComponent = (props) => {

    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    })

    const {
        productReceive: optionReceiveStatus,
        modifyingReceiveData,
        reqSearchBatchByOptionIds: reqSearchProductReceiveByOptionIds,
        onChangeValueOfNameById: onChangeReceiveValueOfNameById,
        onActionSetModifyingReceiveData,
        reqModifyReceiveMemo
    } = useProductReceiveHook();

    const {
        productRelease: optionReleaseStatus,
        modifyingReleaseData,
        reqSearchBatchByOptionIds: reqSearchProductReleaseByOptionIds,
        onChangeValueOfNameById: onChangeReleaseValueOfNameById,
        onActionSetModifyingReleaseData,
        reqModifyReleaseMemo
    } = useProductReleaseHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();
    
    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook();

    useEffect(() => {
        async function fetchInit() {
            let optionIds = [...props.checkedOptionIdList];
            let params = {
                startDate: dateRange.startDate ? getStartDate(dateRange.startDate) : null,
                endDate: dateRange.endDate ? getEndDate(dateRange.endDate) : null
            }
            onActionOpenBackdrop();
            await reqSearchProductReceiveByOptionIds(optionIds, params);
            await reqSearchProductReleaseByOptionIds(optionIds, params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    const __handle = {
        action: {
            changeStartDate: (value) => {
                setDateRange({
                    ...dateRange,
                    startDate: value
                })
            },
            changeEndDate: (value) => {
                setDateRange({
                    ...dateRange,
                    endDate: value
                })
            },
            onCloseModal: () => {
                if((modifyingReceiveData || modifyingReleaseData) && !window.confirm('현재 수정중인 데이터를 저장하지 않고 닫겠습니까?')) {
                    return;
                }
                props.onActionCloseModal();
            }
        },
        submit: {
            modifyReceiveMemo: async () => {
                let optionIds = [...props.checkedOptionIdList];
                let params = {
                    startDate: dateRange.startDate ? getStartDate(dateRange.startDate) : null,
                    endDate: dateRange.endDate ? getEndDate(dateRange.endDate) : null
                }

                try {
                    let savedReceiveData = optionReceiveStatus.filter(r => r.productReceive.id === modifyingReceiveData.id)[0];

                    if(JSON.stringify(savedReceiveData) !== JSON.stringify(modifyingReceiveData)) {
                        setButtonDisabled(true);
                        onActionOpenBackdrop();
                        await reqModifyReceiveMemo();
                        await reqSearchProductReceiveByOptionIds(optionIds, params);
                        onActionCloseBackdrop();
                    }
                } catch (err) {
                    alert(err?.message);
                }
            },
            modifyReleaseMemo: async () => {
                let optionIds = [...props.checkedOptionIdList];
                let params = {
                    startDate: dateRange.startDate ? getStartDate(dateRange.startDate) : null,
                    endDate: dateRange.endDate ? getEndDate(dateRange.endDate) : null
                }

                try {
                    let savedReleaseData = optionReleaseStatus.filter(r => r.productRelease.id === modifyingReleaseData.id)[0];
                    
                    if(JSON.stringify(savedReleaseData) !== JSON.stringify(modifyingReleaseData)) {
                        setButtonDisabled(true);
                        onActionOpenBackdrop();
                        await reqModifyReleaseMemo();
                        await reqSearchProductReleaseByOptionIds(optionIds, params);
                        onActionCloseBackdrop();
                    }
                } catch (err) {
                    alert(err?.message);
                }
            },
            confirmSelectedDate: async () => {
                let startDate = dateRange.startDate;
                let endDate = dateRange.endDate;

                let optionIds = [...props.checkedOptionIdList];
                let params = {
                    startDate: startDate ? getStartDate(startDate) : null,
                    endDate: endDate ? getEndDate(endDate) : null
                }

                if (startDate && !endDate) {
                    alert('종료일 날짜를 선택해 주세요.')
                    return;
                }
        
                if (!startDate && endDate) {
                    alert('시작일 날짜를 선택해 주세요.')
                    return;
                }

                if ((endDate - startDate < 0)) {
                    alert('조회기간을 정확히 선택해 주세요.')
                    return;
                }

                onActionOpenBackdrop();
                await reqSearchProductReceiveByOptionIds(optionIds, params);
                await reqSearchProductReleaseByOptionIds(optionIds, params);
                onActionCloseBackdrop();
            },
        }
    }

    return (
        <>
            <CommonModalComponentV2
                open={props.modalOpen}
                title={'입출고 현황'}
                element={
                    <>
                        <DateRangeSelectorFieldView
                            dateRange={dateRange}

                            onChangeStartDateValue={__handle.action.changeStartDate}
                            onChangeEndDateValue={__handle.action.changeEndDate}
                            onActionConfirmSelectedDate={__handle.submit.confirmSelectedDate}
                        />
                        <div className='data-wrapper' style={{ padding: '0', marginTop: '20px' }}>
                            <ReceiveStatusTableFieldView
                                buttonDisabled={buttonDisabled}
                                optionReceiveStatus={optionReceiveStatus}
                                modifyingData={modifyingReceiveData}

                                onChangeInputValue={onChangeReceiveValueOfNameById}
                                onActionSetModifyingData={onActionSetModifyingReceiveData}
                                onSubmitModifyMemo={__handle.submit.modifyReceiveMemo}
                            />
                        </div>
                        <div className='data-wrapper' style={{ padding: '0', marginTop: '20px' }}>
                            <ReleaseStatusTableFieldView
                                buttonDisabled={buttonDisabled}
                                optionReleaseStatus={optionReleaseStatus}
                                modifyingData={modifyingReleaseData}

                                onChangeInputValue={onChangeReleaseValueOfNameById}
                                onActionSetModifyingData={onActionSetModifyingReleaseData}
                                onSubmitModifyMemo={__handle.submit.modifyReleaseMemo}
                            />
                        </div>
                    </>
                }
                maxWidth={'lg'}

                onClose={__handle.action.onCloseModal}
            />

            <BackdropHookComponent 
                open={backdropOpen}
            />
        </>
    )
}

export default SearchProductReceiveAndReleaseModalComponent;