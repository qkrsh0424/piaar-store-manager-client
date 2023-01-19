import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import { useState } from 'react';
import { useEffect } from 'react';
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
    
                performance.forEach(r => r.performances?.forEach(r2 => {
                    category.add(r2.productCategoryName);
                }))

                let categoryName = [...category].sort();
                setCategory(categoryName);
                
                // 기본 1개 선택
                setSelectedCategory([categoryName[0]]);
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
            checkAll: (e) => {
                e.stopPropagation();

                setSelectedCategory([...category]);
            },
            checkCancelAll: (e) => {
                e.stopPropagation();

                setSelectedCategory([]);
            },
            checkedClear: () => {
                setSelectedCategory([]);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            clearCategory: () => {
                setCategory(null);
                setSelectedCategory(null);
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
                <PageTitleFieldView title={'카테고리 - 총 매출액 & 판매 건'} />

                <OperatorComponent
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                    onActionResetPerformance={__handle.action.resetPerformance}
                />

                <CategorySelectorComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    onActionIsCheckedOne={__handle.action.isCheckedOne}
                    onActionCheckOne={__handle.action.checkOne}

                    onActionCheckAll={__handle.action.checkAll}
                    onActionCheckCancelAll={__handle.action.checkCancelAll}
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
