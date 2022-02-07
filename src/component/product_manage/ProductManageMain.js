import { useEffect, useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// handler
import { getStartDate, getEndDate, dateToYYMMDD, dateToYYMMDDhhmmss } from '../../handler/dateHandler';

// data connect
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { productReleaseDataConnect } from '../../data_connect/productReleaseDataConnect';
import { productReceiveDataConnect } from '../../data_connect/productReceiveDataConnect';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import ProductManageBody from './ProductManageBody';
import ProductManageNav from './ProductManageNav';
import ProductModifyModal from './modal/ProductModifyModal';
import ProductOptionModifyModal from './modal/ProductOptionModifyModal';
import ProductOptionAddModal from './modal/ProductOptionAddModal';
import ReleaseAddModal from './modal/ReleaseAddModal';
import ReleaseStatusModal from './modal/ReleaseStatusModal';
import ReceiveAddModal from './modal/ReceiveAddModal';
import ReceiveStatusModal from './modal/ReceiveStatusModal';
import StockStatusModal from './modal/StockStatusModal';
import BackdropLoading from '../loading/BackdropLoading';
import { formControlClasses } from '@mui/material';
import { data } from 'jquery';
import { subMilliseconds } from 'date-fns';
import ReceiveAndReleaseStatusModal from './modal/ReceiveAndReleaseStatusModal';
import ModifyStatusMemoModal from './modal/ModifyStatusMemoModal';
import ReceiveAndReleaseDateRangePickerModal from './modal/ReceiveAndReleaseDateRangePickerModal';

class ProductOption {
    constructor(productId, optionDefaultName = '', optionManagementName = '', nosUniqueCode = '') {
        this.id = uuidv4();
        this.code = ''
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.nosUniqueCode = nosUniqueCode;
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unitCny = '';
        this.unitKrw = '';
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            nosUniqueCode: this.nosUniqueCode,
            salesPrice: this.salesPrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.Krw,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

class ProductRelease {
    constructor(productCid) {
        this.id = uuidv4();
        this.releaseUnit = 0;
        this.memo = '';
        this.productOptionCid = productCid;
    }

    toJSON() {
        return {
            id: this.id,
            releaseUnit: this.releaseUnit,
            memo: this.memo,
            productOptionCid: this.productOptionCid
        }
    }
}

class ProductReceive {
    constructor(productCid) {
        this.id = uuidv4();
        this.receiveUnit = 0;
        this.memo = '';
        this.productOptionCid = productCid;
    }

    toJSON() {
        return {
            id: this.id,
            receiveUnit: this.receiveUnit,
            memo: this.memo,
            productOptionCid: this.productOptionCid
        }
    }
}

const initialStockStatusState = null;

const stockStatusStateReducer = (state, action) => {
    switch (action.type) {
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

const ProductManageMain = () => {
    const [productListData, setProductListData] = useState(null);
    const [optionListData, setOptionListData] = useState(null);
    const [categoryListData, setCategoryListData] = useState(null);

    const [checkedOptionList, setCheckedOptionList] = useState([]);

    const [productModifyModalOpen, setProductModifyModalOpen] = useState(false);
    const [productModifyData, setProductModifyData] = useState(null);

    const [productOptionModifyModalOpen, setProductOptionModifyModalOpen] = useState(false);
    const [productOptionModifyData, setProductOptionModifyData] = useState(null);

    const [productOptionAddModalOpen, setProductOptionAddModalOpen] = useState(false);
    const [productOptionAddData, setProductOptionAddData] = useState(null);

    const [releaseAddModalOpen, setReleaseAddModalOpen] = useState(false);
    const [releaseAddData, setReleaseAddData] = useState(null);
    const [releaseAddMemo, setReleaseAddMemo] = useState('');

    const [releaseStatusModalOpen, setReleaseStatusModalOpen] = useState(false);
    const [releaseStatusData, setReleaseStatusData] = useState(null);

    const [receiveAddModalOpen, setReceiveAddModalOpen] = useState(false);
    const [receiveAddData, setReceiveAddData] = useState(null);
    const [receiveAddMemo, setReceiveAddMemo] = useState('');

    const [receiveStatusModalOpen, setReceiveStatusModalOpen] = useState(false);
    const [receiveStatusData, setReceiveStatusData] = useState(null);

    const [modifyStatusMemoModalOpen, setModifyStatusMemoModalOpen] = useState(false);

    const [stockStatusModalOpen, setStockStatusModalOpen] = useState(false);
    const [stockStatusData, setStockStatusData] = useState(null);

    const [stockStatusState, dispatchStockStatusState] = useReducer(stockStatusStateReducer, initialStockStatusState);

    const [receiveAndReleaseStatusModalOpen, setReceiveAndReleaseStatusModalOpen] = useState(false);
    const [optionReceiveStatusData, setOptionReceiveStatusData] = useState(null);
    const [optionReleaseStatusData, setOptionReleaseStatusData] = useState(null);

    const [backdropLoading, setBackdropLoading] = useState(false);

    const [isObjectSubmitted, setIsObjectSubmitted] = useState({
        optionAdd: false,
        releaseAdd: false,
        receiveAdd: false
    })

    const [selectedDateText, setSelectedDateText] = useState("날짜 선택");
    const [receiveAndReleaseDateRangePickerMdoalOpen, setReceiveAndReleaseDateRangePickerMdoalOpen] = useState(false);

    // date picker
    const [selectionRange, setSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );

    const [selectedOptionReceiveStatusData, setSelectedOptionReceiveStatusData] = useState([]);
    const [selectedOptionReleaseStatusData, setSelectedOptionReleaseStatusData] = useState([]);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchProductListFj();
            __handleDataConnect().searchOptionList();
            __handleDataConnect().searchCategoryList();
        }

        fetchInit();
    }, [])

    const __handleDataConnect = () => {
        return {
            searchProductListFj: async function () {
                __handleEventControl().backdropLoading().open();
                await productDataConnect().getStockListFj()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setProductListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductListFj');
                    });
                __handleEventControl().backdropLoading().close();
            },
            searchOptionList: async function () {
                await productOptionDataConnect().getList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setOptionListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchOptionList');
                    })
            },
            searchCategoryList: async function () {
                await productCategoryDataConnect().searchList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setCategoryListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchCategoryList');
                    })
            },
            searchReceiveStatusList: async function (productOptionCid) {
                await productReceiveDataConnect().searchList(productOptionCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setReceiveStatusData(res.data.data);
                        }
                    })
                    .catch(err=>{
                        alert('undefined error.');
                    })
            },
            searchReleaseStatusList: async function (productOptionCid) {
                await productReleaseDataConnect().searchList(productOptionCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setReleaseStatusData(res.data.data);
                        }
                    })
                    .catch(err=>{
                        alert('undefined error.')
                    })
            },
            searchStockStatusList: async function (productOptionCid) {
                await productOptionDataConnect().searchStockStatus(productOptionCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            __handleEventControl().productOption().setStockStatusList(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error.')
                    })
            },
            searchAllStockStatusList: async function () {
                await productOptionDataConnect().searchAllStockStatus()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            __handleEventControl().receiveAndRelease().setAllStockStatusList(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error.')
                    })
            },
            changeProductOne: async function () {
                await productDataConnect().putOne(productModifyData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('정상적으로 수정되었습니다.')
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
            },
            changeProductOptionOne: async function () {
                await productOptionDataConnect().putOne(productOptionModifyData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('정상적으로 수정되었습니다.')
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else if(res?.data?.memo) {
                            alert(res.data.memo);
                        }else{
                            alert('undefined error. : changeProductOptionOne');
                        }
                    })
            },
            deleteProductOne: async function (productCid) {
                await productDataConnect().deleteOne(productCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('상품이 정상적으로 삭제되었습니다.')
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        
                        if (res.status === 403) {
                            alert('권한이 없습니다.')
                        } else {
                            alert('undefined error. : deleteProductOne');
                        }
                    })
            },
            deleteProductOptionOne: async function (optionCid) {
                await productOptionDataConnect().deleteOne(optionCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('해당 옵션이 정상적으로 삭제되었습니다.')
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 403) {
                            alert('권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
            },
            createProductOptionOne: async function () {
                await productOptionDataConnect().postOne(productOptionAddData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('해당 옵션이 정상적으로 추가되었습니다.');
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                optionAdd : false
                            });
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else if(res?.data?.memo) {
                            alert(res.data.memo)
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
                    ;
            },
            createProductReleaseList: async function (data) {
                await productReleaseDataConnect().postList(data)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('출고등록 되었습니다.');
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                releaseAdd: false
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
                    ;
            },
            createProductReceiveList: async function (data) {
                await productReceiveDataConnect().postList(data)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('입고등록 되었습니다.');
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                receiveAdd: false
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
                    ;
            },
            postUploadImageFileToCloud: async function(e) {
                await productDataConnect().postUploadImageFileToCloud(e)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleEventControl().product().uploadImageInfo(res.data.data[0]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : uploadFilesToCloud');
                    })
            },
            postModifyOptionImageFileToCloud: async function(e) {
                await productDataConnect().postUploadImageFileToCloud(e)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleEventControl().productOption().modifyImageInfo(res.data.data[0]);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else {
                            console.log(err);
                            alert('undefined error. : uploadFilesToCloud');
                        }

                        __handleEventControl().backdropLoading().close();
                    })
            },
            postUploadOptionImageFileToCloud: async function(e) {
                await productDataConnect().postUploadImageFileToCloud(e)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleEventControl().productOption().uploadImageInfo(res.data.data[0]);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else {
                            console.log(err);
                            alert('undefined error. : uploadFilesToCloud');
                        }

                        __handleEventControl().backdropLoading().close();
                    })
            },
            changeReceiveStockStatusMemo: async function (data) {
                await productReceiveDataConnect().putOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            this.searchStockStatusList(data.productOptionCid);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else {
                            console.log(err);
                            alert('undefined error. : changeStockStatusMemo');
                        }
                    })
            },
            changeReleaseStockStatusMemo: async function (data) {
                await productReleaseDataConnect().putOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            this.searchStockStatusList(data.productOptionCid);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else {
                            console.log(err);
                            alert('undefined error. : changeStockStatusMemo');
                        }
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            product: function () {
                return {
                    getSelectedModifyData: function (productId) {
                        return productListData.filter(r => r.product.id === productId)[0].product;
                    },
                    deleteOne: async function (productId) {
                        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
                            let product = productListData.filter(r => r.product.id === productId)[0].product;

                            await __handleDataConnect().deleteProductOne(product.cid);
                            await __handleDataConnect().searchProductListFj();
                        }
                    },
                    modifyModalOpen: function (productId) {
                        setProductModifyData(this.getSelectedModifyData(productId));
                        setProductModifyModalOpen(true);
                    },
                    modifyModalClose: function () {
                        setProductModifyData(null);
                        setProductModifyModalOpen(false);
                    },
                    modifyDataOnChangeCategoryValue: function (categoryCid) {
                        setProductModifyData({ ...productModifyData, productCategoryCid: categoryCid });
                    },
                    modifyDataOnChangeInputValue: function (e) {
                        setProductModifyData({
                            ...productModifyData,
                            [e.target.name]: e.target.value
                        });
                    },
                    submitModifyData: async function (e) {
                        e.preventDefault();
                        if (this.checkRequiredData()) {
                            await __handleDataConnect().changeProductOne();
                            this.modifyModalClose();
                            await __handleDataConnect().searchProductListFj();
                        } else {
                            return;
                        }

                    },
                    checkRequiredData: function () {
                        if (productModifyData.productCategoryCid == null || productModifyData.productCategoryCid == undefined || productModifyData.productCategoryCid == '' || productModifyData.productCategoryCid == 0) {
                            alert('카테고리 선택은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.defaultName == null || productModifyData.defaultName == undefined || productModifyData.defaultName == '') {
                            alert('상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.managementName == null || productModifyData.managementName == undefined || productModifyData.managementName == '') {
                            alert('관리상품명은 필수항목입니다.');
                            return false;
                        }

                        return true;
                    },
                    postUploadImageFile: async function (e) {
                        e.preventDefault();

                        __handleEventControl().backdropLoading().open();
                        
                        // 파일을 선택하지 않은 경우
                        if(e.target.files.length == 0) return;

                        await __handleDataConnect().postUploadImageFileToCloud(e);
                    },
                    uploadImageInfo: function (data) {
                        setProductModifyData({...productModifyData, imageFileName: data.fileName, imageUrl: data.fileUploadUri});
                        __handleEventControl().backdropLoading().close();
                    },
                    deleteImageFile: function () {
                        setProductModifyData({...productModifyData, imageFileName: '', imageUrl: ''});
                    },
                    onClickImageButton: function () {
                        document.getElementById("image-file-upload").click();
                    },
                    stockManagementCheck: function () {
                        let stockManagement = productModifyData.stockManagement ? false : true;

                        setProductModifyData({...productModifyData, stockManagement : stockManagement});
                    }
                }
            },
            productOption: function () {
                return {
                    addModalOpen: function (productId) {
                        let product = productListData.filter(r => r.product.id === productId)[0];
                        let option = new ProductOption(productId);
                        option.productCid = product.product.cid;

                        setProductOptionAddData(option);
                        setProductOptionAddModalOpen(true);
                    },
                    addModalClose: function () {
                        setProductOptionAddData(null);
                        setProductOptionAddModalOpen(false);
                    },
                    addDataOnChangeInputValue: function (e) {
                        setProductOptionAddData({
                            ...productOptionAddData,
                            [e.target.name]: e.target.value
                        })
                    },
                    submitAddData: async function (e) {
                        e.preventDefault();

                        if (this.checkRequiredAddData() && !isObjectSubmitted.optionAdd) {
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                optionAdd : true
                            });
                            await __handleDataConnect().createProductOptionOne();
                            this.addModalClose();
                            await __handleDataConnect().searchProductListFj();
                        } else {
                            return;
                        }
                    },
                    checkRequiredAddData: function () {
                        if (productOptionAddData.defaultName == null || productOptionAddData.defaultName == undefined || productOptionAddData.defaultName == '') {
                            alert('상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productOptionAddData.managementName == null || productOptionAddData.managementName == undefined || productOptionAddData.managementName == '') {
                            alert('관리상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productOptionAddData.code == null || productOptionAddData.code == undefined || productOptionAddData.code == '') {
                            alert('관리코드는 필수항목입니다.');
                            return false;
                        }
                        return true;
                    },
                    modifyModalOpen: function (e, productId, optionId) {
                        e.stopPropagation();
                        let product = productListData.filter(r => r.product.id === productId)[0];
                        let option = product.options.filter(r => r.id === optionId)[0];

                        setProductOptionModifyData(option);
                        setProductOptionModifyModalOpen(true);
                    },
                    modifyModalClose: function () {
                        setProductOptionModifyData(null);
                        setProductOptionModifyModalOpen(false);
                    },
                    modifyDataOnChangeInputValue: function (e) {
                        setProductOptionModifyData({
                            ...productOptionModifyData,
                            [e.target.name]: e.target.value
                        })
                    },
                    submitModifyData: async function (e) {
                        e.preventDefault();
                        if (this.checkRequiredData()) {
                            await __handleDataConnect().changeProductOptionOne();
                            this.modifyModalClose();
                            await __handleDataConnect().searchProductListFj();
                        } else {
                            return;
                        }

                    },
                    checkRequiredData: function () {
                        if (productOptionModifyData.defaultName == null || productOptionModifyData.defaultName == undefined || productOptionModifyData.defaultName == '') {
                            alert('상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productOptionModifyData.managementName == null || productOptionModifyData.managementName == undefined || productOptionModifyData.managementName == '') {
                            alert('관리상품명은 필수항목입니다.');
                            return false;
                        }
                        if (productOptionModifyData.code == null || productOptionModifyData.code == undefined || productOptionModifyData.code == '') {
                            alert('관리코드는 필수항목입니다.');
                            return false;
                        }

                        return true;
                    },
                    modifyDataAdd: function () {
                        setProductModifyData({
                            ...productModifyData,
                            options: productModifyData.options.concat(new ProductOption(productModifyData.product.id).toJSON())
                        });
                    },
                    modifyDataDelete: function (optionId) {
                        setProductModifyData({
                            ...productModifyData,
                            options: productModifyData.options.filter(option => option.id !== optionId)
                        })
                    },
                    deleteOne: async function (e, productId, productOptionId) {
                        e.stopPropagation();
                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                            let product = productListData.filter(r => r.product.id === productId)[0];
                            let option = product.options.filter(r => r.id === productOptionId)[0];
                            let optionCid = option.cid;

                            await __handleDataConnect().deleteProductOptionOne(optionCid);
                            await __handleDataConnect().searchProductListFj();
                        }

                    },
                    postModifyImageFile: async function (e) {
                        e.preventDefault();

                        // 파일을 선택하지 않은 경우
                        if (e.target.files.length == 0) return;

                        __handleEventControl().backdropLoading().open();
                        
                        await __handleDataConnect().postModifyOptionImageFileToCloud(e);
                    },
                    postUploadImageFile: async function (e) {
                        e.preventDefault();

                        // 파일을 선택하지 않은 경우
                        if (e.target.files.length == 0) return;

                        __handleEventControl().backdropLoading().open();
                        
                        await __handleDataConnect().postUploadOptionImageFileToCloud(e);
                    },
                    modifyImageInfo: function (data) {
                        setProductOptionModifyData({
                            ...productOptionModifyData,
                            imageFileName: data.fileName,
                            imageUrl: data.fileUploadUri
                        })
                        __handleEventControl().backdropLoading().close();
                    },
                    uploadImageInfo: function (data) {
                        setProductOptionAddData({
                            ...productOptionAddData,
                            imageFileName: data.fileName,
                            imageUrl: data.fileUploadUri
                        })
                        __handleEventControl().backdropLoading().close();
                    },
                    deleteModifyImageFile: function () {
                        setProductOptionModifyData({
                            ...productOptionModifyData,
                            imageFileName: '',
                            imageUrl: ''
                        })
                    },
                    deleteImageFile: function () {
                        setProductOptionAddData({
                            ...productOptionAddData,
                            imageFileName: '',
                            imageUrl: ''
                        })
                    },
                    onClickImageButton: function (optionId) {
                        document.getElementById("i_pm_pom_uploader_" + optionId).click();
                    },
                    stockStatusModalOpen: async function (e, productId, optionId) {
                        e.stopPropagation();
                        let product = productListData.filter(r => r.product.id === productId)[0];
                        let option = product.options.filter(r => r.id === optionId)[0];
                        let optionCid = option.cid;

                        await __handleDataConnect().searchStockStatusList(optionCid);

                        setStockStatusModalOpen(true);
                    },
                    stockStatusModalClose: function () {
                        setStockStatusModalOpen(false);
                    },
                    setStockStatusList: function (data) {
                        // 입출고 데이터를 포함하는 배열 생성
                        let sortedByDate = [...data.productRelease, ...data.productReceive];

                        // 날짜 오름차순으로 정렬 - 재고 현황을 위해
                        sortedByDate.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

                        // 재고현황 기록
                        let sum = 0;
                        sortedByDate = sortedByDate.map(r => {
                            if (r.receiveUnit) {
                                sum += r.receiveUnit;
                                return {
                                    ...r,
                                    currentStock: sum
                                }
                            } else {
                                sum -= r.releaseUnit;
                                return {
                                    ...r,
                                    currentStock: sum
                                }
                            }
                        });

                        // 화면에는 최신 데이터부터 보여주도록 함.
                        sortedByDate.reverse();

                        setStockStatusData(sortedByDate);
                    }
                }
            },
            checkedOptionList: function () {
                return {
                    checkOneTr: function(optionId){
                        if(checkedOptionList.includes(optionId)){
                            setCheckedOptionList(checkedOptionList.filter(r => r !== optionId));
                            
                        }else{
                            setCheckedOptionList(checkedOptionList.concat(optionId));
                        }
                    },
                    checkOne: function (e, optionId) {
                        if (e.target.checked) {
                            setCheckedOptionList(checkedOptionList.concat(optionId))
                        } else {
                            setCheckedOptionList(checkedOptionList.filter(r => r !== optionId));
                        }
                    },
                    checkAll: function () {
                        if (this.isCheckedAll()) {
                            setCheckedOptionList([])
                        } else {
                            let optionIdList = optionListData.map(r => r.id);
                            setCheckedOptionList(optionIdList);
                        }
                    },
                    isCheckedAll: function () {
                        let optionIdList = optionListData.map(r => r.id).sort();
                        checkedOptionList.sort();
                        return JSON.stringify(optionIdList) === JSON.stringify(checkedOptionList);
                    },
                    isChecked: function (optionId) {
                        return checkedOptionList.includes(optionId);
                    },
                    getCheckedData: function () {
                        let dataList = []
                        productListData.forEach(product => {
                            product.options.forEach(option => {
                                if (checkedOptionList.includes(option.id)) {
                                    let json = {
                                        product: product.product,
                                        option: option,
                                        productRelease: new ProductRelease(option.cid).toJSON()
                                    }
                                    dataList.push(json);
                                }
                            })
                        })
                        return dataList;
                    }
                }
            },
            release: function () {
                return {
                    getAddData: function () {
                        let dataList = []
                        productListData.forEach(product => {
                            product.options.forEach(option => {
                                if (checkedOptionList.includes(option.id)) {
                                    let json = {
                                        product: product.product,
                                        option: option,
                                        productRelease: new ProductRelease(option.cid).toJSON()
                                    }
                                    dataList.push(json);
                                }
                            })
                        })
                        return dataList;
                    },
                    addModalOpen: function () {
                        let releaseAddData = this.getAddData();
                        if (releaseAddData.length < 1) {
                            return;
                        }
                        setReleaseAddModalOpen(true);
                        setReleaseAddData(releaseAddData);
                    },
                    addModalClose: function () {
                        setReleaseAddModalOpen(false);
                        setReleaseAddData(null);
                        setReleaseAddMemo('');
                    },
                    addDataOnChangeInputValue: function (e, releaseAddDataId) {
                        setReleaseAddData(releaseAddData.map(data => {
                            if (data.productRelease.id === releaseAddDataId) {

                                return {
                                    ...data,
                                    productRelease: {
                                        ...data.productRelease,
                                        [e.target.name]: e.target.value
                                    }
                                }
                            } else {
                                return data;
                            }
                        }))
                    },
                    submitAddData: async function (e) {
                        e.preventDefault();

                        let releaseJsonList = []
                        releaseAddData.forEach(data => {
                            if (data.productRelease.releaseUnit < 1) {
                                return;
                            } else {
                                releaseJsonList.push(
                                    {
                                        ...data.productRelease,
                                        memo: releaseAddMemo
                                    }
                                )
                            }
                        });
                        if(!isObjectSubmitted.releaseAdd){
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                releaseAdd: true
                            })
                            await __handleDataConnect().createProductReleaseList(releaseJsonList);
                            this.addModalClose();
                            await __handleDataConnect().searchProductListFj();
                        }


                    },
                    checkRequiredAddData: function (releaseDataList) {
                        for (let i = 0; i < releaseDataList.length; i++) {
                            if (
                                releaseDataList[i].releaseUnit == null ||
                                releaseDataList[i].releaseUnit == undefined ||
                                releaseDataList[i].releaseUnit == '' ||
                                releaseDataList[i].releaseUnit < 1
                            ) {
                                alert('출고수량을 확인해주세요. hint : 0 이하 값 입력불가');
                                return false;
                            }
                        }
                        return true;
                    },
                    addDataOnChangeMemoValue: function(e){
                        setReleaseAddMemo(e.target.value);
                    },
                    releaseStatusModalOpen: async function (e, productId, optionId) {
                        e.stopPropagation();
                        let product = productListData.filter(r => r.product.id === productId)[0];
                        let option = product.options.filter(r => r.id === optionId)[0];
                        let optionCid = option.cid;

                        await __handleDataConnect().searchReleaseStatusList(optionCid);
                            
                        setReleaseStatusModalOpen(true);
                    },
                    releaseModalClose: function () {
                        setReleaseStatusModalOpen(false);
                        setReleaseAddData(null);
                    }
                }
            },
            receive: function () {
                return {
                    getAddData: function () {
                        let dataList = []
                        productListData?.forEach(product => {
                            product.options.forEach(option => {
                                if (checkedOptionList.includes(option.id)) {
                                    let json = {
                                        product: product.product,
                                        option: option,
                                        productReceive: new ProductReceive(option.cid).toJSON()
                                    }
                                    dataList.push(json);
                                }
                            })
                        })
                        return dataList;
                    },
                    addModalOpen: function () {
                        let receiveAddData = this.getAddData();
                        if (receiveAddData.length < 1) {
                            return;
                        }
                        setReceiveAddModalOpen(true);
                        setReceiveAddData(receiveAddData);
                        
                    },
                    addModalClose: function () {
                        setReceiveAddModalOpen(false);
                        setReceiveAddData(null);
                        setReceiveAddMemo('');
                    },
                    addDataOnChangeInputValue: function (e, receiveAddDataId) {
                        setReceiveAddData(receiveAddData.map(data => {
                            if (data.productReceive.id === receiveAddDataId) {
                                return {
                                    ...data,
                                    productReceive: {
                                        ...data.productReceive,
                                        [e.target.name]: e.target.value
                                    }
                                }
                            } else {
                                return data;
                            }
                        }))
                    },
                    submitAddData: async function (e) {
                        e.preventDefault();

                        let receiveJsonList = []
                        receiveAddData.forEach(data => {
                            if (data.productReceive.receiveUnit < 1) {
                                return;
                            } else {
                                receiveJsonList.push(
                                    {
                                        ...data.productReceive,
                                        memo: receiveAddMemo
                                    }
                                );
                            }
                        });
                        if(!isObjectSubmitted.receiveAdd){
                            setIsObjectSubmitted({
                                ...isObjectSubmitted,
                                receiveAdd: true
                            })
                            await __handleDataConnect().createProductReceiveList(receiveJsonList);
                            this.addModalClose();
                            await __handleDataConnect().searchProductListFj();
                        }
                    },
                    checkRequiredAddData: function (receiveDataList) {
                        for (let i = 0; i < receiveDataList.length; i++) {
                            if (
                                receiveDataList[i].receiveUnit == null ||
                                receiveDataList[i].receiveUnit == undefined ||
                                receiveDataList[i].receiveUnit == '' ||
                                receiveDataList[i].receiveUnit < 1
                            ) {
                                alert('입고수량을 확인해주세요. hint : 0 이하 값 입력불가');
                                return false;
                            }
                        }
                        return true;
                    },
                    addDataOnChangeMemoValue: function(e){
                        setReceiveAddMemo(e.target.value);
                    },
                    receiveStatusModalOpen: async function (e, productId, optionId) {
                        e.stopPropagation();
                        let product = productListData.filter(r => r.product.id === productId)[0];
                        let option = product.options.filter(r => r.id === optionId)[0];
                        let optionCid = option.cid;

                        await __handleDataConnect().searchReceiveStatusList(optionCid);
                            
                        setReceiveStatusModalOpen(true);
                    },
                    receiveModalClose: function () {
                        setReceiveStatusModalOpen(false);
                        setReceiveAddData(null);
                    }
                }
            },
            stockStatus: function () {
                return {
                    modifyModalOpen: function (e, data) {
                        e.stopPropagation();

                        dispatchStockStatusState({
                            type: 'INIT_DATA',
                            payload: data
                        });
                        setModifyStatusMemoModalOpen(true);
                    },
                    modifyModalClose: function () {
                        setModifyStatusMemoModalOpen(false);
                    },
                    onChangeInputValue: function (e) {
                        dispatchStockStatusState({
                            type: 'SET_DATA',
                            payload: {
                                name: e.target.name,
                                value: e.target.value
                            }
                        })
                    },
                    modifyStockStatusMemo: async function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        if(stockStatusState.receiveUnit) {
                            await __handleDataConnect().changeReceiveStockStatusMemo(stockStatusState);
                        }else{
                            await __handleDataConnect().changeReleaseStockStatusMemo(stockStatusState);
                        }
                        
                        setModifyStatusMemoModalOpen(false);
                    }
                }
            },
            receiveAndRelease: function () {
                return {
                    receiveAndReleaseStatusModalOpen: async function () {
                        __handleEventControl().backdropLoading().open();
                        await __handleDataConnect().searchAllStockStatusList();
                        setReceiveAndReleaseStatusModalOpen(true);
                        __handleEventControl().backdropLoading().close();
                    },
                    receiveAndReleaseStatusModalClose: function () {
                        setSelectionRange({...selectionRange,
                            startDate: new Date(),
                            endDate: new Date()
                        });
                        setSelectedDateText("날짜 선택");
                        setSelectedOptionReceiveStatusData([]);
                        setSelectedOptionReleaseStatusData([]);

                        setReceiveAndReleaseStatusModalOpen(false);
                    },
                    setAllStockStatusList: function (data) {
                        // 입출고 데이터를 포함하는 배열 생성
                        let sortedReceiveData = [...data.productReceive];
                        let sortedReleaseData = [...data.productRelease];

                        // createdAt 내림차순 정렬
                        sortedReceiveData.sort((b, a) => a.receive.createdAt.localeCompare(b.receive.createdAt));
                        sortedReleaseData.sort((b, a) => a.release.createdAt.localeCompare(b.release.createdAt));

                        setOptionReceiveStatusData(sortedReceiveData);
                        setOptionReleaseStatusData(sortedReleaseData);
                    },
                    datePickerOpen: function () {
                        setReceiveAndReleaseDateRangePickerMdoalOpen(true);
                    },
                    datePickerClose: function () {
                        setReceiveAndReleaseDateRangePickerMdoalOpen(false);
                    },
                    selectDateRange: async function (startDate, endDate) {
                        this.getStockStatusDataOfSelectedDate(startDate, endDate);
                    },
                    changeReleasedData: function (date) {
                        setSelectionRange(date.selection);
                    },
                    getStockStatusDataOfSelectedDate: function (start, end) {
                        let date1 = dateToYYMMDDhhmmss(getStartDate(start));
                        let date2 = dateToYYMMDDhhmmss(getEndDate(end));
                        setSelectedDateText(dateToYYMMDD(start) + " ~ " + dateToYYMMDD(end));
                        
                        // 선택된 날짜의 입고데이터
                        let selectedReceiveData = optionReceiveStatusData.filter(r => {
                            var createdAt = dateToYYMMDDhhmmss(r.receive.createdAt);
                            if(date1 <= createdAt && createdAt <= date2) {
                                return r;
                            }
                        });

                        // 선택된 날짜의 출고데이터
                        let selectedReleaseData = optionReleaseStatusData.filter(r => {
                            var createdAt = dateToYYMMDDhhmmss(r.release.createdAt);
                            if(date1 <= createdAt && createdAt <= date2) {
                                return r;
                            }
                        });

                        setSelectedOptionReceiveStatusData(selectedReceiveData);
                        setSelectedOptionReleaseStatusData(selectedReleaseData);

                        setReceiveAndReleaseDateRangePickerMdoalOpen(false);
                    }
                }
            },
            backdropLoading: function () {
                return {
                    open: function () {
                        setBackdropLoading(true);
                    },
                    close: function () {
                        setBackdropLoading(false);
                    }
                }
            }
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <BackdropLoading open={backdropLoading} />
            <ProductManageNav
                __handleEventControl={__handleEventControl}
            ></ProductManageNav>
            {productListData && optionListData &&
                <ProductManageBody
                    productListData={productListData}
                    checkedOptionList={checkedOptionList}

                    __handleEventControl={__handleEventControl}
                ></ProductManageBody>
            }
            {categoryListData && productModifyModalOpen && productModifyData &&
                <ProductModifyModal
                    open={productModifyModalOpen}
                    categoryListData={categoryListData}
                    productModifyData={productModifyData}

                    __handleEventControl={__handleEventControl}
                >
                </ProductModifyModal>
            }
            {productOptionModifyModalOpen && productOptionModifyData &&
                <ProductOptionModifyModal
                    open={productOptionModifyModalOpen}
                    productOptionModifyData={productOptionModifyData}

                    __handleEventControl={__handleEventControl}
                ></ProductOptionModifyModal>
            }
            {productOptionAddModalOpen && productOptionAddData &&
                <ProductOptionAddModal
                    open={productOptionAddModalOpen}
                    productOptionAddData={productOptionAddData}
                    isObjectSubmitted={isObjectSubmitted}

                    __handleEventControl={__handleEventControl}
                ></ProductOptionAddModal>
            }
            {releaseAddModalOpen && releaseAddData &&
                <ReleaseAddModal
                    open={releaseAddModalOpen}
                    releaseAddData={releaseAddData}
                    releaseAddMemo={releaseAddMemo}
                    isObjectSubmitted={isObjectSubmitted}

                    __handleEventControl={__handleEventControl}
                ></ReleaseAddModal>
            }
            {receiveAddModalOpen && receiveAddData &&
                <ReceiveAddModal
                    open={receiveAddModalOpen}
                    receiveAddData={receiveAddData}
                    receiveAddMemo={receiveAddMemo}
                    isObjectSubmitted={isObjectSubmitted}

                    __handleEventControl={__handleEventControl}
                ></ReceiveAddModal>
            }
            {releaseStatusModalOpen && releaseStatusData &&
                <ReleaseStatusModal
                    open={releaseStatusModalOpen}
                    releaseStatusData={releaseStatusData}

                    __handleEventControl={__handleEventControl}
                ></ReleaseStatusModal>
            }
            {receiveStatusModalOpen && receiveStatusData &&
                <ReceiveStatusModal
                    open={receiveStatusModalOpen}
                    receiveStatusData={receiveStatusData}

                    __handleEventControl={__handleEventControl}
                ></ReceiveStatusModal>
            }
            {stockStatusModalOpen && stockStatusData &&
                <StockStatusModal
                    open={stockStatusModalOpen}
                    stockStatusData={stockStatusData}

                    __handleEventControl={__handleEventControl}
                ></StockStatusModal>
            }
            {receiveAndReleaseStatusModalOpen && optionReceiveStatusData && optionReleaseStatusData && 
                <ReceiveAndReleaseStatusModal
                    open={receiveAndReleaseStatusModalOpen}
                    optionReceiveStatusData={optionReceiveStatusData}
                    optionReleaseStatusData={optionReleaseStatusData}
                    selectedOptionReceiveStatusData={selectedOptionReceiveStatusData}
                    selectedOptionReleaseStatusData={selectedOptionReleaseStatusData}
                    selectedDateText={selectedDateText}

                    __handleEventControl={__handleEventControl}
                ></ReceiveAndReleaseStatusModal>
            }
            {modifyStatusMemoModalOpen && stockStatusState && 
                <ModifyStatusMemoModal
                    open={modifyStatusMemoModalOpen}
                    stockStatusState={stockStatusState}

                    __handleEventControl={__handleEventControl}
                ></ModifyStatusMemoModal>
            }
            {receiveAndReleaseDateRangePickerMdoalOpen &&
                <ReceiveAndReleaseDateRangePickerModal
                    open={receiveAndReleaseDateRangePickerMdoalOpen}
                    selectionRange={selectionRange}

                    __handleEventControl={__handleEventControl}
                ></ReceiveAndReleaseDateRangePickerModal>
            }

        </>
    );
}

export default ProductManageMain;