import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import BestOptionGraphComponent from "./best-option-graph/BestOptionGraph.component";
import ChannelPerformanceGraphComponent from "./channel-performance-graph/ChannelPerformanceGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useChannelSalesPerformanceHook from "./hooks/useChannelSalesPerformanceHook";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import OperatorComponent from "./operator/Operator.component";
import PayAmountGraphComponent from "./pay-amount-graph/PayAmountGraph.component";

const Container = styled.div`
    /* height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    } */
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

export default function PerformanceContainerComponent (props) {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance,
        reqSearchProductPerformance,
        onActionResetPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: channelPerformance,
        reqSearchChannelPerformance,
        onActionResetPerformance: onActionRestChannelPerformance
    } = useChannelSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchChannelBestOptionPerformance,
        onActionResetPerformance: onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    const {
        productAndOptions,
        reqSearchAllRelatedProduct
    } = useProductAndOptionHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProduct();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    const __handle = {
        action: {
            resetPerformance: () => {
                onActionResetPerformance();
                onActionRestChannelPerformance();
                onActionResetOptionPerformance();
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchProductPerformance(body);
                await reqSearchChannelPerformance(body);
                await reqSearchChannelBestOptionPerformance(body);
                onActionCloseBackdrop();

                // let optionCodes = body.optionCodes;

                // let options = productAndOptions.filter(r => optionCodes.includes(r.option.code));
                // setSelectedOptions(options);
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'상품 - 총 매출액 & 판매 건'} />

            <OperatorComponent
                productAndOptions={productAndOptions}
                onActionResetPerformance={__handle.action.resetPerformance}
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
            />

            <GraphOperatorComponent
                checkedSwitch={checkedSwitch}
                searchDimension={searchDimension}

                onActionChangeSwitch={__handle.action.changeSwitch}
                onActionChangeSearchDimension={__handle.action.changeDimension}
            />

            <PayAmountGraphComponent
                performance={performance}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
            />

            <ChannelPerformanceGraphComponent
                performance={channelPerformance}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
            />

            <BestOptionGraphComponent
                performance={optionPerformance}
                checkedSwitch={checkedSwitch}
            />

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}