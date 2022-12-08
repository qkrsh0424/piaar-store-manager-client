import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import useTotalPayAmountHook from "./hooks/useTotalPayAmountHook";

export default function PayAmountGraphComponent() {
    const [searchDimension, setSearchDimension] = useState('date');

    const {
        location,
        query,
        navigateUrl
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        totalPayAmount: totalPayAmount,
        reqSearchTotalPayAmount
    } = useTotalPayAmountHook()

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let dimension = searchDimension || 'date';

            let params = {
                startDate,
                endDate,
                dimension
            }
            await reqSearchTotalPayAmount(params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [location])

    return (
        <Container>
            <div className='graph-box'>
                <GraphBoardFieldView
                    
                />
                <GraphBodyFieldView />
            </div>
            <GraphSummaryFieldView />

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}