import { useCallback } from "react";
import { useState } from "react";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoryHook () {
    const [savedCategories, setSavedCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const onActionResetData = useCallback(() => {
        setSavedCategories(null);
        setCategory(null);
        setSelectedCategory(null);
    })

    const reqSearchAllProductCategory = async () => {
        await productCategoryDataConnect().searchAll()
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

    const reqModifyOne = async () => {
        await productCategoryDataConnect().changeOne(category)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    alert('저장되었습니다.');
                    onActionResetData();
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

    const reqDeleteOne = async () => {
        await productCategoryDataConnect().deleteOne(selectedCategory.id)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('완료되었습니다.');
                    onActionResetData();
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

    const checkSaveFormData = () => {
        let categoryName = category.name?.trim();

        if(categoryName === '' || !categoryName) {
            throw new Error('[카테고리] 카테고리명을 확인해 주세요.')
        }

        savedCategories.forEach(r => {
            let savedName = r.name.trim();
            let inputName = categoryName;

            if(savedName === inputName) {
                throw new Error('이미 존재하는 카테고리입니다. 다른 이름으로 변경해주세요.');
            }
        })
    }

    const onChangeSelectedCategory = (e) => {
        let selectedCategoryId = e.target.value;
        let data = savedCategories.filter(r => r.id === selectedCategoryId)[0];

        // '카테고리 선택' option을 선택하면 값 초기화. 그렇지 않으면 선택된 데이터로 변경.
        if(!data) {
            setSelectedCategory(null);
            setCategory(null);
        } else {
            setSelectedCategory(data);
            setCategory(data);
        }
    }

    return {
        savedCategories,
        category,
        selectedCategory,

        onChangeValueOfName,
        checkSaveFormData,
        onChangeSelectedCategory,
        reqModifyOne,
        reqDeleteOne,
        reqSearchAllProductCategory
    }
}