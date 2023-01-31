import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import BestProductGraphComponent from "./best-product-graph/BestProductGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import OperatorComponent from "./operator/Operator.component";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import DetailGraphSelectorModalComponent from "./modal/detail-graph-selector-modal/DetailGraphSelectorModal.component";
import OptionItemTableComponent from "./option-item-table/OptionItemTable.component";

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
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchBestProductPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'상품 - BEST 상품 & 옵션'} />

            <OperatorComponent
                productPerformance={productPerformance}
                onActionResetPerformance={__handle.action.resetPerformance}
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
                onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
            />

            <GraphOperatorComponent
                checkedSwitch={checkedSwitch}
                detailSearchValue={detailSearchValue}

                onActionChangeSwitch={__handle.action.changeSwitch}
                onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
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

            <BackdropHookComponent
                open={backdropOpen}
            />

            <DetailGraphSelectorModalComponent
                modalOpen={detailGraphSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailGraphSelectorModal}
            />
        </Container>
    )
}