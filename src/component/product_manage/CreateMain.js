import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

// data connect
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from '../../data_connect/productDataConnect';
// component
import CreateBody from "./CreateBody";
import BackdropLoading from "../loading/BackdropLoading";

class Product {
    constructor(optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
        this.manufacturingCode = '';
        this.naverProductCode = '';
        this.defaultName = '';
        this.managementName = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.memo = '';
        this.productCategoryCid = null;
        this.productOptions = [
            new ProductOption(this.id, optionDefaultName, optionManagementName).toJSON()
        ]
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            manufacturingCode: this.manufacturingCode,
            naverProductCode: this.naverProductCode,
            defaultName: this.defaultName,
            managementName: this.managementName,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            memo: this.memo,
            productCategoryCid: this.productCategoryCid,
            productOptions: this.productOptions
        }
    }
}

class ProductOption {
    constructor(productId, optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
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
const CreateMain = (props) => {
    const [categoryListSample, setCategoryListSample] = useState(null);
    const [productListData, setProductListData] = useState([
        new Product('단일상품', '단일상품').toJSON()
    ]);
    const [backdropLoading, setBackdropLoading] = useState(false);
    
    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchProductCategoryList();
        }

        fetchInit();
    }, []);
    
    const __handleDataConnect = () => {
        return {
            searchProductCategoryList: async function () {
                await productCategoryDataConnect().searchList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setCategoryListSample(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductCategoryList');
                    })
            },
            postCreateProductList: async function () {
                await productDataConnect().postCreateList(productListData)
                    .then(res=>{
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            props.history.replace('/products');
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        alert('undefined error. : postCreateProductList');
                    })
                ;
            },
            postUploadImageFileToCloud: async function(productId, e) {
                await productDataConnect().postUploadImageFileToCloud(e)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            __handleEventControl().productListData().uploadImageInfo(productId, res.data.data[0]);
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
            productListData: function () {
                return {
                    add: function () {
                        setProductListData([...productListData, new Product('단일상품', '단일상품').toJSON()])
                    },
                    delete: function (productId) {
                        setProductListData(productListData.filter(r => r.id !== productId));
                    },
                    onChangeCategoryValue: function (productId, categoryId) {
                        let category = categoryListSample.filter(r => categoryId === r.id)[0];

                        setProductListData(productListData.map(r => {
                            return (
                                r.id === productId ?
                                    {
                                        ...r,
                                        productCategoryCid: category.cid
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    onChangeInputValue: function (productId, e) {
                        setProductListData(productListData.map(r => {
                            console.log(r);
                            return (
                                r.id === productId ?
                                    {
                                        ...r,
                                        [e.target.name]: e.target.value
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    submit: async function (e) {
                        e.preventDefault();

                        if(this.checkFormData()){
                            await __handleDataConnect().postCreateProductList();
                        }
                    },
                    checkFormData: function () {
                        for (let i = 0; i < productListData.length; i++) {
                            if (productListData[i].productCategoryCid == null) {
                                alert('상품들의 카테고리를 한번더 확인해 주세요.')
                                return false;
                            }

                            if (productListData[i].defaultName == '' || productListData[i].defaultName == null || productListData[i].defaultName == undefined) {
                                alert('상품명을 한번더 확인해 주세요.')
                                return false;
                            }

                            if (productListData[i].managementName == '' || productListData[i].managementName == null || productListData[i].managementName == undefined) {
                                alert('상품관리명을 한번더 확인해 주세요.')
                                return false;
                            }

                            for (let j = 0; j < productListData[i].productOptions.length; j++) {
                                if (productListData[i].productOptions[j].defaultName == '' || productListData[i].productOptions[j].defaultName == null || productListData[i].productOptions[j].defaultName == undefined) {
                                    alert('옵션명을 한번더 확인해 주세요.')
                                    return false;
                                }

                                if (productListData[i].productOptions[j].managementName == '' || productListData[i].productOptions[j].managementName == null || productListData[i].productOptions[j].managementName == undefined) {
                                    alert('옵션관리명을 한번더 확인해 주세요.')
                                    return false;
                                }

                                if (productListData[i].productOptions[j].code == '' || productListData[i].productOptions[j].code == null || productListData[i].productOptions[j].code == undefined) {
                                    alert('옵션관리코드를 한번더 확인해 주세요.')
                                    return false;
                                }
                            }
                        }
                        return true;
                    },
                    postUploadImageFile: async function (productId, e) {
                        e.preventDefault();

                        // 파일을 선택하지 않은 경우
                        if (e.target.files.length == 0) return;

                        __handleEventControl().backdropLoading().open();
                        
                        await __handleDataConnect().postUploadImageFileToCloud(productId, e);
                    },
                    uploadImageInfo: function (productId, data) {
                        setProductListData(productListData.map(r => {
                            return (
                                r.id === productId ?
                                    {
                                        ...r,
                                        imageFileName: data.fileName,
                                        imageUrl: data.fileUploadUri
                                    }
                                    :
                                    r
                            )
                        }))

                        __handleEventControl().backdropLoading().close();
                    },
                    deleteImageFile: function (productId) {
                        setProductListData(productListData.map(r => {
                            return (
                                r.id === productId ?
                                    {
                                        ...r,
                                        imageFileName: '',
                                        imageUrl: ''
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    onClickImageButton: function (productId) {
                        document.getElementById("i_pm_cb_uploader_" + productId).click();
                    }
                }
            },
            productOptionListData: function () {
                return {
                    add: function (productId) {
                        let product = productListData.filter(r => r.id === productId)[0];
                        let productOptions = product.productOptions;

                        productOptions.push(new ProductOption(productId).toJSON());

                        setProductListData(productListData.map(r => {
                            return (
                                r.id === productId ?
                                    {
                                        ...r,
                                        productOptions: productOptions
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    delete: function (productId, optionId) {
                        setProductListData(productListData.map(product => {
                            if (product.id === productId) {
                                return {
                                    ...product,
                                    productOptions: product.productOptions.length > 1 ? product.productOptions.filter(option => option.id !== optionId) : product.productOptions
                                }
                            } else {
                                return product;
                            }
                        }))
                    },
                    onChangeInputValue: function (e, productId, optionId) {
                        setProductListData(productListData.map(product => {
                            if (product.id === productId) {
                                return {
                                    ...product,
                                    productOptions: product.productOptions.map(option => {
                                        if (option.id === optionId) {
                                            return {
                                                ...option,
                                                [e.target.name]: e.target.value
                                            }
                                        } else {
                                            return option;
                                        }
                                    })
                                }
                            } else {
                                return product;
                            }
                        }))
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
            <BackdropLoading open={backdropLoading} />
            <CreateBody
                categoryList={categoryListSample}
                productListData={productListData}

                __handleEventControl={__handleEventControl}
            ></CreateBody>
        </>
    );
}

export default withRouter(CreateMain);