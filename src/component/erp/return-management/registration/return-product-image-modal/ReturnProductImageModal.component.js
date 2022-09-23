import { useEffect, useReducer } from "react";
import { useImageFileUploaderHook } from "../../../../../hooks/uploader/useImageFileUploaderHook";
import HeaderFieldView from "./HeaderField.view";
import ImageFieldView from "./ImageField.view";
import { Container, InfoTextFieldWrapper } from "./ReturnProductImageModal.styled";
import { v4 as uuidv4 } from 'uuid';
import ButtonFieldView from "./ButtonField.view";

export function InfoFieldView(props) {
    return (
        <InfoTextFieldWrapper>
            <div className='info-box'>
                {props.element}
            </div>
        </InfoTextFieldWrapper>
    )
}

const ReturnProductImageModalComponent = (props) => {
    const [returnProductImageList, dispatchReturnProductImageList] = useReducer(returnProductImageListReducer, initialReturnProductImageList);

    const {
        __reqUploadBatchImageFile: __reqUploadBatchImageFile
    } = useImageFileUploaderHook();

    useEffect(() => {
        if (!(props.returnProductImageList && props.returnProductImageList.length > 0)) {
            return;
        }

        // 반품 이미지 업데이트된 경우, 수정된 데이터와 현재 모달창에서 추가된 데이터를 함께 보여줘야 함.
        let updatedImageList = [...props.returnProductImageList];
        
        if(returnProductImageList && returnProductImageList.length > 0) {
            let savedImageIds = updatedImageList.map(r => r.id);
            let newImage = returnProductImageList.filter(r => !savedImageIds.includes(r.id));
            updatedImageList = [...updatedImageList, ...newImage];
        }

        dispatchReturnProductImageList({
            type: 'INIT_DATA',
            payload: updatedImageList
        })
    }, [props.returnProductImageList])

    const onActionClickReturnProductImageButton = () => {
        document.getElementById("rpi_uploader").click();
    }

    const onActionUploadReturnProductImageFile = async (e) => {
        e.preventDefault();

        if(e.target.files.length === 0) return;

        let imageInfo = await __reqUploadBatchImageFile(e);
        
        let addData = imageInfo?.map(info => {
            return {
                id: uuidv4(),
                imageUrl: info.imageUrl,
                imageFileName: info.imageFileName,
                productOptionId: props.selectedReturnItem?.productOptionId,
                erpReturnItemId: props.selectedReturnItem?.id
            }
        });

        let data = [...returnProductImageList, ...addData];

        dispatchReturnProductImageList({
            type: 'INIT_DATA',
            payload: data
        });
    }

    const onActionRemoveReturnProductImageFile = (imageId) => {
        if(!window.confirm('선택된 이미지를 제거하시겠습니까?')) {
            return;
        }

        let isStoredImage = props.returnProductImageList?.some(r => r.id === imageId);
        
        if(isStoredImage) {
            onActionDeleteReturnProductImage(imageId);
        } else {
            let data = returnProductImageList.filter(r => r.id !== imageId);

            dispatchReturnProductImageList({
                type: 'INIT_DATA',
                payload: data
            })
        }
    }

    const onActionDeleteReturnProductImage = (id) => {
        let data = returnProductImageList.filter(r => r.id !== id);
        dispatchReturnProductImageList({ 
            type: 'INIT_DATA',
            payload: data
        });

        props.onActionDeleteReturnProductImage(id);

    }

    const onSubmitCreateReturnProductImage = (e) => {
        e.preventDefault();

        let savedImageIds = props.returnProductImageList.map(r => r.id);
        let newImageList = returnProductImageList.filter(r => !savedImageIds.includes(r.id));
        
        if(newImageList.length > 0) {
            props.onSubmitCreateReturnProductImage(newImageList);
        }

        props.onActionCloseReturnProductImageModal();
    }

    return (
        <>
            <Container>
                <HeaderFieldView
                    element={'반품 상세 사진'}
                ></HeaderFieldView>
                <form onSubmit={onSubmitCreateReturnProductImage}>
                    <ButtonFieldView
                        onActionClickReturnProductImageButton={onActionClickReturnProductImageButton}
                        onActionUploadReturnProductImageFile={onActionUploadReturnProductImageFile}
                    ></ButtonFieldView>
                    <InfoFieldView element={'* 이미지를 클릭하여 제거'}/>
                    <ImageFieldView
                        returnProductImageList={returnProductImageList}
                        onActionRemoveReturnProductImageFile={(id) => onActionRemoveReturnProductImageFile(id)}
                    ></ImageFieldView>
                </form>
            </Container>
        </>
    )
}

export default ReturnProductImageModalComponent;

const initialReturnProductImageList = [];

const returnProductImageListReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialReturnProductImageList;
        default: return initialReturnProductImageList;
    }
}