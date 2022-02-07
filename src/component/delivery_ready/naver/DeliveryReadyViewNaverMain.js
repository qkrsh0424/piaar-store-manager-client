import React, {useState, useEffect, useReducer} from 'react';
import { withRouter } from 'react-router';

// handler
import { getStartDate, getEndDate, dateToYYYYMMDDhhmmss, dateToYYMMDD, dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

// data connect
import { deliveryReadyNaverDataConnect } from '../../../data_connect/deliveryReadyNaverDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import DeliveryReadyDateRangePickerModal from '../modal/DeliveryReadyDateRangePickerModal';
import DeliveryReadyOptionInfoModal from '../modal/DeliveryReadyOptionInfoModal';
import BackdropLoading from '../../loading/BackdropLoading';
import DeliveryReadyViewNaverBar from './DeliveryReadyViewNaverBar';
import DeliveryReadyUnreleasedViewNaverBody from './DeliveryReadyUnreleasedViewNaverBody';
import DeliveryReadyReleasedViewNaverBody from './DeliveryReadyReleasedViewNaverBody';
import DeliveryReadyReleaseMemoModal from '../modal/DeliveryReadyReleaseMemoModal';
import DeliveryReadyReceiveMemoModal from '../modal/DeliveryReadyReceiveMemoModal';

// 한페이지에 보여지는 데이터
const POSTS_PER_PAGE = 50;

const initialSearchBarState = null;
const initialReleasedDataReflectedState = null;

const searchBarStateReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const releasedDataReflectedStateReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return {
                ...state,
                controlValue : 0,
                controlText : '재고반영여부 선택'
            }
        case 'REFLECTED':
            return {
                ...state,
                controlValue : 1,
                controlText : '재고반영 O'
            }
        case 'NOT_REFLECTED':
            return {
                ...state,
                controlValue : 2,
                controlText : '재고반영 X'
            }
        default: return { ...state }
    }
}

const DeliveryReadyViewNaverMain = (props) => {
    const [unreleasedData, setUnreleasedData] = useState(null);
    const [releasedData, setReleasedData] = useState(null);
    const [unreleaseCheckedOrderList, setUnreleaseCheckedOrderList] = useState([]);
    const [releaseCheckedOrderList, setReleaseCheckedOrderList] = useState([]);
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [originUnreleasedData, setOriginUnreleasedData] = useState(null);
    const [originReleasedData, setOriginReleasedData] = useState(null);
    
    // date picker
    const [selectionRange, setSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );
    const [exSelectionRange, setExSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
        }
    );
    const [deliveryReadyDateRangePickerModalOpen, setDeliveryReadyDateRangePickerModalOpen] = useState(false);
    const [deliveryReadyOptionInfoModalOpen, setDeliveryReadyOptionInfoModalOpen] = useState(false);
    const [selectedDateText, setSelectedDateText] = useState("날짜 선택");
    
    const [deliveryReadyOptionInfo, setDeliveryReadyOptionInfo] = useState(null);
    const [deliveryReadyItem, setDeliveryReadyItem] = useState(null);
    
    const [originOptionManagementCode, setOriginOptionManagementCode] = useState(null);
    const [changedOptionManagementCode, setChangedOptionManagementCode] = useState(null);

    // 수취인명 검색
    const [receiverSearchBarData, setReceiverSearchBarData] = useState({
        isOpenForUnreleased: true,
        isOpenForReleased: true,
    });
    
    // 비고(창고) 검색
    const [storageSearchBarData, setStorageSearchBarData] = useState({
        isOpenForUnreleased: true,
        isOpenForReleased: true,
    });

    // 스토어 정보
    const [storeInfoData, setStoreInfoData] = useState({
        storeName: '',
        storeContact: ''
    });

    // 페이징
    const [releasedDataPagenate, setReleasedDataPagenate] = useState({
        currentPage : 1,
        totalPageNumber : 1,
        postsPerPage : POSTS_PER_PAGE
    });

    const [unreleasedDataPagenate, setUnReleasedDataPagenate] = useState({
        currentPage : 1,
        totalPageNumber : 1,
        postsPerPage : POSTS_PER_PAGE
    });

    // 재고반영
    const [deliveryReadyReleaseMemoModalOpen, setDeliveryReadyReleaseMemoModalOpen] = useState(false);
    const [releaseCompletedMemo, setReleaseCompletedMemo] = useState({ releaseMemo: ''});

    // 재고반영 취소
    const [deliveryReadyReceiveMemoModalOpen, setDeliveryReadyReceiveMemoModalOpen] = useState(false);
    const [releaseCompletedCancelMemo, setReleaseCompletedCancelMemo] = useState({ receiveMemo: ''});
    
    // 재고반영 여부 컨트롤
    const [releasedDataReflectedState, dispatchReleasedDataReflectedState] = useReducer(releasedDataReflectedStateReducer, initialReleasedDataReflectedState);

    // 클릭 이벤트 여부
    const [isObjectSubmitted, setIsObjectSubmitted] = useState({
        reflectedUnit: false,
        cancelReflectedUnit: false, 
    });

    // 검색 데이터 (수취인명, 비고)
    const [searchBarState, dispatchSearchBarState] = useReducer(searchBarStateReducer, initialSearchBarState);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().getDeliveryReadyUnreleasedData();
            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
        }
        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            getDeliveryReadyUnreleasedData: async function () {
                await deliveryReadyNaverDataConnect().getUnreleasedData()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            let data = res.data.data;
                            let sortedData = data.sort((a, b) => a.deliveryReadyItem.receiver.localeCompare(b.deliveryReadyItem.receiver));
                            
                            for(var i = 0; i < sortedData.length-1; i++){
                                if((sortedData[i].deliveryReadyItem.receiver === sortedData[i+1].deliveryReadyItem.receiver)
                                    && (sortedData[i].deliveryReadyItem.receiverContact1 === sortedData[i+1].deliveryReadyItem.receiverContact1)) {
                                        sortedData[i] = {
                                            ...sortedData[i],
                                            duplicationUser : true
                                        };

                                        sortedData[i+1] = {
                                            ...sortedData[i+1],
                                            duplicationUser : true
                                        };
                                }
                            }

                            setUnreleasedData(sortedData);
                            setOriginUnreleasedData(res.data.data);

                            let unreleasedDataLength = res.data.data.length;
                            let pageNum = Math.ceil(unreleasedDataLength / POSTS_PER_PAGE);

                            setUnReleasedDataPagenate({
                                ...unreleasedDataPagenate,
                                totalPageNumber : pageNum
                            });
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            getDeliveryReadyReleasedData: async function (start, end) {
                var date1 = start ? new Date(getStartDate(start)).toUTCString() : null;
                var date2 = end ? new Date(getEndDate(end)).toUTCString() : null;

                setReleaseCheckedOrderList([]);
                dispatchReleasedDataReflectedState({
                    type: 'INIT_DATA'
                });

                await deliveryReadyNaverDataConnect().getSelectedReleasedData(date1, date2)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            let data = res.data.data;
                            let sortedData = data.sort((a, b) => a.deliveryReadyItem.receiver.localeCompare(b.deliveryReadyItem.receiver));
                            
                            for(var i = 0; i < sortedData.length-1; i++){
                                if((sortedData[i].deliveryReadyItem.receiver === sortedData[i+1].deliveryReadyItem.receiver)
                                    && (sortedData[i].deliveryReadyItem.receiverContact1 === sortedData[i+1].deliveryReadyItem.receiverContact1)) {
                                        sortedData[i] = {
                                            ...sortedData[i],
                                            duplicationUser : true
                                        };

                                        sortedData[i+1] = {
                                            ...sortedData[i+1],
                                            duplicationUser : true
                                        };
                                }
                            }

                            setReleasedData(sortedData);
                            setOriginReleasedData(res.data.data);
                        }
                        setSelectedDateText(dateToYYMMDD(date1) + " ~ " + dateToYYMMDD(date2));

                        let releasedDataLength = res.data.data.length;
                        let pageNum = Math.ceil(releasedDataLength / POSTS_PER_PAGE);

                        setReleasedDataPagenate({
                            ...releasedDataPagenate,
                            totalPageNumber: pageNum
                        });
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })

                setDeliveryReadyDateRangePickerModalOpen(false);
            },
            deleteOrderData: async function (itemCid) {
                await deliveryReadyNaverDataConnect().deleteUnreleasedData(itemCid)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            alert('삭제되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            deleteOrderListData: async function (checkedUnreleaseData) {
                await deliveryReadyNaverDataConnect().deleteListUnreleasedData(checkedUnreleaseData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            alert('삭제되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                })
            },
            changeListToReleaseData: async function (deliveryReadyItem) {
                await deliveryReadyNaverDataConnect().changeListToReleaseData(deliveryReadyItem)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                            alert('출고 처리되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            changeToUnreleaseData: async function (deliveryReadyItem) {
                await deliveryReadyNaverDataConnect().updateReleasedData(deliveryReadyItem)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                            alert('출고 취소되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            changeListToUnreleaseData: async function (deliveryReadyItem) {
                await deliveryReadyNaverDataConnect().changeListToUnreleaseData(deliveryReadyItem)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                            alert('출고 취소되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            getOptionManagementCode: async function () {
                await deliveryReadyNaverDataConnect().searchOptionInfo()
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setDeliveryReadyOptionInfo(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            changeItemOptionManagementCode: async function (optionCode) {
                await deliveryReadyNaverDataConnect().updateOptionInfo(deliveryReadyItem, optionCode)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setDeliveryReadyOptionInfoModalOpen(false);
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            changeItemsOptionManagementCode: async function (optionCode) {
                await deliveryReadyNaverDataConnect().updateAllOptionInfo(deliveryReadyItem, optionCode)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setDeliveryReadyOptionInfoModalOpen(false);
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            downloadHansanOrderForm: async function (data, sender, senderContact1) {
                data.map(r => {
                    r.sender = sender;
                    r.senderContact1 = senderContact1;

                    return r;
                })

                await deliveryReadyNaverDataConnect().downloadHansanOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDDhhmmss(new Date());

                        link.setAttribute('download', '[' + date + ']한산 발주서양식_네이버.xlsx');
                        document.body.appendChild(link);
                        link.click();

                        setUnreleaseCheckedOrderList([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            downloadTailoOrderForm: async function (data, sender, senderContact1) {
                data.map(r => {
                    r.sender = sender;
                    r.senderContact1 = senderContact1;

                    return r;
                })

                await deliveryReadyNaverDataConnect().downloadTailoOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDDhhmmss(new Date());

                        link.setAttribute('download', '[' + date + ']테일로 발주서양식_네이버.xlsx');
                        document.body.appendChild(link);
                        link.click();

                        setUnreleaseCheckedOrderList([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            downloadLotteOrderForm: async function (data, sender, senderContact1) {
                data.map(r => {
                    r.sender = sender;
                    r.senderContact1 = senderContact1;

                    return r;
                });

                await deliveryReadyNaverDataConnect().downloadLotteOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDDhhmmss(new Date());

                        link.setAttribute('download', '[' + date + ']롯데 발주서양식_네이버.xlsx');
                        document.body.appendChild(link);
                        link.click();

                        setUnreleaseCheckedOrderList([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            downloadNaverExcelOrderForm: async function (data) {
                await deliveryReadyNaverDataConnect().downloadNaverExcelOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDD(new Date());

                        link.setAttribute('download', '[' + date + ']배송준비 데이터_네이버.xlsx');
                        document.body.appendChild(link);
                        link.click();

                        setUnreleaseCheckedOrderList([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            reflectStockUnit: async function (data, memo) {
                await deliveryReadyNaverDataConnect().reflectStockUnit(data, memo)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                reflectedUnit: false
                            });
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            cancelReflectedStockUnit: async function (data, memo) {
                await deliveryReadyNaverDataConnect().cancelReflectedStockUnit(data, memo)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                cancelreflectedUnit: false
                            });
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            unreleaseCheckedOrderList: function () {
                return {
                    checkAll: function () {
                        if (this.isCheckedAll()) {
                            setUnreleaseCheckedOrderList([]);
                        } else {
                            let unreleaseCheckedList = unreleasedData.map(r => r.deliveryReadyItem.id);
                            setUnreleaseCheckedOrderList(unreleaseCheckedList);
                        }
                    },
                    isCheckedAll: function () {
                        if (unreleasedData && unreleasedData.length) {
                            let unreleaseOrderIdList = unreleasedData.map(r => r.deliveryReadyItem.id).sort();
                            unreleaseCheckedOrderList.sort();

                            return JSON.stringify(unreleaseOrderIdList) === JSON.stringify(unreleaseCheckedOrderList);
                        } else return false;
                    },
                    isChecked: function (unreleaseOrderId) {
                        return unreleaseCheckedOrderList.includes(unreleaseOrderId);
                    },
                    checkOne: function (e, unreleaseOrderId) {
                        if (e.target.checked) {
                            setUnreleaseCheckedOrderList(unreleaseCheckedOrderList.concat(unreleaseOrderId));
                        } else {
                            setUnreleaseCheckedOrderList(unreleaseCheckedOrderList.filter(r => r !== unreleaseOrderId));
                        }
                    },
                    checkOneLi: function (unreleaseOrderId) {
                        if (unreleaseCheckedOrderList.includes(unreleaseOrderId)) {
                            setUnreleaseCheckedOrderList(unreleaseCheckedOrderList.filter(r => r !== unreleaseOrderId));
                        } else {
                            setUnreleaseCheckedOrderList(unreleaseCheckedOrderList.concat(unreleaseOrderId));
                        }
                    },
                    getCheckedData: function () {
                        let dataList = [];

                        if (unreleasedData) {
                            unreleasedData.forEach(order => {
                                if (unreleaseCheckedOrderList.includes(order.deliveryReadyItem.id)) {
                                    dataList.push(order);
                                }
                            })
                        }
                        return dataList;
                    },
                    delete: async function (e, itemCid) {
                        e.stopPropagation();

                        if(window.confirm('정말 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteOrderData(itemCid);
                            setUnreleaseCheckedOrderList([]);
                        }
                    },
                    deleteList: async function (e) {
                        e.stopPropagation();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData().map(data => data.deliveryReadyItem);

                        if (checkedUnreleaseData.length > 0) {
                            if(window.confirm('선택 항목(' + checkedUnreleaseData.length +'개)을 모두 삭제하시겠습니까?')) {
                                await __handleDataConnect().deleteOrderListData(checkedUnreleaseData);
                                setUnreleaseCheckedOrderList([]);
                            }
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    },
                    unreleaseDataPagingHandler: function (e, value) {
                        setUnReleasedDataPagenate({
                            ...unreleasedDataPagenate,
                            currentPage : value
                        });
                    },
                    changeListToReleaseData: async function (e) {
                        e.stopPropagation();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData();
                        
                        if (checkedUnreleaseData.length > 0) {
                            if(window.confirm('선택 항목(' + checkedUnreleaseData.length +'개)을 모두 출고 처리 하시겠습니까?')) {
                                setBackdropLoading(true);
                                await __handleDataConnect().changeListToReleaseData(checkedUnreleaseData);
                                setUnreleaseCheckedOrderList([]);
                                setBackdropLoading(false);
                            }
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    }
                }
            },
            releaseCheckedOrderList: function () {
                return {
                    checkAll: function () {
                        if (this.isCheckedAll()) {
                            setReleaseCheckedOrderList([]);
                        } else if (releasedData) {
                            let releaseCheckedList = releasedData.map(r => r.deliveryReadyItem.id);
                            setReleaseCheckedOrderList(releaseCheckedList);
                        }
                    },
                    isCheckedAll: function () {
                        if (releasedData && releasedData.length) {
                            let releaseOrderIdList = releasedData.map(r => r.deliveryReadyItem.id).sort();
                            releaseCheckedOrderList.sort();

                            return JSON.stringify(releaseOrderIdList) === JSON.stringify(releaseCheckedOrderList);
                        } else return false;
                    },
                    isChecked: function (releaseOrderId) {
                        return releaseCheckedOrderList.includes(releaseOrderId);
                    },
                    checkOne: function (e, releaseOrderId) {
                        if (e.target.checked) {
                            setReleaseCheckedOrderList(releaseCheckedOrderList.concat(releaseOrderId));
                        } else {
                            setReleaseCheckedOrderList(releaseCheckedOrderList.filter(r => r !== releaseOrderId));
                        }
                    },
                    checkOneLi: function (releaseOrderId) {
                        if (releaseCheckedOrderList.includes(releaseOrderId)) {
                            setReleaseCheckedOrderList(releaseCheckedOrderList.filter(r => r !== releaseOrderId));
                        } else {
                            setReleaseCheckedOrderList(releaseCheckedOrderList.concat(releaseOrderId));
                        }
                    },
                    getCheckedData: function () {
                        let dataList = [];

                        if (releasedData) {
                            releasedData.forEach(order => {
                                if (releaseCheckedOrderList.includes(order.deliveryReadyItem.id)) {
                                    dataList.push(order);
                                }
                            })
                        }
                        return dataList;
                    },
                    changeToUnreleaseData: async function (e, deliveryReadyItem) {
                        e.stopPropagation();

                        if(deliveryReadyItem.releaseCompleted) {
                            alert('재고가 반영된 데이터는 출고를 취소할 수 없습니다.\n재고 반영 취소를 먼저 진행해 주세요.')
                            return;
                        }
                
                        if(window.confirm('출고를 취소하시겠습니까?')) {
                            await __handleDataConnect().changeToUnreleaseData(deliveryReadyItem);
                        }
                    },
                    changeListToUnreleaseData: async function (e) {
                        e.stopPropagation();

                        let checkedReleaseData = __handleEventControl().releaseCheckedOrderList().getCheckedData().map(data => data.deliveryReadyItem);

                        // 재고 반영된 데이터들만 추출
                        let reflectedUnitList = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => item.deliveryReadyItem.releaseCompleted);

                        if (checkedReleaseData.length > 0) {
                            if(reflectedUnitList.length > 0) {
                                alert('재고가 반영된 데이터들은 출고를 취소할 수 없습니다.\n재고 반영 취소를 먼저 진행해 주세요.')
                                return;
                            }

                            if(window.confirm('선택 항목(' + checkedReleaseData.length +'개)을 모두 출고 취소하시겠습니까?')) {
                                setBackdropLoading(true);
                                await __handleDataConnect().changeListToUnreleaseData(checkedReleaseData);
                                setBackdropLoading(false);
                            }
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    },
                    releaseDataPagingHandler: function (e, value) {
                        setReleasedDataPagenate({
                            ...releasedDataPagenate,
                            currentPage : value
                        })
                    },
                    reflectStockUnit: async function (e) {
                        e.preventDefault();

                        // 아직 재고 반영이 되지 않은 데이터들만 추출
                        let nonReflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => !item.deliveryReadyItem.releaseCompleted);
            
                        if(window.confirm('선택 항목(' + nonReflectedData.length +'개)의 수량을 재고에 반영하시겠습니까?')) {
                            if(!isObjectSubmitted.reflectedUnit){
                                setBackdropLoading(true);
                                setIsObjectSubmitted({
                                    ...isObjectSubmitted,
                                    reflectedUnit: true
                                });
                                await __handleDataConnect().reflectStockUnit(nonReflectedData, releaseCompletedMemo.releaseMemo);
                                setBackdropLoading(false);
                            }
                        }
                        __handleEventControl().deliveryReadyReleaseMemo().close();
                    },
                    cancelReflectedStockUnit: async function (e) {
                        e.preventDefault();

                        // 재고 반영된 데이터들만 추출
                        let reflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => item.deliveryReadyItem.releaseCompleted);

                        if(window.confirm('선택 항목(' + reflectedData.length +'개)에 반영된 재고수량을 취소하시겠습니까?')) {
                            if(!isObjectSubmitted.cancelReflectedUnit){
                                setBackdropLoading(true);
                                setIsObjectSubmitted({
                                    ...isObjectSubmitted,
                                    cancelReflectedUnit: true
                                });
                                await __handleDataConnect().cancelReflectedStockUnit(reflectedData, releaseCompletedCancelMemo.receiveMemo);
                                setBackdropLoading(false);
                            }
                        }
                        __handleEventControl().deliveryReadyReceiveMemo().close();
                    } 
                }
            },
            deliveryReadyReleaseMemo: function () {
                return {
                    open: function (e) {
                        e.stopPropagation();

                        // 아직 재고 반영이 되지 않은 데이터들만 추출
                        let nonReflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => !item.deliveryReadyItem.releaseCompleted);
                        let reflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => item.deliveryReadyItem.releaseCompleted);

                        if(reflectedData.length > 0) {
                            alert('선택 항목 중 이미 재고가 반영된 데이터(' + reflectedData.length +'개)가 존재합니다.');
                        } else if(nonReflectedData.length > 0) {
                            setDeliveryReadyReleaseMemoModalOpen(true);
                        } else if(releaseCheckedOrderList.length === 0) {
                            alert('선택된 데이터가 없습니다.');
                        }
                    },
                    close: function () {
                        setDeliveryReadyReleaseMemoModalOpen(false);
                        setReleaseCompletedMemo({
                            ...releaseCompletedMemo,
                            releaseMemo : ''
                        });
                    },
                    writeReleaseMemo: function (e) {
                        setReleaseCompletedMemo({
                            ...releaseCompletedMemo,
                            releaseMemo : e.target.value
                        });
                    }
                }
            },
            deliveryReadyReceiveMemo: function () {
                return {
                    open: function (e) {
                        e.stopPropagation();

                        // 재고 반영된 데이터들만 추출
                        let reflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => item.deliveryReadyItem.releaseCompleted);
                        let nonReflectedData = __handleEventControl().releaseCheckedOrderList().getCheckedData().filter(item => !item.deliveryReadyItem.releaseCompleted);

                        if(nonReflectedData.length > 0) {
                            alert('선택 항목 중 재고반영이 선행되지 않은 데이터(' + nonReflectedData.length +'개)가 존재합니다.');
                        } else if(reflectedData.length > 0) {
                            setDeliveryReadyReceiveMemoModalOpen(true);
                        } else if(releaseCheckedOrderList.length === 0) {
                            alert('선택된 데이터가 없습니다.');
                        }
                    },
                    close: function () {
                        setDeliveryReadyReceiveMemoModalOpen(false);
                        setReleaseCompletedCancelMemo({
                            ...releaseCompletedCancelMemo,
                            receiveMemo : ''
                        });
                    },
                    writeReceiveMemo: function (e) {
                        setReleaseCompletedCancelMemo({
                            ...releaseCompletedCancelMemo,
                            receiveMemo : e.target.value
                        });
                    }
                }
            },
            deliveryReadyDateRangePicker: function () {
                return {
                    open: function () {
                        setSelectionRange({...selectionRange,
                            startDate: exSelectionRange.startDate,
                            endDate: exSelectionRange.endDate
                        })
                        setDeliveryReadyDateRangePickerModalOpen(true);
                    },
                    close: function () {
                        setDeliveryReadyDateRangePickerModalOpen(false);
                    },
                    selectDateRange: async function (startDate, endDate) {
                        setExSelectionRange({...exSelectionRange,
                            startDate: selectionRange.startDate,
                            endDate: selectionRange.endDate
                        })
                        __handleDataConnect().getDeliveryReadyReleasedData(startDate, endDate);
                    },
                    changeReleasedData: function (date) {
                        setSelectionRange(date.selection);
                    }
                }
            },
            deliveryReadyOptionInfo: function () {
                return {
                    open: function (e, deliveryReadyItem) {
                        e.stopPropagation();

                        // 재고반영 시 옵션관리코드 변경하지 못하도록
                        if(deliveryReadyItem.releaseCompleted) {
                            alert('재고가 반영된 데이터들은 옵션관리코드를 변경할 수 없습니다.');
                        } else {
                            setChangedOptionManagementCode(null);
                            setDeliveryReadyOptionInfoModalOpen(true);
                            __handleEventControl().deliveryReadyOptionInfo().getOptionManagementCode(deliveryReadyItem)
                        }
                    },
                    close: function () {
                        setDeliveryReadyOptionInfoModalOpen(false);
                    },
                    changeOptionInfo: function () {
                        setDeliveryReadyOptionInfo()
                    },
                    getOptionManagementCode: async function (deliveryReadyItem) {
                        setDeliveryReadyItem(deliveryReadyItem);
                        setOriginOptionManagementCode(deliveryReadyItem.optionManagementCode);

                        await __handleDataConnect().getOptionManagementCode();
                    },
                    checkOneLi: function (optionCode) {
                        setChangedOptionManagementCode(optionCode);
                    },
                    isChecked: function (optionCode) {
                        return releaseCheckedOrderList.includes(optionCode);
                    },
                    changeItemOption: async function () {
                        await __handleDataConnect().changeItemOptionManagementCode(changedOptionManagementCode);
                    },
                    changeItemsOption: async function () {
                        if(window.confirm('일괄 변경하시겠습니까?')) {
                            setBackdropLoading(true);
                            await __handleDataConnect().changeItemsOptionManagementCode(changedOptionManagementCode);
                            setBackdropLoading(false);

                        }
                    }
                }
            },
            downloadOrderFormData: function () {
                return {
                    hansanFormDownload: async function (e) {
                        e.preventDefault();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData();
                        let checkedReleaseData = __handleEventControl().releaseCheckedOrderList().getCheckedData();

                        let downloadData = [
                            ...checkedReleaseData,
                            ...checkedUnreleaseData
                        ]

                        if(!storeInfoData.storeName || !storeInfoData.storeContact){
                            alert('스토어명과 스토어 전화번호를 모두 입력해 주세요.')
                            return;
                        };

                        if (downloadData.length > 0) {
                            setBackdropLoading(true);
                            await __handleDataConnect().downloadHansanOrderForm(downloadData, storeInfoData.storeName, storeInfoData.storeContact);
                            setBackdropLoading(false);

                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    },
                    tailoFormDownload: async function (e) {
                        e.preventDefault();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData();
                        let checkedReleaseData = __handleEventControl().releaseCheckedOrderList().getCheckedData();

                        let downloadData = [
                            ...checkedReleaseData,
                            ...checkedUnreleaseData
                        ]

                        if(!storeInfoData.storeName || !storeInfoData.storeContact){
                            alert('스토어명과 스토어 전화번호를 모두 입력해 주세요.')
                            return;
                        };

                        if (downloadData.length > 0) {
                            setBackdropLoading(true);
                            await __handleDataConnect().downloadTailoOrderForm(downloadData, storeInfoData.storeName, storeInfoData.storeContact);
                            setBackdropLoading(false);

                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    },
                    lotteFormDownload: async function (e) {
                        e.preventDefault();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData();
                        let checkedReleaseData = __handleEventControl().releaseCheckedOrderList().getCheckedData();

                        let downloadData = [
                            ...checkedReleaseData,
                            ...checkedUnreleaseData
                        ]

                        if(!storeInfoData.storeName || !storeInfoData.storeContact){
                            alert('스토어명과 스토어 전화번호를 모두 입력해 주세요.')
                            return;
                        };

                        for(var i = 0; i < downloadData.length; i++) {
                            if(downloadData[i].prodManagementName === null) {
                                alert('모든 상품의 옵션관리코드를 설정해주세요.')
                                return;
                            }
                        }

                        if (downloadData.length > 0) {
                            setBackdropLoading(true);
                            await __handleDataConnect().downloadLotteOrderForm(downloadData, storeInfoData.storeName, storeInfoData.storeContact);
                            setBackdropLoading(false);

                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    },
                    naverExcelDownload: async function (e) {
                        e.preventDefault();

                        let checkedUnreleaseData = __handleEventControl().unreleaseCheckedOrderList().getCheckedData();
                        let checkedReleaseData = __handleEventControl().releaseCheckedOrderList().getCheckedData();

                        let downloadData = [
                            ...checkedReleaseData,
                            ...checkedUnreleaseData
                        ]

                        if (downloadData.length > 0) {
                            setBackdropLoading(true);
                            await __handleDataConnect().downloadNaverExcelOrderForm(downloadData);
                            setBackdropLoading(false);

                            __handleDataConnect().getDeliveryReadyUnreleasedData();
                            __handleDataConnect().getDeliveryReadyReleasedData(selectionRange.startDate, selectionRange.endDate);
                        }
                        else {
                            alert("선택된 데이터가 없습니다.");
                        }
                    }
                }
            },
            storeInfo: function () {
                return {
                    modifyStoreNameOnChangeInputValue: function (e) {
                        setStoreInfoData({
                            ...storeInfoData,
                            storeName : e.target.value
                        });
                    },
                    modifyStoreContactOnChangeInputValue: function (e) {
                        setStoreInfoData({
                            ...storeInfoData,
                            storeContact : e.target.value
                        });
                    }
                }
            },
            movePage: function () {
                return {
                    deliveryReadyUpload: async function () {
                        props.history.replace('/delivery-ready/naver');
                    }
                }
            },
            sortDataList: function () {
                return {
                    unreleasedDataSortedByReceiver: function () {
                        let sortedData = unreleasedData.sort((a, b) => a.deliveryReadyItem.receiver.localeCompare(b.deliveryReadyItem.receiver));
                        setUnreleasedData([...unreleasedData], sortedData);
                    },
                    unreleasedDataSortedByProdName: function () {
                        let sortedData = unreleasedData.sort((a, b) => a.deliveryReadyItem.prodName.localeCompare(b.deliveryReadyItem.prodName));
                        setUnreleasedData([...unreleasedData], sortedData);
                    },
                    releasedDataSortedByReceiver: function () {
                        let sortedData = releasedData.sort((a, b) => a.deliveryReadyItem.receiver.localeCompare(b.deliveryReadyItem.receiver));
                        setReleasedData([...releasedData], sortedData);
                    },
                    releasedDataSortedByProdName: function () {
                        let sortedData = releasedData.sort((a, b) => a.deliveryReadyItem.prodName.localeCompare(b.deliveryReadyItem.prodName));
                        setReleasedData([...releasedData], sortedData);
                    }
                }
            },
            searchUnreleasedDataList: function () {
                return {
                    openSearchBarForReceiver: function (e) {
                        e.preventDefault();

                        if(receiverSearchBarData.isOpenForUnreleased) {
                            setReceiverSearchBarData({
                                ...receiverSearchBarData,
                                isOpenForUnreleased: false
                            });

                            dispatchSearchBarState({
                                type: 'CLEAR'
                            });
                        }
                        else{
                            setReceiverSearchBarData({
                                ...receiverSearchBarData,
                                isOpenForUnreleased: true
                            });
                        }
                    },
                    openSearchBarForStorageMemo: function (e) {
                        e.preventDefault();

                        if(storageSearchBarData.isOpenForUnreleased) {
                            setStorageSearchBarData({
                                ...storageSearchBarData,
                                isOpenForUnreleased: false
                            });

                            dispatchSearchBarState({
                                type: 'CLEAR'
                            });
                        }
                        else{
                            setStorageSearchBarData({
                                ...storageSearchBarData,
                                isOpenForUnreleased: true
                            });
                        }
                    },
                    onChangeInputValue: function (e) {
                        e.preventDefault();

                        dispatchSearchBarState({
                            type: 'SET_DATA',
                            payload: {
                                name: e.target.name,
                                value: e.target.value
                            }
                        });
                    },
                    searchForReceiver: function (e) {
                        e.preventDefault();

                        let searchedResultData = originUnreleasedData.filter(data => data.deliveryReadyItem.receiver.includes(searchBarState.searchedUnreleasedReceiverData));
                        setUnreleasedData(searchedResultData);
                        
                        let unreleasedDataLength = searchedResultData.length;
                        let pageNum = Math.ceil(unreleasedDataLength / POSTS_PER_PAGE);

                        setUnReleasedDataPagenate({
                            ...unreleasedDataPagenate,
                            totalPageNumber: pageNum
                        });
                    },
                    searchForStorage: function (e) {
                        e.preventDefault();

                        let searchedResultData = originUnreleasedData.filter(data => data.optionMemo?.includes(searchBarState.searchedUnreleasedStorageData));
                        setUnreleasedData(searchedResultData);
                        
                        let unreleasedDataLength = searchedResultData.length;
                        let pageNum = Math.ceil(unreleasedDataLength / POSTS_PER_PAGE);

                        setUnReleasedDataPagenate({
                            ...unreleasedDataPagenate,
                            totalPageNumber: pageNum
                        });
                    }
                }
            },
            searchReleasedDataList: function () {
                return {
                    openSearchBarForReceiver: function (e) {
                        e.preventDefault();

                        if(receiverSearchBarData.isOpenForReleased) {
                            setReceiverSearchBarData({
                                ...receiverSearchBarData,
                                isOpenForReleased: false
                            });

                            dispatchSearchBarState({
                                type: 'CLEAR'
                            });
                        }
                        else{
                            setReceiverSearchBarData({
                                ...receiverSearchBarData,
                                isOpenForReleased: true
                            });
                        }
                    },
                    openSearchBarForStorageMemo: function (e) {
                        e.preventDefault();

                        if(storageSearchBarData.isOpenForReleased) {
                            setStorageSearchBarData({
                                ...storageSearchBarData,
                                isOpenForReleased: false
                            });

                            dispatchSearchBarState({
                                type: 'CLEAR'
                            });
                        }
                        else{
                            setStorageSearchBarData({
                                ...storageSearchBarData,
                                isOpenForReleased: true
                            });
                        }
                    },
                    onChangeInputValue: function (e) {
                        e.preventDefault();

                        dispatchSearchBarState({
                            type: 'SET_DATA',
                            payload: {
                                name: e.target.name,
                                value: e.target.value
                            }
                        });
                    },
                    searchForReceiver: function (e) {
                        e.preventDefault();

                        let searchedResultData = originReleasedData.filter(data => data.deliveryReadyItem.receiver.includes(searchBarState.searchedReleasedReceiverData));
                        setReleasedData(searchedResultData);
                        
                        let releasedDataLength = searchedResultData.length;
                        let pageNum = Math.ceil(releasedDataLength / POSTS_PER_PAGE);

                        setReleasedDataPagenate({
                            ...releasedDataPagenate,
                            totalPageNumber: pageNum
                        });
                    },
                    searchForStorage: function (e) {
                        e.preventDefault();

                        let searchedResultData = originReleasedData.filter(data => data.optionMemo?.includes(searchBarState.searchedReleasedStorageData));
                        setReleasedData(searchedResultData);
                        
                        let releasedDataLength = searchedResultData.length;
                        let pageNum = Math.ceil(releasedDataLength / POSTS_PER_PAGE);

                        setReleasedDataPagenate({
                            ...releasedDataPagenate,
                            totalPageNumber: pageNum
                        });

                    },
                    controlReflectedData: function (e) {
                        e.preventDefault();

                        // 0:전체, 1:반영O, 2:반영X
                        let refelctedData = null;
                        if(releasedDataReflectedState.controlValue === 0) {
                            dispatchReleasedDataReflectedState({
                                type: 'REFLECTED'
                            });
                            refelctedData = originReleasedData.filter(data => data.deliveryReadyItem.releaseCompleted === true);
                        } else if(releasedDataReflectedState.controlValue == 1) {
                            dispatchReleasedDataReflectedState({
                                type: 'NOT_REFLECTED'
                            });
                            refelctedData = originReleasedData.filter(data => data.deliveryReadyItem.releaseCompleted === false);
                        } else{
                            dispatchReleasedDataReflectedState({
                                type: 'INIT_DATA'
                            });
                            refelctedData = originReleasedData;
                        }

                        setReleasedData(refelctedData);
                        
                        let releasedDataLength = refelctedData.length;
                        let pageNum = Math.ceil(releasedDataLength / POSTS_PER_PAGE);

                        setReleasedDataPagenate({
                            ...releasedDataPagenate,
                            totalPageNumber: pageNum
                        });
                    }
                }
            }
        }
    }

    return (
        <>
            <DeliveryReadyDateRangePickerModal
                open={deliveryReadyDateRangePickerModalOpen}
                releasedData={releasedData}
                selectionRange={selectionRange}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyDateRangePickerModal>

            <DeliveryReadyOptionInfoModal
                open={deliveryReadyOptionInfoModalOpen}
                deliveryReadyItem={deliveryReadyItem}
                originOptionManagementCode={originOptionManagementCode}
                changedOptionManagementCode={changedOptionManagementCode}
                deliveryReadyOptionInfo={deliveryReadyOptionInfo}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyOptionInfoModal>

            <DeliveryReadyReleaseMemoModal
                open={deliveryReadyReleaseMemoModalOpen}
                releaseCompletedMemo={releaseCompletedMemo}
                isObjectSubmitted={isObjectSubmitted}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyReleaseMemoModal>
            
            <DeliveryReadyReceiveMemoModal
                open={deliveryReadyReceiveMemoModalOpen}
                releaseCompletedMemo={releaseCompletedCancelMemo}
                isObjectSubmitted={isObjectSubmitted}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyReceiveMemoModal>

           <BackdropLoading open={backdropLoading} />
           <DrawerNavbarMain></DrawerNavbarMain>

            <DeliveryReadyViewNaverBar
                storeInfoData={storeInfoData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyViewNaverBar>
            <DeliveryReadyUnreleasedViewNaverBody
                unreleasedData={unreleasedData}
                unreleaseCheckedOrderList={unreleaseCheckedOrderList}
                unreleasedDataPagenate={unreleasedDataPagenate}
                receiverSearchBarData={receiverSearchBarData}
                storageSearchBarData={storageSearchBarData}
                searchBarState={searchBarState}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUnreleasedViewNaverBody>
            <DeliveryReadyReleasedViewNaverBody
                releasedData={releasedData}
                releaseCheckedOrderList={releaseCheckedOrderList}
                selectedDateText={selectedDateText}
                releasedDataPagenate={releasedDataPagenate}
                receiverSearchBarData={receiverSearchBarData}
                storageSearchBarData={storageSearchBarData}
                searchBarState={searchBarState}
                releasedDataReflectedState={releasedDataReflectedState}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyReleasedViewNaverBody>
        </>
    )
}

export default withRouter(DeliveryReadyViewNaverMain);