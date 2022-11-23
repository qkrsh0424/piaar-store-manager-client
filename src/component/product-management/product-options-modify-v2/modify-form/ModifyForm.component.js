import { Container, PageTitleFieldWrapper } from "./ModifyForm.styled";
import OptionInfoInputFieldView from "./view/OptionInfoInputField.view";
import { useEffect } from "react";
import CreateButtonFieldView from "./view/ButtonField.view";
import { useState } from "react";
import CreateOptionDefaultNameModalComponent from "./modal/create-option-default-name-modal/CreateOptionDefaultNameModal.component";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import useProductOptionBatchRegHook from "../hooks/useProductOptionBatchRegHook";
import useBatchRegTooltipHook from "../hooks/useBatchRegTooltipHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useProductOptionsHook from "../hooks/useProductOptionsHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { ConfirmSnackbarHookComponent, useConfirmSnackbarHook } from "../../../../hooks/snackbar/useConfirmSnackbarHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const ModifyFormComponent = (props) => {
    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const {
        query,
        navigateUrl,
        navigatePrevPage
    } = useRouterHook();

    const {
        options: modifyOptionDataList,
        onChangeValueOfNameById: onChangeOptionInputValue,
        onActionAddData: onActionAddOptionData,
        onActionCopyData: onActionCopyOptionData,
        onActionDeleteById: onActionDeleteOptionById,
        onActionUpdateOptions,
        checkCreateFormData: checkProductOptionCreateFormData,
        reqSearchBatchByProductId,
        reqModifyBatch: reqModifyOptions,
        onActionResetOriginData: onActionResetOriginOptionsData
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
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    const {
        open: confirmSnackbarOpen,
        message: confirmSnackbarMessage,
        confirmAction: snackbarConfirmAction,
        onActionOpen: onActionOpenConfirmSnackbar,
        onActionClose: onActionCloseConfirmSnackbar,
    } = useConfirmSnackbarHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        async function fetchInit() {
            let productId = query.productId;
            setSelectedProductId(productId);

            onActionOpenBackdrop();
            try{
                await reqSearchBatchByProductId(productId)
            } catch (err) {
                let snackbarSetting = {
                    message: err?.message,
                    severity: 'error'
                }
                onActionOpenSnackbar(snackbarSetting);
            }
            onActionCloseBackdrop();
        }

        fetchInit();
        window.scrollTo({top: document.body.scrollHeight});
    }, [])

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
                onActionOpenConfirmSnackbar(
                    '취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?',
                    () => () => navigatePrevPage()
                )
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

                onActionOpenConfirmSnackbar(
                    '기존 상품 정보로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다)',
                    () => () => {
                        onActionResetOriginOptionsData();

                        let snackbarSetting = {
                            message: '초기화되었습니다.',
                            severity: 'info'
                        }
                        onActionOpenSnackbar(snackbarSetting);
                    }
                )
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
            },
            copyOptionData: (e, optionId) => {
                e.preventDefault();
                e.stopPropagation();

                let copyData = modifyOptionDataList.filter(r => r.id === optionId)[0];
                onActionCopyOptionData(copyData)
            
                let snackbarSetting = {
                    message: '복사되었습니다.',
                    severity: 'info'
                }
                onActionOpenSnackbar(snackbarSetting)
            }
        },
        submit: {
            modifyOptions: async (e) => {
                e.preventDefault();
                e.stopPropagation();

                onActionOpenConfirmSnackbar(
                    '데이터 수정을 완료하시겠습니까?',
                    () => async () => {
                        onActionOpenBackdrop();
                        try {
                            checkProductOptionCreateFormData();
        
                            setButtonDisabled(true);
                            await reqModifyOptions(selectedProductId, () => {
                                let data = {
                                    pathname: `/products`,
                                }
                                navigateUrl(data);
                            });
                        } catch (err) {
                            let snackbarSetting = {
                                message: err?.message,
                                severity: 'error'
                            }
                            
                            onActionOpenSnackbar(snackbarSetting);
                        }
                        onActionCloseBackdrop();
                    }
                )
            }
        }
    }

    return (
        <>
            <Container>
                <PageTitleFieldView title={'옵션 일괄 수정'}/>

                <form onSubmit={__handle.submit.modifyOptions}>
                    {modifyOptionDataList && productOptionBatchReg &&
                        <OptionInfoInputFieldView
                            modifyOptionDataList={modifyOptionDataList}
                            productOptionBatchReg={productOptionBatchReg}
                            batchRegTooltipOpen={batchRegTooltipOpen}
                            batchRegInput={batchRegInput}

                            onChangeOptionInputValue={onChangeOptionInputValue}
                            onActionAddOptionData={onActionAddOptionData}
                            onActionCopyOptionData={__handle.action.copyOptionData}
                            onActionDeleteOption={onActionDeleteOptionById}
                            onChangeBatchRegOptionInputValue={onChangeProductOptionBatchRegInputValue}
                            onActionAddOptionDataListByBatchRegData={__handle.action.addOptionDataListByBatchRegData}
                            onActionOpenOptionDefaultNameCreateModal={__handle.action.openOptionDefaultNameCreateModal}
                            onActionOpenBatchRegToolTip={onActionOpenBatchRegToolTip}
                            onChangeBatchRegInput={onChangeBatchRegInput}
                            onActionConfirmBatchRegInput={__handle.action.confirmBatchRegInput}
                            onActionCloseBatchRegTooltip={onActionCloseBatchRegTooltip}
                        />
                    }

                    <CreateButtonFieldView
                        buttonDisabled={buttonDisabled}

                        onActionCancelCreateProduct={__handle.action.cancelCreateProduct}
                        onActionResetOptions={__handle.action.resetOptions}
                    />
                </form>
            </Container>

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

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                />
            }

            {/* Snackbar */}
            {confirmSnackbarOpen &&
                <ConfirmSnackbarHookComponent
                    open={confirmSnackbarOpen}
                    message={confirmSnackbarMessage}
                    onClose={onActionCloseConfirmSnackbar}
                    vertical={'top'}
                    horizontal={'center'}
                    onConfirm={snackbarConfirmAction}
                />
            }
        </>
    )
}

export default ModifyFormComponent;
