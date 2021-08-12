import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDataConnect = () => {
    const config = {
        headers: {
            "content-types": "multipart/form-data"
        }
    };

    return {
        postCreateList: async function (productListData) {
            let jsonArr = [];

            for (let i = 0; i < productListData.length; i++) {
                let productDto = {
                    id: productListData[i].id,
                    code: productListData[i].code,
                    defaultName: productListData[i].defaultName,
                    imageFileName: productListData[i].imageFileName,
                    imageUrl: productListData[i].imageUrl,
                    managementName: productListData[i].managementName,
                    manufacturingCode: productListData[i].manufacturingCode,
                    memo: productListData[i].memo,
                    naverProductCode: productListData[i].naverProductCode,
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
        getListFj: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product/list-fj`, {
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
        },
        postUploadImageFileToCloud: async function (e) {
            const formData = new FormData();

            formData.append('files', e.target.files[0]);

            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/file-upload/uploadFilesToCloud`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        }
    }
}

export {
    productDataConnect
}