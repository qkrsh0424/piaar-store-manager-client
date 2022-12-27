import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDateOfMonth, getStartDateOfMonth, isSearchablePeriod, setStartDateOfPeriod } from "../../../../utils/dateFormatUtils";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import OptionListModalComponent from "./modal/option-list/OptionListModal.component";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

// 날짜검색 최대기간 90일
const SEARCHABLE_PERIOD = 90;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [products, setProducts] = useState(null);
    const [options, setOptions] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [optionListModalOpen, setOptionListModalOpen] = useState(false);

    const {
        location,
        query,
        navigateParams,
        navigateClearParams
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        productAndOptions,
        reqSearchAllRelatedProduct
    } = useProductAndOptionHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProduct();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    useEffect(() => {
        let startDate = query.startDate;
        let endDate = query.endDate;
        
        if (startDate) {
            setStartDate(new Date(startDate));
        }

        if (endDate) {
            setEndDate(new Date(endDate));
        }
    }, [query.startDate, query.endDate])

    useEffect(() => {
        if(!productAndOptions) {
            return;
        }

        __handle.action.initProductAndOption();
    }, [productAndOptions])

    const __handle = {
        action: {
            changeStartDate: (value) => {
                setStartDate(value);
            },
            changeEndDate: (value) => {
                setEndDate(value);
            },
            clearRoute: () => {
                setStartDate(null);
                setEndDate(null);

                navigateClearParams({ replace: true });
            },
            searchDateRange: (year, month, day) => {
                let end = new Date();
                let start = setStartDateOfPeriod(endDate, year, month, day);
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
            initProductAndOption: () => {
                let productData = [...new Set(productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                setProducts(productData);
            },
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            updateSelectedProduct: (productId) => {
                let product = products.filter(r => r.id === productId)[0];
                setSelectedProduct(product);

                let optionData = productAndOptions.filter(r => r.product.id === productId)?.map(r => r.option);
                setOptions(optionData);
                setSelectedOption(null);

                __handle.action.closeProductListModal();
            },
            openOptionListModal: (e) => {
                e.preventDefault();

                setOptionListModalOpen(true);
            },
            closeOptionListModal: () => {
                setOptionListModalOpen(false);
            },
            updateSelectedOption: (optionId) => {
                let option = options.filter(r => r.id === optionId)[0];
                setSelectedOption(option);

                __handle.action.closeOptionListModal();
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
                        throw new Error('조회기간은 최대 90일까지 가능합니다.')
                    }

                    if(!selectedProduct) {
                        throw new Error('조회하려는 상품을 먼저 선택해주세요.')
                    }

                    if (startDate && endDate) {
                        query.startDate = dateToYYYYMMDD(startDate);
                        query.endDate = dateToYYYYMMDD(endDate);
                    } else {
                        delete query.startDate;
                        delete query.endDate;
    
                        setStartDate(null);
                        setEndDate(null);
                    }

                    if(selectedProduct && selectedOption) {
                        query.optionCode = selectedOption.code;
                    } else if(selectedProduct) {
                        let optionCodes = options.filter(r => r.productId === selectedProduct.id).map(r => r.code);
                        query.optionCode = optionCodes;
                    } else {
                        delete query.optionCode;

                        setSelectedProduct(null);
                        setSelectedOption(null);
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                navigateParams({ replace: true })
            }
        }
    }

    return (
        <Container>
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
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}

                onActionOpenProductListModal={__handle.action.openProductListModal}
                onActionOpenOptionListModal={__handle.action.openOptionListModal}
            />

            <form onSubmit={(e) => __handle.submit.routeToSearch(e)}>
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

            <BackdropHookComponent
                open={backdropOpen}
            />

            {/* 상품선택 모달 */}
            <CommonModalComponent
                open={productListModalOpen}
                maxWidth={'xs'}

                onClose={__handle.action.closeProductListModal}
            >
                <ProductListModalComponent
                    products={products}

                    onActionSelectedProduct={__handle.action.updateSelectedProduct}
                />
            </CommonModalComponent>
            
            {/* 옵션선택 모달 */}
            <CommonModalComponent
                open={optionListModalOpen}
                maxWidth={'xs'}

                onClose={__handle.action.closeOptionListModal}
            >
                <OptionListModalComponent
                    options={options}

                    onActionSelectedOption={__handle.action.updateSelectedOption}
                />
            </CommonModalComponent>
        </Container>
    )
}