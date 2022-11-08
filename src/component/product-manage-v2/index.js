import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../hooks/backdrop/useBackdropHook";
import OperatorComponent from "./search-operator/SearchOperator.component";
import { productDataConnect } from "../../data_connect/productDataConnect";
import ManageTableComponent from "./manage-table/ManageTable.component";
import { getProductSortHeader } from "../../static-data/product-manage/productManageStaticData";
import { sortFormatUtils } from "../../utils/sortFormatUtils";
import ManageTablePagenationComponent from "./manage-table-pagenation/ManageTablePagenation.component";
import ButtonOperatorComponent from "./button-operator/ButtonOperator.component";
import useRouterHook from "../../hooks/router/useRouterHook";
import { productReceiveDataConnect } from "../../data_connect/productReceiveDataConnect";
import { productReleaseDataConnect } from "../../data_connect/productReleaseDataConnect";
import useProductHook from "./hooks/useProductHook";

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

const PRODUCT_SORT_HEADER_FIELDS = getProductSortHeader();

const ProductManageComponent = (props) => {
    const [productManagementList, setProductManagementList] = useState(null);
    const [checkedOptionIdList, setCheckedOptionIdList] = useState([]);

    const [optionReceiveStatus, setOptionReceiveStatus] = useState(null);
    const [optionReleaseStatus, setOptionReleaseStatus] = useState(null);

    const {
        location,
        query,
        navigateUrl
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        reqDeleteOne: reqDeleteProductOne
    } = useProductHook();

    useEffect(() => {
        async function fetchInit() {
          onActionOpenBackdrop();
          await __handle.req.searchProductAndOptionList();
          onActionCloseBackdrop();
        }
  
        fetchInit();
      }, [location])

    const __handle = {
        req: {
            searchProductAndOptionList: async () => {
                let categorySearchQuery = query.categorySearchQuery || null;
                let productSearchHeaderName = query.productSearchHeaderName || null;
                let productSearchQuery = query.productSearchQuery || null;
                let optionSearchHeaderName = query.optionSearchHeaderName || null;
                let optionSearchQuery = query.optionSearchQuery || null;
                let stockManagement = true;
                let page = query.page || null;
                let size = query.size || null;
                let sortBy = query.sortBy || null;
                let sortDirection = query.sortDirection || null;
                let sort = sortFormatUtils().getSortWithSortElements(PRODUCT_SORT_HEADER_FIELDS, sortBy, sortDirection);
        
                let params = {
                    categorySearchQuery: categorySearchQuery,
                    productSearchHeaderName: productSearchHeaderName,
                    productSearchQuery: productSearchQuery,
                    optionSearchHeaderName: optionSearchHeaderName,
                    optionSearchQuery: optionSearchQuery,
                    stockManagement: stockManagement,
                    page: page,
                    size: size,
                    sort: sort
                }
        
                await productDataConnect().searchBatchByPaging(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            setProductManagementList(res.data.data);
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
            },
            createProductReceive: async (data) => {
                await productReceiveDataConnect().createBatch(data)
                    .catch(err => {
                        let res = err.response;
                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data.memo);
                    })
            },
            createProductRelease: async (data) => {
                await productReleaseDataConnect().createBatch(data)
                    .catch(err => {
                        let res = err.response;
                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data.memo);
                    })
            }
        },
        action: {
            checkOne: (e, optionId) => {
                e.stopPropagation();

                let data = [...checkedOptionIdList];
                let selectedId = optionId;

                if(checkedOptionIdList.some(id => id === selectedId)) {
                    data = data.filter(id => id !== selectedId);
                } else {
                    data.push(selectedId);
                }

                setCheckedOptionIdList(data);
            },
            checkAll: () => {
                if(__handle.action.isCheckedAll()) {
                    setCheckedOptionIdList([]);
                }else {
                    let optionIdList = [];
                    productManagementList?.content.forEach(r => {
                        let idList = r.options.map(option => option.id);
                        optionIdList = optionIdList.concat(idList);
                    });
                    setCheckedOptionIdList(optionIdList);
                }
            },
            isCheckedOne: (optionId) => {
                return checkedOptionIdList.some(id => id === optionId);
            },
            isCheckedAll: () => {
                let optionIdList = [];
                productManagementList?.content.forEach(r => {
                    let idList = r.options.map(option => option.id);
                    optionIdList = optionIdList.concat(idList);
                });
                optionIdList.sort();
                checkedOptionIdList.sort();

                if(optionIdList.length === 0) return false;
                return JSON.stringify(optionIdList) === JSON.stringify(checkedOptionIdList);
            },
            productCheckOne: (e, productId) => {
                e.stopPropagation();

                let productOptions = productManagementList?.content.filter(r => r.product.id === productId)[0]?.options;
                let optionIds = productOptions.map(option => option.id);

                let optionIdList = [];
                if(optionIds.every(id => checkedOptionIdList.includes(id))) {
                    optionIdList = checkedOptionIdList.filter(id => !optionIds.includes(id));
                    
                } else {
                    optionIdList = checkedOptionIdList.concat(optionIds);
                }
                setCheckedOptionIdList(optionIdList);
            },
            isProductCheckedOne: (productId) => {
                let productOptions = productManagementList?.content.filter(r => r.product.id === productId)[0]?.options;
                let optionIds = productOptions.map(option => option.id);
                return optionIds.every(id =>  checkedOptionIdList.includes(id));
            },
            routeToModifyPageForProduct: (e, productId) => {
                e.stopPropagation();

                let data = {
                    pathname: `/products/modify${'?productId=' + productId}`,
                    state: {
                        routerUrl: location.pathname + location.search
                    }
                }

                navigateUrl(data);
            },
            routeToModifyPageForOptions: (e, productId) => {
                e.stopPropagation();

                let data = {
                    pathname: `/product-options/modify${'?productId=' + productId}`,
                    state: {
                        routerUrl: location.pathname + location.search
                    }
                }

                navigateUrl(data);
            },
            searchProductReceiveAndRelease: async (date) => {
                onActionOpenBackdrop();
                await __handle.req.searchProductReceiveAndRelease(date);
                onActionCloseBackdrop();
            }
        },
        submit: {
            deleteProduct: async (e, productId) => {
                e.stopPropagation();

                if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
                    let product = productManagementList?.content.filter(r => r.product.id === productId)[0].product;
                    await reqDeleteProductOne(product.id);
                    await __handle.req.searchProductAndOptionList();
                }
            },
            createProductReceive: async (data) => {
                onActionOpenBackdrop();
                await __handle.req.createProductReceive(data);
                await __handle.req.searchProductAndOptionList();
                onActionCloseBackdrop();
            },
            createProductRelease: async (data) => {
                onActionOpenBackdrop();
                await __handle.req.createProductRelease(data);
                await __handle.req.searchProductAndOptionList();
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container>
            <HeaderField title={'상품 재고관리'}/>
            <OperatorComponent />
            <ButtonOperatorComponent
                productManagementList={productManagementList?.content}
                checkedOptionIdList={checkedOptionIdList}

                optionReceiveStatus={optionReceiveStatus}
                optionReleaseStatus={optionReleaseStatus}

                onSubmitCreateProductReceive={__handle.submit.createProductReceive}
                onSubmitCreateProductRelease={__handle.submit.createProductRelease}
            />

            <ManageTablePagenationComponent
                productManagementList={productManagementList}
            />

            <ManageTableComponent
                productManagementList={productManagementList?.content}
                checkedOptionIdList={checkedOptionIdList}

                isCheckedOne={__handle.action.isCheckedOne}
                isCheckedAll={__handle.action.isCheckedAll}
                onActionCheckOne={__handle.action.checkOne}
                onActionCheckAll={__handle.action.checkAll}
                isProductCheckedOne={__handle.action.isProductCheckedOne}
                onActionProductCheckOne={__handle.action.productCheckOne}
                onSubmitDeleteProductOne={__handle.submit.deleteProduct}
                onActionModifyProduct={__handle.action.routeToModifyPageForProduct}
                onActionModifyOptions={__handle.action.routeToModifyPageForOptions}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductManageComponent;