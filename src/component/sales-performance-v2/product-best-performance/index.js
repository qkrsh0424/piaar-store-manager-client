import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { getEndDate, getStartDate, getTimeDiffWithUTC } from "../../../utils/dateFormatUtils";
import BestProductGraphComponent from "./best-product-graph/BestProductGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useProductHook from "./hooks/useProductHook";
import OperatorComponent from "./operator/Operator.component";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";

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
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {
        query,
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        productPerformance,
        optionPerformance,
        reqSearchBestProductPerformance,
        reqSearchBestOptionPerformance
    } = useProductSalesPerformanceHook();

    const {
        products,
        reqSearchAll: reqSearchAllProduct
    } = useProductHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllProduct();
            onActionCloseBackdrop();
        }

        async function fetchInit2() {
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate,
                endDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchBestProductPerformance(body);
            // await reqSearchBestOptionPerformance(body);
            onActionCloseBackdrop();
        }

        fetchInit();
        fetchInit2();
    }, [])

    const __handle = {
        action: {
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            }
        },
        submit: {
            searchPerformance: async (selectedProduct) => {
                let startDate = query.startDate ? getStartDate(query.startDate) : null;
                let endDate = query.endDate ? getEndDate(query.endDate) : null;
                let utcHourDifference = getTimeDiffWithUTC();
                let productCode = selectedProduct ? selectedProduct.code : null;

                let body = {
                    startDate,
                    endDate,
                    utcHourDifference,
                    productCode
                }

                onActionOpenBackdrop();
                // await reqSearchProductBestPerformance(body);
                onActionCloseBackdrop();
                
                setSelectedProduct(selectedProduct);
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'BEST 상품 & 옵션'} />

            <OperatorComponent
                products={products}
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
            />

            <GraphOperatorComponent
                checkedSwitch={checkedSwitch}

                onActionChangeSwitch={__handle.action.changeSwitch}
            />

            <BestProductGraphComponent
                checkedSwitch={checkedSwitch}
                productPerformance={productPerformance}
            />

            {/* <BestOptionGraphComponent
            /> */}

            {/* <SelectedProductBestOptionGraphComponent
            /> */}

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}