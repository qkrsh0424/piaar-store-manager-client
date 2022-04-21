import { useNavigate } from 'react-router-dom';

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

const ProductCreateFormComponent = (props) => {
    const navigate = useNavigate();

    const onActionClickProductImageButton = () => {
        document.getElementById("i_pm_cb_uploader").click();
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props._onSubmit_uploadProdImageFile(e);
    }

    const onActionDeleteProductImageFile = () => {
        let iamgeFileName = {
            name: "imageFileName",
            value: ""
        }

        let imageUrl = {
            name: "imageUrl",
            value: ""
        }

        props._onAction_changeProductInputValue(iamgeFileName);
        props._onAction_changeProductInputValue(imageUrl);
    }

    const onActionClickOptionImageButton = (optionId) => {
        document.getElementById("i_pm_cb_po_uploader_" + optionId).click();
    }

    const onActionUploadOptionImageFile = async (e, optionId) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props._onSubmit_uploadOptionImageFile(e, optionId);
    }

    const onActionDeleteOptionImageFile = (optionId) => {
        let productOptions = props.createProductData.productOptions?.map(option => {
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

        props._onAction_changeProductOption(productOptions);
    }

    const onActionDeleteOptionData = (optionId) => {
        if(props.createProductData.productOptions.length === 1) {
            alert('삭제가 불가능합니다.');
            return;
        }
        props._onAction_deleteProductOption(optionId);
    }

    const onActionCreateProductOption = () => {
        props._onAction_createProductOption();
    }

    const onChangeStockReflectedSelector = () => {
        props._onAction_stockReflectedSelector();
    }

    const onChangeCategoryCidValue = (categoryCid) => {
        props._onAction_selectProductCategory(categoryCid);
    }

    const onSubmitCreateProductAndOptions = async (e) => {
        e.preventDefault();

        if(checkFormData()) {
            await props._onSubmit_createProductAndOptions();
        }
    }

    const onChangeProductInputValue = (e) => {
        let value = e.target;
        props._onAction_changeProductInputValue(value);
    };

    const onChangeOptionInputValue = (e, optionId) => {
        let productOptions = props.createProductData.productOptions?.map(option => {
            if(option.id === optionId){
                return {
                    ...option,
                    [e.target.name]: e.target.value
                }
            }else {
                return option;
            }
        });

        props._onAction_changeProductOption(productOptions);
    };

    const checkFormData = () => {
        if (props.createProductData.productCategoryCid == null) {
            alert('상품의 카테고리를 한번더 확인해 주세요.')
            return false;
        }

        if (props.createProductData.defaultName == '' || props.createProductData.defaultName == null || props.createProductData.defaultName == undefined) {
            alert('상품명을 한번더 확인해 주세요.')
            return false;
        }

        if (props.createProductData.managementName == '' || props.createProductData.managementName == null || props.createProductData.managementName == undefined) {
            alert('상품관리명을 한번더 확인해 주세요.')
            return false;
        }

        for (let i = 0; i < props.createProductData.productOptions.length; i++) {
            let option = props.createProductData.productOptions[i];

            if (option.defaultName == '' || option.defaultName == null || option.defaultName == undefined) {
                alert('옵션명을 한번더 확인해 주세요.')
                return false;
            }

            if (option.managementName == '' || option.managementName == null || option.managementName == undefined) {
                alert('옵션관리명을 한번더 확인해 주세요.')
                return false;
            }

            for(var j = 0; i < option.optionPackages?.length; i++) {
                if(option.optionPackages[j].originOptionCode === null || option.optionPackages[j].originOptionCode ===undefined || option.optionPackages[j].originOptionCode === '') {
                    alert('옵션패키지 구성상품을 선택해주세요.');
                    return false;
                }
        
                if(option.optionPackages[j].originOptionId === null || option.optionPackages[j].originOptionId === undefined || option.optionPackages[j].originOptionId === '') {
                    alert('옵션패키지 구성상품을 선택해주세요.');
                    return false;
                }
            }
        }
        return true;
    }

    const onActionCreateOptionPackage = (optionId) => {
        props._onAction_createOptionPackage(optionId);
    }

    const onChangePackageInputValue = (e, optionId, packageId) => {
        let optionPackages = props.createProductData.productOptions?.filter(option => option.id === optionId)[0].optionPackages.map(optionPackage => {
            if(optionPackage.id === packageId) {
                return {
                    ...optionPackage,
                    [e.target.name] : e.target.value
                }
            }else {
                return optionPackage;
            }
        });

        props._onAction_changeOptionPackage(optionId, optionPackages);
    };

    const onActionDeleteOptionPackage = (optionId, packageId) => {
        props._onAction_deleteOptionPakcage(optionId, packageId);
    }

    return (
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
                        createProductData={props.createProductData}

                        onChangeStockReflectedSelector={() => onChangeStockReflectedSelector()}
                    ></StockReflectedSelectorFieldView>
                    <CategorySelectorFieldView
                        createProductData={props.createProductData}
                        categoryList={props.categoryList}

                        onChangeCategoryCidValue={(categoryCid) => onChangeCategoryCidValue(categoryCid)}
                    ></CategorySelectorFieldView>
                    <ImageSelectorFieldView
                        createProductData={props.createProductData}

                        onActionClickProductImageButton={() => onActionClickProductImageButton()}
                        onActionUploadProductImageFile={(e) => onActionUploadProductImageFile(e)}
                        onActionDeleteProductImageFile={() => onActionDeleteProductImageFile()}
                    ></ImageSelectorFieldView>
                    <DefaultInfoFieldView
                        createProductData={props.createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></DefaultInfoFieldView>
                    <CodeInfoFieldView
                        createProductData={props.createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></CodeInfoFieldView>
                    <ImportInfoFieldView
                        createProductData={props.createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></ImportInfoFieldView>
                    <DefaultDetailInfoFieldView
                        createProductData={props.createProductData}

                        onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                    ></DefaultDetailInfoFieldView>

                    {/* 옵션 정보 */}
                    <OptionHeaderFieldView></OptionHeaderFieldView>

                    <OptionContainer>
                        <OptionInfoFieldView
                            createOptionList={props.createProductData.productOptions}
                            optionList={props.optionList}

                            onActionClickOptionImageButton={(optionId) => onActionClickOptionImageButton(optionId)}
                            onActionUploadOptionImageFile={(e, optionId) => onActionUploadOptionImageFile(e, optionId)}
                            onActionDeleteOptionImageFile={(optionId) => onActionDeleteOptionImageFile(optionId)}
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
