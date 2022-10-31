import { BackdropHookComponent } from "../../../../hooks/backdrop/useBackdropHook";
import useSubOptionCodesHook from "../../../../hooks/sub-option-code/useSubOptionCodesHook";
import useSubOptionCodesHookV2 from "../../../../hooks/sub-option-code/useSubOptionCodesHookV2";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import { ButtonFieldWrapper, InfoFieldWrapper } from "./SubOptionCodeModal.styled";
import TableFieldView from "./TableField.view";

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

function ButtonFieldView({ onClick }) {
    return (
        <ButtonFieldWrapper>
            <button
                className='button-el'
                onClick={(e) => onClick(e)}
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
        modifyingId: modifyingSubOptionCodeId,

        onActionAddData: onActionAddSubOptionData,
        onActionDeleteData: onActionDeleteSubOptionData,
        onActionCreateOrModify: onActionCreateOrModifySubOption,
        onChangeValueOfNameByIds: onChangeSubOptionInputValue,
        checkSaveForm: checkSubOptionSaveForm,
        onActionAddModifyingId: onActionAddSubOptionCodeModifyingId
    } = useSubOptionCodesHookV2({ option: props.option});

    const __handle = {
        action : {
            deleteSubOptionCode: (id) => {
                if(!window.confirm('정말 삭제하시겠습니까?')) {
                    return;
                }
                
                onActionDeleteSubOptionData(id);
            },
        },
        submit: {
            createOrModifySubOption: (id) => {
                let data = subOptionCodes.filter(r => r.id === id)[0];
                
                try{
                    checkSubOptionSaveForm(data);

                    onActionCreateOrModifySubOption(id);
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <>
            {subOptionCodes ?
                <CommonModalComponentV2
                    open={true}
                    title={'대체코드 설정'}
                    element={
                        <div style={{ padding: '20px 10px' }}>
                            <InfoFieldView
                                option={props.option}
                            />
                            {subOptionCodes &&
                                <TableFieldView
                                    subOptionCodes={subOptionCodes}
                                    modifyingSubOptionCodeId={modifyingSubOptionCodeId}

                                    onChangeSubOptionInputValue={onChangeSubOptionInputValue}
                                    onActionDeleteSubOptionData={__handle.action.deleteSubOptionCode}
                                    onSubmitCreateOrModifySubOption={__handle.submit.createOrModifySubOption}
                                    onActionModifySubOption={onActionAddSubOptionCodeModifyingId}
                                />
                            }
                            <ButtonFieldView
                                onClick={onActionAddSubOptionData}
                            />
                        </div>
                    }
                    maxWidth={'sm'}

                    onClose={() => props.onActionCloseModal()}
                />
                :
                <BackdropHookComponent
                    open={true}
                />
            }
        </>
    )
}

export default SubOptionCodeModalComponent;