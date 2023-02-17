import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useCategorySalesPerformanceHook from './hooks/useCategorySalesPerformanceHook';

import BestItemGraphComponent from './best-item-graph/BestItemGraph.component';
import BestCategoryGraphComponent from './best-category-graph/BestCategoryGraph.component';
import DateRangeSelectorComponent from './date-range-selector/DateRangeSelector.component';

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
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance,
        reqSearchCategoryPerformance,
        onActionResetPerformance
    } = useCategorySalesPerformanceHook();

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initCategory();
    }, [performance])

    const __handle = {
        action: {
            resetPerformance: () => {
                onActionResetPerformance();
                __handle.action.clearCategory();
            },
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
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchCategoryPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'카테고리 - BEST 카테고리 상품'} />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                />

                <BestCategoryGraphComponent
                    category={category}
                    performance={performance}
                />

                <BestItemGraphComponent
                    category={category}
                    checkedSwitch={checkedSwitch}
                    bestPayAmountItem={categoryBestPayAmountItem}
                    bestUnitItem={categoryBestUnitItem}
                />

                <DateRangeSelectorComponent
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default CategoryBestPerformanceComponent;
