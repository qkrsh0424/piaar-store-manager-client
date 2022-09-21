import { imageFileUploaderDataConnect } from "../../data_connect/imageFileUploaderDataConnect";

const useImageFileUploaderHook = () => {
    /**
     * Upload iamge file and Get image info.
     * 
     * @param {Object} e 
     * @returns {Object} imageData
     */
    const __reqUploadImageFile = async (e) => {
        return await imageFileUploaderDataConnect().postToCloud(e)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    let imageData = res.data.data[0];
                    imageData = {
                        // ...imageData,
                        imageFileName: imageData.fileName,
                        imageUrl: imageData.fileUploadUri
                    }
                    return imageData;
                }
            })
            .catch(err => {
                let res = err.response;

                if(res.status === 500) {
                    alert(res.data.memo);
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqUploadBatchImageFile = async (e) => {
        return await imageFileUploaderDataConnect().postBatchToCloud(e)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    let imageData = res.data.data;
                    let imageDataList = imageData?.map(img => {
                        return {
                            imageFileName: img.fileName,
                            imageUrl: img.fileUploadUri
                        }
                    });
                    return imageDataList;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res.status === 500) {
                    alert('undefined error');
                }
                alert(res.data.memo);
            })
    }

    return {
        __reqUploadImageFile: __reqUploadImageFile,
        __reqUploadBatchImageFile: __reqUploadBatchImageFile
    }
}

export { useImageFileUploaderHook };