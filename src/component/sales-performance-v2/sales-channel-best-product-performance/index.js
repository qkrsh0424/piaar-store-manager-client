import styled from 'styled-components';

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import BestProductGraphComponent from './best-product-graph/BestProductGraph.component';
import useProductSalesPerformanceHook from './hooks/useProductSalesPerformanceHook';
import useOptionSalesPerformanceHook from './hooks/useOptionSalesPerformanceHook';
import DetailGraphSelectorModalComponent from './modal/detail-graph-selector-modal/DetailGraphSelectorModal.component';
import OptionItemTableComponent from './option-item-table/OptionItemTable.component';
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

function SearchFieldView({ salesChannels }) {
    return (
        <div className='search-field'>
            <div style={{ minWidth: '100px', textAlign: 'center' }}>선택 채널 : </div>
            <div className='item-container'>
                {salesChannels?.map((r, idx) => {
                    return (
                        <div
                            key={'slaes-channel-idx' + idx}
                            className='item-box'
                        >
                            <span>{r}</span>
                        </div>
                    )
                })}
                {!(salesChannels && salesChannels.length > 0) &&
                    <div style={{ color: 'var(--erp-main-color)' }}>전체 스토어</div>
                }
            </div>
        </div>
    )
}

const SalesChannelBestProductPerformanceComponent = (props) => {
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const [pageOrderByColumn, setPageOrderByColumn] = useState('payAmount');
    const [pageIndex, setPageIndex] = useState(null);

    const [selectedChannels, setSelectedChannels] = useState(null);

    const {
        location,
        navigateUrl
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance: productPerformance,
        reqSearchChannelBestProductPerformance,
        onActionResetProductPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchChannelBestOptionPerformance,
        onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    useEffect(() => {
        if (!location.state) {
            alert('스토어별 상품 순위를 확인하기 위해 스토어를 먼저 선택해주세요.\n[판매스토어 총 매출액 & 판매 건] 페이지로 이동합니다.');
            navigateUrl({
                pathname: '/sales-performance/sales-channel'
            });
            return;
        }

        if (!(location.state.salesChannels && location.state.salesChannels.length > 0)) {
            alert('스토어별 상품 순위를 확인하기 위해 스토어를 먼저 선택해주세요.\n[판매스토어 총 매출액 & 판매 건] 페이지로 이동합니다.');
            navigateUrl({
                pathname: '/sales-performance/sales-channel'
            });
            return;
        }
        __handle.action.initSalesChannels();
    }, [])

    useEffect(() => {
        async function searchOptionPerformance() {
            onActionOpenBackdrop();
            let productCodes = productPerformance?.content.map(r => r.productCode);

            let body = {
                startDate: detailSearchValue.startDate,
                endDate: detailSearchValue.endDate,
                utcHourDifference: detailSearchValue.utcHourDifference,
                productCodes: productCodes,
                salesChannels: detailSearchValue.salesChannels
            }

            await reqSearchChannelBestOptionPerformance(body);
            onActionCloseBackdrop();
        }

        if(productPerformance) {
            searchOptionPerformance();
            __handle.action.updatePageIndex();
        }
    }, [productPerformance])

    const __handle = {
        action: {
            initSalesChannels: () => {
                let selectedChannels = location.state.salesChannels;
                setSelectedChannels(selectedChannels);
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
            searchPerformance: async (data) => {
                let body = {
                    startDate: data.startDate,
                    endDate: data.endDate,
                    utcHourDifference: data.utcHourDifference,
                    salesChannels: data.salesChannels,
                    pageOrderByColumn: data.pageOrderByColumn,
                    page: data.page
                }

                onActionOpenBackdrop();
                __handle.action.updateDetailSearchValue(body);
                await reqSearchChannelBestProductPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 - 상품 순위'} />

                <SearchFieldView salesChannels={selectedChannels} />

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

export default SalesChannelBestProductPerformanceComponent;
