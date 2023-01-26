import _ from "lodash";
import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../../utils/dateFormatUtils";
import useProductAndOptionHook from "../hooks/useProductAndOptionHook";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

const TODAY = new Date();
const PREV_2WEEKS_DATE = setSubtractedDate(TODAY, 0, 0, -13);

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [productListModalOpen, setProductListModalOpen] = useState(false);

    const {
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        if(!props.products) {
            return;
        }

        __handle.action.initSearchValueAndSearchPerformance();
    }, [props.products])

    const __handle = {
        action: {
            initSearchValueAndSearchPerformance: () => {
                let productCode = location.state?.productCode;

                // 선택된 상품이 없는 경우
                if(!productCode) {
                    return;
                }

                let selectedProduct = props.productAndOptions.filter(r => r.product.code === productCode);
                let searchOptionCodes = selectedProduct.map(r => r.option.code);

                let startDate = location.state?.startDate ?? PREV_2WEEKS_DATE;
                let endDate = location.state?.endDate ?? TODAY;
                let utcHourDifference = getTimeDiffWithUTC();
                let optionCodes = searchOptionCodes ?? null;
                
                let body = {
                    startDate,
                    endDate,
                    utcHourDifference,
                    optionCodes
                }
                
                props.onSubmitSearchPerformance(body);
                props.onActionChangeSelectedProduct(productCode);
                
                setStartDate(startDate);
                setEndDate(endDate);
            },
            changeStartDate: (value) => {
                setStartDate(value);
            },
            changeEndDate: (value) => {
                setEndDate(value);
            },
            clearRoute: () => {
                setStartDate(null);
                setEndDate(null);

                props.onActionResetPerformance();
            },
            searchDateRange: (year, month, day) => {
                let end = new Date();
                let start = setSubtractedDate(end, year, month, day);

                setStartDate(start);
                setEndDate(end);
            },
            searchMonthRange: (month) => {
                let date = new Date();
                let searchMonth = new Date(date.setMonth(date.getMonth() + month));
                let start = getStartDateOfMonth(searchMonth);
                let end = month === 0 ? new Date() : getEndDateOfMonth(searchMonth);

                setStartDate(start);
                setEndDate(end);
            },
            // initProductAndOption: () => {
            //     let productData = [...new Set(props.productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
            //     setProducts(productData);
            // },
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            selectProduct: (productCode) => {
                props.onActionChangeSelectedProduct(productCode);
                __handle.action.closeProductListModal();
            }
        },
        submit: {
            routeToSearch: (e) => {
                e.preventDefault();

                try{
                    if (startDate && !endDate) {
                        throw new Error('종료일 날짜를 선택해 주세요.')
                    }
    
                    if (!startDate && endDate) {
                        throw new Error('시작일 날짜를 선택해 주세요.')
                    }

                    if(!(startDate && endDate)) {
                        throw new Error('시작일과 종료일을 선택해 주세요.')
                    }
    
                    if ((endDate - startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if (!isSearchablePeriod(startDate, endDate, SEARCHABLE_PERIOD)) {
                        throw new Error(`조회기간은 최대 ${SEARCHABLE_PERIOD}일까지 가능합니다.`)
                    }

                    if(!props.selectedProduct) {
                        throw new Error('조회하려는 상품을 선택해주세요.')
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let searchOptionCodes = props.productAndOptions.filter(r => r.product.id === props.selectedProduct.id).map(r => r.option.code);

                let searchStartDate = startDate ? getStartDate(startDate) : null;
                let searchEndDate = endDate ? getEndDate(endDate) : null;
                let utcHourDifference = getTimeDiffWithUTC();
                let optionCodes = searchOptionCodes;

                let body = {
                    startDate: searchStartDate,
                    endDate: searchEndDate,
                    utcHourDifference,
                    optionCodes
                }
                props.onSubmitSearchPerformance(body);
            }
        }
    }

    return (
        <Container>
            <form onSubmit={(e) => __handle.submit.routeToSearch(e)}>
                <DateSelectorFieldView
                    startDate={startDate}
                    endDate={endDate}
                    onChangeStartDateValue={__handle.action.changeStartDate}
                    onChangeEndDateValue={__handle.action.changeEndDate}
                />
                <DateButtonFieldView
                    onActionSearchDateRange={__handle.action.searchDateRange}
                    onActionSearchMonthRange={__handle.action.searchMonthRange}
                />

                <SearchFieldView
                    products={props.products}
                    selectedProduct={props.selectedProduct}

                    onActionOpenProductListModal={__handle.action.openProductListModal}
                    onActionRemoveOptionOne={__handle.action.removeOptionOne}
                    onActionRemoveProduct={__handle.action.removeProduct}
                />
                <ButtonFieldView
                    onActionClearRoute={__handle.action.clearRoute}
                />
            </form>

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }

            {productListModalOpen &&
                <ProductListModalComponent
                    products={props.products}
                    modalOpen={productListModalOpen}

                    onActionSelectedProduct={__handle.action.selectProduct}
                    onActionCloseModal={__handle.action.closeProductListModal}
                />
            }

            <BackdropHookComponent open={backdropOpen} />
        </Container>
    )
}