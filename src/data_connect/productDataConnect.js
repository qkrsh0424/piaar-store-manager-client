import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDataConnect = () => {
    return {
        postCreateList: async function (productListData) {
            let jsonArr = [];

            for (let i = 0; i < productListData.length; i++) {
                let productDto = {
                    id: productListData[i].id,
                    code: productListData[i].code,
                    naverProductCode: productListData[i].naverProductCode,
                    defaultName: productListData[i].defaultName,
                    imageFileName: productListData[i].imageFileName,
                    imageUrl: productListData[i].imageUrl,
                    purchaseUrl: productListData[i].purchaseUrl,
                    managementName: productListData[i].managementName,
                    manufacturingCode: productListData[i].manufacturingCode,
                    memo: productListData[i].memo,
                    hsCode: productListData[i].hsCode,
                    style: productListData[i].style,
                    tariffRate: productListData[i].tariffRate,
                    defaultWidth: productListData[i].defaultWidth,
                    defaultLength: productListData[i].defaultLength,
                    defaultHeight: productListData[i].defaultHeight,
                    defaultQuantity: productListData[i].defaultQuantity,
                    defaultWeight: productListData[i].defaultWeight,
                    defaultTotalPurchasePrice: productListData[i].defaultTotalPurchasePrice,
                    stockManagement: productListData[i].stockManagement,
                    productCategoryCid: productListData[i].productCategoryCid
                }
                let optionDtos = productListData[i].productOptions
                let json = {
                    productDto: productDto,
                    optionDtos: optionDtos
                }
                jsonArr.push(json)
            }
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product/list`, jsonArr, {
                withCredentials: true
            })
        },
        postCreate: async function (productData) {
            let json = {};
            
            let productDto = {
                id: productData.id,
                code: productData.code,
                naverProductCode: productData.naverProductCode,
                defaultName: productData.defaultName,
                imageFileName: productData.imageFileName,
                imageUrl: productData.imageUrl,
                purchaseUrl: productData.purchaseUrl,
                managementName: productData.managementName,
                manufacturingCode: productData.manufacturingCode,
                memo: productData.memo,
                hsCode: productData.hsCode,
                style: productData.style,
                tariffRate: productData.tariffRate,
                defaultWidth: productData.defaultWidth,
                defaultLength: productData.defaultLength,
                defaultHeight: productData.defaultHeight,
                defaultQuantity: productData.defaultQuantity,
                defaultWeight: productData.defaultWeight,
                defaultTotalPurchasePrice: productData.defaultTotalPurchasePrice,
                stockManagement: productData.stockManagement,
                productCategoryCid: productData.productCategoryCid
            }
            // 이미 option안에는 packageDtos가 존재함.
            let optionDtos = productData.productOptions

            for (let i = 0; i < optionDtos.length; i++) {
                let packageDtos = optionDtos[i].optionPackages ?? [];

                json = {
                    productDto: productDto,
                    optionDtos: optionDtos,
                    packageDtos: packageDtos
                }
            }

            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product/one`, json, {
                withCredentials: true
            })
        },
        createProductAndOptions: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product/options`, body, {
                withCredentials: true
            })
        },
        getStockListFj: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product/list-fj/stock`, {
                withCredentials: true
            })
        },
        getList: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product/list`, {
                withCredentials: true
            })
        },
        getListFj: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product/list-fj`, {
                withCredentials: true
            })
        },
        searchProductListByCategory: async function (categoryCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product/list/${categoryCid}`, {
                withCredentials: true
            })
        },
        putOne: async function (product) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product/one`, product, {
                withCredentials: true
            })
        },
        deleteOne: async function (productCid) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product/one/${productCid}`, {
                withCredentials: true
            })
        }
    }
}

export {
    productDataConnect
}