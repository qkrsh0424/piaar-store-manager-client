import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
import BackdropLoading from '../loading/BackdropLoading';

class ProductOption {
    constructor(productId, optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = ''
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            salesPrice: this.salesPrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
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

    const [backdropLoading, setBackdropLoading] = useState(false);

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
                await productDataConnect().getListFj()
                    .then(res => {
                        console.log(res)
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setProductListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductListFj');
                    })
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
            },searchReleaseStatusList: async function (productOptionCid) {
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

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
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

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
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

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : changeProductOne');
                        }
                    })
            },
            createProductOptionOne: async function () {
                await productOptionDataConnect().postOne(productOptionAddData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('해당 옵션이 정상적으로 추가되었습니다.')
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
            createProductReleaseList: async function (data) {
                await productReleaseDataConnect().postList(data)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('출고등록 되었습니다.')
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
                            alert('입고등록 되었습니다.')
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
                        if (this.checkRequiredAddData()) {
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
                        await __handleDataConnect().createProductReleaseList(releaseJsonList);
                        this.addModalClose();
                        await __handleDataConnect().searchProductListFj();


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
                        productListData.forEach(product => {
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
                        await __handleDataConnect().createProductReceiveList(receiveJsonList);
                        this.addModalClose();
                        await __handleDataConnect().searchProductListFj();
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

                    __handleEventControl={__handleEventControl}
                ></ProductOptionAddModal>
            }
            {releaseAddModalOpen && releaseAddData &&
                <ReleaseAddModal
                    open={releaseAddModalOpen}
                    releaseAddData={releaseAddData}
                    releaseAddMemo={releaseAddMemo}

                    __handleEventControl={__handleEventControl}
                ></ReleaseAddModal>
            }
            {receiveAddModalOpen && receiveAddData &&
                <ReceiveAddModal
                    open={receiveAddModalOpen}
                    receiveAddData={receiveAddData}
                    receiveAddMemo={receiveAddMemo}

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
        </>
    );
}

export default ProductManageMain;