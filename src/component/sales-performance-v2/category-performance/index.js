import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { getEndDate, getStartDate } from '../../../utils/dateFormatUtils';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useCategorySalesPerformanceHook from './hooks/useCategorySalesPerformanceHook';
import CategorySelectorComponent from './category-selector/CategorySelector.component';

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

const CategoryPerformanceComponent = (props) => {
    const [category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [searchDimension, setSearchDimension] = useState('date');
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
                __handle.action.clearChannel();
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
    
                performance.forEach(r => r.performances?.forEach(r2 => {
                    category.add(r2.productCategoryName);
                }))

                let categoryName = [...category].sort();
                setCategory(categoryName);
                setSelectedCategory(categoryName);
            },
            isCheckedOne: (category) => {
                return selectedCategory.some(name => name === category);
            },
            checkOne: (e, category) => {
                e.stopPropagation();

                let data = [...selectedCategory];

                if(selectedCategory.some(name => name === category)) {
                    data = data.filter(name => name !== category);
                } else {
                    data.push(category);
                }
                setSelectedCategory(data);
            },
            checkedClear: () => {
                setSelectedCategory([]);
                // props.onActionUpdateSelectedCategory([]);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            clearChannel: () => {
                setCategory(null);
                setSelectedCategory(null);
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'카테고리 성과'} />

                <OperatorComponent />

                <CategorySelectorComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    onActionIsCheckedOne={__handle.action.isCheckedOne}
                    onActionCheckOne={__handle.action.checkOne}
                />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}
                    searchDimension={searchDimension}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                    onActionChangeSearchDimension={__handle.action.changeDimension}
                />

                <PayAmountGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    payAmount={performance}
                />

                <RegistrationAndUnitGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    registrationAndUnit={performance}
                />

                <PayAmountDayOfWeekGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    dayOfWeekPayAmount={performance}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default CategoryPerformanceComponent;
