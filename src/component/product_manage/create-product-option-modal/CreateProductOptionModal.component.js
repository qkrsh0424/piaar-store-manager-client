import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";

import { Container } from "./CreateProductOptionModal.styled";
import HeaderFieldView from "./HeaderField.view";
import ImageSelectorFieldView from "./ImageSelectorField.view";
import OptionInfoFormFieldView from "./OptionInfoFormField.view";

class OptionPackage {
    constructor(parentOptionId) {
        this.id = uuidv4();
        this.packageUnit = 0;
        this.originOptionCode = '';
        this.originOptionCid = null;
        this.originOptionId = '';
        this.parentOptionId = parentOptionId;
    }

    toJSON() {
        return {
            id: this.id,
            packageUnit: this.packageUnit,
            originOptionCode: this.originOptionCode,
            originOptionCid: this.originOptionCid,
            originOptionId: this.originOptionId,
            parentOptionId: this.parentOptionId,
        }
    }
}

const CreateProductOptionModalComponent = (props) => {
    const [createOption, dispatchCreateOption] = useReducer(createOptionReducer, initialCreateOption);

    const {
        __reqUploadImageFile: __reqUploadImageFile
    } = useImageFileUploaderHook();

    useEffect(() => {
        if(props.createProductOptionData) {
            dispatchCreateOption({
                type: 'SET_DATA',
                payload: props.createProductOptionData
            });
        }

    }, [props.createProductOptionData])

    const onChangeInputValue = (e) => {
        dispatchCreateOption({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionClickOptionImageButton = () => {
        document.getElementById("cpom_i_uploader").click();
    }

    const onActionUploadOptionImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length === 0) return;
        
        props.onActionOpenBackdrop();
        let imageInfo = await __reqUploadImageFile(e);
        props.onActionCloseBackdrop();

        dispatchCreateOption({
            type: "CHANGE_DATA",
            payload: {
                name : "imageFileName",
                value: imageInfo.imageFileName
            }
        });

        dispatchCreateOption({
            type: "CHANGE_DATA",
            payload: {
                name : "imageUrl",
                value: imageInfo.imageUrl
            }
        });
    }

    const onActionDeleteOptionImageFile = () => {
        dispatchCreateOption({
            type: "CHANGE_DATA",
            payload: {
                name : "imageFileName",
                value: ""
            }
        });

        dispatchCreateOption({
            type: "CHANGE_DATA",
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
        if (createOption.defaultName === null || createOption.defaultName === undefined || createOption.defaultName === '') {
            alert('상품명은 필수항목입니다.');
            return false;
        }

        if (createOption.managementName === null || createOption.managementName === undefined || createOption.managementName === '') {
            alert('관리상품명은 필수항목입니다.');
            return false;
        }

        for(var i = 0; i < createOption.optionPackages?.length; i++) {
            let optionPackages = createOption.optionPackages[i];

            if(optionPackages.originOptionCode === null || optionPackages.originOptionCode ===undefined || optionPackages.originOptionCode === '') {
                alert('옵션패키지 구성상품을 선택해주세요.');
                return false;
            }
    
            if(optionPackages.originOptionId === null || optionPackages.originOptionId === undefined || optionPackages.originOptionId === '') {
                alert('옵션패키지 구성상품을 선택해주세요.');
                return false;
            }

            if(!optionPackages.packageUnit) {
                alert('옵션패키지 구성상품의 수량을 정확하게 입력해주세요.');
                return false;
            }
        }

        return true;
    }
    
    const onActionCreateOptionPackage = () => {
        let optionData = createOption;
        let packageList = optionData.optionPackages ?? [];
        packageList.push(new OptionPackage(optionData.id).toJSON());

        optionData = {
            ...optionData,
            optionPackages: packageList
        }

        dispatchCreateOption({
            type: 'SET_DATA',
            payload: optionData
        });
    }

    const onChangePackageInputValue = (e, packageId) => {
        let optionData = createOption;

        let changedPackage = optionData.optionPackages?.map(r => {
            if(r.id === packageId) {
                return {
                    ...r,
                    [e.target.name] : e.target.value
                }
            }else {
                return r;
            }
        });

        // set option code of option package
        if(e.target.name === "originOptionId"){
            changedPackage = changedPackage.map(r => {
                let option = props.optionList.filter(option => option.id === r.originOptionId)[0];
                if(option) {
                    return {
                        ...r,
                        originOptionCode: option.code,
                        originOptionCid: option.cid
                    }
                }else {
                    return r;
                }
            });
        }

        optionData = {
            ...optionData,
            optionPackages: changedPackage
        }


        dispatchCreateOption({
            type: 'SET_DATA',
            payload: optionData
        });
    }

    const onActionDeleteOptionPackage = (packageId) => {
        let optionData = {...createOption};
        let data = optionData.optionPackages?.filter(r => r.id !== packageId);
    
        if(data.length === 0) {
            delete optionData.optionPackages;
        } else {
            optionData = {
                ...optionData,
                optionPackages: data
            }
        }

        dispatchCreateOption({
            type: 'SET_DATA',
            payload: optionData
        });
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

                    onActionClickOptionImageButton={() => onActionClickOptionImageButton()}
                    onActionUploadOptionImageFile={(e) => onActionUploadOptionImageFile(e)}
                    onActionDeleteOptionImageFile={() => onActionDeleteOptionImageFile()}
                ></ImageSelectorFieldView>

                <OptionInfoFormFieldView
                    createOption={createOption}
                    optionList={props.optionList}

                    onChangeInputValue={(e) => onChangeInputValue(e)}
                    onActionCreateOptionPackage={() => onActionCreateOptionPackage()}
                    onChangePackageInputValue={(e, packageId) => onChangePackageInputValue(e, packageId)}
                    onActionDeleteOptionPackage={(packageId) => onActionDeleteOptionPackage(packageId)}
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
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialCreateOption;
        default: return initialCreateOption;
    }
}
