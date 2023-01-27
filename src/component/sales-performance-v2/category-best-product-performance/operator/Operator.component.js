import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import CategorySelectorFieldView from "./view/CategorySelectorField.view";
import ChannelSelectorFieldView from "./view/CategorySelectorField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [salesCategory, setSalesCategory] = useState(null);
    const [selectedSalesCategory, setSelectedSalesCategory] = useState(null);

    const [products, setProducts] = useState(null);
    const [selectedProductAndOptions, setSelectedProductAndOptions] = useState([]);

    const [productListModalOpen, setProductListModalOpen] = useState(false);

    const {
        query,
        location,
        navigateParams
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
        let date1 = location.state?.startDate ? location.state?.startDate : new Date(query.startDate);
        let date2 = location.state?.endDate ? location.state?.endDate : new Date(query.endDate);

        setStartDate(date1);
        setEndDate(date2);

        query.startDate = dateToYYYYMMDD(date1);
        query.endDate = dateToYYYYMMDD(date2);
        navigateParams({ replace : true });
    }, [])

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProduct();
            onActionCloseBackdrop();
        }

        async function searchPerformance() {
            let searchStartDate = location.state?.startDate ? getStartDate(location.state?.startDate) : getStartDate(query.startDate);
            let searchEndDate = location.state?.endDate ? getEndDate(location.state?.endDate) : getEndDate(query.endDate);
            let utcHourDifference = getTimeDiffWithUTC();
            let productCategoryNames = location.state?.productCategory ?? null;

            let body = {
                startDate: searchStartDate,
                endDate: searchEndDate,
                utcHourDifference,
                productCategoryNames
            }

            __handle.action.initSearchValue(body)
            await props.onSubmitSearchPerformance(body);
        }

        fetchInit();
        searchPerformance();
    }, [])

    useEffect(() => {
        if(!productAndOptions) {
            return;
        }

        __handle.action.initProductAndOption();
    }, [productAndOptions])

    const __handle = {
        action: {
            initSearchValue: (body) => {
                props.onActionUpdateDetailSearchValue(body);

                setSalesCategory(body.productCategoryNames);
                setSelectedSalesCategory(body.productCategoryNames);
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
                setSelectedProductAndOptions([]);
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
            selectProduct: (productId) => {
                let selectedProduct = selectedProductAndOptions.some(r => r.product.id === productId);
                if(selectedProduct){
                    return;
                }

                let product = products.filter(r => r.id === productId)[0];
                let options = productAndOptions.filter(r => r.product.id === product.id).map(r => r.option);
                let data = [{
                    product,
                    options: options
                }]
                
                setSelectedProductAndOptions([...selectedProductAndOptions, ...data]);
            },
            removeOptionOne: (e, optionId) => {
                e.stopPropagation();

                let updatedProductAndOptions = selectedProductAndOptions.map(r => {
                    let options = r.options.filter(r2 => r2.id !== optionId);

                    return {
                        ...r,
                        options
                    }
                })
                // 해당 상품에 대한 옵션이 모두 제거되면 상품도 제거
                updatedProductAndOptions = updatedProductAndOptions.filter(r => r.options?.length > 0);

                setSelectedProductAndOptions(updatedProductAndOptions);
            },
            removeProduct: (e, productId) => {
                e.stopPropagation();

                let updatedProductAndOptions = selectedProductAndOptions.filter(r => r.product.id !== productId);
                setSelectedProductAndOptions(updatedProductAndOptions);
            },
            isCheckedOne: (category) => {
                return selectedSalesCategory.some(name => name === category);
            },
            checkOne: (e, category) => {
                e.stopPropagation();

                let data = [...selectedSalesCategory];

                if(selectedSalesCategory.some(name => name === category)) {
                    data = data.filter(name => name !== category);
                } else {
                    data.push(category);
                }
                setSelectedSalesCategory(data);
            },
        },
        submit: {
            routeToSearch: (e) => {
                e.preventDefault();

                let searchOptionCodes = [];

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
    
                    if((endDate - startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if(!isSearchablePeriod(startDate, endDate, SEARCHABLE_PERIOD)) {
                        throw new Error(`조회기간은 최대 ${SEARCHABLE_PERIOD}일까지 가능합니다.`)
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                selectedProductAndOptions.forEach(r => {
                    r.options.forEach(r2 => searchOptionCodes.push(r2.code));
                });

                let searchStartDate = startDate ? getStartDate(startDate) : null;
                let searchEndDate = endDate ? getEndDate(endDate) : null;
                let utcHourDifference = getTimeDiffWithUTC();
                let productCategoryNames = selectedSalesCategory;

                let body = {
                    startDate: searchStartDate,
                    endDate: searchEndDate,
                    utcHourDifference,
                    productCategoryNames
                }

                props.onActionChangeSelectedOption(selectedProductAndOptions);
                props.onActionUpdateDetailSearchValue(body);
                props.onSubmitSearchPerformance(body);

                query.startDate = dateToYYYYMMDD(startDate);
                query.endDate = dateToYYYYMMDD(endDate);
                navigateParams({ replace: true });
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

                <CategorySelectorFieldView
                    salesCategory={salesCategory}
                    onActionIsCheckedOne={__handle.action.isCheckedOne}
                    onActionCheckOne={__handle.action.checkOne}
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