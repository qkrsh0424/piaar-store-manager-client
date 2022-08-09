import { useEffect, useReducer, useState } from 'react';
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ViewHeaderSettingModalComponent from './view-header-setting-modal-v3/ViewHeaderSettingModal.component';
import HeaderComponent from './header/Header.component';
import { erpSalesHeaderDataConnect } from '../../../../data_connect/erpSalesHeaderDataConnect';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import { getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import OrderItemTableComponent from './order-item-table/OrderItemTable.component';
import CheckedOrderItemTableComponent from './checked-order-item-table/CheckedOrderItemTable.component';
import CheckedOperatorComponent from './checked-operator/CheckedOperator.component';
import { erpDownloadExcelHeaderDataConnect } from '../../../../data_connect/erpDownloadExcelHeaderDataConnect';
import { BackdropHookComponent, useBackdropHook } from '../../../../hooks/backdrop/useBackdropHook';
import OrderItemTablePagenationComponent from './order-item-table-pagenation/OrderItemTablePagenation.component';
import { getDefaultHeaderFields } from '../../../../static-data/staticData';
import { sortFormatUtils } from '../../../../utils/sortFormatUtils';
import useSocketClient from '../../../../web-hooks/socket/useSocketClient';
import { erpOrderItemSocket } from '../../../../data_connect/socket/erpOrderItemSocket';
import { erpSalesHeaderSocket } from '../../../../data_connect/socket/erpSalesHeaderSocket';
import { useSocketConnectLoadingHook, SocketConnectLoadingHookComponent } from '../../../../hooks/loading/useSocketConnectLoadingHook';
import { useBasicSnackbarHook, BasicSnackbarHookComponent } from '../../../../hooks/snackbar/useBasicSnackbarHook';
import CheckedHeadComponent from './checked-head/CheckedHead.component';
import { useLocalStorageHook } from '../../../../hooks/local_storage/useLocalStorageHook';

const Container = styled.div`
    margin-bottom: 100px;
`;

const DEFAULT_HEADER_FIELDS = getDefaultHeaderFields();

const SalesComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

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

    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);
    const [productOptionList, dispatchProductOptionList] = useReducer(productOptionListReducer, initialProductOptionList);
    const [orderItemPage, dispatchOrderItemPage] = useReducer(orderItemPageReducer, initialOrderItemPage);
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [downloadExcelList, dispatchDownloadExcelList] = useReducer(downloadExcelListReducer, initialDownloadExcelList);
    const [viewHeaderList, dispatchViewHeaderList] = useReducer(viewHeaderListReducer, initialViewHeaderList);
    const [releaseLocation, dispatchReleaseLocation] = useReducer(releaseLocationReducer, initialReleaseLocation);
    const [selectedMatchCode, dispatchSelectedMatchCode] = useReducer(selectedMatchCodeReducer, initialSelectedMatchCode);
    
    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);

    const [defaultHeader, setDefaultHeader] = useLocalStorageHook("defaultHeader", null);

    // Search
    const __reqSearchViewHeaderList = async () => {
        await erpSalesHeaderDataConnect().searchList()
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

    const __reqDeleteSelectedViewHeader = async (headerId) => {
        await erpSalesHeaderDataConnect().deleteOne(headerId)
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
        await productOptionDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchProductOptionList({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const __reqSearchOrderItemList = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let searchColumnName = query.searchColumnName || null;
        let searchQuery = query.searchQuery || null;
        let periodType = query.periodType || null;
        let releaseYn = query.releaseYn || null;
        let page = query.page || null;
        let size = query.size || null;
        let sortBy = query.sortBy || null;
        let sortDirection = query.sortDirection || null;
        let sort = sortFormatUtils().getSortWithSortElements(DEFAULT_HEADER_FIELDS, sortBy, sortDirection);
        let matchedCode = query.matchedCode || null;

        let params = {
            salesYn: 'y',
            releaseYn: releaseYn,
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            searchColumnName: searchColumnName,
            searchQuery: searchQuery,
            page: page,
            size: size,
            sort: sort,
            matchedCode: matchedCode
        }

        await erpOrderItemDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchOrderItemPage({
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

    const __reqRefreshOrderItemList = async (ids) => {
        let params = {
            ids: ids,
            salesYn: 'y',
            matchedCode: query.matchedCode || null
        }

        await erpOrderItemDataConnect().refreshOrderList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchCheckedOrderItemList({
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

    const __reqSearchDownloadExcelHeaders = async () => {
        await erpDownloadExcelHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchDownloadExcelList({
                        type: 'SET_DATA',
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

    // Create
    const __reqCreateViewHeaderOneSocket = async (params) => {
        await erpSalesHeaderSocket().createOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    // Update And Change
    const __reqUpdateViewHeaderOneSocket = async (params) => {
        await erpSalesHeaderSocket().updateOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderItemOneSocket = async (body) => {
        await erpOrderItemSocket().updateOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqChangeSalesYnForOrderItemListSocket = async function (body) {
        await erpOrderItemSocket().changeSalesYnForListInSales(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqChangeOptionCodeForOrderItemListInBatchSocket = async function (body) {
        await erpOrderItemSocket().changeOptionCodeForListInBatch(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    const __reqChangeReleaseOptionCodeForOrderItemListInBatchSocket = async function (body) {
        await erpOrderItemSocket().changeReleaseOptionCodeForListInBatch(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    const __reqChangeReleaseYnForOrderItemListSocket = async (body) => {
        await erpOrderItemSocket().changeReleaseYnForList(body)
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
    const __reqDeleteOrderItemListSocket = async function (params) {
        await erpOrderItemSocket().deleteList(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    // Action
    const __reqActionDownloadForDownloadOrderItems = async (fileName, id, downloadOrderItemsBody) => {
        await erpDownloadExcelHeaderDataConnect().actionDownloadForDownloadOrderItems(id, downloadOrderItemsBody)
            .then(res => {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', fileName + '.xlsx');
                    document.body.appendChild(link);
                    link.click();
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

    const __reqSearchReleaseLocationOfProductOption = async () => {
        await productOptionDataConnect().searchReleaseLocation()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchReleaseLocation({
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

    useEffect(() => {
        __reqSearchReleaseLocationOfProductOption();
        __reqSearchViewHeaderList();
        __reqSearchProductOptionList();
        __reqSearchDownloadExcelHeaders();
    }, []);

    useEffect(() => {
        if(!query.matchedCode) {
            return;
        }

        dispatchSelectedMatchCode({
            type: 'SET_DATA',
            payload: query.matchedCode
        })
    }, []);

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchOrderItemList();
            onActionCloseBackdrop();
        }
        
        fetchInit();
    }, [location]);

    useEffect(() => {
        let matchedCode = query.matchedCode;

        if (matchedCode) {
            dispatchSelectedMatchCode({
                type: 'SET_DATA',
                payload: matchedCode
            })
        }
    }, [query.matchedCode])

    useEffect(() => {
        if(!viewHeaderList) {
            return;
        }

        if(!defaultHeader || !defaultHeader.salesHeaderId) {
            dispatchViewHeader({
                type: 'CLEAR'
            })
            return;
        }

        let data = viewHeaderList.filter(r => r.id === defaultHeader.salesHeaderId)[0];
        dispatchViewHeader({
            type: 'INIT_DATA',
            payload: data
        });
    }, [defaultHeader, viewHeaderList])

    useEffect(() => {
        let subscribes = [];

        // 헤더를 선택하기 전에는 소켓통신 하지 않는다.
        if(!viewHeader) {
            return;
        }

        const __effect = {
            mount: async () => {
                onActionOpenSocketConnectLoading();
                if (!connected || !orderItemPage) {
                    return;
                }

                subscribes = await onSubscribes([
                    {
                        subscribeUrl: '/topic/erp.erp-order-item',
                        callback: async (e) => {
                            let body = JSON.parse(e.body);
                            if (body?.statusCode === 200) {
                                await __reqSearchOrderItemList();
                                if (body?.socketMemo) {
                                    onActionOpenSnackbar(body?.socketMemo)
                                }
                            }
                        }
                    },
                    {
                        subscribeUrl: '/topic/erp.erp-sales-header',
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
        };
    }, [connected, orderItemPage, viewHeader]);

    useEffect(() => {
        async function fetchCheckedOrderItems() {
            if (!orderItemPage || !checkedOrderItemList || checkedOrderItemList?.length <= 0) {
                return;
            }

            let ids = checkedOrderItemList.map(r => r.id);
            await __reqRefreshOrderItemList(ids);
        }

        fetchCheckedOrderItems();
    }, [orderItemPage])

    const _onAction_openHeaderSettingModal = () => {
        setHeaderSettingModalOpen(true);
    }

    const _onAction_closeHeaderSettingModal = () => {
        setHeaderSettingModalOpen(false);
    }

    const _onAction_checkOrderItem = (e, orderItem) => {
        e.stopPropagation();
        let data = [...checkedOrderItemList];
        let selectedId = orderItem.id;

        if (checkedOrderItemList.some(r => r.id === selectedId)) {
            data = data.filter(r => r.id !== selectedId);
        } else {
            data.push(orderItem);
        }

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onAction_checkOrderItemAll = (releaseLocation) => {
        let newData = [];
        let idSet = new Set(checkedOrderItemList.map(r => r.id));

        let data = [...orderItemPage.content];
        if(releaseLocation) {
            data = data.filter(r => r.optionReleaseLocation === releaseLocation);
        }

        data.forEach(r => {
            if (idSet.has(r.id)) {
                return;
            } else {
                newData.push(r);
            }
        });

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: [
                ...checkedOrderItemList,
                ...newData
            ]
        });
    }

    const _onAction_releaseOrderItemAll = (releaseLocation) => {
        let data = [...orderItemPage.content];
        if(releaseLocation) {
            data = data.filter(r => r.optionReleaseLocation === releaseLocation);
        }
        let idSet = new Set(data.map(r => r.id));

        let newData = checkedOrderItemList.filter(r => {
            return !idSet.has(r.id);
        })

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: newData
        })
    }

    const _onAction_releaseCheckedOrderItemListAll = () => {
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
    }

    // 판매 전환 서밋
    const _onSubmit_changeSalesYnForOrderItemList = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeSalesYnForOrderItemListSocket(body);
        onActionCloseBackdrop();
    }

    // 데이터 삭제 서밋
    const _onSubmit_deleteOrderItemList = async function (params) {
        onActionOpenBackdrop();
        await __reqDeleteOrderItemListSocket(params);
        onActionCloseBackdrop();
    }

    // 옵션 코드 변경
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = async function (body) {
        onActionOpenBackdrop();
        await __reqChangeOptionCodeForOrderItemListInBatchSocket(body);
        onActionCloseBackdrop();
    }

    // 출고 옵션 코드 변경
    const _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch = async function (body) {
        onActionOpenBackdrop();
        await __reqChangeReleaseOptionCodeForOrderItemListInBatchSocket(body);
        onActionCloseBackdrop();
    }

    // 엑셀 다운로드
    const _onSubmit_downloadOrderItemsExcel = async (downloadExcelFileName, downloadExcelHeader, downloadOrderItemList) => {
        onActionOpenBackdrop();
        await __reqActionDownloadForDownloadOrderItems(downloadExcelFileName, downloadExcelHeader.id, downloadOrderItemList);
        onActionCloseBackdrop();
    }

    // 출고 전환
    const _onSubmit_changeReleaseYnForOrderItemList = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeReleaseYnForOrderItemListSocket(body);
        onActionCloseBackdrop();
    }

    // 단일 erpOrderItem 업데이트
    const _onSubmit_updateErpOrderItemOne = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateOrderItemOneSocket(body);
        onActionCloseBackdrop();
    }

    // 뷰 헤더 생성 서밋
    const _onSubmit_createViewHeader = async (body) => {
        onActionOpenBackdrop();
        await __reqCreateViewHeaderOneSocket(body);
        await __reqSearchViewHeaderList();
        _onAction_updateDefaultHeader(body.id);
        onActionCloseBackdrop();
    }

    // 뷰 헤더 수정 서밋
    const _onSubmit_modifyViewHeader = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateViewHeaderOneSocket(body);
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

    // localStorage 기본 헤더 수정
    const _onAction_updateDefaultHeader = (headerId) => {
        if(!headerId) {
            setDefaultHeader({
                ...defaultHeader,
                salesHeaderId: ''
            })
            return;
        }

        let data = {
            ...defaultHeader,
            salesHeaderId: headerId
        }
        setDefaultHeader(data);
    }

    // 매핑 기준 변경 (피아르 옵션코드 & 출고 옵션코드)
    const _onAction_changeMatchCode = (matchedCode) => {
        dispatchSelectedMatchCode({
            type: 'SET_DATA',
            payload: matchedCode
        })

        query.matchedCode = matchedCode;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
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
                    <OrderItemTableComponent
                        viewHeader={viewHeader}
                        orderItemList={orderItemPage?.content}
                        checkedOrderItemList={checkedOrderItemList}
                        releaseLocation={releaseLocation}
                        selectedMatchCode={selectedMatchCode}
                        productOptionList={productOptionList}

                        _onAction_checkOrderItem={_onAction_checkOrderItem}
                        _onAction_checkOrderItemAll={_onAction_checkOrderItemAll}
                        _onAction_releaseOrderItemAll={_onAction_releaseOrderItemAll}
                        _onSubmit_updateErpOrderItemOne={_onSubmit_updateErpOrderItemOne}
                        _onAction_changeMatchCode={_onAction_changeMatchCode}

                        _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                        _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch={_onSubmit_changeReleaseOptionCodeForOrderItemListInBatch}
                    ></OrderItemTableComponent>
                    <OrderItemTablePagenationComponent
                        orderItemPage={orderItemPage}
                    ></OrderItemTablePagenationComponent>
                    <CheckedHeadComponent
                        viewHeader={viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                        downloadExcelList={downloadExcelList}
                        selectedMatchCode={selectedMatchCode}

                        _onAction_releaseCheckedOrderItemListAll={_onAction_releaseCheckedOrderItemListAll}
                        _onSubmit_downloadOrderItemsExcel={_onSubmit_downloadOrderItemsExcel}
                    />
                    <CheckedOperatorComponent
                        viewHeader={viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                        productOptionList={productOptionList}
                        downloadExcelList={downloadExcelList}
                        selectedMatchCode={selectedMatchCode}

                        _onAction_releaseCheckedOrderItemListAll={_onAction_releaseCheckedOrderItemListAll}
                        _onSubmit_changeSalesYnForOrderItemList={_onSubmit_changeSalesYnForOrderItemList}
                        _onSubmit_deleteOrderItemList={_onSubmit_deleteOrderItemList}
                        _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                        _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch={_onSubmit_changeReleaseOptionCodeForOrderItemListInBatch}
                        _onSubmit_downloadOrderItemsExcel={_onSubmit_downloadOrderItemsExcel}
                        _onSubmit_changeReleaseYnForOrderItemList={_onSubmit_changeReleaseYnForOrderItemList}
                    ></CheckedOperatorComponent>
                    <CheckedOrderItemTableComponent
                        viewHeader={viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                        productOptionList={productOptionList}
                        
                        _onAction_checkOrderItem={_onAction_checkOrderItem}
                        _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                        _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch={_onSubmit_changeReleaseOptionCodeForOrderItemListInBatch}
                    ></CheckedOrderItemTableComponent>
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
            ></BackdropHookComponent>

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
    );
}

export default SalesComponent;

const initialViewHeader = null;
const initialProductOptionList = null;
const initialOrderItemPage = null;
const initialCheckedOrderItemList = [];
const initialDownloadExcelList = null;
const initialViewHeaderList = null;
const initialReleaseLocation = null;
const initialSelectedMatchCode = 'releaseOptionCode';

const releaseLocationReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReleaseLocation;
        default: return initialReleaseLocation;
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
        default: return null;
    }
}

const productOptionListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const orderItemPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const checkedOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const downloadExcelListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const selectedMatchCodeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialSelectedMatchCode;
    }
}
