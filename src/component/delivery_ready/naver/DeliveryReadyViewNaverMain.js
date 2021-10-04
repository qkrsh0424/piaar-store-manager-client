import {useState, useEffect} from 'react';
import { useHistory } from 'react-router';

// handler
import { getStartDate, getEndDate, dateToYYYYMMDDhhmmss, dateToYYMMDD } from '../../../handler/dateHandler';

// data connect
import { deliveryReadyDataConnect } from '../../../data_connect/deliveryReadyDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import DeliveryReadyDateRangePickerModal from '../modal/DeliveryReadyDateRangePickerModal';
import DeliveryReadyOptionInfoModal from '../modal/DeliveryReadyOptionInfoModal';
import BackdropLoading from '../../loading/BackdropLoading';
import DeliveryReadyViewNaverBar from './DeliveryReadyViewNaverBar';
import DeliveryReadyUnreleasedViewNaverBody from './DeliveryReadyUnreleasedViewNaverBody';
import DeliveryReadyReleasedViewNaverBody from './DeliveryReadyReleasedViewNaverBody';

const DeliveryReadyViewMain = () => {
    const [unreleasedData, setUnreleasedData] = useState(null);
    const [releasedData, setReleasedData] = useState(null);
    const [unreleaseCheckedOrderList, setUnreleaseCheckedOrderList] = useState([]);
    const [releaseCheckedOrderList, setReleaseCheckedOrderList] = useState([]);
    const [backdropLoading, setBackdropLoading] = useState(false);
    
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
    
    const [storeInfoData, setStoreInfoData] = useState({
        storeName: '',
        storeContact: ''
    });

    const [releaseDataCurrentPage, setReleaseDataCurrentPage] = useState(1);
    const [unreleaseDataCurrentPage, setUnreleaseDataCurrentPage] = useState(1);
    const releaseDataTotalPageNumber = [];
    const unreleaseDataTotalPageNumber = [];
    const postsPerPage = 50;
    
    const releasedDataLength = releasedData != null ? releasedData.length : 0;
    for(let i = 1; i <= Math.ceil(releasedDataLength / postsPerPage); i++){
        releaseDataTotalPageNumber.push(i);
    }

    const unreleasedDataLength = unreleasedData != null ? unreleasedData.length : 0; 
    for(let i = 1; i <= Math.ceil(unreleasedDataLength / postsPerPage); i++){
        unreleaseDataTotalPageNumber.push(i);
    }

    let history = useHistory();

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
                await deliveryReadyDataConnect().getUnreleasedData()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setUnreleasedData(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            getDeliveryReadyReleasedData: async function (start, end) {
                var date1 = new Date(start);
                date1 = getStartDate(date1);
                date1 = dateToYYYYMMDDhhmmss(date1);

                var date2 = new Date(end);
                date2 = getEndDate(date2);
                date2 = dateToYYYYMMDDhhmmss(date2);

                setReleaseCheckedOrderList([]);

                await deliveryReadyDataConnect().getSelectedReleasedData(date1, date2)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setReleasedData(res.data.data);
                        }
                        setSelectedDateText(dateToYYMMDD(date1) + " ~ " + dateToYYMMDD(date2));
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })

                setDeliveryReadyDateRangePickerModalOpen(false);
            },
            deleteOrderData: async function (itemCid) {
                await deliveryReadyDataConnect().deleteUnreleasedData(itemCid)
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
            changeToUnreleaseData: async function (deliveryReadyItem) {
                await deliveryReadyDataConnect().updateReleasedData(deliveryReadyItem)
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
                await deliveryReadyDataConnect().searchOptionInfo()
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
                await deliveryReadyDataConnect().updateOptionInfo(deliveryReadyItem, optionCode)
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
                await deliveryReadyDataConnect().updateAllOptionInfo(deliveryReadyItem, optionCode)
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

                await deliveryReadyDataConnect().downloadHansanOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDD(new Date());

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

                await deliveryReadyDataConnect().downloadTailoOrderForm(data)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDD(new Date());

                        link.setAttribute('download', '[' + date + ']테일로 발주서양식_네이버.xlsx');
                        document.body.appendChild(link);
                        link.click();

                        setUnreleaseCheckedOrderList([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
                    unreleaseDataPagingHandler: function (e, value) {
                        setUnreleaseDataCurrentPage(value);
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

                        if(window.confirm('출고를 취소하시겠습니까?')) {
                            await __handleDataConnect().changeToUnreleaseData(deliveryReadyItem);
                        }
                    },
                    releaseDataPagingHandler: function (e, value) {
                        setReleaseDataCurrentPage(value);
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

                        setChangedOptionManagementCode(null);
                        setDeliveryReadyOptionInfoModalOpen(true);
                        __handleEventControl().deliveryReadyOptionInfo().getOptionManagementCode(deliveryReadyItem)
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
                            alert("no checked order data");
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
                            alert("no checked order data");
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
                        history.push('/delivery-ready/naver');
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

           <BackdropLoading open={backdropLoading} />
           <DrawerNavbarMain></DrawerNavbarMain>

            <DeliveryReadyViewNaverBar
                storeInfoData={storeInfoData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyViewNaverBar>
            <DeliveryReadyUnreleasedViewNaverBody
                unreleasedData={unreleasedData}
                unreleaseCheckedOrderList={unreleaseCheckedOrderList}
                unreleaseDataCurrentPage={unreleaseDataCurrentPage}
                unreleaseDataTotalPageNumber={unreleaseDataTotalPageNumber}
                postsPerPage={postsPerPage}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUnreleasedViewNaverBody>
            <DeliveryReadyReleasedViewNaverBody
                releasedData={releasedData}
                releaseCheckedOrderList={releaseCheckedOrderList}
                selectedDateText={selectedDateText}
                releaseDataCurrentPage={releaseDataCurrentPage}
                releaseDataTotalPageNumber={releaseDataTotalPageNumber}
                postsPerPage={postsPerPage}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyReleasedViewNaverBody>
        </>
    )
}

export default DeliveryReadyViewMain;