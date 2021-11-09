import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';
import queryString from 'query-string';

// data connect
import { productDetailDataConnect } from "../../data_connect/productDetailDataConnect";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

// component
import ProductDetailBody from "./ProductDetailBody";
import ProductDetailTableBody from "./ProductDetailTableBody";
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
    let pathname = props.location.pathname;
    let params = queryString.parse(props.location.search);

    const [categoryListData, setCategoryListData] = useState(null);
    const [productViewData, setProductViewData] = useState([]);
    const [optionViewData, setOptionViewData] = useState([]);
    const [detailViewData, setDetailViewData] = useState([]);

    
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

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchCategoryList();
        }
        fetchInit();
    }, []);

    // 데이터 생성, 수정, 삭제 시 즉시 반영
    useEffect(() => {
        if (dataChangedTrigger === true) {
            if (params.categoryCid) {
                __handleDataConnect().searchProductListByCategory(params.categoryCid);
            }

            if (params.productCid) {
                __handleDataConnect().searchOptionListByProduct(params.productCid);
            }

            if (params.optionCid) {
                __handleDataConnect().searchDetailListByOption(params.optionCid);
            }
        }
        setDataChangedTrigger(false);
    }, [dataChangedTrigger]);

    // Get Product useEffect
    useEffect(() => {
        async function fetchInit() {
            if (!params.categoryCid) {
                setProductViewData(null);
                return;
            }

            setSelectedOption(null);
            setSelectedDetail(null);

            // category Cid와 매칭되는 product 가져오기
            if (params.categoryCid === '4') {
                // 전체조회
                await __handleDataConnect().searchProductList();
            }
            else await __handleDataConnect().searchProductListByCategory(params.categoryCid);
        }
        fetchInit();
    }, [params.categoryCid])

    // Set Selected Product useEffect
    useEffect(() => {
        async function initSelectedProduct() {
            if (params.productCid && productViewData) {
                let product = productViewData.filter(r => r.cid == params.productCid)[0];
                setSelectedProduct(product);
                return;
            }
            setSelectedProduct(null);
        }
        initSelectedProduct();
    }, [params.productCid, productViewData]);

    // Get Product Option useEffect
    useEffect(() => {
        async function fetchInit() {
            if (!params.productCid) {
                setDetailViewData(null);
                return;
            }

            setSelectedDetail(null);

            // product Cid와 매칭되는 option 가져오기
            await __handleDataConnect().searchOptionListByProduct(params.productCid);
        }

        fetchInit();
    }, [params.productCid]);


    // Set Selected Product Option useEffect
    useEffect(() => {
        async function initSelectedProductOption() {
            if (params.optionCid && optionViewData) {
                let option = optionViewData.filter(r => r.cid == params.optionCid)[0];
                setSelectedOption(option);
                return;
            }
            setSelectedOption(null);
        }
        initSelectedProductOption();
    }, [params.optionCid, optionViewData])


    // Get Product Detail useEffect
    useEffect(() => {
        async function fetchInit() {
            if (!params.optionCid) {
                setDetailViewData(null);
                return;
            }

            // option Cid와 매칭되는 detail 가져오기
            await __handleDataConnect().searchDetailListByOption(params.optionCid);
        }

        fetchInit();
    }, [params.optionCid])

    // Set Selected Product Detail useEffect
    useEffect(() => {
        async function initSelectedProductDetail() {
            if (params.detailCid && detailViewData) {
                let detail = detailViewData.filter(r =>  r.cid == params.detailCid)[0];
                setSelectedDetail(detail);
                return;
            }
            setSelectedDetail(null);
        }
        initSelectedProductDetail();
    }, [params.detailCid, detailViewData])

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
            searchProductList: async function () {
                await productDataConnect().getList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setProductViewData(res.data.data);
                        }
                    })
                    .catch(err => {

                    })
            },
            searchProductListByCategory: async function (categoryCid) {
                await productDataConnect().searchProductListByCategory(categoryCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setProductViewData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductListByCategory');
                    })
            },
            searchOptionListByProduct: async function (productCid) {
                await productOptionDataConnect().searchOptionListByProduct(productCid)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setOptionViewData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchOptionListByProduct');
                    })
            },
            searchDetailListByOption: async function (optionCid) {
                await productDetailDataConnect().searchDetailListByOption(optionCid)
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
            postUploadImageFileToCloud: async function (e) {
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
            postModifyOptionImageFileToCloud: async function (e) {
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
            postUploadOptionImageFileToCloud: async function (e) {
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
                    changeRouterByCategory: function (categoryCid) {
                        delete params.categoryCid;
                        delete params.productCid;
                        delete params.optionCid;
                        delete params.detailCid;

                        params.categoryCid = categoryCid;

                        props.history.replace({
                            pathname: pathname,
                            search: `?${queryString.stringify(params)}`
                        })
                    },
                    changeRouterByProduct: function (productCid) {
                        delete params.productCid;
                        delete params.optionCid;
                        delete params.detailCid;

                        params.productCid = productCid;

                        props.history.replace({
                            pathname: pathname,
                            search: `?${queryString.stringify(params)}`
                        })
                    },
                    changeRouterByOption: async function (optionCid) {
                        delete params.optionCid;
                        delete params.detailCid;

                        params.optionCid = optionCid;

                        props.history.replace({
                            pathname: pathname,
                            search: `?${queryString.stringify(params)}`
                        })
                    },
                    changeRouterByDetail: async function (detailCid) {
                        delete params.detailCid;

                        params.detailCid = detailCid;

                        props.history.replace({
                            pathname: pathname,
                            search: `?${queryString.stringify(params)}`
                        })
                    }
                }
            },
            product: function () {
                return {
                    deleteOne: async function () {
                        if (!params.productCid) {
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductOne(params.productCid);
                        }

                        setDataChangedTrigger(true);
                    },
                    modifyModalOpen: function () {
                        if (!params.productCid) {
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
                        setProductModifyData({ ...productModifyData, [e.target.name]: e.target.value });
                    },
                    submitModifyData: async function (e) {
                        e.preventDefault();

                        if (this.checkRequiredData()) {
                            await __handleDataConnect().changeProductOne();
                            this.modifyModalClose();
                            setDataChangedTrigger(true);
                        } else {
                            return;
                        }

                    },
                    checkRequiredData: function () {
                        if (productModifyData.productCategoryCid == null || productModifyData.productCategoryCid == undefined) {
                            alert('카테고리 선택은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.defaultName == null || productModifyData.defaultName == undefined) {
                            alert('상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.managementName == null || productModifyData.managementName == undefined) {
                            alert('관리상품명은 필수항목입니다.');
                            return false;
                        }

                        if (productModifyData.defaultWidth == null || productModifyData.defaultWidth == undefined) {
                            alert('상품 가로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultLength == 0 || productModifyData.defaultLength == undefined) {
                            alert('상품 세로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultHeight == 0 || productModifyData.defaultHeight == undefined) {
                            alert('상품 높이 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultQuantity == 0 || productModifyData.defaultQuantity == undefined) {
                            alert('상품 내품수량을 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultWeight == 0 || productModifyData.defaultWeight == undefined) {
                            alert('상품 무게를 한번더 확인해 주세요.')
                            return false;
                        }

                        return true;
                    },
                    postUploadImageFile: async function (e) {
                        e.preventDefault();

                        __handleEventControl().backdropLoading().open();

                        // 파일을 선택하지 않은 경우
                        if (e.target.files.length == 0) return;

                        await __handleDataConnect().postUploadImageFileToCloud(e);
                    },
                    uploadImageInfo: function (data) {
                        setProductModifyData({ ...productModifyData, imageFileName: data.fileName, imageUrl: data.fileUploadUri });
                        __handleEventControl().backdropLoading().close();
                    },
                    deleteImageFile: function () {
                        setProductModifyData({ ...productModifyData, imageFileName: '', imageUrl: '' });
                    },
                    onClickImageButton: function () {
                        document.getElementById("image-file-upload").click();
                    },
                    stockManagementCheck: function () {
                        let stockManagement = productModifyData.stockManagement ? false : true;

                        setProductModifyData({ ...productModifyData, stockManagement: stockManagement });
                    }
                }
            },
            productOption: function () {
                return {
                    addModalOpen: function () {
                        if (!params.productCid) {
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        let option = new ProductOption(selectedProduct.id);
                        option.productCid = params.productCid;

                        setProductOptionAddData(option);
                        setProductOptionAddModalOpen(true);
                    },
                    addModalClose: function () {
                        setProductOptionAddData(null);
                        setProductOptionAddModalOpen(false);
                    },
                    addDataOnChangeInputValue: function (e) {
                        setProductOptionAddData({ ...productOptionAddData, [e.target.name]: e.target.value });
                    },
                    submitAddData: async function (e) {
                        e.preventDefault();
                        if (this.checkRequiredAddData()) {
                            await __handleDataConnect().createProductOptionOne();
                            this.addModalClose();
                            setDataChangedTrigger(true);
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

                        if (!params.optionCid) {
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
                        setProductOptionModifyData({ ...productOptionModifyData, [e.target.name]: e.target.value });
                    },
                    submitModifyData: async function (e) {
                        e.preventDefault();
                        if (this.checkRequiredData()) {
                            await __handleDataConnect().changeProductOptionOne();
                            this.modifyModalClose();
                            setDataChangedTrigger(true);
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

                        if (!params.optionCid) {
                            alert('옵션을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductOptionOne(params.optionCid);
                        }

                        setDataChangedTrigger(true);

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
                        if (!params.optionCid) {
                            alert('상품옵션을 먼저 선택해주세요.');
                            return;
                        }

                        let detail = new ProductDetail(selectedOption.id);
                        detail.productOptionCid = params.optionCid;

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
                            setDataChangedTrigger(true);
                        } else {
                            return;
                        }
                    },
                    checkRequiredAddData: function () {
                        if (productDetailAddData.detailWidth == null || productDetailAddData.detailWidth == undefined || productDetailAddData.detailWidth == '') {
                            alert('가로사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailAddData.detailLength == null || productDetailAddData.detailLength == undefined || productDetailAddData.detailLength == '') {
                            alert('세로사이즈는 필수항목입니다.');
                            return false;
                        }
                        if (productDetailAddData.detailHeight == null || productDetailAddData.detailHeight == undefined || productDetailAddData.detailHeight == '') {
                            alert('높이사이즈는 필수항목입니다.');
                            return false;
                        }

                        if (productDetailAddData.detailQuantity == null || productDetailAddData.detailQuantity == undefined || productDetailAddData.detailQuantity == '') {
                            alert('내품수량은 필수항목입니다.');
                            return false;
                        }

                        if (productDetailAddData.detailWeight == null || productDetailAddData.detailWeight == undefined || productDetailAddData.detailWeight == '') {
                            alert('무게는 필수항목입니다.');
                            return false;
                        }

                        return true;
                    },
                    modifyModalOpen: function () {
                        if (!params.detailCid) {
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

                        if (!params.detailCid) {
                            alert('상세 데이터를 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                            await __handleDataConnect().deleteProductDetailOne(selectedDetail.cid);
                        }

                        setDataChangedTrigger(true);
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
                optionViewData={optionViewData}
                params={params}

                __handleEventControl={__handleEventControl}
            ></ProductDetailBody>

            <ProductDetailTableBody
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}
                selectedDetail={selectedDetail}
                detailViewData={detailViewData}
                params={params}

            
                __handleEventControl={__handleEventControl}
            ></ProductDetailTableBody>
        </>
    )
}

export default withRouter(ProductDetailMain);