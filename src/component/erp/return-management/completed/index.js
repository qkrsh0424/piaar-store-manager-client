import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from 'query-string';
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import HeaderComponent from "./header/Header.component";
import ReturnItemTableComponent from "./return-item-table/ReturnItemTable.component";
import SearchOperatorComponent from "./search-operator/SearchOperator.component";
import { useReducer, useState } from "react";
import { erpReturnItemDataConnect } from "../../../../data_connect/erpReturnItemDataConnect";
import { getReturnDefaultHeaderFields } from "../../../../static-data/erpReturnItemStaticData";
import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import ViewHeaderSettingModalComponent from "./view-header-setting-modal-v3/ViewHeaderSettingModal.component";
import { erpReturnHeaderDataConnect } from "../../../../data_connect/erpReturnHeaderDataConnect";
import { erpReturnHeaderSocket } from "../../../../data_connect/socket/erpReturnHeaderSocket";
import { useLocalStorageHook } from "../../../../hooks/local_storage/useLocalStorageHook";
import { SocketConnectLoadingHookComponent, useSocketConnectLoadingHook } from "../../../../hooks/loading/useSocketConnectLoadingHook";
import useSocketClient from "../../../../web-hooks/socket/useSocketClient";
import { BasicSnackbarHookComponent, useBasicSnackbarHook } from "../../../../hooks/snackbar/useBasicSnackbarHook";
import { erpReturnItemSocket } from "../../../../data_connect/socket/erpReturnItemSocket";
import ReturnItemTablePagenationComponent from "./return-item-table-pagenation/ReturnItemTablePagenation.component";
import CheckedHeadComponent from "./checked-head/CheckedHead.component";
import CheckedOperatorComponent from "./checked-operator/CheckedOperator.component";
import CheckedReturnItemTableComponent from "./checked-return-item-table/CheckedReturnItemTable.component";
import { returnReasonTypeDataConnect } from "../../../../data_connect/returnReasonTypeDataConnect";
import { sortFormatUtils } from "../../../../utils/sortFormatUtils";
import { productReleaseDataConnect } from "../../../../data_connect/productReleaseDataConnect";
import { returnProductImageDataConnect } from "../../../../data_connect/returnProductImageDataConnect";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";

const Container = styled.div`
    margin-bottom: 100px;
`;

const DEFAULT_HEADER_FIELDS = getReturnDefaultHeaderFields();

const CompletedComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const {
        connected,
        onPublish,
        onSubscribes,
        onUnsubscribes
    } = useSocketClient();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnacbar,
    } = useBasicSnackbarHook();

    const {
        open: socketConnectLoadingOpen,
        onActionOpen: onActionOpenSocketConnectLoading,
        onActionClose: onActionCloseSocketConnectLoading
    } = useSocketConnectLoadingHook();

    const [returnItemPage, dispatchReturnItemPage] = useReducer(returnItemPageReducer, initialReturnItemPage);
    const [checkedReturnItemList, dispatchCheckedReturnItemList] = useReducer(checkedReturnItemListReducer, initialCheckedReturnItemList);
    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);
    const [viewHeaderList, dispatchViewHeaderList] = useReducer(viewHeaderListReducer, initialViewHeaderList);
    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);
    const [returnTypeList, dispatchReturnTypeList] = useReducer(returnTypeListReducer, initialReturnTypeList);
    const [orderItemReleaseData, dispatchOrderItemReleaseData] = useReducer(orderItemReleaseDataReducer, initialOrderItemReleaseData);
    const [productOptionList, dispatchProductOptionList] = useReducer(productOptionListReducer, initialProductOptionList);
    const [returnProductImageList, dispatchReturnProductImageList] = useReducer(returnProductImageListReducer, initialReturnProductImageList);

    const [defaultHeader, setDefaultHeader] = useLocalStorageHook("returnDefaultHeader", null);

    const __reqSearchViewHeaderList = async () => {
        await erpReturnHeaderDataConnect().searchAll()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchViewHeaderList({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
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

    const __reqSearchReturnItemList = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let searchColumnName = query.searchColumnName || null;
        let searchQuery = query.searchQuery || null;
        let periodType = query.periodType || null;
        let stockReflectYn = query.stockReflectYn || null;
        let defectiveYn = query.defectiveYn || null;
        let page = query.page || null;
        let size = query.size || null;
        let sortBy = query.sortBy || null;
        let sortDirection = query.sortDirection || null;
        let sort = sortFormatUtils().getSortWithSortElements(DEFAULT_HEADER_FIELDS, sortBy, sortDirection);
        let matchedCode = query.matchedCode || null;

        let params = {
            collectYn: 'y',
            collectCompleteYn: 'y',
            returnRejectYn: 'n',
            returnCompleteYn: 'y',
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            stockReflectYn: stockReflectYn,
            defectiveYn: defectiveYn,
            searchColumnName: searchColumnName,
            searchQuery: searchQuery,
            page: page,
            size: size,
            sort: sort,
            matchedCode: matchedCode
        }

        await erpReturnItemDataConnect().searchBatchByPage(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchReturnItemPage({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    });
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

    const __reqCreateViewHeaderOneSocket = async (params) => {
        await erpReturnHeaderSocket().createOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqDeleteSelectedViewHeader = async (headerId) => {
        await erpReturnHeaderSocket().deleteOne(headerId)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateViewHeaderOneSocket = async (params) => {
        await erpReturnHeaderSocket().updateOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateReturnItemOneSocket = async (body) => {
        await erpReturnItemSocket().updateOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqRefreshReturnItemList = async (ids) => {
        let params = {
            ids: ids,
            collectYn: 'y',
            collectCompleteYn: 'y',
            returnCompleteYn: 'y',
        }

        await erpReturnItemDataConnect().refreshReturnList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchCheckedReturnItemList({
                        type: 'SET_DATA',
                        payload: res.data.data
                    });
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

    const __reqChangeReturnCompleteYnForReturnItemListSocket = async function (body) {
        await erpReturnItemSocket().changeReturnCompleteYnForList(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    // Delete
    const __reqDeleteReturnItemListSocket = async function (params) {
        await erpReturnItemSocket().deleteBatch(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqSearchReturnTypeList = async () => {
        await returnReasonTypeDataConnect().searchAll()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchReturnTypeList({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
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

    const __reqActionReflectDefective = async (body, params) => {
        await erpReturnItemSocket().actionReflectDefective(body, params)
            .then(res => {
                if (res.status === 200) {
                    alert("처리되었습니다.");
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqActionCancelDefective = async (body, params) => {
        await erpReturnItemSocket().actionCancelDefective(body, params)
            .then(res => {
                if (res.status === 200) {
                    alert("처리되었습니다.");
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqActionSearchReleaseData = async (orderItemId) => {
        await productReleaseDataConnect().searchOneByErpOrderItemId(orderItemId)
            .then(res => {
                if (res.status === 200) {
                    dispatchOrderItemReleaseData({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }
    
    const __reqActionReflectStock = async (body, params) => {
        await erpReturnItemSocket().actionReflectStock(body, params)
            .then(res => {
                if (res.status === 200) {
                    alert("처리되었습니다.");
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
            ;
    }

    const __reqActionCancelStock = async (body) => {
        await erpReturnItemSocket().actionCancelStock(body)
            .then(res => {
                if (res.status === 200) {
                    alert("처리되었습니다.");
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
            ;
    }

    const __reqCreateReturnProductImage = async (data) => {
        await returnProductImageDataConnect().createBatch(data)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqSearchProductOptionList = async () => {
        await productOptionDataConnect().getList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchProductOptionList({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
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

    const __reqSearchReturnProductImage = async (returnItemId) => {
        await returnProductImageDataConnect().searchBatchByErpReturnItemId(returnItemId)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchReturnProductImageList({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
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

    const __reqDeleteReturnProductImage = async (imageId) => {
        await returnProductImageDataConnect().deleteOne(imageId)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqChangeReturnReasonForReturnItem = async function (body) {
        await erpReturnItemSocket().changeReturnReason(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    const __reqChangeReturnDeliveryCharge = async (body) => {
        await erpReturnItemSocket().changeReturnDeliveryChargeYn(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    const __reqChangeDeliveryChargeReturnType = async (body) => {
        await erpReturnItemSocket().changeDeliveryChargeReturnType(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    useEffect(() => {
        __reqSearchViewHeaderList();
        __reqSearchReturnTypeList();
        __reqSearchProductOptionList();
    }, []);

    useEffect(() => {
      async function fetchInit() {
        onActionOpenBackdrop();
        await __reqSearchReturnItemList();
        onActionCloseBackdrop();
      }

      fetchInit();
    }, [location])

    useEffect(() => {
        if(!viewHeaderList) {
            return;
        }

        if(!defaultHeader || !defaultHeader.completedHeaderId) {
            dispatchViewHeader({
                type: 'CLEAR'
            })
            return;
        }

        let data = viewHeaderList.filter(r => r.id === defaultHeader.completedHeaderId)[0];
        dispatchViewHeader({
            type: 'INIT_DATA',
            payload: data
        });
    }, [defaultHeader, viewHeaderList])

    useEffect(() => {
        let subscribes = [];

        if(!viewHeader) {
            return;
        }

        const __effect = {
            mount: async () => {
                onActionOpenSocketConnectLoading();
                if(!connected || !returnItemPage) {
                    return;
                }

                subscribes = await onSubscribes([
                    {
                        subscribeUrl: '/topic/erp.erp-return-item',
                        callback: async (e) => {
                            let body = JSON.parse(e.body);
                            if (body?.statusCode === 200) {
                                await __reqSearchReturnItemList();
                                if (body?.socketMemo) {
                                    onActionOpenSnackbar(body?.socketMemo);
                                }
                            }
                        }
                    },
                    {
                        subscribeUrl: '/topic/erp.erp-return-header',
                        callback: async (e) => {
                            let body = JSON.parse(e.body);
                            if (body?.statusCode === 200) {
                                await __reqSearchViewHeaderList();
                            }
                        }
                    }
                ]);
                onActionCloseSocketConnectLoading();
            },
            unmount: async () => {
                onUnsubscribes(subscribes);
            }
        }

        __effect.mount();

        return () => {
            __effect.unmount();
        }
    }, [connected, returnItemPage, viewHeader])

    useEffect(() => {
        async function fetchCheckedOrderItems() {
            if (!returnItemPage || !checkedReturnItemList || checkedReturnItemList?.length <= 0) {
                return;
            }

            let ids = checkedReturnItemList.map(r => r.id);
            await __reqRefreshReturnItemList(ids);
        }

        fetchCheckedOrderItems();
    }, [returnItemPage])

    const _onAction_openHeaderSettingModal = () => {
        setHeaderSettingModalOpen(true);
    }

    const _onAction_closeHeaderSettingModal = () => {
        setHeaderSettingModalOpen(false);
    }

    // 뷰 헤더 생성 서밋
    const _onSubmit_createViewHeader = async (body) => {
        onActionOpenBackdrop();
        await __reqCreateViewHeaderOneSocket(body);
        await __reqSearchViewHeaderList();
        _onAction_updateDefaultHeader(body.id);
        onActionCloseBackdrop();
    }

    // 뷰 헤더 제거 서밋
    const _onAction_deleteSelectedViewHeader = async (headerId) => {
        onActionOpenBackdrop();
        await __reqDeleteSelectedViewHeader(headerId);
        await __reqSearchViewHeaderList();
        _onAction_updateDefaultHeader();
        onActionCloseBackdrop();
    }

    // 뷰 헤더 수정 서밋
    const _onSubmit_modifyViewHeader = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateViewHeaderOneSocket(body);
        onActionCloseBackdrop();
    }

    // localStorage 기본 헤더 수정
    const _onAction_updateDefaultHeader = (headerId) => {
        if(!headerId) {
            setDefaultHeader({
                ...defaultHeader,
                completedHeaderId: ''
            })
            return;
        }

        let data = {
            ...defaultHeader,
            completedHeaderId: headerId
        }
        setDefaultHeader(data);
    }

    // 단일 erpReturnItem 업데이트
    const _onSubmit_updateErpReturnItemOne = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateReturnItemOneSocket(body);
        onActionCloseBackdrop();
    }

    const _onAction_checkedReturnItemListAll = () => {
        dispatchCheckedReturnItemList({
            type: 'CLEAR'
        })
    }

    const _onAction_checkReturnItem = (e, returnItem) => {
        e.stopPropagation();
        let data = [...checkedReturnItemList];
        let selectedId = returnItem.id;

        if (checkedReturnItemList.some(r => r.id === selectedId)) {
            data = data.filter(r => r.id !== selectedId);
        } else {
            data.push(returnItem);
        }

        dispatchCheckedReturnItemList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onAction_checkReturnItemAll = () => {
        let newData = [];
        let idSet = new Set(checkedReturnItemList.map(r => r.id));

        let data = [...returnItemPage.content];
        data.forEach(r => {
            if (idSet.has(r.id)) {
                return;
            } else {
                newData.push(r);
            }
        });

        dispatchCheckedReturnItemList({
            type: 'SET_DATA',
            payload: [
                ...checkedReturnItemList,
                ...newData
            ]
        });
    }

    const _onAction_releaseReturnItemAll = () => {
        let data = [...returnItemPage.content];

        let idSet = new Set(data.map(r => r.id));
        let newData = checkedReturnItemList.filter(r => {
            return !idSet.has(r.id);
        })

        dispatchCheckedReturnItemList({
            type: 'SET_DATA',
            payload: newData
        })
    }

    // 반품완료 취소 커밋
    const _onSubmit_changeReturnCompleteYnForReturnItemList = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeReturnCompleteYnForReturnItemListSocket(body);
        onActionCloseBackdrop();
    }

    // 데이터 삭제 서밋
    const _onSubmit_deleteReturnItemList = async (params) => {
        onActionOpenBackdrop();
        await __reqDeleteReturnItemListSocket(params);
        onActionCloseBackdrop();
    }

    const _onSubmit_reflectDefective = async (data, params) => {
        onActionOpenBackdrop();
        await __reqActionReflectDefective(data, params)
        onActionCloseBackdrop();
    }

    const _onSubmit_cancelDefective = async (data, params) => {
        onActionOpenBackdrop();
        await __reqActionCancelDefective(data, params);
        onActionCloseBackdrop();
    }
    
    const _onAction_searchReleaseData = async (orderItemId) => {
        onActionOpenBackdrop();
        await __reqActionSearchReleaseData(orderItemId);
        onActionCloseBackdrop();
    }

    // 선택된 데이터 재고 반영
    const _onAction_reflectStock = async (data, params) => {
        onActionOpenBackdrop();
        await __reqActionReflectStock(data, params);
        onActionCloseBackdrop();
    }

    // 선택된 데이터 재고 취소
    const _onAction_cancelStock = async (data) => {
        onActionOpenBackdrop();
        await __reqActionCancelStock(data);
        onActionCloseBackdrop();
    }

    const _onSubmit_createReturnProductImage = async (imageList) => {
        onActionOpenBackdrop();
        await __reqCreateReturnProductImage(imageList);
        onActionCloseBackdrop();
    }

    const _onAction_searchReturnProductImage = async (returnItemId) => {
        onActionOpenBackdrop();
        await __reqSearchReturnProductImage(returnItemId);
        onActionCloseBackdrop();
    }

    const _onAction_deleteReturnProudctImage = async (id) => {
        onActionOpenBackdrop();
        await __reqDeleteReturnProductImage(id);
        onActionCloseBackdrop();
    }

    const _onSubmit_changeReturnReasonForReturnItem = async (body) => {
        onActionOpenBackdrop()
        await __reqChangeReturnReasonForReturnItem(body);
        onActionCloseBackdrop()
    }

    const _onAction_changeReturnDeliveryCharge = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeReturnDeliveryCharge(body);
        onActionCloseBackdrop();
    }

    const _onSubmit_changeDeliveryChargeReturnTypeForReturnItem = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeDeliveryChargeReturnType(body);
        onActionCloseBackdrop();
    }

    return (
        <>
            {connected &&
                <Container>
                    <HeaderComponent
                        _onAction_openHeaderSettingModal={_onAction_openHeaderSettingModal}
                    ></HeaderComponent>
                    <SearchOperatorComponent
                        viewHeader={viewHeader}
                    ></SearchOperatorComponent>
                    <ReturnItemTableComponent
                        viewHeader={viewHeader}
                        returnItemList={returnItemPage?.content}
                        checkedReturnItemList={checkedReturnItemList}
                        productOptionList={productOptionList}
                        returnProductImageList={returnProductImageList}
                        returnTypeList={returnTypeList}
                        orderItemReleaseData={orderItemReleaseData}
                        
                        _onAction_checkReturnItem={_onAction_checkReturnItem}
                        _onAction_checkReturnItemAll={_onAction_checkReturnItemAll}
                        _onAction_releaseReturnItemAll={_onAction_releaseReturnItemAll}
                        _onSubmit_updateErpReturnItemOne={_onSubmit_updateErpReturnItemOne}
                        _onSubmit_createReturnProductImage={_onSubmit_createReturnProductImage}
                        _onAction_searchReturnProductImage={_onAction_searchReturnProductImage}
                        _onAction_deleteReturnProudctImage={_onAction_deleteReturnProudctImage}
                        _onSubmit_changeReturnReasonForReturnItem={_onSubmit_changeReturnReasonForReturnItem}

                        _onSubmit_reflectDefective={_onSubmit_reflectDefective}
                        _onSubmit_cancelDefective={_onSubmit_cancelDefective}
                        _onAction_searchReleaseData={_onAction_searchReleaseData}
                        _onAction_reflectStock={_onAction_reflectStock}
                        _onAction_cancelStock={_onAction_cancelStock}
                        _onAction_changeReturnDeliveryCharge={_onAction_changeReturnDeliveryCharge}
                        _onSubmit_changeDeliveryChargeReturnTypeForReturnItem={_onSubmit_changeDeliveryChargeReturnTypeForReturnItem}
                    ></ReturnItemTableComponent>
                    <ReturnItemTablePagenationComponent
                        returnItemPage={returnItemPage}
                    ></ReturnItemTablePagenationComponent>
                    <CheckedHeadComponent
                        viewHeader={viewHeader}
                        checkedReturnItemList={checkedReturnItemList}

                        _onAction_checkedReturnItemListAll={_onAction_checkedReturnItemListAll}
                    />
                    <CheckedOperatorComponent
                        viewHeader={viewHeader}
                        checkedReturnItemList={checkedReturnItemList}

                        _onSubmit_changeReturnCompleteYnForReturnItemList={_onSubmit_changeReturnCompleteYnForReturnItemList}
                        _onSubmit_deleteReturnItemList={_onSubmit_deleteReturnItemList}
                    ></CheckedOperatorComponent>
                    <CheckedReturnItemTableComponent
                        viewHeader={viewHeader}
                        checkedReturnItemList={checkedReturnItemList}

                        _onAction_checkReturnItem={_onAction_checkReturnItem}
                    ></CheckedReturnItemTableComponent>
                </Container>
            }

            {/* Modal */}
            <CommonModalComponent
                open={headerSettingModalOpen}
                maxWidth={'lg'}

                onClose={_onAction_closeHeaderSettingModal}
            >
                <ViewHeaderSettingModalComponent
                    viewHeader={viewHeader}
                    viewHeaderList={viewHeaderList}

                    _onSubmit_createViewHeader={_onSubmit_createViewHeader}
                    _onSubmit_modifyViewHeader={_onSubmit_modifyViewHeader}
                    _onAction_closeHeaderSettingModal={_onAction_closeHeaderSettingModal}
                    _onAction_deleteSelectedViewHeader={_onAction_deleteSelectedViewHeader}

                    _onAction_updateDefaultHeader={_onAction_updateDefaultHeader}
                ></ViewHeaderSettingModalComponent>
            </CommonModalComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponent
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnacbar}
                    severity={'success'}
                    vertical={'top'}
                    horizontal={'center'}
                    duration={4000}
                ></BasicSnackbarHookComponent>
            }

            {socketConnectLoadingOpen &&
                <SocketConnectLoadingHookComponent
                    open={socketConnectLoadingOpen}
                ></SocketConnectLoadingHookComponent>
            }
        </>
    )
}

export default CompletedComponent;

const initialViewHeader = null;
const initialCheckedReturnItemList = [];
const initialReturnItemPage = null;
const initialViewHeaderList = null;
const initialReturnTypeList = null;
const initialOrderItemReleaseData = null;
const initialReturnProductImageList = [];
const initialProductOptionList = null;

const returnItemPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return initialReturnItemPage;
    }
}

const checkedReturnItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const viewHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewHeader;
        default: return initialViewHeader;
    }
}

const viewHeaderListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return initialViewHeaderList;
    }
}

const returnTypeListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReturnTypeList;
        default: return initialReturnTypeList;
    }
}

const orderItemReleaseDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderItemReleaseData;
        default: return initialOrderItemReleaseData;
    }
}

const productOptionListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const returnProductImageListReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialReturnProductImageList;
        default: return initialReturnProductImageList;
    }
}
