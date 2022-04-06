import { useEffect, useReducer } from "react";

import { Container } from "./ModifyProductOptionModal.styled";
import HeaderFieldView from "./HeaderField.view";
import ImageSelectorFieldView from "./ImageSelectorField.view";
import OptionInfoFormFieldView from "./OptionInfoFormField.view";

const ModifyProductOptionModalComponent = (props) => {
    const [modifyOption, dispatchModifyOption] = useReducer(modifyOptionReducer, initialModifyOption);

    useEffect(() => {
        if(props.modifyProductOptionData) {
            dispatchModifyOption({
                type: 'INIT_DATA',
                payload: props.modifyProductOptionData
            });
        }

    }, [props.modifyProductOptionData])

    useEffect(() => {
        if(props.uploadedImageData) {
            dispatchModifyOption({
                type: 'SET_DATA',
                payload: {
                    name: "imageFileName",
                    value: props.uploadedImageData.imageFileName,
                }
            });
    
            dispatchModifyOption({
                type: 'SET_DATA',
                payload: {
                    name: "imageUrl",
                    value: props.uploadedImageData.imageUrl
                }
            });
        }
    }, [props.uploadedImageData]);

    const onChangeInputValue = (e) => {
        dispatchModifyOption({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionClickProductImageButton = () => {
        document.getElementById("mpom_i_uploader").click();
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props.onActionUploadImage(e);
    }

    const onActionDeleteProductImageFile = () => {
        dispatchModifyOption({
            type: "SET_DATA",
            payload: {
                name : "imageFileName",
                value: ""
            }
        });

        dispatchModifyOption({
            type: "SET_DATA",
            payload: {
                name : "imageUrl",
                value: ""
            }
        });
    }

    const onSubmitModifyProductOption = async (e) => {
        e.preventDefault();

        if (checkRequiredData()) {
            await props.onActionModifyProductOption(modifyOption);
        } else {
            return;
        }
    }

    const checkRequiredData = () => {
        if (modifyOption.defaultName == null || modifyOption.defaultName == undefined || modifyOption.defaultName == '') {
            alert('상품명은 필수항목입니다.');
            return false;
        }

        if (modifyOption.managementName == null || modifyOption.managementName == undefined || modifyOption.managementName == '') {
            alert('관리상품명은 필수항목입니다.');
            return false;
        }

        if (modifyOption.code == null || modifyOption.code == undefined || modifyOption.code == '') {
            alert('관리코드는 필수항목입니다.');
            return false;
        }
        return true;
    }


    return (
        modifyOption &&
        <Container>
            <HeaderFieldView
                onActionCloseCreateProductOptionModal={() => props.onActionCloseCreateProductOptionModal()}
            ></HeaderFieldView>

            <form onSubmit={(e) => onSubmitModifyProductOption(e)}>
                <ImageSelectorFieldView
                    modifyOption={modifyOption}

                    onActionClickProductImageButton={() => onActionClickProductImageButton()}
                    onActionUploadProductImageFile={(e) => onActionUploadProductImageFile(e)}
                    onActionDeleteProductImageFile={() => onActionDeleteProductImageFile()}
                ></ImageSelectorFieldView>

                <OptionInfoFormFieldView
                    modifyOption={modifyOption}

                    onChangeInputValue={(e) => onChangeInputValue(e)}
                ></OptionInfoFormFieldView>
                <div>
                    <button type="submit" className="submit-btn" disabled={props.submitCheck}>등록</button>
                </div>
            </form>
        </Container>
    )
}

export default ModifyProductOptionModalComponent;

const initialModifyOption = null;

const modifyOptionReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialModifyOption;
        default: return initialModifyOption;
    }
}
