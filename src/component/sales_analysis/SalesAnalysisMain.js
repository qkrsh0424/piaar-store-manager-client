import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { getStartDate, getEndDate, dateToYYMMDD, setStartDateOfPeriod } from '../../handler/dateHandler';

import { salesAnalysisDataConnect } from '../../data_connect/salesAnalysisDataConnect';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import BackdropLoading from '../loading/BackdropLoading';
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SalesAnalysisBody from './SalesAnalysisBody';
import DateRangePickerModal from './modal/DateRangePickerModal';
import SalesAnalysisDataControlBar from './SalesAnalysisDataControlBar';

const Container = styled.div`
    height:100vh;
    padding: 0 5%;
    overflow: auto;
    background: linear-gradient(to bottom right, #f0fcff, #dce3f6);

    & .info-table {
        display: grid;
        grid-template-rows: 1fr;
    }
`;

const initialDateRangeState = null;
const initialSelectedStoreInfo = null;

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
                categoryName: action.payload.categoryname ?? state.categoryName,
                criterion: action.payload.criterion ?? state.criterion
            }
        case 'CELAR':
            return null;
        default: return { ...state }
    }
}

const SalesAnalysisMain = () => {
    const [salesAnalysisItems, setSalesAnalysisItems] = useState(null);
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [DateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);
    const [productCategoryList, setProdductCategoryList] = useState(null);
    const [selectedDateRangeState, dispatchSelectedDateRangeState] = useReducer(selectedDateRangeReducer, initialDateRangeState);
    const [selectedStoreInfoState, dispatchSelectedStoreInfoState] = useReducer(selectedStoreInfoReducer, initialSelectedStoreInfo);
    const [salesAnalysisViewItems, setSalesAnalysisViewItems] = useState(null);

    useEffect(() => {
        async function getCategory() {
            if(productCategoryList) {
                return;
            }

            await __handleDataConnect().searchProductCategory();
        }

        getCategory();
    }, []);

    useEffect(() => {
        function setInitDate() {
            if(selectedDateRangeState) {
                return;
            }

            dispatchSelectedDateRangeState({
                type: 'INIT_DATA'
            });
        }
        setInitDate();
    }, []);

    useEffect(() => {
        function setInitSelectValue() {
            if(selectedStoreInfoState) {
                return;
            }

            dispatchSelectedStoreInfoState({
                type: 'INIT_DATA'
            });
        }
        setInitSelectValue();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchSalesAnalysis: async function (startDate, endDate) {
                var start = startDate ? new Date(getStartDate(startDate)).toUTCString() : null;
                var end = endDate ? new Date(getEndDate(endDate)).toUTCString() : null;

                await salesAnalysisDataConnect().searchAll(start, end)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            let result = res.data.data;
                            let sortedResult = result?.sort((a, b) => b[selectedStoreInfoState?.storeSalesUnit] - a[selectedStoreInfoState?.storeSalesUnit]);

                            setSalesAnalysisItems(sortedResult);
                            setSalesAnalysisViewItems(sortedResult);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            searchProductCategory: async function () {
                await productCategoryDataConnect().searchList()
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setProdductCategoryList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        }
    }

    const dateRangePickerControl = () => {
        return {
            open: function () {
                setDateRangePickerModalOpen(true);
            },
            close: function () {
                setDateRangePickerModalOpen(false);
            },
            selectDateRange: async function (startDate, endDate) {
                setBackdropLoading(true);
                await __handleDataConnect().searchSalesAnalysis(startDate, endDate);
                setBackdropLoading(false);
                this.close();
            },
            changeReleasedData: function (date) {
                let startDate = date.selection.startDate;
                let endDate = date.selection.endDate;

                dispatchSelectedDateRangeState({
                    type: 'SET_DATA',
                    payload: {
                        startDate: startDate,
                        endDate: endDate
                    }
                });
            },
            setSelectedPeriod: function (year, month, day) {
                let startDate = new Date(setStartDateOfPeriod(new Date(), year, month, day));
                let endDate = new Date();

                dispatchSelectedDateRangeState({
                    type: 'SET_DATA',
                    payload: {
                        startDate: startDate,
                        endDate: endDate
                    }
                });

                this.selectDateRange(startDate, endDate);
            }
        }
    }

    const storeDropdownControl = () => {
        return {
            onChangeStoreValue: function (e) {
                let target = e.target.value;
                let salesUnitName = target + 'SalesUnit';
                
                dispatchSelectedStoreInfoState({
                    type: 'SET_DATA',
                    payload: {
                        storeName: target,
                        storeSalesUnit: salesUnitName
                    }
                });

                salesAnalysisItems?.sort((a, b) => b[salesUnitName] - a[salesUnitName]);
            },
            onChangeCategoryValue: function (e) {
                let target = e.target.value;

                dispatchSelectedStoreInfoState({
                    type: 'SET_DATA',
                    payload: {
                        categoryName: target
                    }
                });
                
                let selectedData = [];
                if(target === 'total') {
                    selectedData = salesAnalysisItems
                }else {
                    selectedData = salesAnalysisItems?.filter(r => r.categoryName === target);
                }
                setSalesAnalysisViewItems(selectedData);
            },
            onChangeCriterionValue: function (e) {
                let target = e.target.value;
                
                dispatchSelectedStoreInfoState({
                    type: 'SET_DATA',
                    payload: {
                        criterion: target
                    }
                });

                let selectedData = [];
                if(target === 'unit') {
                    selectedData = salesAnalysisItems?.sort((a, b) => b[selectedStoreInfoState.storeSalesUnit] - a[selectedStoreInfoState.storeSalesUnit]);
                }else if(target === 'revenue') {
                    selectedData = salesAnalysisItems?.sort((a, b) => (b[selectedStoreInfoState.storeSalesUnit] * b.salesOptionPrice) - (a[selectedStoreInfoState.storeSalesUnit] * a.salesOptionPrice));
                }
                setSalesAnalysisViewItems(selectedData);
            },
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <Container>
                <BackdropLoading open={backdropLoading} />

                <SalesAnalysisDataControlBar
                    selectedDateRangeState={selectedDateRangeState}
                    productCategoryList={productCategoryList}

                    storeDropdownControl={storeDropdownControl}
                    dateRangePickerControl={dateRangePickerControl}
                ></SalesAnalysisDataControlBar>


                <SalesAnalysisBody
                    salesAnalysisItems={salesAnalysisItems}
                    selectedDateRangeState={selectedDateRangeState}
                    selectedStoreInfoState={selectedStoreInfoState}
                    salesAnalysisViewItems={salesAnalysisViewItems}
                ></SalesAnalysisBody>

                <DateRangePickerModal
                    open={DateRangePickerModalOpen}
                    selectedDateRangeState={selectedDateRangeState}

                    dateRangePickerControl={dateRangePickerControl}
                ></DateRangePickerModal>

            </Container>
        </>
    )
}

export default withRouter(SalesAnalysisMain);