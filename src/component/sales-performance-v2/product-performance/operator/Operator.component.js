import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDateOfMonth, getStartDateOfMonth, isSearchablePeriod, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [products, setProducts] = useState(null);
    const [selectedProductAndOptions, setSelectedProductAndOptions] = useState([]);

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
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        let startDate = query.startDate;
        let endDate = query.endDate;

        if(!(startDate && endDate)) {
            setSelectedProductAndOptions([]);
        }
        
        if (startDate) {
            setStartDate(new Date(startDate));
        }

        if (endDate) {
            setEndDate(new Date(endDate));
        }
    }, [query.startDate, query.endDate])

    useEffect(() => {
        if(!props.productAndOptions) {
            return;
        }

        __handle.action.initProductAndOption();
    }, [props.productAndOptions])

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
                // setSelectedOptionCodes([]);
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
                let productData = [...new Set(props.productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
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

                if(selectedProductAndOptions.length > 4) {
                    let snackbarSetting = {
                        message: '조회 상품은 최대 5개 입니다.',
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let product = products.filter(r => r.id === productId)[0];
                let options = props.productAndOptions.filter(r => r.product.id === product.id).map(r => r.option);
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
            }
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
    
                    if ((endDate - startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if (!isSearchablePeriod(startDate, endDate, SEARCHABLE_PERIOD)) {
                        throw new Error(`조회기간은 최대 ${SEARCHABLE_PERIOD}일까지 가능합니다.`)
                    }

                    if(selectedProductAndOptions.length === 0) {
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

                selectedProductAndOptions.forEach(r => {
                    r.options.forEach(r2 => searchOptionCodes.push(r2.code));
                });
                props.onSubmitSearchPerformance(searchOptionCodes);
                navigateParams({ replace: true })
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
                    products={products}
                    productAndOptions={props.productAndOptions}
                    selectedProductAndOptions={selectedProductAndOptions}

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