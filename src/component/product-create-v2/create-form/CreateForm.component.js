import CategorySelectorFieldView from "./CategorySelectorField.view";
import { Container, PageTitleFieldWrapper } from "./CreateForm.styled";
import OptionInfoInputFieldView from "./OptionInfoInputField.view";
import ProductInfoInputFieldView from "./ProductInfoInputField.view";
import { useReducer } from "react";
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./CreateButtonField.view";
import valueUtils from "../../../utils/valueUtils";
import { useState } from "react";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateOptionDefaultNameModalComponent from "./modal/create-option-default-name-modal/CreateOptionDefaultNameModal.component";
import useRouterHook from "../../../hooks/router/useRouterHook";
import useProductHook from "../../../hooks/product/useProductHook";
import useProductOptionsHook from "../../../hooks/product-option/useProductOptionsHook";
import useProductOptionBatchRegHook from "../hooks/useProductOptionBatchRegHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const CreateFormComponent = (props) => {
    const [slideDownEffect, dispatchSlideDownEffect] = useReducer(slideDownEffectReducer, initialSlideDownEffect);
    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);

    const {
        location,
        navigateUrl
    } = useRouterHook();

    const {
        product: createProductData,
        onChangeValueOfName: onChangeProductInputValue,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData: checkProductCreateFormData
    } = useProductHook();

    const {
        options: createOptionDataList,
        onChangeValueOfNameById: onChangeOptionInputValue,
        onActionAddData: onActionAddOptionData,
        onActionDeleteById: onActionDeleteOptionById,
        onActionUpdateOptions,
        checkCreateFormData: checkProductOptionCreateFormData
    } = useProductOptionsHook();

    const {
        productOptionBatchReg,
        onChangeValueOfName: onChangeProductOptionBatchRegInputValue,
        returnConvertedOptions: returnConvertedOptionsByProductOptionBatchReg
    } = useProductOptionBatchRegHook();

    const {
        __reqUploadImageFile
    } = useImageFileUploaderHook();

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
                navigateUrl(location.state.routerUrl);
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
        
                let stockManagement = createProductData.stockManagement;
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
                    let createOptionList = [...createOptionDataList, ...addOptionList];
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
            changeOptionOrderWithDragAndDrop: (result) => {
                if(!result.destination) {
                    return;
                }
        
                const newOrderList = valueUtils.reorder(
                    createOptionDataList,
                    result.source.index,
                    result.destination.index
                )
        
                onActionUpdateOptions(newOrderList);
            }
        },
        submit: {
            createProductAndOptions: (e) => {
                e.preventDefault();
        
                try {
                    checkProductCreateFormData();
                    checkProductOptionCreateFormData();

                    let body = {
                        product: createProductData,
                        options: createOptionDataList
                    }
                    props._onSubmit_createProductAndOptions(body);
                } catch (err) {
                    alert(err.message)
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'상품 등록'} />

            <form onSubmit={__hanlde.submit.createProductAndOptions}>
                <CategorySelectorFieldView
                    categoryList={props.categoryList}
                    createProductData={createProductData}
                    slideDownEffect={slideDownEffect}

                    onChangeProductInputValue={onChangeProductInputValue}
                    onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                />

                {createProductData &&
                    <ProductInfoInputFieldView
                        createProductData={createProductData}
                        slideDownEffect={slideDownEffect}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                        onActionUploadProductImageFile={__hanlde.action.uploadProductImageFile}
                        onActionRemoveImage={__hanlde.action.removeProductImage}
                        onActionChangeStockManagement={__hanlde.action.changeStockManagement}
                    />
                }

                {createOptionDataList && productOptionBatchReg &&
                    <OptionInfoInputFieldView
                        createOptionDataList={createOptionDataList}
                        productOptionBatchReg={productOptionBatchReg}
                        slideDownEffect={slideDownEffect}

                        onChangeOptionInputValue={onChangeOptionInputValue}
                        onActionAddOptionData={onActionAddOptionData}
                        onActionDeleteOption={onActionDeleteOptionById}
                        onChangeBatchRegOptionInputValue={onChangeProductOptionBatchRegInputValue}
                        onActionAddOptionDataListByBatchRegData={__hanlde.action.addOptionDataListByBatchRegData}
                        onActionSlideEffectControl={__hanlde.action.changeSlideEffectControl}
                        onActionOpenOptionDefaultNameCreateModal={__hanlde.action.openOptionDefaultNameCreateModal}
                        onChangeOrderWithDragAndDrop={__hanlde.action.changeOptionOrderWithDragAndDrop}
                    />
                }

                <CreateButtonFieldView
                    onActionCancelCreateProduct={__hanlde.action.cancelCreateProduct}
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

export default CreateFormComponent;

const initialSlideDownEffect = {
    category: false,
    product: false,
    option: false
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