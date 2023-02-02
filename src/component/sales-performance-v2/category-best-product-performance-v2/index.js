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
        padding: 10px;
        font-weight: 700;
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
            <span>선택 카테고리 : </span>
            <span style={{ color: 'var(--erp-main-color)' }}>{productCategoryNames ? productCategoryNames.join(", ") : '전체 카테고리'}</span>
        </div>
    )
}

const CategoryBestProductPerformanceComponent = (props) => {
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const [pageOrderByColumn, setPageOrderByColumn] = useState('payAmount');
    const [pageIndex, setPageIndex] = useState(null);
    
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
            openDetailGraphSelectorModal: (data) => {
                setDetailSearchValue(data);
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
                {/* 
                <OperatorComponent
                    productPerformance={productPerformance}
                    onActionResetPerformance={__handle.action.resetPerformance}
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                /> */}

                <SearchFieldView productCategoryNames={detailSearchValue?.productCategoryNames} />

                <GraphDataPagenationComponent
                    pageOrderByColumn={pageOrderByColumn}
                    salesPayAmountData={productPerformance}
                    pageIndex={pageIndex}
                    
                    onChangePrevPageIndex={__handle.action.changePrevPageIndex}
                    onChangeNextPageIndex={__handle.action.changeNextPageIndex}
                    onActionChangePageOrderByColumn={__handle.action.changePageOrderByColumn}
                />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                />

                <BestProductGraphComponent
                    checkedSwitch={checkedSwitch}
                    performance={productPerformance?.content}
                    detailSearchValue={detailSearchValue}

                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <OptionItemTableComponent
                    performance={optionPerformance}
                    detailSearchValue={detailSearchValue}
    
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
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
