import { useState } from "react";
import { productDetailPageDataConnect } from "../../../../../../data_connect/productDetailPageDataConnect";

export default function useProductDetailPagesHook() {
    const [detailPages, setDetailPages] = useState([]);
    const [selectedDetailPage, setSelectedDetailPage] = useState(null);

    const reqSearchBatchByProductId = async (productId) => {
        await productDetailPageDataConnect().searchBatch(productId)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setDetailPages(res.data.data);
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

    const reqCreateOne = async (snackbarOpen) => {
        await productDetailPageDataConnect().createOne(selectedDetailPage)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    snackbarOpen();
                    setSelectedDetailPage(null);
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

    const reqDeleteOne = async (snackbarOpen) => {
        await productDetailPageDataConnect().deleteOne(selectedDetailPage.id)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    snackbarOpen();
                    setSelectedDetailPage(null);
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

    const reqChangeOne = async (snackbarOpen) => {
        await productDetailPageDataConnect().changeOne(selectedDetailPage)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    snackbarOpen();
                    setSelectedDetailPage(null);
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

    const onChangeSelectedData = (e) => {
        e.preventDefault();
        let detailId = e.target.value;

        let data = detailPages.filter(r => r.id === detailId)[0];
        setSelectedDetailPage(data);
    }

    const onChangeImageInfoOfSelectedData = (imageInfo) => {
        let data = {
            ...selectedDetailPage,
            imageUrl: imageInfo.imageUrl,
            imageFileName: imageInfo.imageFileName
        }

        setSelectedDetailPage(data);
    }

    const onActionRemoveImageOfSelectedData = () => {
        let data = {
            ...selectedDetailPage,
            imageUrl: '',
            imageFileName: ''
        }

        setSelectedDetailPage(data);
    }

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSelectedDetailPage({
            ...selectedDetailPage,
            [name]: value
        })
    }

    const onActionAddData = (productId) => {
        let data = {
            title: '',
            imageUrl: '',
            imageFileName: '',
            productId
        }

        setSelectedDetailPage(data);
    }

    const onActionRemoveData = () => {
        setSelectedDetailPage(null);
    }

    const checkSaveForm = () => {
        if(selectedDetailPage.title === null || !selectedDetailPage.title) {
            throw new Error('[상세페이지] 제목은 필수 항목입니다.');
        }

        if(selectedDetailPage.imageUrl === null || !selectedDetailPage.imageUrl) {
            throw new Error('[상세페이지] 이미지는 필수 항목입니다.')
        }

        if(selectedDetailPage.imageFileName === null || !selectedDetailPage.imageFileName) {
            throw new Error('[상세페이지] 이미지는 필수 항목입니다.')
        }
    }

    return {
        detailPages,
        selectedDetailPage,

        reqSearchBatchByProductId,
        onChangeSelectedData,
        onChangeImageInfoOfSelectedData,
        onActionRemoveImageOfSelectedData,
        onChangeValueOfName,
        onActionAddData,
        reqCreateOne,
        checkSaveForm,
        onActionRemoveData,
        reqDeleteOne,
        reqChangeOne
    }
}