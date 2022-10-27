import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productOptionDataConnect = () => {
    return {
        getList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/list`, {
                withCredentials: true
            })
        },
        searchOptionListByProduct: async function (productCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/list/${productCid}`, {
                withCredentials: true
            })
        },
        postOne: async function(productOption){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-option/one`, productOption,{
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
        putOne: async function (productOption) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-option/one`, productOption, {
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

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-option/option-packages`, json, {
                withCredentials: true
            })
        },
        deleteOne: async function(optionCid){
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-option/one/${optionCid}`,{
                withCredentials: true
            })
        },
        searchStockStatus: async function(optionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/stock/status/${optionCid}`, {
                withCredentials: true
            })
        },
        searchAllStockStatus: async function() {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/stock/status/list`, {
                withCredentials: true
            })
        },
        searchListStockStatus: async function(startDate, endDate) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/stock/status`, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                },
                withCredentials: true
            })
        },
        searchList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/list-m2oj`, {
                withCredentials: true
            })
        },
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

        // [221026] FEAT
        searchBatchStockStatus: async function (optionIds, params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/product-option/batch/stock/status/${optionIds}`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    productOptionDataConnect
}