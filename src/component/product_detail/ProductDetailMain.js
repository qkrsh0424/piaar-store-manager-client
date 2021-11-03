import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

// data connect
import { productDetailConnect } from "../../data_connect/productDetailConnect";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

// component
import ProductDetailBody from "./ProductDetailBody";
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import ProductModifyModal from '../product_manage/modal/ProductModifyModal';
import BackdropLoading from '../loading/BackdropLoading';
import ProductOptionAddModal from '../product_manage/modal/ProductOptionAddModal';
import ProductOptionModifyModal from '../product_manage/modal/ProductOptionModifyModal';
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

const ProductDetailMain = (props) => {
    const [categoryListData, setCategoryListData] = useState(null);
    const [productListData, setProductListData] = useState(null);
    const [productViewData, setProductViewData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [optionViewData, setOptionViewData] = useState([]);
    const [detailViewData, setDetailViewData] = useState([]);
    // const [checkedData, setCheckedData] = useState({
    //     product : [],
    //     option : [],
    // });
    const [productModifyModalOpen, setProductModifyModalOpen] = useState(false);
    const [productModifyData, setProductModifyData] = useState(null);

    const [productOptionModifyModalOpen, setProductOptionModifyModalOpen] = useState(false);
    const [productOptionModifyData, setProductOptionModifyData] = useState(null);

    const [productOptionAddModalOpen, setProductOptionAddModalOpen] = useState(false);
    const [productOptionAddData, setProductOptionAddData] = useState(null);

    const [backdropLoading, setBackdropLoading] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchProductListFj();
            __handleDataConnect().searchCategoryList();
        }

        fetchInit();
    }, []);

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
                await productDetailConnect().searchList(optionCid)
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
                            alert('undefined error. : changeProductOne');
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
            }
        }
    }

    const __handleEventControl = () => {
        return {
            productViewData: function () {
                return {
                    onChangeCategoryValue: function (categoryCid, categoryId) {
                        let category = categoryListData.filter(r => categoryId === r.id)[0];
                        setSelectedCategory(category.cid);

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
                        setDetailViewData(null);

                        await __handleDataConnect().searchDetailList(optionCid);
                    }
                }
            },
            product: function () {
                return {
                    getSelectedModifyData: function (productId) {
                        return productListData.filter(r => r.product.id === productId)[0].product;
                    },
                    deleteOne: async function () {
                        if(!selectedProduct){
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {

                            await __handleDataConnect().deleteProductOne(selectedProduct.cid);
                            await __handleDataConnect().searchProductListFj();
                        }
                    },
                    modifyModalOpen: function () {
                        if(!selectedProduct){
                            alert('상품을 먼저 선택해주세요.');
                            return;
                        }

                        setProductModifyData(this.getSelectedModifyData(selectedProduct.id));
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

                        if (productModifyData.defaultWidth == '' || productModifyData.defaultWidth == null || productModifyData.defaultWidth == undefined) {
                            alert('상품 가로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultLength == '' || productModifyData.defaultLength == null || productModifyData.defaultLength == undefined) {
                            alert('상품 세로 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultHeight == '' || productModifyData.defaultHeight == null || productModifyData.defaultHeight == undefined) {
                            alert('상품 높이 사이즈를 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultQuantity == '' || productModifyData.defaultQuantity == null || productModifyData.defaultQuantity == undefined) {
                            alert('상품 내품수량을 한번더 확인해 주세요.')
                            return false;
                        }

                        if (productModifyData.defaultWeight == '' || productModifyData.defaultWeight == null || productModifyData.defaultWeight == undefined) {
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
                    deleteOne: async function (e) {
                        e.stopPropagation();
                        
                        if(!selectedOption){
                            alert('옵션을 먼저 선택해주세요.');
                            return;
                        }

                        if (window.confirm('정말로 삭제하시겠습니까?')) {

                            await __handleDataConnect().deleteProductOptionOne(selectedOption.cid);
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

            <ProductDetailBody
                categoryListData={categoryListData}
                productViewData={productViewData}
                selectedCategory={selectedCategory}
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}
                optionViewData={optionViewData}
                // checkedData={checkedData}
                detailViewData={detailViewData}

                __handleEventControl = {__handleEventControl}
            ></ProductDetailBody>
        </>
    )
}

export default withRouter(ProductDetailMain);