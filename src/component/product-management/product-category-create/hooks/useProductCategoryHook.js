import { indexOf } from "lodash";
import { useEffect, useState } from "react";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoryHook () {
    const [savedCategories, setSavedCategories] = useState(null);
    const [category, setCategory] = useState({ name: '' });
    
    useEffect(() => {
        async function fetchInit() {
            await reqSearchAllProductCategory();
        }

        fetchInit();
    }, [])

    const reqSearchAllProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setSavedCategories(res.data.data);
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
    const reqCreateProductCategoryData = async () => {
        await productCategoryDataConnect().createOne(category)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    alert('저장되었습니다.');
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

        setCategory({
            ...category,
            [name]: value
        })
    }

    const checkCreateFormData = () => {
        if(category.name === '' || !category.name) {
            throw new Error('[카테고리] 카테고리명을 확인해 주세요.')
        }

        savedCategories.forEach(r => {
            let savedName = r.name.trim();
            let inputName = category.name.trim();

            if(savedName === inputName) {
                throw new Error('이미 존재하는 카테고리입니다.');
            }
        })
    }

    const onSubmitCreateData = async () => {
        await reqCreateProductCategoryData();
        
        setCategory({ name: '' });
        await reqSearchAllProductCategory();
    }

    return {
        savedCategories,
        category,

        onChangeValueOfName,
        checkCreateFormData,
        onSubmitCreateData
    }
}