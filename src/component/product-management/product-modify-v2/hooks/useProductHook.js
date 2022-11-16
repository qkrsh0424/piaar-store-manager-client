import { useState } from "react";
import { productDataConnect } from "../../../../data_connect/productDataConnect";

export default function useProductHook (props) {
    const [originProduct, setOriginProduct] = useState(null);
    const [product, setProduct] = useState(null);

    const reqSearchOneForProduct = async (productId) => {
        await productDataConnect().searchOne(productId)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    setProduct(res.data.data);
                    setOriginProduct(res.data.data);
                }
            })
    }

    const reqModifyOne = async () => {
        await productDataConnect().modifyProduct(product)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('완료되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setProduct({
            ...product,
            [name]: value
        })
    }

    const onChangeImageFileNameAndImageUrl = (data) => {
        let imageFileName = data.imageFileName;
        let imageUrl = data.imageUrl;

        setProduct({
            ...product,
            imageFileName,
            imageUrl
        })
    }

    const onActionDeleteImageFileNameAndImageUrl = () => {
        setProduct({
            ...product,
            imageFileName: '',
            imageUrl: ''
        })
    }

    const checkCreateFormData = () => {
        if (product.productCategoryCid === null) {
            throw new Error('[카테고리] 상품의 카테고리를 확인해 주세요.')
        }

        if (product.defaultName === '' || !product.defaultName) {
            throw new Error('[상품] 상품명을 확인해 주세요.')
        }
    }

    const onActionResetOriginData = () => {
        setProduct({...originProduct})
    }

    const onChangeStockManagement = (e) => {
        let target = {
            name: e.target.name,
            value: !product.stockManagement
        }

        onChangeValueOfName({ target })
    }

    return {
        product,
        
        onChangeValueOfName,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData,
        reqModifyOne,
        onActionResetOriginData,
        onChangeStockManagement,
        reqSearchOneForProduct
    }
}
