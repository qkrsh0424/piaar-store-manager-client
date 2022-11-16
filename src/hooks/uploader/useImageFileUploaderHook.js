import { imageFileDownloadDataConnect } from "../../data_connect/imageFileDownloadDataConnect";
import { imageFileUploaderDataConnect } from "../../data_connect/imageFileUploaderDataConnect";
import { dateToYYMMDDhhmmss } from "../../utils/dateFormatUtils";

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

    // const __reqDownloadImageFile = async (url, fileName) => {
    //     fetch(url, { method: 'GET' })
    //             .then(res => {
    //                 return res.blob();
    //             })
    //             .then(blob => {
    //                 const url = window.URL.createObjectURL(blob);
    //                 const link = document.createElement('a');
    //                 link.href = url;

    //                 let date = dateToYYMMDDhhmmss(new Date());

    //                 link.download = '[' + date + ']' + fileName + '.png';
    //                 document.body.appendChild(link);
    //                 link.click();

    //                 setTimeout((_) => {
    //                     window.URL.revokeObjectURL(url) // 해당 url 사용 제한
    //                 }, 60000);
                    
    //                 link.remove();
    //             }).catch(err => {
    //                 alert('다운로드 오류. 재시도 해주세요.');
    //             })
    // }

    const __reqDownloadImageFile = async (body) => {
        return await imageFileDownloadDataConnect().downloadByCloud(body)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                let date = dateToYYMMDDhhmmss(new Date());

                link.setAttribute('download', '[' + date + ']' + body.title + '.png');
                document.body.appendChild(link);
                link.click();
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
        __reqUploadImageFile,
        __reqUploadBatchImageFile,
        __reqDownloadImageFile
    }
}

export { useImageFileUploaderHook };