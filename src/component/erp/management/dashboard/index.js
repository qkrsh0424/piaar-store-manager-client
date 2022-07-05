import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import qs from 'query-string'
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";
import ItemAnalysisChartComponent from "./item-analysis-chart-v2/ItemAnalysisChart.component";
import SearchOperatorComponent from "./search-operator/SearchOperator.component";
import { dateToYYYYMMDD, getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";

const Container = styled.div`
`;

const DashboardComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [erpItemAnalysisData, dispatchErpItemAnalysisData] = useReducer(erpItemAnalysisDataReducer, initialErpItemAnalysisData);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop,
    } = useBackdropHook();

    useEffect(() => {
        let sDate = dateToYYYYMMDD(new Date());
        let eDate = dateToYYYYMMDD(new Date());

        query.startDate = sDate;
        query.endDate = eDate;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }, [])

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchErpOrderItem();
            onActionCloseBackdrop();
        }

        if(!location.search) {
            return;
        }

        fetchInit();
    }, [location.search])

    const __reqSearchErpOrderItem = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let periodType = 'registration';

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType
        }
        await erpOrderItemDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchErpItemAnalysisData({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return (
        <>
            <Container>
                <SearchOperatorComponent
                ></SearchOperatorComponent>

                <ItemAnalysisChartComponent
                    erpItemAnalysisData={erpItemAnalysisData?.content}
                ></ItemAnalysisChartComponent>
            </Container>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default DashboardComponent;

const initialErpItemAnalysisData = null;

const erpItemAnalysisDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialErpItemAnalysisData;
        default:
            return state;
    }
}