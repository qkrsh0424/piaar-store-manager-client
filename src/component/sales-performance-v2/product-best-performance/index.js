import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import BestProductGraphComponent from "./best-product-graph/BestProductGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import OperatorComponent from "./operator/Operator.component";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import BestOptionGraphComponent from "./best-option-graph/BestOptionGraph.component";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import ProductSelectorComponent from "./product-selector/ProductSelector.component";
import ProductBestOptionGraphComponent from "./product-best-option-graph/ProductBestOptionGraph.component";
import DetailGraphSelectorModalComponent from "./modal/detail-graph-selector-modal/DetailGraphSelectorModal.component";

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
    const [salesProduct, setSalesProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);

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
        if(!optionPerformance) {
            return;
        }

        __handle.action.initProduct();
    }, [optionPerformance])

    const __handle = {
        action: {
            resetPerformance: () => {
                setSalesProduct(null);
                onActionResetProductPerformance();
                onActionResetOptionPerformance();
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            initProduct: () => {
                let product = new Set([]);
                optionPerformance.forEach(r => {
                    product.add(r.productDefaultName);
                })

                let productName = [...product].sort();
                setSalesProduct(productName);

                // 기본 1개 선택
                setSelectedProduct([productName[0]]);
            },
            isCheckedOne: (productName) => {
                return selectedProduct.some(name => name === productName);
            },
            checkOne: (e, productName) => {
                e.stopPropagation();

                let data = [...selectedProduct];

                if(selectedProduct.some(name => name === productName)) {
                    data = data.filter(name => name !== productName);
                } else {
                    data.push(productName);
                }
                setSelectedProduct(data);
            },
            checkAll: (e) => {
                e.stopPropagation();

                setSelectedProduct([...salesProduct]);
            },
            checkCancelAll: (e) => {
                e.stopPropagation();

                setSelectedProduct([]);
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
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchBestProductPerformance(body);
                await reqSearchBestOptionPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'상품 - BEST 상품 & 옵션'} />

            <OperatorComponent
                onActionResetPerformance={__handle.action.resetPerformance}
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
                onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
            />

            <GraphOperatorComponent
                checkedSwitch={checkedSwitch}

                onActionChangeSwitch={__handle.action.changeSwitch}
            />

            <BestProductGraphComponent
                checkedSwitch={checkedSwitch}
                performance={productPerformance}
                detailSearchValue={detailSearchValue}

                onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
            />

            <BestOptionGraphComponent
                checkedSwitch={checkedSwitch}
                performance={optionPerformance}
                detailSearchValue={detailSearchValue}

                onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
            />

            <ProductSelectorComponent
                salesProduct={salesProduct}
                onActionIsCheckedOne={__handle.action.isCheckedOne}
                onActionCheckOne={__handle.action.checkOne}
                onActionCheckAll={__handle.action.checkAll}
                onActionCheckCancelAll={__handle.action.checkCancelAll}
            />
            
            <ProductBestOptionGraphComponent
                checkedSwitch={checkedSwitch}
                selectedProduct={selectedProduct}
                performance={optionPerformance}
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