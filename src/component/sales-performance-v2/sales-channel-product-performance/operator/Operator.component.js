import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDateOfMonth, getStartDateOfMonth, isSearchablePeriod, setStartDateOfPeriod } from "../../../../utils/dateFormatUtils";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
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
    const [selectedOptionCodes, setSelectedOptionCodes] = useState([]);

    const [productListModalOpen, setProductListModalOpen] = useState(false);

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

        if(!(startDate && endDate)) {
            setSelectedOptionCodes([]);
        }
        
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
                props.onActionClearChannel();
                setSelectedOptionCodes([])
            },
            searchDateRange: (year, month, day) => {
                let end = new Date();
                let start = setStartDateOfPeriod(end, year, month, day);

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

                let optionData = productAndOptions.map(r => r.option);
                setOptions(optionData);
            },
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            selectProduct: (productId) => {
                let optionData = productAndOptions.filter(r => r.product.id === productId)?.map(r => r.option);
                let addOptionCodes = optionData.filter(r => !selectedOptionCodes.includes(r.code)).map(r => r.code);
                setSelectedOptionCodes([...selectedOptionCodes, ...addOptionCodes]);
            },
            checkOne: (e, optionCodes) => {
                e.stopPropagation();

                let data = [...selectedOptionCodes];

                if(selectedOptionCodes.some(r => r === optionCodes)) {
                    data = data.filter(r => r !== optionCodes);
                } else {
                    data.push(optionCodes);
                }
                setSelectedOptionCodes(data);
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

                    if(selectedOptionCodes.length === 0) {
                        throw new Error('조회하려는 상품을 선택해주세요.')
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
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                navigateParams({ replace: true })
                props.onSubmitSearchPerformance(selectedOptionCodes);
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
                    selectedOptionCodes={selectedOptionCodes}
                    options={options}
                    productAndOptions={productAndOptions}

                    onActionOpenProductListModal={__handle.action.openProductListModal}
                    onActionOptionCheckOne={__handle.action.checkOne}
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

            <BackdropHookComponent
                open={backdropOpen}
            />

            {productListModalOpen &&
                <ProductListModalComponent
                    products={products}
                    modalOpen={productListModalOpen}

                    onActionSelectedProduct={__handle.action.selectProduct}
                    onActionCloseModal={__handle.action.closeProductListModal}
                />
            }
        </Container>
    )
}