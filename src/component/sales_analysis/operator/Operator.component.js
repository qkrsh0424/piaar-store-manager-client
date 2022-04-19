import { useState, useEffect, useReducer } from 'react';

import ConditionSearchFieldView from "./ConditionSearchField.view";
import ConditionSelectorFieldView from "./ConditionSelectorField.view";
import DateSelectorFieldView from "./DateSelectorField.view";
import { Container } from "./Operator.styled";
import { setStartDateOfPeriod } from '../../../utils/dateFormatUtils';
import DateRangePickerModalComponent from '../date-range-picker-modal/DateRangePickerModal.component';
import CommonModalComponent from '../../module/modal/CommonModalComponent';

const OperatorComponent = (props) => {
    const [selectedDateRangeState, dispatchSelectedDateRangeState] = useReducer(selectedDateRangeReducer, initialDateRangeState);
    const [dateRangeInfo, setDateRangeInfo] = useState(null);
    const [selectedStoreInfoState, dispatchSelectedStoreInfoState] = useReducer(selectedStoreInfoReducer, initialSelectedStoreInfoState);
    const [searchInputValueState, dispatchSearchInputValueState] = useReducer(searchInputValueReducer, initialSearchInputValueState);
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);

    useEffect(() => {
        if (selectedDateRangeState) {
            return;
        }

        dispatchSelectedDateRangeState({
            type: 'INIT_DATA'
        });
        setDateRangeInfo({
            startDate: new Date(),
            endDate: new Date()
        });
    }, []);

    useEffect(() => {
        if (selectedStoreInfoState) {
            return;
        }

        dispatchSelectedStoreInfoState({
            type: 'INIT_DATA'
        });

        dispatchSearchInputValueState({
            type: 'INIT_DATA'
        });
    }, []);

    useEffect(() => {
        if (!selectedStoreInfoState) {
            return;
        }
        props._onAction_changeSearchInfo(selectedStoreInfoState);
    }, [selectedStoreInfoState]);

    useEffect(() => {
        if (!searchInputValueState) {
            return;
        }
        props._onAction_changeSearchInput(searchInputValueState);
    }, [searchInputValueState]);

    const onActionSelectDataRange = async (year, month, day) => {
        let startDate = new Date(setStartDateOfPeriod(new Date(), year, month, day));
        let endDate = new Date();
        let dateInfo = { startDate, endDate };

        dispatchSelectedDateRangeState({
            type: 'SET_DATA',
            payload: {
                startDate,
                endDate
            }
        });
        setDateRangeInfo(dateInfo);
        await props._onSubmit_searchSalesAnalysis(dateInfo);
    }
    
    const onActionSearchSalesAnalysis = async () => {
        let dateInfo = {...selectedDateRangeState};
        setDateRangeInfo(dateInfo);

        await props._onSubmit_searchSalesAnalysis(dateInfo);

        setDateRangePickerModalOpen(false);
    }

    const onActionOpenDatePickerModal = () => {
        setDateRangePickerModalOpen(true);
    }

    const onActionCloseDatePickerModal = () => {
        setDateRangePickerModalOpen(false);
    }

    const onChangeSelectedDate = (date) => {
        let startDate = date.selection.startDate;
        let endDate = date.selection.endDate;

        dispatchSelectedDateRangeState({
            type: 'SET_DATA',
            payload: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    const onChangeStoreSelector = (e) => {
        let target = e.target.value;
        let salesUnitName = target + 'SalesUnit';

        dispatchSelectedStoreInfoState({
            type: 'SET_DATA',
            payload: {
                storeName: target,
                storeSalesUnit: salesUnitName
            }
        });
    }

    const onChangeCategorySelector = (e) => {
        let target = e.target.value;

        dispatchSelectedStoreInfoState({
            type: 'SET_DATA',
            payload: {
                categoryName: target
            }
        });
    }

    const onChangeCriterionSelector = (e) => {
        let target = e.target.value;

        dispatchSelectedStoreInfoState({
            type: 'SET_DATA',
            payload: {
                criterion: target
            }
        });
    }

    const onChangeSearchColumn = (e) => {
        let target = e.target.value;

        dispatchSearchInputValueState({
            type: 'SET_DATA',
            payload: {
                searchColumn: target
            }
        })
    }

    const onChangeSearchInputValue = (e) => {
        dispatchSearchInputValueState({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    const onActionClearRoute = () => {
        dispatchSearchInputValueState({
            type: 'INIT_DATA'
        });
    }

    return (
        <Container>
            <ConditionSelectorFieldView
                productCategoryList={props.productCategoryList}

                onChangeStoreSelector={(e) => onChangeStoreSelector(e)}
                onChangeCategorySelector={(e) => onChangeCategorySelector(e)}
                onChangeCriterionSelector={(e) => onChangeCriterionSelector(e)}
            ></ConditionSelectorFieldView>

            <ConditionSearchFieldView
                searchInputValueState={searchInputValueState}

                onChangeSearchColumn={(e) => onChangeSearchColumn(e)}
                onChangeSearchInputValue={(e) => onChangeSearchInputValue(e)}
                onActionClearRoute={() => onActionClearRoute()}
            ></ConditionSearchFieldView>

            <DateSelectorFieldView
                dateRangeInfo={dateRangeInfo}

                onActionSelectDataRange={(year, month, day) => onActionSelectDataRange(year, month, day)}
                onActionOpenDatePickerModal={() => onActionOpenDatePickerModal()}
            >
            </DateSelectorFieldView>

            {/* Modal */}
            <CommonModalComponent
                open={dateRangePickerModalOpen}
                maxWidth={'xs'}
                fullWidth={false}

                onClose={onActionCloseDatePickerModal}
            >
                <DateRangePickerModalComponent
                    selectedDateRangeState={selectedDateRangeState}

                    onChangeSelectedDate={(date) => onChangeSelectedDate(date)}
                    onActionSearchSalesAnalysis={() => onActionSearchSalesAnalysis()}
                ></DateRangePickerModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default OperatorComponent;

const initialDateRangeState = null;
const initialSelectedStoreInfoState = null;
const initialSearchInputValueState = null;

const selectedDateRangeReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return {
                ...state,
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }
        case 'SET_DATA':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const selectedStoreInfoReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return { ...state,
                storeName : 'total',
                storeSalesUnit: 'totalSalesUnit',
                categoryName: 'total',
                criterion: 'unit'
            }
        case 'SET_DATA':
            return{
                ...state,
                storeName: action.payload.storeName ?? state.storeName,
                storeSalesUnit: action.payload.storeSalesUnit ?? state.storeSalesUnit,
                categoryName: action.payload.categoryName ?? state.categoryName,
                criterion: action.payload.criterion ?? state.criterion
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const searchInputValueReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return { ...state,
                searchColumn: 'total',
                searchValue: ''
            }
        case 'SET_DATA':
            return{
                ...state,
                searchColumn: action.payload.searchColumn ?? state.searchColumn,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}