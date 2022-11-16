import { useEffect, useReducer } from "react";

import { getSelectedHeaderFields } from "../../../static-data/erp/staticData";
import ButtonFieldView from "./ButtonField.view";
import DetailSearchFieldView from "./DetailSearchField.view";
import { Container, InfoTextFieldWrapper } from "./SelectedGraphItemModal.styled";
import TableFieldView from "./TableField.view";
import { dateToYYMMDD, getDayName, getEndDate, getStartDate } from "../../../utils/dateFormatUtils";

// 판매성과 그래프 or 테이블 클릭시 - 발주 내역 헤더
const headerFields = [
    'channelOrderDate',
    'prodName',
    'optionName',
    'unit',
    'receiver',
    'receiverContact1',
    'salesChannel',
    'price',
    'deliveryCharge',
    'optionCode',
    'releaseAt',
    'salesAt',
    'categoryName',
    'prodDefaultName',
    'optionDefaultName',
    'salesPrice'
]

const headerDetails = getSelectedHeaderFields(headerFields);

function InfoTextField({ element }) {
    return (
        <InfoTextFieldWrapper>
            {element}
        </InfoTextFieldWrapper>
    );
}

const SelectedGraphItemModalComponent = (props) => {
    const [searchColumnName, dispatchSearchColumnName] = useReducer(searchColumnNameReducer, initialSearchColumnName);
    const [searchQuery, dispatchSearchQuery] = useReducer(searchQueryReducer, initialSearchQuery);

    const [viewItem, dispatchViewItem] = useReducer(viewItemReducer, initialViewItem);

    useEffect(() => {
        if(!props.erpItemGraphData) {
            return;
        }

        if(!props.graphSearchParam) {
            return;
        }

        let data = [...props.erpItemGraphData];

        let fixedSearchColumnName = props.graphSearchParam.fixedSearchColumnName;   // 고정 검색 컬럼
        let fixedSearchQuery = props.graphSearchParam.fixedSearchQuery;     // 고정 검색 값
        let fixedSearchDay = props.graphSearchParam.fixedSearchDay;     // 고정 검색 요일
        
        // 조회 고정값이 존재한다면 
        if(fixedSearchColumnName && fixedSearchQuery) {
            data = data.filter(r => r[fixedSearchColumnName] === fixedSearchQuery);
        }else if(fixedSearchColumnName && (!fixedSearchQuery)) {
            data = data.filter(r => r[fixedSearchColumnName] === '');
        }

        if(fixedSearchDay) {
            data = data.filter(r => getDayName(r.channelOrderDate) === fixedSearchDay);
        }

        dispatchViewItem({
            type: 'SET_DATA',
            payload: data
        })
    }, [props.erpItemGraphData, props.graphSearchParam])

    const onActionRouteToSearch = (e) => {
        e.preventDefault();

        let startDate = getStartDate(props.graphSearchParam?.startDate);
        let endDate = getEndDate(props.graphSearchParam?.endDate);

        if (!(startDate && endDate)) {
            alert('시작일, 종료일 날짜가 존재하지 않습니다.')
            return;
        }

        if ((endDate - startDate < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: 'channelOrderDate',
            salesYn: 'y',
            matchedCode: 'optionCode',
            searchColumnName: searchColumnName,
            searchQuery: searchQuery
        }

        props._onAction_searchErpOrderItemByParams(params);
    }

    const onChangeSearchColumnNameValue = (e) => {
        dispatchSearchColumnName({
            type: 'SET_DATA',
            payload: e.target.value
        });
        dispatchSearchQuery({
            type: 'CLEAR'
        })
    }

    const onChangeSearchQueryValue = (e) => {
        dispatchSearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const onActionClearRoute = () => {
        dispatchSearchColumnName({
            type: 'CLEAR'
        })
        dispatchSearchQuery({
            type: 'CLEAR'
        })
        
        let startDate = getStartDate(props.graphSearchParam?.startDate);
        let endDate = getEndDate(props.graphSearchParam?.endDate);

        if (!(startDate && endDate)) {
            alert('시작일, 종료일 날짜가 존재하지 않습니다.')
            return;
        }

        if ((endDate - startDate < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: 'channelOrderDate',
            salesYn: 'y'
        }

        props._onAction_searchErpOrderItemByParams(params);
    }

    return (
        viewItem &&
        <Container>
            <form onSubmit={(e) => onActionRouteToSearch(e)}>
                <div className='flex-box'>
                    <DetailSearchFieldView
                        headerDetails={headerDetails}
                        searchColumnName={searchColumnName}
                        searchQuery={searchQuery}

                        onChangeSearchColumnNameValue={onChangeSearchColumnNameValue}
                        onChangeSearchQueryValue={onChangeSearchQueryValue}
                    ></DetailSearchFieldView>
                    <ButtonFieldView
                        onActionClearRoute={onActionClearRoute}
                    ></ButtonFieldView>
                </div>
            </form>

            <InfoTextField
                element={(
                    <>
                        <div className='date-text'>
                            <span>검색 기간 : </span>
                            <span>{dateToYYMMDD(props.graphSearchParam?.startDate)} ~ {dateToYYMMDD(props.graphSearchParam?.endDate)}</span>
                        </div>
                    </>
                )}
            ></InfoTextField>
            <TableFieldView
                erpItemGraphData={viewItem}
                headerDetails={headerDetails}
            ></TableFieldView>
        </Container>
    )
}

export default SelectedGraphItemModalComponent;

const initialSearchColumnName = null;
const initialSearchQuery = '';
const initialViewItem = null;

const searchColumnNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchColumnName;
        default: return state;
    }
}

const searchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchQuery
        default: return state;
    }
}

const viewItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewItem;
        default: return state;
    }
}
