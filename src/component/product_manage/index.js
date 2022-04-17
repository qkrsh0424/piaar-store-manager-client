import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import CategorySelectorComponent from './category-selector/CategorySelector.component';
import ProductManageTableComponent from './product-manage-table/ProductManageTable.component';

const Container = styled.div`
    overflow:hidden;
    padding-bottom: 80px;
`;

const ProductManageComponent = () => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [productViewList, setProductViewList] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            __reqSearchProductListFj();
            __reqSearchOptionList();
            __reqSearchCategoryList();
        }

        fetchInit();
    }, []);

    const __reqSearchProductListFj = async () => {
        await productDataConnect().getStockListFj()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
                    setProductViewList(res.data.data);
                }
            })
            .catch(err => {
                alert('undefined error. : searchProductListFj');
            });
    }

    const __reqSearchOptionList = async () => {
        await productOptionDataConnect().getList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setOptionList(res.data.data);
                }
            })
            .catch(err => {
                alert('undefined error. : searchOptionList');
            })
    }

    const __reqSearchCategoryList = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setCategoryList(res.data.data);
                }
            })
            .catch(err => {
                alert('undefined error. : searchCategoryList');
            })
    }

    const _onAction_changeCategory = (categoryId) => {
        let viewData = productList;

        if (categoryId !== 'total') {
            viewData = productList.filter(r => r.category.id === categoryId);
        }

        setProductViewList(viewData);
    }

    return (
        <Container>
            <CategorySelectorComponent
                categoryList={categoryList}

                _onAction_changeCategory={(categoryId) => _onAction_changeCategory(categoryId)}
            ></CategorySelectorComponent>

            <ProductManageTableComponent
                productViewList={productViewList}
            ></ProductManageTableComponent>

            {/* <ProductManageNavComponent
            ></ProductManageNavComponent> */}
        </Container>
    )
}

export default ProductManageComponent;