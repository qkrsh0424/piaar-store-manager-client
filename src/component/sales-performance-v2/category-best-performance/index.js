import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { getEndDate, getStartDate } from '../../../utils/dateFormatUtils';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useCategorySalesPerformanceHook from './hooks/useCategorySalesPerformanceHook';
import BestCategoryComponent from './best-category/BestCategory.component';
import BestItemGraphComponent from './best-item-graph/BestItemGraph.component';

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

const CategoryBestPerformanceComponent = (props) => {
    const [category, setCategory] = useState(null);
    const [categoryBestPayAmountItem, setCategoryBestPayAmountItem] = useState(null);
    const [categoryBestUnitItem, setCategoryBestUnitItem] = useState(null);

    const [checkedSwitch, setCheckedSwitch] = useState(false);

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
        performance,
        reqSearchChannelPerformance
    } = useCategorySalesPerformanceHook();

    useEffect(() => {
        async function fetchInit() {
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;

            let params = {
                startDate,
                endDate
            }

            if(!(startDate && endDate)) {
                __handle.action.clearCategory();
                return;
            }

            onActionOpenBackdrop();
            await reqSearchChannelPerformance(params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [location])

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initCategory();
    }, [performance])

    const __handle = {
        action: {
            initCategory: () => {
                let category = new Set([]);
                let bestPayAmountItem = [];
                let bestUnitItem = [];

                performance.forEach(r => {
                    category.add(r.productCategoryName);
                    let sales = _.sortBy(r.performances, 'salesPayAmount').reverse();
                    let unit = _.sortBy(r.performances, 'salesUnit').reverse();

                    bestPayAmountItem.push({
                        categoryName: r.productCategoryName,
                        performances: sales
                    });
                    bestUnitItem.push({
                        categoryName: r.productCategoryName,
                        performances: unit
                    });
                });

                bestPayAmountItem = bestPayAmountItem.map(r =>  {
                    let item = r.performances.slice(0, 10);
                    return {
                        ...r,
                        performances: item
                    }
                });
                bestUnitItem = bestUnitItem.map(r => {
                    let item = r.performances.slice(0, 10);
                    return {
                        ...r,
                        performances: item
                    }
                });

                setCategory([...category]);
                setCategoryBestPayAmountItem(bestPayAmountItem);
                setCategoryBestUnitItem(bestUnitItem)
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            clearCategory: () => {
                setCategory(null);
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'카테고리 성과'} />

                <OperatorComponent />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                />

                <BestCategoryComponent
                    category={category}
                    performance={performance}
                />

                <BestItemGraphComponent
                    category={category}
                    checkedSwitch={checkedSwitch}
                    bestPayAmountItem={categoryBestPayAmountItem}
                    bestUnitItem={categoryBestUnitItem}
                />

                {/* <RegistrationAndUnitGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    checkedSwitch={checkedSwitch}
                    registrationAndUnit={performance}
                /> */}
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default CategoryBestPerformanceComponent;
