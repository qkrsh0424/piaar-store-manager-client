import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import BestProductGraphComponent from "./best-product-graph/BestProductGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import DetailGraphSelectorModalComponent from "./modal/detail-graph-selector-modal/DetailGraphSelectorModal.component";
import OptionItemTableComponent from "./option-item-table/OptionItemTable.component";
import GraphDataPagenationComponent from "./graph-data-pagenation/GraphDataPagenation.component";
import DateRangeSelectorComponent from "../date-range-selector/DateRangeSelector.component";

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

export default function ProductBestPerformanceComponent (props) {
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
        reqSearchBestProductPerformance,
        onActionResetProductPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchBestOptionPerformance,
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
            await reqSearchBestOptionPerformance(body);
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
            // TODO :: searchValue update 호출. 분리하기
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
                await reqSearchBestProductPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'상품 - 상품 순위'} />

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