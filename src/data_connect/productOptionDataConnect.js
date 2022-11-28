import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productOptionDataConnect = () => {
    return {
        getList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/batch`, {
                withCredentials: true
            })
        },
        postOptionAndPackages: async function(productOption){
            let optionDto = {
                id: productOption.id,
                code: productOption.code,
                defaultName: productOption.defaultName,
                managementName: productOption.managementName,
                salesPrice: productOption.salesPrice,
                totalPurchasePrice: productOption.totalPurchasePrice,
                stockUnit: productOption.stockUnit,
                status: productOption.status,
                releaseLocation: productOption.releaseLocation,
                memo: productOption.memo,
                imageUrl: productOption.imageUrl,
                imageFileName: productOption.imageFileName,
                color: productOption.color,
                unitCny: productOption.unitCny,
                unitKrw: productOption.unitKrw,
                totalPurchasePrice: productOption.totalPurchasePrice,
                packageYn: productOption.packageYn,
                safetyStockUnit: productOption.safetyStockUnit,
                productCid: productOption.productCid,
                productId: productOption.productId
            }
            let packageDtos = productOption.optionPackages ?? [];

            let json = {
                optionDto: optionDto,
                packageDtos: packageDtos
            }
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-option/option-packages`, json, {
                withCredentials: true
            })
        },
        // searchList: async function () {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/list-m2oj`, {
        //         withCredentials: true
        //     })
        // },
        searchReleaseLocation: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/release-location`, {
                withCredentials: true
            })
        },
        searchStockCycle: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/stock-cycle`, {
                params,
                withCredentials: true
            })
        },

        // api/v2/product-options
        searchAllRelatedProduct: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/product-options/all/product`, {
                withCredentials: true
            })
        },
        searchBatchByProductId: async function (productId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/product-options/batch/${productId}`, {
                withCredentials: true
            })
        },
        updateBatch: async function (productId, body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v2/product-options/batch/${productId}`, body, {
                withCredentials: true
            })
        },
        deleteOne: async function(optionId){
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v2/product-options/${optionId}`,{
                withCredentials: true
            })
        },
    }
}

export {
    productOptionDataConnect
}