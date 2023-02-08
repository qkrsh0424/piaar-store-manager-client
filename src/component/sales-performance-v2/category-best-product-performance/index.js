import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import BestProductGraphComponent from './best-product-graph/BestProductGraph.component';
import useProductSalesPerformanceHook from './hooks/useProductSalesPerformanceHook';
import useOptionSalesPerformanceHook from './hooks/useOptionSalesPerformanceHook';
import DetailGraphSelectorModalComponent from './modal/detail-graph-selector-modal/DetailGraphSelectorModal.component';
import OptionItemTableComponent from './option-item-table/OptionItemTable.component';
import { useEffect } from 'react';
import DateRangeSelectorComponent from '../date-range-selector/DateRangeSelector.component';
import GraphDataPagenationComponent from './graph-data-pagenation/GraphDataPagenation.component';
import useRouterHook from '../../../hooks/router/useRouterHook';

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }

    .search-field {
        display: flex;
        align-items: flex-start;
        padding: 10px 0;
        font-weight: 700;
    }

    .item-container {
        width: 100%;
        padding: 0 5px;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);
        background-color: white;
        overflow: auto;
        max-height: 60px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .search-field .item-box {
        padding: 2px 5px;
        color: var(--erp-main-color);
    }
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

function SearchFieldView({ productCategoryNames }) {
    return (
        <div className='search-field'>
            <div style={{ minWidth: '120px', textAlign: 'center' }}>선택 카테고리 : </div>
            <div className='item-container'>
                {productCategoryNames?.map((r, idx) => {
                    return (
                        <div
                            key={'category-idx' + idx}
                            className='item-box'
                        >
                            <span>{r}</span>
                        </div>
                    )
                })}
                {!productCategoryNames &&
                    <div style={{ color: 'var(--erp-main-color)' }}>전체 카테고리</div>
                }
            </div>
        </div>
    )
}

const CategoryBestProductPerformanceComponent = (props) => {
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const [pageOrderByColumn, setPageOrderByColumn] = useState('payAmount');
    const [pageIndex, setPageIndex] = useState(null);

    const [selectedCategoryNames, setSelectedCategoryNames] = useState(null);
    
    const {
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance: productPerformance,
        reqSearchCategoryBestProductPerformance,
        onActionResetProductPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchCategoryBestOptionPerformance,
        onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    useEffect(() => {
        if(!location.state) {
            return;
        }

        if(!location.state.productCategoryNames) {
            return;
        }
        __handle.action.initProductCategoryNames();
    }, [])

    useEffect(() => {
        async function searchOptionPerformance() {
            onActionOpenBackdrop();
            let productCodes = productPerformance?.content.map(r => r.productCode);
            let body = {
                ...detailSearchValue,
                productCodes: productCodes
            }
            await reqSearchCategoryBestOptionPerformance(body);
            onActionCloseBackdrop();
        }

        if(productPerformance) {
            searchOptionPerformance();
            __handle.action.updatePageIndex();
        }
    }, [productPerformance])

    const __handle = {
        action: {
            initProductCategoryNames: () => {
                let selectedProductCategoryNames = location.state.productCategoryNames;
                setSelectedCategoryNames(selectedProductCategoryNames);
            },
            resetPerformance: () => {
                onActionResetProductPerformance();
                onActionResetOptionPerformance();
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            updateDetailSearchValue: (data) => {
                setDetailSearchValue({
                    ...detailSearchValue,
                    ...data
                });
            },
            openDetailGraphSelectorModal: () => {
                setDetailGraphSelectorModalOpen(true);
            },
            closeDetailGraphSelectorModal: () => {
                setDetailSearchValue(null);
                setDetailGraphSelectorModalOpen(false);
            },
            changePageOrderByColumn: (e) => {
                let value = e.target.value;
                let searchValue = {
                    ...detailSearchValue,
                    pageOrderByColumn: value,
                    page: null
                }
                
                setPageOrderByColumn(value);
                setDetailSearchValue(searchValue);
               
                __handle.action.updatePageIndex();
                __handle.submit.searchPerformance(searchValue);
            },
            updatePageIndex: () => {
                setPageIndex(productPerformance?.number);
            },
            changePrevPageIndex: () => {
                let page = pageIndex - 1;
                let searchValue = {
                    ...detailSearchValue,
                    page: page + 1
                }

                setPageIndex(page);
                setDetailSearchValue(searchValue);

                __handle.submit.searchPerformance(searchValue);
            },
            changeNextPageIndex: () => {
                let page = pageIndex + 1;
                let searchValue = {
                    ...detailSearchValue,
                    page: page + 1
                }

                setPageIndex(page);
                setDetailSearchValue(searchValue);

                __handle.submit.searchPerformance(searchValue);
            },
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                __handle.action.updateDetailSearchValue(body);
                await reqSearchCategoryBestProductPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'카테고리 - 상품 순위'} />

                <SearchFieldView productCategoryNames={selectedCategoryNames} />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                />

                <BestProductGraphComponent
                    checkedSwitch={checkedSwitch}
                    performance={productPerformance?.content}
                    detailSearchValue={detailSearchValue}

                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <GraphDataPagenationComponent
                    pageOrderByColumn={pageOrderByColumn}
                    salesPayAmountData={productPerformance}
                    pageIndex={pageIndex}
                    
                    onChangePrevPageIndex={__handle.action.changePrevPageIndex}
                    onChangeNextPageIndex={__handle.action.changeNextPageIndex}
                    onActionChangePageOrderByColumn={__handle.action.changePageOrderByColumn}
                />

                <OptionItemTableComponent
                    checkedSwitch={checkedSwitch}
                    performance={optionPerformance}
                    detailSearchValue={detailSearchValue}
                />

                <DateRangeSelectorComponent
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />

            <DetailGraphSelectorModalComponent
                modalOpen={detailGraphSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailGraphSelectorModal}
            />
        </>
    )
}

export default CategoryBestProductPerformanceComponent;
