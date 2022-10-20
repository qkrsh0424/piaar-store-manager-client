import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function useProductHook (props) {
    const [product, setProduct] = useState({
        id: uuidv4(),
        imageUrl: '',
        imageFileName: '',
        defaultName: '',
        managementName: '',
        memo: '',
        purchaseUrl: '',
        managementNumber: '',
        stockManagement: false,
        productCategoryCid: null
    });

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

    return {
        product,

        onChangeValueOfName,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData
    }
}
