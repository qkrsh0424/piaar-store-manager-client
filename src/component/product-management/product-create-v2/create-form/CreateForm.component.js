import CategorySelectorFieldView from "./view/CategorySelectorField.view";
import { Container, PageTitleFieldWrapper } from "./CreateForm.styled";
import OptionInfoInputFieldView from "./view/OptionInfoInputField.view";
import { useReducer } from "react";
import { useImageFileUploaderHook } from "../../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./view/CreateButtonField.view";
import valueUtils from "../../../../utils/valueUtils";
import { useState } from "react";
import CreateOptionDefaultNameModalComponent from "./modal/create-option-default-name-modal/CreateOptionDefaultNameModal.component";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import useProductOptionBatchRegHook from "../hooks/useProductOptionBatchRegHook";
import useBatchRegTooltipHook from "../hooks/useBatchRegTooltipHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useProductHook from "../hooks/useProductHook";
import useProductOptionsHook from "../hooks/useProductOptionsHook";
import ProductInfoInputFieldView from "./view/ProductInfoInputField.view";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const CreateFormComponent = (props) => {
    const [slideDownEffect, dispatchSlideDownEffect] = useReducer(slideDownEffectReducer, initialSlideDownEffect);
    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);

    const {
        navigatePrevPage
    } = useRouterHook();

    const {
        product: createProductData,
        onChangeValueOfName: onChangeProductInputValue,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData: checkProductCreateFormData,
        onChangeStockManagement: onChangeProductStockManagement,
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
        batchRegTooltipOpen,
        batchRegInput,
        onActionOpenBatchRegToolTip,
        onActionCloseBatchRegTooltip,
        onChangeBatchRegInput
    } = useBatchRegTooltipHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        __reqUploadImageFile
    } = useImageFileUploaderHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    const __handle = {
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
        
                onActionOpenBackdrop();
                let imageInfo = await __reqUploadImageFile(e);
                onActionCloseBackdrop();
        
                onChangeImageFileNameAndImageUrl(imageInfo);
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
            },
            confirmBatchRegInput: (e) => {
                e.preventDefault();

                let name = e.target.name;

                let data = createOptionDataList.map(r => {
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
            createProductAndOptions: (e) => {
                e.preventDefault();
        
                try {
                    checkProductCreateFormData();
                    checkProductOptionCreateFormData();

                    let body = {
                        product: createProductData,
                        options: createOptionDataList
                    }
                    setButtonDisabled(true);
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

            <form onSubmit={__handle.submit.createProductAndOptions}>
                <CategorySelectorFieldView
                    categoryList={props.categoryList}
                    createProductData={createProductData}
                    slideDownEffect={slideDownEffect}

                    onChangeProductInputValue={onChangeProductInputValue}
                    onActionSlideEffectControl={__handle.action.changeSlideEffectControl}
                />

                {createProductData &&
                    <ProductInfoInputFieldView
                        createProductData={createProductData}
                        slideDownEffect={slideDownEffect}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionSlideEffectControl={__handle.action.changeSlideEffectControl}
                        onActionUploadProductImageFile={__handle.action.uploadProductImageFile}
                        onActionRemoveImage={onActionDeleteImageFileNameAndImageUrl}
                        onChangeProductStockManagement={onChangeProductStockManagement}
                    />
                }

                {createOptionDataList && productOptionBatchReg &&
                    <OptionInfoInputFieldView
                        createOptionDataList={createOptionDataList}
                        productOptionBatchReg={productOptionBatchReg}
                        slideDownEffect={slideDownEffect}
                        batchRegTooltipOpen={batchRegTooltipOpen}
                        batchRegInput={batchRegInput}

                        onChangeOptionInputValue={onChangeOptionInputValue}
                        onActionAddOptionData={onActionAddOptionData}
                        onActionDeleteOption={onActionDeleteOptionById}
                        onChangeBatchRegOptionInputValue={onChangeProductOptionBatchRegInputValue}
                        onActionAddOptionDataListByBatchRegData={__handle.action.addOptionDataListByBatchRegData}
                        onActionSlideEffectControl={__handle.action.changeSlideEffectControl}
                        onActionOpenOptionDefaultNameCreateModal={__handle.action.openOptionDefaultNameCreateModal}
                        onChangeOrderWithDragAndDrop={__handle.action.changeOptionOrderWithDragAndDrop}
                        onActionOpenBatchRegToolTip={onActionOpenBatchRegToolTip}
                        onChangeBatchRegInput={onChangeBatchRegInput}
                        onActionConfirmBatchRegInput={__handle.action.confirmBatchRegInput}
                        onActionCloseBatchRegTooltip={onActionCloseBatchRegTooltip}
                    />
                }

                <CreateButtonFieldView
                    buttonDisabled={buttonDisabled}
                    onActionCancelCreateProduct={__handle.action.cancelCreateProduct}
                />
            </form>

            {/* 옵션명 생성 모달 */}
            {optionDefaultNameCreateModalOpen &&
                <CreateOptionDefaultNameModalComponent
                    modalOpen={optionDefaultNameCreateModalOpen}

                    onActionCloseOptionDefaultNameCreateModal={__handle.action.closeOptionDefaultNameCreateModal}
                    onChangeBatchRegOptionDefaultNameInputValue={__handle.action.changeProductOptionBatchRegValue}
                />
            }

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
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