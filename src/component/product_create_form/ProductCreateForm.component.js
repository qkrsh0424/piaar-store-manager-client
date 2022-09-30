import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useImageFileUploaderHook } from '../../hooks/uploader/useImageFileUploaderHook';
import CategorySelectorFieldView from './CategorySelectorField.view';
import CodeInfoFieldView from './CodeInfoField.view';
import DefaultDetailInfoFieldView from './DefaultDetailInfoField.view';
import DefaultInfoFieldView from './DefaultInfoField.view';
import ImageSelectorFieldView from './ImageSelectorField.view';
import ImportInfoFieldView from './ImportInfoField.view';
import OptionHeaderFieldView from './OptionHeaderField.view';
import OptionInfoFieldView from './OptionInfoField.view';

import { Container, FormContainer, OptionContainer} from "./ProductCreateForm.styled";
import StockReflectedSelectorFieldView from './StockReflectedSelectorField.view';

class ProductOption {
    constructor(productId, optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.nosUniqueCode = '';
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.releaseLocation = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unitCny = '';
        this.unitKrw = '';
        this.totalPurchasePrice = 0;
        this.packageYn = 'n';
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            nosUniqueCode: this.nosUniqueCode,
            salesPrice: this.salesPrice,
            stockUnit: this.stockUnit,
            status: this.status,
            releaseLocation: this.releaseLocation,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.unitKrw,
            totalPurchasePrice: this.totalPurchasePrice,
            packageYn: this.packageYn,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

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

const ProductCreateFormComponent = (props) => {
    const navigate = useNavigate();
    const [createProductData, dispatchCreateProductData] = useReducer(createProductDataReducer, initialCreateProductData);

    const {
        __reqUploadImageFile: __reqUploadImageFile
    } = useImageFileUploaderHook();

    useEffect(() => {
        if(!props.createProductData) {
            return;
        }

        dispatchCreateProductData({
            type: 'SET_DATA',
            payload: props.createProductData
        })
    }, [props.createProductData])

    const onActionClickProductImageButton = () => {
        document.getElementById("i_pm_cb_uploader").click();
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;

        props.onActionOpenBackdrop();
        let imageInfo = await __reqUploadImageFile(e);
        props.onActionCloseBackdrop();

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : "imageFileName",
                value: imageInfo.imageFileName
            }
        });

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : "imageUrl",
                value: imageInfo.imageUrl
            }
        });
    }

    const onActionDeleteProductImageFile = () => {
        dispatchCreateProductData({
            type: "CHANGE_DATA",
            payload: {
                name: "imageFileName",
                value: ""
            }
        });

        dispatchCreateProductData({
            type: "CHANGE_DATA",
            payload: {
                name: "imageUrl",
                value: ""
            }
        });
    }

    const onActionClickOptionImageButton = (optionId) => {
        document.getElementById("i_pm_cb_po_uploader_" + optionId).click();
    }

    const onActionUploadOptionImageFile = async (e, optionId) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;

        props.onActionOpenBackdrop();
        let imageInfo = await __reqUploadImageFile(e);
        props.onActionCloseBackdrop();

        let productOptions = createProductData.productOptions?.map(r => {
            if(r.id === optionId) {
                return {
                    ...r,
                    imageFileName: imageInfo.imageFileName,
                    imageUrl: imageInfo.imageUrl
                }
            } else {
                return r;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    }

    const onActionDeleteOptionImageFile = (optionId) => {
        let productOptions = createProductData.productOptions?.map(option => {
            if(option.id === optionId){
                return {
                    ...option,
                    imageFileName: "",
                    imageUrl: ""
                }
            }else {
                return option;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    }
    
    const onActionDeleteOptionData = (optionId) => {
        if(createProductData.productOptions.length === 1) {
            alert('삭제가 불가능합니다.');
            return;
        }

        let productOptions = createProductData.productOptions?.filter(option => option.id !== optionId);;

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    }

    const onActionCreateProductOption = () => {
        let data = createProductData.productOptions;
        data.push(new ProductOption(createProductData.id).toJSON());

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: data
        });
    }

    const onChangeStockReflectedSelector = () => {
        let stockManagement = !createProductData.stockManagement;

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "stockManagement",
                value: stockManagement
            }
        });
    }

    const onSubmitCreateProductAndOptions = async (e) => {
        e.preventDefault();

        if(checkFormData()) {
            await props._onSubmit_createProductAndOptions(createProductData);
        }
    }

    const onChangeProductInputValue = (e) => {
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onChangeOptionInputValue = (e, optionId) => {
        let productOptions = createProductData.productOptions?.map(option => {
            if(option.id === optionId){
                return {
                    ...option,
                    [e.target.name]: e.target.value
                }
            }else {
                return option;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    };

    const checkFormData = () => {
        if (createProductData.productCategoryCid == null) {
            alert('상품의 카테고리를 한번더 확인해 주세요.')
            return false;
        }

        if (createProductData.defaultName == '' || createProductData.defaultName == null || createProductData.defaultName == undefined) {
            alert('상품명을 한번더 확인해 주세요.')
            return false;
        }

        if (createProductData.managementName == '' || createProductData.managementName == null || createProductData.managementName == undefined) {
            alert('상품설명을 한번더 확인해 주세요.')
            return false;
        }

        for (let i = 0; i < createProductData.productOptions.length; i++) {
            let option = createProductData.productOptions[i];

            if (option.defaultName == '' || option.defaultName == null || option.defaultName == undefined) {
                alert('옵션명을 한번더 확인해 주세요.')
                return false;
            }

            if (option.managementName == '' || option.managementName == null || option.managementName == undefined) {
                alert('옵션설명을 한번더 확인해 주세요.')
                return false;
            }

            for(var j = 0; j < option.optionPackages?.length; j++) {
                let optionPackages = option.optionPackages[j];
                
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
        }
        return true;
    }

    const onActionCreateOptionPackage = (optionId) => {
        let optionData = createProductData.productOptions.filter(r => r.id === optionId)[0];
        
        let packageList = optionData.optionPackages ?? [];

        optionData = {
            ...optionData,
            optionPackages: packageList
        }

        let data = optionData.optionPackages;
        data.push(new OptionPackage(optionData.id).toJSON());

        let productOptions = createProductData.productOptions.map(r => {
            if(r.id === optionId) {
                return{
                    ...r,
                    optionPackages: data
                }
            }else{
                return r;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    }

    const onChangePackageInputValue = (e, optionId, packageId) => {
        let optionPackages = createProductData.productOptions?.filter(option => option.id === optionId)[0].optionPackages?.map(optionPackage => {
            if (optionPackage.id === packageId) {
                return {
                    ...optionPackage,
                    [e.target.name]: e.target.value
                }
            } else {
                return optionPackage;
            }
        });
        
        // set option code of option package
        if(e.target.name === "originOptionId"){
            optionPackages = optionPackages.map(r => {
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

        let productOptions = createProductData.productOptions?.map(option => {
            if (option.id === optionId) {
                return {
                    ...option,
                    optionPackages : optionPackages
                }
            } else {
                return option;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        })
    };

    const onActionDeleteOptionPackage = (optionId, packageId) => {
        let productOptions = createProductData.productOptions.map(option => {
            if(option.id === optionId) {
                let data = option.optionPackages?.filter(r => r.id !== packageId);
                if(data.length === 0) {
                    delete option.optionPackages;
                    return option;
                }else{
                    return{
                        ...option,
                        optionPackages: data
                    }
                }
            }else {
                return option;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        })
    }

    return (
        createProductData && 
        <Container>
            <button className="back-btn" onClick={() => navigate(-1)}>
                <img className='back-button-img' src='/images/icon/back-button.png'></img>
            </button>

            <FormContainer className="container">
                <form onSubmit={(e) => onSubmitCreateProductAndOptions(e)}>
                    <button type='submit' className="sumbit-btn" 
                    disabled={props.isSubmit}
                    >
                        <img className='button-img' src='/images/icon/add.png'></img>
                    </button>
                    
                    <StockReflectedSelectorFieldView
                        createProductData={createProductData}

                        onChangeStockReflectedSelector={() => onChangeStockReflectedSelector()}
                    ></StockReflectedSelectorFieldView>
                    <CategorySelectorFieldView
                        createProductData={createProductData}
                        categoryList={props.categoryList}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></CategorySelectorFieldView>
                    <ImageSelectorFieldView
                        createProductData={createProductData}
                        
                        onActionClickProductImageButton={() => onActionClickProductImageButton()}
                        onActionUploadProductImageFile={(e) => onActionUploadProductImageFile(e)}

                        onActionDeleteProductImageFile={() => onActionDeleteProductImageFile()}
                    ></ImageSelectorFieldView>
                    <DefaultInfoFieldView
                        createProductData={createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></DefaultInfoFieldView>
                    <CodeInfoFieldView
                        createProductData={createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></CodeInfoFieldView>
                    <ImportInfoFieldView
                        createProductData={createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></ImportInfoFieldView>
                    <DefaultDetailInfoFieldView
                        createProductData={createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></DefaultDetailInfoFieldView>

                    {/* 옵션 정보 */}
                    <OptionHeaderFieldView></OptionHeaderFieldView>

                    <OptionContainer>
                        <OptionInfoFieldView
                            createOptionList={createProductData.productOptions}
                            optionList={props.optionList}

                            onActionClickOptionImageButton={(optionId) => onActionClickOptionImageButton(optionId)}
                            onActionDeleteOptionImageFile={(optionId) => onActionDeleteOptionImageFile(optionId)}
                            onActionUploadOptionImageFile={(e, optionId) => onActionUploadOptionImageFile(e, optionId)}
                            onChangeOptionInputValue={(e, optionId) => onChangeOptionInputValue(e, optionId)}
                            onActionDeleteOptionData={(optionId) => onActionDeleteOptionData(optionId)}
                            onActionCreateProductOption={() => onActionCreateProductOption()}
                            onActionCreateOptionPackage={(optionId) => onActionCreateOptionPackage(optionId)}
                            onChangePackageInputValue={(e, optionId, packageId) => onChangePackageInputValue(e, optionId, packageId)}
                            onActionDeleteOptionPackage={(optionId, packageId) => onActionDeleteOptionPackage(optionId, packageId)}
                        ></OptionInfoFieldView>
                    </OptionContainer>
                </form>
            </FormContainer>
        </Container>
    )
}

export default ProductCreateFormComponent;

const initialCreateProductData = null;

const createProductDataReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return {...action.payload};
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'SET_OPTION': 
            return {
                ...state,
                'productOptions': action.payload
            }
        case 'CLEAR':
            return initialCreateProductData;
        default: return initialCreateProductData;
    }
}
