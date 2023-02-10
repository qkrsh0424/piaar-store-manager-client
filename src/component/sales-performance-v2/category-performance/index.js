import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useCategorySalesPerformanceHook from './hooks/useCategorySalesPerformanceHook';
import CategorySelectorComponent from './category-selector/CategorySelector.component';
import DetailGraphSelectorModalComponent from './modal/detail-graph-selector-modal/DetailGraphSelectorModal.component';
import useRouterHook from '../../../hooks/router/useRouterHook';
import DateRangeSelectorComponent from '../date-range-selector/DateRangeSelector.component';

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
    const [selectedCategory, setSelectedCategory] = useState([]);

    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const {
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance,
        reqSearchCategoryPerformance,
    } = useCategorySalesPerformanceHook();

    // 페이지 이동 후 다시 되돌아왔을 때 초기화
    useEffect(() => {
        __handle.action.initCategory();
    }, [])

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.updateCategory();
    }, [performance])

    const __handle = {
        action: {
            initCategory: () => {
                let selectedData = location.state?.productCategoryNames;
        
                if(selectedData) {
                    setSelectedCategory(selectedData);
                }
            },
            updateCategory: () => {
                let category = new Set([]);
                performance.forEach(r => r.performances?.forEach(r2 => {
                    category.add(r2.productCategoryName);
                }))

                let categoryName = [...category].sort();
                setCategory(categoryName);

                // 이전에 선택된 카테고리는 미리 선택
                let data = selectedCategory.filter(category => categoryName.includes(category));
                setSelectedCategory(data);
            },
            isCheckedOne: (category) => {
                return selectedCategory?.some(name => name === category);
            },
            checkOne: (e, category) => {
                e.stopPropagation();

                let data = [...selectedCategory];

                if(selectedCategory?.some(name => name === category)) {
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
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            openDetailGraphSelectorModal: () => {
                setDetailGraphSelectorModalOpen(true);
            },
            closeDetailGraphSelectorModal: () => {
                setDetailSearchValue(null);
                setDetailGraphSelectorModalOpen(false);
            },
            updateDetailSearchValue: (data) => {
                setDetailSearchValue(data);
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

                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <RegistrationAndUnitGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    registrationAndUnit={performance}

                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <PayAmountDayOfWeekGraphComponent
                    category={category}
                    selectedCategory={selectedCategory}
                    dayOfWeekPayAmount={performance}
                />
            </Container>

            <DetailGraphSelectorModalComponent
                modalOpen={detailGraphSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailGraphSelectorModal}
            />

            <DateRangeSelectorComponent
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
            />

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default CategoryPerformanceComponent;
