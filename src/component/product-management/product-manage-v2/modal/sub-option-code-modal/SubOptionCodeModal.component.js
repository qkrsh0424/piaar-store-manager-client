import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../../hooks/button-disabled/useDisabledButtonHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import useSubOptionCodesHook from "./hooks/useSubOptionCodesHook";
import { ButtonFieldWrapper, InfoFieldWrapper } from "./SubOptionCodeModal.styled";
import TableFieldView from "./TableField.view";
import { v4 as uuidv4 } from 'uuid';
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { ConfirmSnackbarHookComponent, useConfirmSnackbarHook } from "../../../../../hooks/snackbar/useConfirmSnackbarHook";

function InfoFieldView({ option }) {
    return (
        <InfoFieldWrapper>
            <div className='info-group'>
                <div className='info-name'>옵션관리코드</div>
                <div>{option.code}</div>
            </div>
            <div className='info-group'>
                <div className='info-name'>옵션명</div>
                <div>{option.defaultName}</div>
            </div>
            <div className='info-group'>
                <div className='info-name'>옵션설명</div>
                <div>{option.managementName}</div>
            </div>
        </InfoFieldWrapper>
    )
}

function ButtonFieldView({ onClick, buttonDisabled }) {
    return (
        <ButtonFieldWrapper>
            <button
                className='button-el'
                onClick={(e) => onClick(e)}
                disabled={buttonDisabled}
            >
                <img
                    src='/assets/icon/add_default_ffffff.svg'
                    style={{ width: '30px'}}
                    alt=""
                    loading='lazy'
                />
            </button>
        </ButtonFieldWrapper>
    )
}

const SubOptionCodeModalComponent = (props) => {
    const {
        subOptionCodes,
        modifyingSubOption,

        reqSearchBatchSubOptionCodes,
        onChangeSelectedModifyingData: onChangeSelectedModifyingSubOption,
        reqModifyOne: reqModifySubOption,
        reqCreateOne: reqCreateSubOption,
        checkSaveForm: checkSubOptionSaveForm,
        onChangeValueOfName: onChangeSubOptionInputValue,
        onActionDeleteModifyingData: onActionDeleteModifyinSubOption,
        reqDeleteOne: reqDeleteSubOption,
        onActionAddData: onActionAddSubOption
    } = useSubOptionCodesHook();
    
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
            onActionOpenBackdrop();
            try {
                await reqSearchBatchSubOptionCodes(props.option.id);
            } catch (err) {
                let snackbarSetting = {
                    message: err?.message,
                    severity: 'error'
                }
                onActionOpenSnackbar(snackbarSetting);
            }
            onActionCloseBackdrop();
        }
        
        if(!props.option?.id) {
            return;
        }

        fetchInit();
    }, [props.option])

    const __handle = {
        action: {
            addSubOptionData: () => {
                let data = {
                    id: uuidv4(),
                    subOptionCode: '',
                    memo: '',
                    productOptionId: props.option.id
                }

                if(modifyingSubOption) {
                    let snackbarSetting = {
                        message: '수정중인 데이터를 먼저 완료해주세요.',
                        severity: 'info'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }
                onActionAddSubOption(data);
            },
            changeSelectedModifyingData: (subOptionId) => {
                if(modifyingSubOption) {
                    let snackbarSetting = {
                        message: '수정중인 데이터를 먼저 완료해주세요.',
                        severity: 'info'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }
                onChangeSelectedModifyingSubOption(subOptionId);
            }
        },
        submit: {
            createSubOption: async () => {
                onActionOpenBackdrop();
                try{
                    checkSubOptionSaveForm();
                    setButtonDisabled(true);

                    await reqCreateSubOption();
                    await reqSearchBatchSubOptionCodes(props.option.id);
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                }
                onActionCloseBackdrop();
            },
            modifySubOption: async () => {
                onActionOpenBackdrop();
                try{
                    checkSubOptionSaveForm();
                    setButtonDisabled(true);

                    let savedSubOption = subOptionCodes.filter(r => r.id === modifyingSubOption.id)[0];

                    if(JSON.stringify(savedSubOption) !== JSON.stringify(modifyingSubOption)) {
                        await reqModifySubOption();
                        await reqSearchBatchSubOptionCodes(props.option.id);
                    }
                    onActionDeleteModifyinSubOption();
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    props.onActionOpenSnackbar(snackbarSetting);
                }
                onActionCloseBackdrop();
            },
            deleteSubOption: async (subOptionId) => {
                if(modifyingSubOption) {
                    let snackbarSetting = {
                        message: '수정중인 데이터를 먼저 완료해주세요.',
                        severity: 'info'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return; 
                }

                onActionOpenConfirmSnackbar(
                    '삭제하시겠습니까?',
                    () => async () => {
                        onActionOpenBackdrop();
                        try {
                            await reqDeleteSubOption(subOptionId);
                            await reqSearchBatchSubOptionCodes(props.option.id);
                        } catch(err) {
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
            {subOptionCodes &&
                <CommonModalComponentV2
                    open={true}
                    title={'대체코드 설정'}
                    element={
                        <div className='data-wrapper'>
                            <InfoFieldView
                                option={props.option}
                            />
                            {subOptionCodes &&
                                <TableFieldView
                                    subOptionCodes={subOptionCodes}
                                    modifyingSubOption={modifyingSubOption}

                                    onChangeSubOptionInputValue={onChangeSubOptionInputValue}
                                    onActionDeleteSubOptionData={__handle.submit.deleteSubOption}
                                    onActionDeleteModifyingSubOptionData={onActionDeleteModifyinSubOption}
                                    onSubmitCreateSubOptionData={__handle.submit.createSubOption}
                                    onSubmitModifySubOptionData={__handle.submit.modifySubOption}
                                    onChangeSelectedModifyingSubOption={onChangeSelectedModifyingSubOption}
                                />
                            }
                            <ButtonFieldView
                                buttonDisabled={buttonDisabled}

                                onClick={__handle.action.addSubOptionData}
                            />
                        </div>
                    }
                    maxWidth={'md'}

                    onClose={() => props.onActionCloseModal()}
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
                ></BasicSnackbarHookComponentV2>
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
                ></ConfirmSnackbarHookComponent>
            }
        </>
    )
}

export default SubOptionCodeModalComponent;