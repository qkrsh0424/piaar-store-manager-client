import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../../hooks/button-disabled/useDisabledButtonHook";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import useSubOptionCodesHookV2 from "./hooks/useSubOptionCodesHookV2";
import { ButtonFieldWrapper, InfoFieldWrapper } from "./SubOptionCodeModal.styled";
import TableFieldView from "./TableField.view";
import { v4 as uuidv4 } from 'uuid';

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
    } = useSubOptionCodesHookV2();
    
    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchBatchSubOptionCodes(props.option.id);
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
                    productOptionId: props.option.id,
                    productOptionCode: props.option.code
                }

                onActionAddSubOption(data);
            }
        },
        submit: {
            createSubOption: async () => {
                try{
                    checkSubOptionSaveForm();

                    setButtonDisabled(true);

                    onActionOpenBackdrop();
                    await reqCreateSubOption();
                    await reqSearchBatchSubOptionCodes(props.option.id);
                    onActionCloseBackdrop();
                } catch (err) {
                    alert(err.message);
                }
            },
            modifySubOption: async () => {
                try{
                    checkSubOptionSaveForm();

                    setButtonDisabled(true);

                    let savedSubOption = subOptionCodes.filter(r => r.id === modifyingSubOption.id)[0];

                    if(JSON.stringify(savedSubOption) !== JSON.stringify(modifyingSubOption)) {
                        onActionOpenBackdrop();
                        await reqModifySubOption();
                        await reqSearchBatchSubOptionCodes(props.option.id);
                        onActionCloseBackdrop();
                    }
                    onActionDeleteModifyinSubOption();
                } catch (err) {
                    alert(err.message);
                }
            },
            deleteSubOption: async (subOptionId) => {
                if(modifyingSubOption) {
                    alert('수정중인 데이터를 먼저 완료해주세요.');
                    return; 
                }

                if (!window.confirm('삭제하시겠습니까?')) {
                    return;
                }

                onActionOpenBackdrop();
                await reqDeleteSubOption(subOptionId);
                await reqSearchBatchSubOptionCodes(props.option.id);
                onActionCloseBackdrop();
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
                        <div style={{ padding: '10px' }}>
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
                    maxWidth={'sm'}

                    onClose={() => props.onActionCloseModal()}
                />
            }

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default SubOptionCodeModalComponent;