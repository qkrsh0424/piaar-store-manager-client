import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import OperatorComponent from './operator/Operator.component'
import BestProductGraphComponent from './best-product-graph/BestProductGraph.component';
import useProductSalesPerformanceHook from './hooks/useProductSalesPerformanceHook';
import useOptionSalesPerformanceHook from './hooks/useOptionSalesPerformanceHook';
import BestOptionGraphComponent from './best-option-graph/BestOptionGraph.component';
import DetailGraphSelectorModalComponent from './modal/detail-graph-selector-modal/DetailGraphSelectorModal.component';

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

const CategoryBestProductPerformanceComponent = (props) => {
    const [salesCategory, setSalesCategory] = useState(null);
    const [selectedSalesCategory, setSelectedSalesCategory] = useState(null);

    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [selectedProductAndOptions, setSelectedProductAndOptions] = useState([]);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance: productPerformance,
        reqSearchCategoryBestProductPerformance,
        onActionResetPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchCategoryBestOptionPerformance,
        onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    const __handle = {
        action: {
            resetPerformance: () => {
                onActionResetPerformance();
                onActionResetOptionPerformance();
                __handle.action.clearChannel();
            },
            initChannel: () => {
                let category = new Set([]);
                performance.forEach(r => r.performances?.forEach(r2 => {
                    category.add(r2.productCategoryName);
                }))

                let categoryName = [...category].sort();
                setSalesCategory(categoryName);
                setSelectedSalesCategory([categoryName[0]]);
            },
            isCheckedOne: (category) => {
                return selectedSalesCategory.some(name => name === category);
            },
            checkOne: (e, category) => {
                e.stopPropagation();

                let data = [...selectedSalesCategory];

                if(selectedSalesCategory.some(name => name === category)) {
                    data = data.filter(name => name !== category);
                } else {
                    data.push(category);
                }
                setSelectedSalesCategory(data);
            },
            checkAll: (e) => {
                e.stopPropagation();

                setSelectedSalesCategory([...salesCategory]);
            },
            checkCancelAll: (e) => {
                e.stopPropagation();

                setSelectedSalesCategory([]);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            changeSelectedOption: (data) => {
                setSelectedProductAndOptions([...data])
            },
            updateDetailSearchValue: (data) => {
                setDetailSearchValue({
                    ...detailSearchValue,
                    ...data
                });
            },
            openDetailGraphSelectorModal: (data) => {
                setDetailSearchValue(data);
                setDetailGraphSelectorModalOpen(true);
            },
            closeDetailGraphSelectorModal: () => {
                setDetailGraphSelectorModalOpen(false);
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchCategoryBestProductPerformance(body);
                await reqSearchCategoryBestOptionPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 - 상품별 매출'} />

                <OperatorComponent
                    selectedProductAndOptions={selectedProductAndOptions}
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                    onActionResetPerformance={__handle.action.resetPerformance}
                    onActionChangeSelectedOption={__handle.action.changeSelectedOption}
                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}
                    searchDimension={searchDimension}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                    onActionChangeSearchDimension={__handle.action.changeDimension}
                />

                <BestProductGraphComponent
                    checkedSwitch={checkedSwitch}
                    performance={productPerformance}
                    detailSearchValue={detailSearchValue}

                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <BestOptionGraphComponent
                    checkedSwitch={checkedSwitch}
                    performance={optionPerformance}

                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />

            <DetailGraphSelectorModalComponent
                modalOpen={detailGraphSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailGraphSelectorModal}
            />
        </>
    )
}

export default CategoryBestProductPerformanceComponent;
