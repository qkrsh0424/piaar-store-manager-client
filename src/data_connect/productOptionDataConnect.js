import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productOptionDataConnect = () => {
    return {
        searchAll: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/all`, {
                params,
                withCredentials: true
            })
        },
        // Unused API
        searchBatchByProductCid: async function (productCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/batch/${productCid}`, {
                withCredentials: true
            })
        },
        // Unused API
        postOne: async function(productOption) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-options`, productOption, {
                withCredentials: true
            })
        },
        postOptionAndPackages: async function(productOption) {
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
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-options/option-packages`, json, {
                withCredentials: true
            })
        },
        // Unused API
        putOne: async function (productOption) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-options`, productOption, {
                withCredentials: true
            })
        },
        putOptionAndPackages: async function (productOption) {
            let optionDto = {
                cid: productOption.cid,
                id: productOption.id,
                code: productOption.code,
                defaultName: productOption.defaultName,
                managementName: productOption.managementName,
                salesPrice: productOption.salesPrice,
                stockUnit: productOption.stockUnit,
                status: productOption.status,
                releaseLocation: productOption.releaseLocation,
                memo: productOption.memo,
                imageUrl: productOption.imageUrl,
                imageFileName: productOption.imageFileName,
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

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-options/option-packages`, json, {
                withCredentials: true
            })
        },
        // deleteOne: async function(optionCid){
        //     return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-options/one/${optionCid}`,{
        //         withCredentials: true
        //     })
        // },
        deleteOne: async function(parentOptionId){
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-options/${parentOptionId}`,{
                withCredentials: true
            })
        },
        // Deprecated API
        // searchStockStatus: async function(optionCid) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/stock/status/${optionCid}`, {
        //         withCredentials: true
        //     })
        // },
        // Unused API
        // searchAllStockStatus: async function() {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/stock/status/list`, {
        //         withCredentials: true
        //     })
        // },
        // Deprecated API
        // searchListStockStatus: async function(startDate, endDate) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/stock/status`, {
        //         params: {
        //             startDate: startDate,
        //             endDate: endDate
        //         },
        //         withCredentials: true
        //     })
        // },
        searchForStockStatus: async function(params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/stock/status`, {
                params,
                withCredentials: true
            })
        },
        // Deprecated API
        // searchList: async function () {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/list-m2oj`, {
        //         withCredentials: true
        //     })
        // },
        searchReleaseLocation: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/release-location`, {
                withCredentials: true
            })
        },
        searchStockCycle: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-options/stock-cycle`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    productOptionDataConnect
}