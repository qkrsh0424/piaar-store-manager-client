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

        dispatchReturnProductImageList({
            type: 'INIT_DATA',
            payload: props.returnProductImageList
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
                productOptionId: props.selectedOrderItem?.productOptionId,
                erpReturnItemId: props.selectedOrderItem?.id
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

        let data = returnProductImageList.filter(r => r.id !== imageId);

        dispatchReturnProductImageList({
            type: 'INIT_DATA',
            payload: data
        })

        props.onActionRemoveReturnProductImageFile(imageId);
    }


    const onSubmitCreateReturnProductImage = (e) => {
        e.preventDefault();

        props.onActionAddReturnProductImage(returnProductImageList);
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