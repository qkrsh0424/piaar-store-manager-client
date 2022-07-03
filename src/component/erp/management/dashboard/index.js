import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import qs from 'query-string'
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";
import { getDefaultHeaderFields } from "../../../../static-data/staticData";
import ItemAnalysisChartComponent from "./item-analysis-chart/ItemAnalysisChart.component";
import SearchOperatorComponent from "./search-operator/SearchOperator.component";
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";

const Container = styled.div`
`;

const DEFAULT_HEADER_FIELDS = getDefaultHeaderFields();

const DashboardComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [erpItemAnalysisData, dispatchErpItemAnalysisData] = useReducer(erpItemAnalysisDataReducer, initialErpItemAnalysisData);

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

    const _onAction_searchErpOrderItem = async () => {
        await __reqSearchErpOrderItem();
    }

    return (
        <>
            <Container>
                <SearchOperatorComponent
                    _onAction_searchErpOrderItem={_onAction_searchErpOrderItem}
                ></SearchOperatorComponent>

                <ItemAnalysisChartComponent
                    erpItemAnalysisData={erpItemAnalysisData?.content}
                ></ItemAnalysisChartComponent>
            </Container>
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