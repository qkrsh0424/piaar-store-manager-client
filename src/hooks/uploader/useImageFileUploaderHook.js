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
                        ...imageData,
                        imageFileName: imageData.fileName,
                        imageUrl: imageData.fileUploadUri
                    }
                    return imageData;
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    return {
        __reqUploadImageFile: __reqUploadImageFile
    }
}

export { useImageFileUploaderHook };