import { useEffect, useReducer } from "react";

import { Container } from "./CreateProductOptionModal.styled";
import HeaderFieldView from "./HeaderField.view";
import ImageSelectorFieldView from "./ImageSelectorField.view";
import OptionInfoFormFieldView from "./OptionInfoFormField.view";

const CreateProductOptionModalComponent = (props) => {
    const [createOption, dispatchCreateOption] = useReducer(createOptionReducer, initialCreateOption);

    useEffect(() => {
        if(props.createProductOptionData) {
            dispatchCreateOption({
                type: 'INIT_DATA',
                payload: props.createProductOptionData
            });
        }

    }, [props.createProductOptionData])

    useEffect(() => {
        if(props.uploadedImageData) {
            dispatchCreateOption({
                type: 'SET_DATA',
                payload: {
                    name: "imageFileName",
                    value: props.uploadedImageData.imageFileName,
                }
            });
    
            dispatchCreateOption({
                type: 'SET_DATA',
                payload: {
                    name: "imageUrl",
                    value: props.uploadedImageData.imageUrl
                }
            });
        }
    }, [props.uploadedImageData]);

    const onChangeInputValue = (e) => {
        dispatchCreateOption({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionClickProductImageButton = () => {
        document.getElementById("cpom_i_uploader").click();
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props.onActionUploadImage(e);
    }

    const onActionDeleteProductImageFile = () => {
        dispatchCreateOption({
            type: "SET_DATA",
            payload: {
                name : "imageFileName",
                value: ""
            }
        });

        dispatchCreateOption({
            type: "SET_DATA",
            payload: {
                name : "imageUrl",
                value: ""
            }
        });
    }

    const onSubmitCreateProductOption = async (e) => {
        e.preventDefault();

        if (checkRequiredData()) {
            await props.onActionCreateProductOption(createOption);
        } else {
            return;
        }
    }

    const checkRequiredData = () => {
        if (createOption.defaultName == null || createOption.defaultName == undefined || createOption.defaultName == '') {
            alert('상품명은 필수항목입니다.');
            return false;
        }

        if (createOption.managementName == null || createOption.managementName == undefined || createOption.managementName == '') {
            alert('관리상품명은 필수항목입니다.');
            return false;
        }

        if (createOption.code == null || createOption.code == undefined || createOption.code == '') {
            alert('관리코드는 필수항목입니다.');
            return false;
        }
        return true;
    }


    return (
        createOption &&
        <Container>
            <HeaderFieldView
                onActionCloseCreateProductOptionModal={() => props.onActionCloseCreateProductOptionModal()}
            ></HeaderFieldView>

            <form onSubmit={(e) => onSubmitCreateProductOption(e)}>
                <ImageSelectorFieldView
                    createOption={createOption}

                    onActionClickProductImageButton={() => onActionClickProductImageButton()}
                    onActionUploadProductImageFile={(e) => onActionUploadProductImageFile(e)}
                    onActionDeleteProductImageFile={() => onActionDeleteProductImageFile()}
                ></ImageSelectorFieldView>

                <OptionInfoFormFieldView
                    createOption={createOption}

                    onChangeInputValue={(e) => onChangeInputValue(e)}
                ></OptionInfoFormFieldView>
                <div>
                    <button type="submit" className="submit-btn" disabled={props.submitCheck}>등록</button>
                </div>
            </form>
        </Container>
    )
}

export default CreateProductOptionModalComponent;

const initialCreateOption = null;

const createOptionReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialCreateOption;
        default: return initialCreateOption;
    }
}
