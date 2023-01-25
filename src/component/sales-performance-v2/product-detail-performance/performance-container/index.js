import { useEffect, useState } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import OptionSelectorComponent from "./option-selector/OptionSelector.component";
import BestOptionGraphComponent from "./best-option-graph/BestOptionGraph.component";
import ChannelPerformanceGraphComponent from "./channel-performance-graph/ChannelPerformanceGraph.component";
import GraphOperatorComponent from "./graph-operator/GraphOperator.component";
import useChannelSalesPerformanceHook from "./hooks/useChannelSalesPerformanceHook";
import useOptionSalesPerformanceHook from "./hooks/useOptionSalesPerformanceHook";
import useProductSalesPerformanceHook from "./hooks/useProductSalesPerformanceHook";
import OperatorComponent from "./operator/Operator.component";
import PayAmountGraphComponent from "./pay-amount-graph/PayAmountGraph.component";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";

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

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

export default function PerformanceContainerComponent (props) {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    
    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [options, setOptions] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);

    const {
        location
    } = useRouterHook();

    const {
        productAndOptions,
        reqSearchAllRelatedProduct
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
        reqSearchChannelBestOptionPerformance,
        onActionResetPerformance: onActionResetOptionPerformance
    } = useOptionSalesPerformanceHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProduct();
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

    // useEffect(() => {
    //     if(!(products)) {
    //         return;
    //     }

    //     __handle.action.initSelectedProduct();
    // }, [products])

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initSelectedOptions();
    }, [performance])

    const __handle = {
        action: {
            initProduct: () => {
                let productData = [...new Set(productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                setProducts(productData);
            },
            // initSelectedProduct: () => {
            //     let searchProductCode = location.state?.productCode ?? null;

            //     if(searchProductCode) {
            //         let product = products.filter(r => r.code === searchProductCode)[0];
            //         setSelectedProduct(product);
            //     }
            // },
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
                await reqSearchChannelBestOptionPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'상품 - 상세 성과'} />

            <OperatorComponent
                productAndOptions={productAndOptions}
                products={products}
                selectedProduct={selectedProduct}

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

            <BestOptionGraphComponent
                performance={optionPerformance}
                checkedSwitch={checkedSwitch}
                selectedOptions={selectedOptions}
            />

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}