import { useCallback } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { productDataConnect } from "../../../../data_connect/productDataConnect";

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
        stockManagement: true,
        productCategoryCid: null
    });

    const onActionResetData = useCallback(() =>
        setProduct({
            id: uuidv4(),
            imageUrl: '',
            imageFileName: '',
            defaultName: '',
            managementName: '',
            memo: '',
            purchaseUrl: '',
            managementNumber: '',
            stockManagement: true,
            productCategoryCid: null
        })
    );

    const reqDeleteOne = async (id) => {
        await productDataConnect().deleteOne(id)
            .then(res => {
                if (res.status === 200) {
                    alert('정상적으로 삭제되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data.memo);
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
        if (product.productCategoryCid === null || product.productCategoryCid === '') {
            throw new Error('[카테고리] 상품의 카테고리를 확인해 주세요.')
        }

        if (product.defaultName === '' || !product.defaultName) {
            throw new Error('[상품] 상품명을 확인해 주세요.')
        }
    }

    const onActionUpdateProduct = (data) => {
        setProduct({...data});
    }

    const onChangeStockManagement = (e) => {
        let name = e.target.name;
        let value = true;
        
        setProduct({
            ...product,
            [name]: value
        })
    }

    const onChangeCancelStockManagement = (e) => {
        let name = e.target.name;
        let value = false;
        
        setProduct({
            ...product,
            [name]: value
        })
    }

    return {
        product,
        
        onChangeValueOfName,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData,
        reqDeleteOne,
        onActionUpdateProduct,
        onChangeStockManagement,
        onActionResetData,
        onChangeCancelStockManagement
    }
}
