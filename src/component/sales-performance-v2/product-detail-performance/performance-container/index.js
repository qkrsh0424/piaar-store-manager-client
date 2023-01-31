import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import OptionSelectorComponent from "./option-selector/OptionSelector.component";
import ChannelPerformanceGraphComponent from "./channel-performance-graph/ChannelPerformanceGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useChannelSalesPerformanceHook from "./hooks/useChannelSalesPerformanceHook";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import OperatorComponent from "./operator/Operator.component";
import PayAmountGraphComponent from "./pay-amount-graph/PayAmountGraph.component";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import OptionItemTableComponent from "./option-item-table/OptionItemTable.component";

const Container = styled.div`
    /* height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    } */
`;

export default function PerformanceContainerComponent (props) {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    
    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [options, setOptions] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);

    const [categories, setCategories] = useState(null);

    const {
        productAndOptions,
        reqSearchAllRelatedProductAndProductCategory
    } = useProductAndOptionHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance,
        reqSearchProductPerformance,
        onActionResetPerformance
    } = useProductSalesPerformanceHook();

    const {
        performance: channelPerformance,
        reqSearchChannelPerformance,
        onActionResetPerformance: onActionRestChannelPerformance
    } = useChannelSalesPerformanceHook();

    const {
        performance: optionPerformance,
        reqSearchBestOptionPerformance,
        onActionResetPerformance: onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProductAndProductCategory();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    useEffect(() => {
        if(!productAndOptions) {
            return;
        }

        __handle.action.initProduct();
    }, [productAndOptions])
    
    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initSelectedOptions();
    }, [performance])

    const __handle = {
        action: {
            initProduct: () => {
                let productData = new Set([]);
                let categoryData = new Set([]);

                productAndOptions.forEach(r => {
                    productData.add(JSON.stringify(r.product));
                    categoryData.add(JSON.stringify(r.productCategory));
                })

                productData = [...productData].map(r => JSON.parse(r));
                categoryData = [...categoryData].map(r => JSON.parse(r));
                
                setProducts(productData);
                setCategories(categoryData);
            },
            initSelectedOptions: () => {
                let options = productAndOptions.filter(r => r.product.id === selectedProduct.id).map(r => r.option);

                setOptions(options);
                setSelectedOptions(options);
            },
            resetPerformance: () => {
                onActionResetPerformance();
                onActionRestChannelPerformance();
                onActionResetOptionPerformance();
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            isCheckedOne: (option) => {
                return selectedOptions?.some(r => r.id === option.id);
            },
            checkOne: (e, option) => {
                e.stopPropagation();

                let data = [...selectedOptions];

                if(selectedOptions?.some(r => r.id === option.id)) {
                    data = data.filter(r => r.id !== option.id);
                } else {
                    data.push(option);
                }
                setSelectedOptions(data);
            },
            checkAll: (e) => {
                e.stopPropagation();

                setSelectedOptions([...options]);
            },
            checkCancelAll: (e) => {
                e.stopPropagation();

                setSelectedOptions([]);
            },
            changeSelectedProduct: (productCode) => {
                let product = products.filter(r => r.code === productCode)[0];
                setSelectedProduct(product);
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchProductPerformance(body);
                await reqSearchChannelPerformance(body);
                await reqSearchBestOptionPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <OperatorComponent
                productAndOptions={productAndOptions}
                products={products}
                selectedProduct={selectedProduct}
                categories={categories}

                onActionResetPerformance={__handle.action.resetPerformance}
                onSubmitSearchPerformance={__handle.submit.searchPerformance}
                onActionChangeSelectedProduct={__handle.action.changeSelectedProduct}
            />

            <OptionSelectorComponent
                options={options}
                selectedOptions={selectedOptions}

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
                performance={performance}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
                selectedOptions={selectedOptions}
            />

            <ChannelPerformanceGraphComponent
                performance={channelPerformance}
                searchDimension={searchDimension}
                checkedSwitch={checkedSwitch}
                selectedOptions={selectedOptions}
            />

            <OptionItemTableComponent
                performance={optionPerformance}
                selectedOptions={selectedOptions}
            />

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}