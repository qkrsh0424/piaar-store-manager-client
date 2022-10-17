import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from 'query-string';
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { BackdropHookComponent, useBackdropHook } from "../../hooks/backdrop/useBackdropHook";
import OperatorComponent from "./search-operator/SearchOperator.component";
import { productDataConnect } from "../../data_connect/productDataConnect";
import ManageTableComponent from "./manage-table/ManageTable.component";

const HeaderFieldWrapper = styled.div`
    margin-top: 10px;
    width: 100%;

    .common-box{
        padding: 10px 30px;

        @media all and (max-width:992px){
            padding: 10px 10px;
        }
    }

    .title{
        font-size: 25px;
        font-weight: 700;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }
`;

function HeaderField({title}) {
    return (
        <HeaderFieldWrapper>
            <div className='common-box'>
                <div className='title' style={{color: '#303030'}}>{title}</div>
            </div>
        </HeaderFieldWrapper>
    )
}

const Container = styled.div`
    padding: 10px 30px;
    background-color: var(--piaar-background-color);
    min-height: 100vh;
    height: 100%;
    padding-bottom: 50px;
`;

const ProductManageComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [categoryList, setCategoryList] = useState(null);
    const [productFJList, setProductFJList] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchProductCategory();
            onActionCloseBackdrop();
        }
        fetchInit();
    }, [])

    useEffect(() => {
        async function fetchInit() {
          onActionOpenBackdrop();
          await __reqSearchProductAndOptionList();
          onActionCloseBackdrop();
        }
  
        fetchInit();
      }, [location])

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    // TODO :: 페이징 처리, 정렬 추가해야 함
    const __reqSearchProductAndOptionList = async () => {
        let categorySearchQuery = query.categorySearchQuery || null;
        let productSearchHeaderName = query.productSearchHeaderName || null;
        let productSearchQuery = query.productSearchQuery || null;
        let optionSearchHeaderName = query.optionSearchHeaderName || null;
        let optionSearchQuery = query.optionSearchQuery || null;
        let stockManagement = true;

        let params = {
            categorySearchQuery: categorySearchQuery,
            productSearchHeaderName: productSearchHeaderName,
            productSearchQuery: productSearchQuery,
            optionSearchHeaderName: optionSearchHeaderName,
            optionSearchQuery: optionSearchQuery,
            stockManagement: stockManagement
        }

        await productDataConnect().searchBatch(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductFJList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return (
        <Container>
            <HeaderField
                title={'상품 재고관리'}
            ></HeaderField>
            <OperatorComponent
                categoryList={categoryList}
            ></OperatorComponent>

            <ManageTableComponent
                productFJList={productFJList}
            ></ManageTableComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductManageComponent;