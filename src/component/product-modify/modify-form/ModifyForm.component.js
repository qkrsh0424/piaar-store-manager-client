import CategorySelectorFieldView from "./CategorySelectorField.view";
import { Container, PageTitleFieldWrapper } from "./ModifyForm.styled";
import OptionInfoInputFieldView from "./OptionInfoInputField.view";
import ProductInfoInputFieldView from "./ProductInfoInputField.view";
import { useEffect, useReducer } from "react";
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./ButtonField.view";
import { useState } from "react";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateOptionDefaultNameModalComponent from "./modal/create-option-default-name-modal/CreateOptionDefaultNameModal.component";
import useRouterHook from "../../../hooks/router/useRouterHook";
import useProductHook from "../../../hooks/product/useProductHook";
import useProductOptionsHook from "../../../hooks/product-option/useProductOptionsHook";
import useProductOptionBatchRegHook from "../hooks/useProductOptionBatchRegHook";
import useBatchRegTooltipHook from "../hooks/useBatchRegTooltipHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const ModifyFormComponent = (props) => {
    const [slideDownEffect, dispatchSlideDownEffect] = useReducer(slideDownEffectReducer, initialSlideDownEffect);
    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);

    const {
        navigatePrevPage
    } = useRouterHook();

    const {
        product: modifyProductData,
        onChangeValueOfName: onChangeProductInputValue,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData: checkProductCreateFormData,
        onActionUpdateProduct
    } = useProductHook();

    const {
        options: modifyOptionDataList,
        onChangeValueOfNameById: onChangeOptionInputValue,
        onActionAddData: onActionAddOptionData,
        onActionDeleteById: onActionDeleteOptionById,
        onActionUpdateOptions,
        checkCreateFormData: checkProductOptionCreateFormData,
    } = useProductOptionsHook();

    const {
        productOptionBatchReg,
        onChangeValueOfName: onChangeProductOptionBatchRegInputValue,
        returnConvertedOptions: returnConvertedOptionsByProductOptionBatchReg
    } = useProductOptionBatchRegHook();

    const {
        __reqUploadImageFile
    } = useImageFileUploaderHook();

    const {
        batchRegTooltipOpen,
        batchRegInput,
        onActionOpenBatchRegToolTip,
        onActionCloseBatchRegTooltip,
        onChangeBatchRegInput
    } = useBatchRegTooltipHook();

    useEffect(() => {
        function setProductAndOptions() {
            let product = props.productAndOptions.product;
            let options = props.productAndOptions.options || [];

            onActionUpdateProduct(product);
            onActionUpdateOptions([...options]);
        }

        if(!props.productAndOptions) {
            return;
        }
        setProductAndOptions();
    }, [props.productAndOptions])

    const __hanlde = {
        action: {
            openOptionDefaultNameCreateModal: (e) => {
                e.stopPropagation();

                setOptionDefaultNameCreateModalOpen(true);
            },
            closeOptionDefaultNameCreateModal: () => {
                setOptionDefaultNameCreateModalOpen(false);
            },
            cancelCreateProduct: () => {
                if(window.confirm('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                    navigatePrevPage();
                }
            },
            uploadProductImageFile: async (e) => {
                e.preventDefault();
        
                if(e.target.files.length == 0) return;
        
                props.onActionOpenBackdrop();
                let imageInfo = await __reqUploadImageFile(e);
                props.onActionCloseBackdrop();
        
                onChangeImageFileNameAndImageUrl(imageInfo);
            },
            removeProductImage: () => {
                onActionDeleteImageFileNameAndImageUrl();
            },
            changeStockManagement: (e) => {
                e.preventDefault();
        
                let stockManagement = modifyProductData.stockManagement;
                let target = {
                    name: 'stockManagement',
                    value: !stockManagement
                }
                onChangeProductInputValue({target});
            },
            changeProductOptionBatchRegValue: (data) => {
                let batchRegOptionDefaultName = productOptionBatchReg.defaultName ? (productOptionBatchReg.defaultName + ',' + data) : data;
                let target = {
                    name: 'defaultName',
                    value: batchRegOptionDefaultName
                }
        
                onChangeProductOptionBatchRegInputValue({ target });
            },
            // 옵션 리스트 적용
            addOptionDataListByBatchRegData: (e) => {
                e.preventDefault();
        
                let addOptionList = returnConvertedOptionsByProductOptionBatchReg();
                if(addOptionList){
                    let createOptionList = [...modifyOptionDataList, ...addOptionList];
                    onActionUpdateOptions(createOptionList);
                }
            },
            changeSlideEffectControl: (e, target) => {
                e.stopPropagation();
                let targetValue = slideDownEffect[target];
        
                dispatchSlideDownEffect({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: target,
                        value: !targetValue
                    }
                })
            },
            resetProductAndOptions: (e) => {
                e.preventDefault();

                if(window.confirm('기존 상품 정보로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다)')) {
                    let product = props.productAndOptions.product;
                    let options = props.productAndOptions.options || [];
    
                    onActionUpdateProduct(product);
                    onActionUpdateOptions([...options]);
                }
            },
            confirmBatchRegInput: (e) => {
                e.preventDefault();

                let name = e.target.name;

                let data = modifyOptionDataList.map(r => {
                    return {
                        ...r,
                        [name]: batchRegInput[name]
                    }
                })

                onActionUpdateOptions(data);
                onActionCloseBatchRegTooltip(e);
            }
        },
        submit: {
            modifyProductAndOptions: (e) => {
                e.preventDefault();
        
                try {
                    checkProductCreateFormData();
                    checkProductOptionCreateFormData();

                    let body = {
                        product: modifyProductData,
                        options: modifyOptionDataList
                    }
                    props._onSubmit_modifyProductAndOptions(body);
                } catch (err) {
                    alert(err.message)
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'상품 수정'} />

            <form onSubmit={__hanlde.submit.modifyProductAndOptions}>
                <CategorySelectorFieldView
                    categoryList={props.categoryList}
                    modifyProductData={modifyProductData}
                    slideDownEffect={slideDownEffect}

                    onChangeProductInputValue={onChangeProductInputValue}
                    onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                />

                {modifyProductData &&
                    <ProductInfoInputFieldView
                        modifyProductData={modifyProductData}
                        slideDownEffect={slideDownEffect}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                        onActionUploadProductImageFile={__hanlde.action.uploadProductImageFile}
                        onActionRemoveImage={__hanlde.action.removeProductImage}
                        onActionChangeStockManagement={__hanlde.action.changeStockManagement}
                    />
                }

                {modifyOptionDataList && productOptionBatchReg &&
                    <OptionInfoInputFieldView
                        modifyOptionDataList={modifyOptionDataList}
                        productOptionBatchReg={productOptionBatchReg}
                        slideDownEffect={slideDownEffect}
                        batchRegTooltipOpen={batchRegTooltipOpen}
                        batchRegInput={batchRegInput}

                        onChangeOptionInputValue={onChangeOptionInputValue}
                        onActionAddOptionData={onActionAddOptionData}
                        onActionDeleteOption={onActionDeleteOptionById}
                        onChangeBatchRegOptionInputValue={onChangeProductOptionBatchRegInputValue}
                        onActionAddOptionDataListByBatchRegData={__hanlde.action.addOptionDataListByBatchRegData}
                        onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                        onActionOpenOptionDefaultNameCreateModal={__hanlde.action.openOptionDefaultNameCreateModal}
                        onActionOpenBatchRegToolTip={onActionOpenBatchRegToolTip}
                        onChangeBatchRegInput={onChangeBatchRegInput}
                        onActionConfirmBatchRegInput={__hanlde.action.confirmBatchRegInput}
                        onActionCloseBatchRegTooltip={onActionCloseBatchRegTooltip}
                    />
                }

                <CreateButtonFieldView
                    onActionCancelCreateProduct={__hanlde.action.cancelCreateProduct}
                    onActionResetProductAndOptions={__hanlde.action.resetProductAndOptions}
                />
            </form>

            <CommonModalComponent
                open={optionDefaultNameCreateModalOpen}
                maxWidth={'sm'}
                fullWidth={true}

                onClose={__hanlde.action.closeOptionDefaultNameCreateModal}
            >
                <CreateOptionDefaultNameModalComponent
                    onActionCloseOptionDefaultNameCreateModal={__hanlde.action.closeOptionDefaultNameCreateModal}
                    onChangeBatchRegOptionDefaultNameInputValue={__hanlde.action.changeProductOptionBatchRegValue}
                />
            </CommonModalComponent>
        </Container>
    )
}

export default ModifyFormComponent;

const initialSlideDownEffect = {
    category: true,
    product: true,
    option: true
}

const slideDownEffectReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialSlideDownEffect;
        default: return initialSlideDownEffect;
    }
}