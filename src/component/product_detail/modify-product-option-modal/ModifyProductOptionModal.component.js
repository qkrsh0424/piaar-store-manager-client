import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Container } from "./ModifyProductOptionModal.styled";
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

const ModifyProductOptionModalComponent = (props) => {
    const [modifyOption, dispatchModifyOption] = useReducer(modifyOptionReducer, initialModifyOption);

    useEffect(() => {
        if(props.modifyProductOptionData) {
            dispatchModifyOption({
                type: 'SET_DATA',
                payload: props.modifyProductOptionData
            });

            dispatchModifyOption({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'optionPackages',
                    value: props.optionPackage
                }
            })
        }
    }, [props.modifyProductOptionData])

    useEffect(() => {
        if(props.uploadedImageData) {
            dispatchModifyOption({
                type: 'CHANGE_DATA',
                payload: {
                    name: "imageFileName",
                    value: props.uploadedImageData.imageFileName,
                }
            });
    
            dispatchModifyOption({
                type: 'CHANGE_DATA',
                payload: {
                    name: "imageUrl",
                    value: props.uploadedImageData.imageUrl
                }
            });
        }
    }, [props.uploadedImageData]);

    const onChangeInputValue = (e) => {
        dispatchModifyOption({
            type: 'CHANGE_DATA',
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
            type: "CHANGE_DATA",
            payload: {
                name : "imageFileName",
                value: ""
            }
        });

        dispatchModifyOption({
            type: "CHANGE_DATA",
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

        for(var i = 0; i < modifyOption.optionPackages?.length; i++) {
            let optionPackages = modifyOption.optionPackages[i];

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
        let optionData = modifyOption;
        let packageList = optionData.optionPackages ?? [];
        packageList.push(new OptionPackage(optionData.id).toJSON());

        optionData = {
            ...optionData,
            optionPackages: packageList
        }

        dispatchModifyOption({
            type: 'SET_DATA',
            payload: optionData
        });
    }

    const onChangePackageInputValue = (e, packageId) => {
        let optionData = modifyOption;

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

        dispatchModifyOption({
            type: 'SET_DATA',
            payload: optionData
        });
    }

    const onActionDeleteOptionPackage = (packageId) => {
        let optionData = {...modifyOption};
        let data = optionData.optionPackages?.filter(r => r.id !== packageId);
    
        if(data.length === 0) {
            delete optionData.optionPackages;
        } else {
            optionData = {
                ...optionData,
                optionPackages: data
            }
        }

        dispatchModifyOption({
            type: 'SET_DATA',
            payload: optionData
        });
    }

    return (
        modifyOption &&
        <Container>
            <HeaderFieldView
                onActionCloseModifyProductOptionModal={() => props.onActionCloseModifyProductOptionModal()}
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

export default ModifyProductOptionModalComponent;

const initialModifyOption = null;

const modifyOptionReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialModifyOption;
        default: return initialModifyOption;
    }
}
