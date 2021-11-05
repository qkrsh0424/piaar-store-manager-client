import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

// data connect
import { productDetailDataConnect } from "../../data_connect/productDetailDataConnect";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

// component
import ProductDetailBody from "./ProductDetailBody";
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import ProductModifyModal from '../product_manage/modal/ProductModifyModal';
import BackdropLoading from '../loading/BackdropLoading';
import ProductOptionAddModal from '../product_manage/modal/ProductOptionAddModal';
import ProductOptionModifyModal from '../product_manage/modal/ProductOptionModifyModal';
import ProductDetailAddModal from './modal/ProductDetailAddModal';
import ProductDetailModifyModal from './modal/ProductDetailModifyModal';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';


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

class ProductDetail {
    constructor(productOptionId) {
        this.id = uuidv4();
        this.detailWidth = ''
        this.detailLength = ''
        this.detailHeight = ''
        this.detailQuantity = ''
        this.detailWeight = ''
        this.detailCbm = ''
        this.productOptionCid = null;
        this.productOptionId = productOptionId;
    }

    toJSON() {
        return {
            id: this.id,
            detailWidth: this.detailWidth,
            detailLength: this.detailLength,
            detailHegith: this.detailHeight,
            detailQuantity: this.detailQuantity,
            detailWeight: this.detailWeight,
            detailCbm: this.detailCbm,
            productDetailCid: this.productDetailCid,
            productDetailId: this.productDetailId
        }
    }
}

const ProductDetailMain = (props) => {
    const [categoryListData, setCategoryListData] = useState(null);
    const [productListData, setProductListData] = useState(null);
    const [productViewData, setProductViewData] = useState([]);
    const [optionViewData, setOptionViewData] = useState([]);
    const [detailViewData, setDetailViewData] = useState([]);
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const [productModifyModalOpen, setProductModifyModalOpen] = useState(false);
    const [productModifyData, setProductModifyData] = useState(null);
    
    const [productOptionAddModalOpen, setProductOptionAddModalOpen] = useState(false);
    const [productOptionAddData, setProductOptionAddData] = useState(null);

    const [productOptionModifyModalOpen, setProductOptionModifyModalOpen] = useState(false);
    const [productOptionModifyData, setProductOptionModifyData] = useState(null);

    const [productDetailAddModalOpen, setProductDetailAddModalOpen] = useState(false);
    const [productDetailAddData, setProductDetailAddData] = useState(null);

    const [productDetailModifyModalOpen, setProductDetailModifyModalOpen] = useState(false);
    const [productDetailModifyData, setProductDetailModifyData] = useState(null);

    const [backdropLoading, setBackdropLoading] = useState(false);

    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);
    const [optionChangedTrigger, setOptionChangedTrigger] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchProductListFj();
            __handleDataConnect().searchCategoryList();
        }
        fetchInit();
    }, []);

    useEffect(() => {
        if(dataChangedTrigger === true) {
            __handleEventControl().productViewData().onChangeCategoryData(selectedCategory?.id);
            __handleEventControl().productViewData().onClickProductData(selectedProduct?.cid);
            __handleEventControl().productViewData().onClickOptionData(selectedOption?.cid);        
        }

        setDataChangedTrigger(false);
    }, [dataChangedTrigger]);

    useEffect(() => {
        if(optionChangedTrigger === true) {
            __handleEventControl().productViewData().onClickOptionData(selectedOption?.cid);
            setOptionViewData(productViewData.filter(r => r.product.cid === selectedProduct.cid)[0]?.options);
        }

        setOptionChangedTrigger(false);
    }, [optionChangedTrigger]);

    const __handleDataConnect = () => {
        return {
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
            searchProductListFj: async function () {
                await productDataConnect().getListFj()
                    .then(res => {
                        if(res.status == 200 && res.data && res.data.message == 'success') {
                            setProductListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductListFj');
                    })
            },
            searchDetailList: async function (optionCid) {
                await productDetailDataConnect().searchList(optionCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setDetailViewData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchDetailList');
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
                            alert('undefined error. : deleteProductOptionOne');
                        }
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
                            alert('undefined error. : changeProductOptionOne');
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
                            alert('undefined error. : changeProductOptionOne');
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
                        alert('undefined error. : postUploadImageFileToCloud');
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
                            alert('undefined error. : postModifyOptionImageFileToCloud');
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
            createProductDetailOne: async function () {
                await productDetailDataConnect().postOne(productDetailAddData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            alert('해당 상품상세가 정상적으로 추가되었습니다.')
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.')
                        } else {
                            alert('undefined error. : createProductDetailOne');
                        }
                    })
                    ;
            },
            changeProductDetailOne: async function () {
                await productDetailDataConnect().putOne(productDetailModifyData)
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
                            alert('undefined error. : changeProductDetailOne');
                        }
                    })
            },
            deleteProductDetailOne: async function (detailCid) {
                await productDetailDataConnect().deleteOne(detailCid)
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
                            alert('undefined error. : deleteProductDetailOne');
                        }
                    })
            },
        }
    }

    const __handleEventControl = () => {
        return {
            productViewData: function () {
                return {
                    onChangeCategoryData: function (categoryId) {
                        let category = categoryListData.filter(r => categoryId === r.id)[0];
                        setSelectedCategory(category);

                        setProductViewData(productListData.filter(r => r.category.id === category.id));
                        setOptionViewData(null);
                        setSelectedProduct(null);
                        setSelectedOption(null);
                        setDetailViewData(null);
                    },
                    onClickProductData: function (productCid) {
                        let checkedProduct = productViewData.filter(r => productCid === r.product.cid)[0].product;
                        
                        setSelectedProduct(checkedProduct);
                        setSelectedOption(null);
                        setDetailViewData(null);
                        
                        setOptionViewData(productViewData.filter(r => r.product.cid === productCid)[0].options);
                    },
                    onClickOptionData: async function (optionCid) {
                        let checkedOption = optionViewData.filter(r => optionCid === r.cid)[0];
                        setSelectedOption(checkedOption);
                        setSelectedDetail(null);
                        setDetailViewData(null);

                        if(checkedOption)
                            await __handleDataConnect().searchDetailList(optionCid);

                    },
                    onClickDetailData: function (detailCid) {
                        let checkedDetail = detailViewData.filter(r => detailCid === r.cid)[0];
                        setSelectedDetail(checkedDetail);
                    }

                }
            },
            product: function () {
                return {
                    deleteOne: async function () {
                        if(!selectedProduct){
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductOne(selectedProduct.cid);
                            await __handleDataConnect().searchProductListFj();
                            setDataChangedTrigger(true);
                        }
                    },
                    modifyModalOpen: function () {
                        if(!selectedProduct){
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        setProductModifyData(selectedProduct);
                        setProductModifyModalOpen(true);
                    },
                    modifyModalClose: function () {
                        setProductModifyData(null);
                        setProductModifyModalOpen(false);
                    },
                    modifyDataOnChangeCategoryData: function (categoryCid) {
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
                            setDataChangedTrigger(true);
                        } else {
                            return;
                        }

                    },
                    checkRequiredData: function () {
                        if (productModifyData.productCategoryCid == null || productModifyData.productCategoryCid == undefined || productModifyData.productCategoryCid == '') {
                            alert('카테고리 선택은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.defaultName == null || productModifyData.defaultName == undefined || productModifyData.defaultName == '') {
                            alert('상품명은 필수항목입니다.');
                            return false;
                        }

                        if (!productModifyData.managementName) {
                            alert('관리상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.defaultWidth == null || productModifyData.defaultWidth == undefined || productModifyData.defaultWidth == '') {
                            alert('상품 가로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultLength == 0 || productModifyData.defaultLength == undefined || productModifyData.defaultLength == '') {
                            alert('상품 세로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultHeight == 0 || productModifyData.defaultHeight == undefined || productModifyData.defaultHeight == '') {
                            alert('상품 높이 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultQuantity == 0 || productModifyData.defaultQuantity == undefined || productModifyData.defaultQuantity == '') {
                            alert('상품 내품수량을 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultWeight == 0 || productModifyData.defaultWeight == undefined || productModifyData.defaultWeight == '') {
                            alert('상품 무게를 한번더 확인해 주세요.')
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
                    addModalOpen: function () {
                        if(!selectedProduct){
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        let option = new ProductOption(selectedProduct.id);
                        option.productCid = selectedProduct.cid;

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
                            setDataChangedTrigger(true);
                            setOptionChangedTrigger(true);
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
                    modifyModalOpen: function (e) {
                        e.stopPropagation();

                        if(!selectedOption){
                            alert('옵션을 먼저 선택해주세요.');
                            return;
                        }

                        setProductOptionModifyData(selectedOption);
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
                            setSelectedOption(null);
                            setDataChangedTrigger(true);
                            setOptionChangedTrigger(true);
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
                    modifyDataDelete: function (optionId) {
                        setProductModifyData({
                            ...productModifyData,
                            options: productModifyData.options.filter(option => option.id !== optionId)
                        })
                    },
                    deleteOne: async function (e) {
                        e.stopPropagation();
                        
                        if(!selectedOption){
                            alert('옵션을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductOptionOne(selectedOption.cid);
                            await __handleDataConnect().searchProductListFj();
                            setSelectedOption(null);
                            setDataChangedTrigger(true);
                            setOptionChangedTrigger(true);
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
                    }
                }
            },
            productDetail: function () {
                return {
                    addModalOpen: function () {
                        if(!selectedOption){
                            alert('상품옵션을 먼저 선택해주세요.');
                            return;
                        }

                        let detail = new ProductDetail(selectedOption.id);
                        detail.productOptionCid = selectedOption.cid;

                        setProductDetailAddData(detail);
                        setProductDetailAddModalOpen(true);
                    },
                    addModalClose: function () {
                        setProductDetailAddData(null);
                        setProductDetailAddModalOpen(false);
                    },
                    addDataOnChangeInputValue: function (e) {
                        setProductDetailAddData({
                            ...productDetailAddData,
                            [e.target.name]: e.target.value
                        })
                    },
                    submitAddData: async function (e) {
                        e.preventDefault();

                        if (this.checkRequiredAddData()) {
                            await __handleDataConnect().createProductDetailOne();
                            this.addModalClose();
                            await __handleDataConnect().searchProductListFj();
                            setDataChangedTrigger(true);
                        } else {
                            return;
                        }
                    },
                    checkRequiredAddData: function () {
                        if (productDetailModifyData.detailWidth == null || productDetailModifyData.detailWidth == undefined || productDetailModifyData.detailWidth == '') {
                            alert('가로사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailModifyData.detailLength == null || productDetailModifyData.detailLength == undefined || productDetailModifyData.detailLength == '') {
                            alert('세로사이즈는 필수항목입니다.');
                            return false;
                        }
                        if (productDetailModifyData.detailHeight == null || productDetailModifyData.detailHeight == undefined || productDetailModifyData.detailHeight == '') {
                            alert('높이사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailModifyData.detailQuantity == null || productDetailModifyData.detailQuantity == undefined || productDetailModifyData.detailQuantity == '') {
                            alert('내품수량은 필수항목입니다.');
                            return false;
                        }
                        
                        if (productDetailModifyData.detailWeight == null || productDetailModifyData.detailWeight == undefined || productDetailModifyData.detailWeight == '') {
                            alert('무게는 필수항목입니다.');
                            return false;
                        }

                        return true;
                    },
                    modifyModalOpen: function () {

                        if(!selectedDetail){
                            alert('상세 데이터를 먼저 선택해주세요.');
                            return;
                        }

                        setProductDetailModifyData(selectedDetail);
                        setProductDetailModifyModalOpen(true);
                    },
                    modifyModalClose: function () {
                        setProductDetailModifyData(null);
                        setProductDetailModifyModalOpen(false);
                    },
                    modifyDataOnChangeInputValue: function (e) {
                        setProductDetailModifyData({
                            ...productDetailModifyData,
                            [e.target.name]: e.target.value
                        })
                    },
                    submitModifyData: async function (e) {
                        e.preventDefault();
                        if (this.checkRequiredData()) {
                            await __handleDataConnect().changeProductDetailOne();
                            this.modifyModalClose();
                            await __handleDataConnect().searchProductListFj();
                            setDataChangedTrigger(true);
                        } else {
                            return;
                        }

                    },
                    checkRequiredData: function () {
                        if (productDetailModifyData.detailWidth == null || productDetailModifyData.detailWidth == undefined) {
                            alert('가로사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailModifyData.detailLength == null || productDetailModifyData.detailLength == undefined) {
                            alert('세로사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailModifyData.detailHeight == null || productDetailModifyData.detailHeight == undefined) {
                            alert('높이사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailModifyData.detailQuantity == null || productDetailModifyData.detailQuantity == undefined) {
                            alert('내품수량은 필수항목입니다.');
                            return false;
                        }
                        
                        if (productDetailModifyData.detailWeight == null || productDetailModifyData.detailWeight == undefined) {
                            alert('무게는 필수항목입니다.');
                            return false;
                        }

                        return true;
                    },
                    deleteOne: async function () {
                        
                        if(!selectedDetail){
                            alert('상세 데이터를 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductDetailOne(selectedDetail.cid);
                            await __handleDataConnect().searchProductListFj();
                            setDataChangedTrigger(true);
                        }

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
            
            {categoryListData && productModifyModalOpen && productModifyData &&
                <ProductModifyModal
                    open={productModifyModalOpen}
                    categoryListData={categoryListData}
                    productModifyData={productModifyData}

                    __handleEventControl={__handleEventControl}
                >
                </ProductModifyModal>
            }
            
            {productOptionAddModalOpen && productOptionAddData &&
                <ProductOptionAddModal
                    open={productOptionAddModalOpen}
                    productOptionAddData={productOptionAddData}

                    __handleEventControl={__handleEventControl}
                ></ProductOptionAddModal>
            }
            {productOptionModifyModalOpen && productOptionModifyData &&
                <ProductOptionModifyModal
                    open={productOptionModifyModalOpen}
                    productOptionModifyData={productOptionModifyData}

                    __handleEventControl={__handleEventControl}
                ></ProductOptionModifyModal>
            }

            {productDetailAddModalOpen && productDetailAddData &&
                <ProductDetailAddModal
                    open={productDetailAddModalOpen}
                    productDetailAddData={productDetailAddData}

                    __handleEventControl={__handleEventControl}
                ></ProductDetailAddModal>
            }
            {productDetailModifyModalOpen && productDetailModifyData &&
                <ProductDetailModifyModal
                    open={productDetailModifyModalOpen}
                    productDetailModifyData={productDetailModifyData}

                    __handleEventControl={__handleEventControl}
                ></ProductDetailModifyModal>
            }

            <ProductDetailBody
                categoryListData={categoryListData}
                productViewData={productViewData}
                selectedCategory={selectedCategory}
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}
                selectedDetail={selectedDetail}
                optionViewData={optionViewData}
                // checkedData={checkedData}
                detailViewData={detailViewData}

                __handleEventControl = {__handleEventControl}
            ></ProductDetailBody>
        </>
    )
}

export default withRouter(ProductDetailMain);