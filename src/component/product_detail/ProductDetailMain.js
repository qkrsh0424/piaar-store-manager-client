import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

// data connect
import { productDetailConnect } from "../../data_connect/productDetailConnect";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

// component
import ProductDetailBody from "./ProductDetailBody";
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import { productDataConnect } from '../../data_connect/productDataConnect';
import ProductModifyModal from '../product_manage/modal/ProductModifyModal';
import BackdropLoading from '../loading/BackdropLoading';
import ProductManageMain from '../product_manage/ProductManageMain';

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
            // 공통 함수
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