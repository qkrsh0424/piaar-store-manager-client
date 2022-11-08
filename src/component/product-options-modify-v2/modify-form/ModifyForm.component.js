import { Container, PageTitleFieldWrapper } from "./ModifyForm.styled";
import OptionInfoInputFieldView from "./view/OptionInfoInputField.view";
import { useEffect, useReducer } from "react";
import CreateButtonFieldView from "./view/ButtonField.view";
import { useState } from "react";
import CreateOptionDefaultNameModalComponent from "./modal/create-option-default-name-modal/CreateOptionDefaultNameModal.component";
import useRouterHook from "../../../hooks/router/useRouterHook";
import useProductOptionsHook from "../../../hooks/product-option/useProductOptionsHook";
import useProductOptionBatchRegHook from "../hooks/useProductOptionBatchRegHook";
import useBatchRegTooltipHook from "../hooks/useBatchRegTooltipHook";
import { useDisabledButtonHook } from "../../../hooks/button-disabled/useDisabledButtonHook";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const ModifyFormComponent = (props) => {
    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);

    const {
        navigatePrevPage
    } = useRouterHook();

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
        batchRegTooltipOpen,
        batchRegInput,
        onActionOpenBatchRegToolTip,
        onActionCloseBatchRegTooltip,
        onChangeBatchRegInput
    } = useBatchRegTooltipHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        function setOptions() {
            let options = props.options || [];

            onActionUpdateOptions([...options]);
        }

        if(!props.options) {
            return;
        }
        setOptions();
    }, [props.options])

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
            resetOptions: (e) => {
                e.preventDefault();

                if(window.confirm('기존 상품 정보로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다)')) {
                    let options = props.options || [];
    
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
            modifyOptions: (e) => {
                e.preventDefault();
                e.stopPropagation();

                if(!window.confirm('데이터 수정을 완료하시겠습니까?')) {
                    return;
                }
        
                try {
                    checkProductOptionCreateFormData();

                    setButtonDisabled(true);
                    props._onSubmit_modifyOptions(modifyOptionDataList);
                } catch (err) {
                    alert(err.message)
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'옵션 일괄 수정'} />

            <form onSubmit={__hanlde.submit.modifyOptions}>
                {modifyOptionDataList && productOptionBatchReg &&
                    <OptionInfoInputFieldView
                        modifyOptionDataList={modifyOptionDataList}
                        productOptionBatchReg={productOptionBatchReg}
                        batchRegTooltipOpen={batchRegTooltipOpen}
                        batchRegInput={batchRegInput}

                        onChangeOptionInputValue={onChangeOptionInputValue}
                        onActionAddOptionData={onActionAddOptionData}
                        onActionDeleteOption={onActionDeleteOptionById}
                        onChangeBatchRegOptionInputValue={onChangeProductOptionBatchRegInputValue}
                        onActionAddOptionDataListByBatchRegData={__hanlde.action.addOptionDataListByBatchRegData}
                        onActionOpenOptionDefaultNameCreateModal={__hanlde.action.openOptionDefaultNameCreateModal}
                        onActionOpenBatchRegToolTip={onActionOpenBatchRegToolTip}
                        onChangeBatchRegInput={onChangeBatchRegInput}
                        onActionConfirmBatchRegInput={__hanlde.action.confirmBatchRegInput}
                        onActionCloseBatchRegTooltip={onActionCloseBatchRegTooltip}
                    />
                }

                <CreateButtonFieldView
                    buttonDisabled={buttonDisabled}

                    onActionCancelCreateProduct={__hanlde.action.cancelCreateProduct}
                    onActionResetOptions={__hanlde.action.resetOptions}
                />
            </form>

            {/* 옵션명 생성 모달 */}
            {optionDefaultNameCreateModalOpen && 
                <CreateOptionDefaultNameModalComponent
                    modalOpen={optionDefaultNameCreateModalOpen}

                    onActionCloseOptionDefaultNameCreateModal={__hanlde.action.closeOptionDefaultNameCreateModal}
                    onChangeBatchRegOptionDefaultNameInputValue={__hanlde.action.changeProductOptionBatchRegValue}
                />
            }
        </Container>
    )
}

export default ModifyFormComponent;
