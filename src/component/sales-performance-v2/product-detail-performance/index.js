import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import OperatorComponent from "./operator/Operator.component";
import PayAmountDayOfWeekGraphComponent from "./pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component";
import PayAmountGraphComponent from "./pay-amount-graph/PayAmountGraph.component";
import RegistrationAndUnitGraphComponent from "./registration-and-unit-graph/RegistrationAndUnitGraph.component";

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

export default function ProductDetailPerformanceComponent (props) {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    const [searchDataControl, setSearchDataControl] = useState('product');

    const [selectedOptions, setSelectedOptions] = useState(null);

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
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            changeSearchDataControl: (e) => {
                let value = e.target.value;
                setSearchDataControl(value);
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchProductPerformance(body);
                onActionCloseBackdrop();

                let optionCodes = body.optionCodes;

                let options = productAndOptions.filter(r => optionCodes.includes(r.option.code));
                setSelectedOptions(options);
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
                searchDataControl={searchDataControl}

                onActionChangeSwitch={__handle.action.changeSwitch}
                onActionChangeSearchDimension={__handle.action.changeDimension}
                onActionChangeSearchDataControl={__handle.action.changeSearchDataControl}
            />
{/* 
            <PayAmountGraphComponent
                selectedOptions={selectedOptions}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
                searchDataControl={searchDataControl}
                payAmount={performance}
            />

            <RegistrationAndUnitGraphComponent
                selectedOptions={selectedOptions}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
                searchDataControl={searchDataControl}
                registrationAndUnit={performance}
            />

            <PayAmountDayOfWeekGraphComponent
                selectedOptions={selectedOptions}
                dayOfWeekPayAmount={performance}
                searchDataControl={searchDataControl}
            /> */}

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}