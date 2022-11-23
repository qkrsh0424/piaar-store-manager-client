import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import OperatorComponent from "./search-operator/SearchOperator.component";
import { productDataConnect } from "../../../data_connect/productDataConnect";
import ManageTableComponent from "./manage-table/ManageTable.component";
import { getProductSortHeader } from "../../../static-data/product-manage/productManageStaticData";
import { sortFormatUtils } from "../../../utils/sortFormatUtils";
import ManageTablePagenationComponent from "./manage-table-pagenation/ManageTablePagenation.component";
import ButtonOperatorComponent from "./button-operator/ButtonOperator.component";
import useRouterHook from "../../../hooks/router/useRouterHook";
import useProductHook from "./hooks/useProductHook";
import { useDisabledButtonHook } from "../../../hooks/button-disabled/useDisabledButtonHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../hooks/snackbar/useBasicSnackbarHookV2";
import useProductOptionHook from "./hooks/useProductOptionHook";
import { ConfirmSnackbarHookComponent, useConfirmSnackbarHook } from "../../../hooks/snackbar/useConfirmSnackbarHook";

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

const PageTitleFieldWrapper = styled.div``;

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const PRODUCT_SORT_HEADER_FIELDS = getProductSortHeader();

const ProductManageComponent = (props) => {
    const [productManagementList, setProductManagementList] = useState(null);
    const [checkedOptionIdList, setCheckedOptionIdList] = useState([]);

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
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    const {
        open: confirmSnackbarOpen,
        message: confirmSnackbarMessage,
        confirmAction: snackbarConfirmAction,
        onActionOpen: onActionOpenConfirmSnackbar,
        onActionClose: onActionCloseConfirmSnackbar,
    } = useConfirmSnackbarHook();

    const {
        reqDeleteOne: reqDeleteProductOne
    } = useProductHook();

    const {
        reqDeleteOne: reqDeleteProductOptionOne
    } = useProductOptionHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook();

    useEffect(() => {
        async function fetchInit() {
          onActionOpenBackdrop();
          try{
            await __handle.req.searchProductAndOptionList();
          } catch (err) {
            let snackbarSetting = {
                message: err?.message,
                severity: 'error'
            }
            onActionOpenSnackbar(snackbarSetting);
          }
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
                        let message = res?.data.memo;
                        if (res?.status === 500) {
                            message = 'undefined error.';
                        }

                        throw new Error(message);
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
                if(productOptions.length === 0) {
                    return false;
                }
                
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

                onActionOpenConfirmSnackbar(
                    '상품을 삭제하면 하위 데이터들도 모두 삭제됩니다.',
                    () => async () => {
                        setButtonDisabled(true);
                        onActionOpenBackdrop();
                        try {
                            await reqDeleteProductOne(productId, () => {
                                let snackbarSetting = {
                                    message: '완료되었습니다.',
                                    severity: 'info'
                                }
                                onActionOpenSnackbar(snackbarSetting);
                            });
                            await __handle.req.searchProductAndOptionList();
                        } catch (err) {
                            let snackbarSetting = {
                                message: err.message,
                                severity: 'error'
                            }
                            onActionOpenSnackbar(snackbarSetting);
                        }
                        onActionCloseBackdrop();
                    }
                )
            },
            deleteProductOption: async (e, optionId) => {
                e.stopPropagation();

                onActionOpenConfirmSnackbar(
                    '삭제하시겠습니까?',
                    () => async () => {
                        setButtonDisabled(true);
                        onActionOpenBackdrop();
                        try{
                            await reqDeleteProductOptionOne(optionId, () => {
                            let snackbarSetting = {
                                    message: '완료되었습니다.',
                                    severity: 'info'
                                }
                                onActionOpenSnackbar(snackbarSetting);
                            });
                            await __handle.req.searchProductAndOptionList();
                        } catch (err) {
                            let snackbarSetting = {
                                message: err?.message,
                                severity: 'error'
                            }
                            onActionOpenSnackbar(snackbarSetting);
                        }
                        onActionCloseBackdrop();
                    }
                )
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'상품 조회 / 수정'} />

                <OperatorComponent />
                <ButtonOperatorComponent
                    productManagementList={productManagementList?.content}
                    checkedOptionIdList={checkedOptionIdList}
                    reqSearchProductAndOptionList={__handle.req.searchProductAndOptionList}
                />

                <ManageTablePagenationComponent
                    productManagementList={productManagementList}
                    checkedOptionIdList={checkedOptionIdList}
                />

                <ManageTableComponent
                    buttonDisabled={buttonDisabled}
                    productManagementList={productManagementList?.content}

                    isCheckedOne={__handle.action.isCheckedOne}
                    isCheckedAll={__handle.action.isCheckedAll}
                    onActionCheckOne={__handle.action.checkOne}
                    onActionCheckAll={__handle.action.checkAll}
                    isProductCheckedOne={__handle.action.isProductCheckedOne}
                    onActionProductCheckOne={__handle.action.productCheckOne}
                    onSubmitDeleteProductOne={__handle.submit.deleteProduct}
                    onActionModifyProduct={__handle.action.routeToModifyPageForProduct}
                    onActionModifyOptions={__handle.action.routeToModifyPageForOptions}
                    reqSearchProductAndOptionList={__handle.req.searchProductAndOptionList}
                    onSubmitDeleteProductOptionOne={__handle.submit.deleteProductOption}
                />
            </Container>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }

            {/* Snackbar */}
            {confirmSnackbarOpen &&
                <ConfirmSnackbarHookComponent
                    open={confirmSnackbarOpen}
                    message={confirmSnackbarMessage}
                    onClose={onActionCloseConfirmSnackbar}
                    vertical={'top'}
                    horizontal={'center'}
                    onConfirm={snackbarConfirmAction}
                ></ConfirmSnackbarHookComponent>
            }
        </>
    )
}

export default ProductManageComponent;