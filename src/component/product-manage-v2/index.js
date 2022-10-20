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

    const {
        location,
        query
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

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
        }
    }

    return (
        <Container>
            <HeaderField title={'상품 재고관리'}/>
            <OperatorComponent />
            <ButtonOperatorComponent />

            <ManageTablePagenationComponent
                productManagementList={productManagementList}
            />
            <ManageTableComponent
                productManagementList={productManagementList?.content}

                isCheckedOne={__handle.action.isCheckedOne}
                isCheckedAll={__handle.action.isCheckedAll}
                onActionCheckOne={__handle.action.checkOne}
                onActionCheckAll={__handle.action.checkAll}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductManageComponent;