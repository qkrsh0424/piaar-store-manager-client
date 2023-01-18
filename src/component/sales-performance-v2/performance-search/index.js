import { useEffect, useState } from "react";
import styled from "styled-components"
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { getEndDate, getStartDate, getTimeDiffWithUTC, setSubtractedDate } from "../../../utils/dateFormatUtils";
import { sortFormatUtils } from "../../../utils/sortFormatUtils";
import useErpOrderItemHook from "./hooks/useErpOrderItemHook";
import ItemTablePagenationComponent from "./item-table-pagenation/ItemTablePagenation.component";
import ItemTableComponent from "./item-table/ItemTable.component";
import OperatorComponent from "./operator/Operator.component";

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

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

export default function PerformanceSearchComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [salesYn, setSalesYn] = useState(null);
    const [dayIndex, setDayIndex] = useState(null);

    const {
        location,
        query
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        itemPages,
        reqSearchPerformanceItems
    } = useErpOrderItemHook();

    useEffect(() => {
        async function fetchInit() {
            let page = query.page || null;
            let size = query.size || null;
            let sortBy = query.sortBy || null;
            let sortDirection = query.sortDirection || null;
            let sort = sortFormatUtils().getSortWithSortElements(headerFields, sortBy, sortDirection);
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate : startDate ? getStartDate(startDate) : null,
                endDate : endDate ? getEndDate(endDate) : null,
                dayIndex,
                salesYn,
                utcHourDifference
            }

            let params = {
                page,
                size,
                sort
            }

            onActionOpenBackdrop();
            await reqSearchPerformanceItems(body, params);
            onActionCloseBackdrop();
        }
        
        if(!(startDate && endDate)) {
            return;
        }
        
        fetchInit();
    }, [location, startDate, endDate]);

    useEffect(() => {
        let searchState = location.state;

        if (!searchState) {
            return;
        }

        if (searchState.startDate && searchState.endDate) {
            setStartDate(searchState.startDate);
            setEndDate(searchState.endDate);
        } else {
            return;
        }

        if (searchState.salesYn) {
            setSalesYn(searchState.salesYn);
        }

        if (searchState.dayIndex) {
            setDayIndex(searchState.dayIndex);
        }
    }, [])

    const __handle = {
        action: {
            changeSearchValue: (body) => {
                let startDate = body.startDate;
                let endDate = body.endDate;
                let salesYn = body.salesYn;
                let dayIndex = body.dayIndex;
                
                setStartDate(startDate);
                setEndDate(endDate);
                setSalesYn(salesYn);
                setDayIndex(dayIndex);
            }
        },
        submit: {
            searchItem: async (body) => {
                let page = 1;
                let size = query.size || null;
                let sortBy = query.sortBy || null;
                let sortDirection = query.sortDirection || null;
                let sort = sortFormatUtils().getSortWithSortElements(headerFields, sortBy, sortDirection);

                let params = {
                    page,
                    size,
                    sort
                }

                onActionOpenBackdrop();
                __handle.action.changeSearchValue(body);
                await reqSearchPerformanceItems(body, params);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'성과 검색'} />

            <OperatorComponent
                startDate={startDate}
                endDate={endDate}
                salesYn={salesYn}
                dayIndex={dayIndex}

                onActionChangeSearchValue={__handle.action.changeSearchValue}
                onSubmitSearchItem={__handle.submit.searchItem}
            />

            <ItemTableComponent
                itemPages={itemPages}
            />
            <ItemTablePagenationComponent
                itemPages={itemPages}
            />
            
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}