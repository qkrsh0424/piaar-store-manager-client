import { useState } from "react";
import useSubOptionCodesHook from "../../../../hooks/sub-option-code/useSubOptionCodesHook";
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
                    src='/assets/icon/add_default_444444.svg'
                    style={{ width: '25px'}}
                    alt=""
                    loading='lazy'
                />
            </button>
        </ButtonFieldWrapper>
    )
}

const SubOptionCodeModalComponent = (props) => {
    const [modifyingSubOptionCodeIdx, setModifyingSubOptionCodeIdx] = useState([]);

    const {
        subOptionCodes,

        onActionAddData: onActionAddSubOptionData,
        onActionDeleteData: onActionDeleteSubOptionData,
        onActionDeleteSavedData: onActionDeleteSavedSubOptionData,
        onActionCreateData: onActionCreateSubOptionData,
        onActionModifyData: onActionModifySubOptionData,
        onChangeValueOfNameByIdx: onChangeSubOptionInputValue,
        checkSaveForm: checkSubOptionSaveForm
    } = useSubOptionCodesHook({ option: props.option});

    const __handle = {
        action : {
            addSubOptionCode: () => {
                let data = modifyingSubOptionCodeIdx.concat(subOptionCodes.length);
                setModifyingSubOptionCodeIdx(data);
                onActionAddSubOptionData();
            },
            deleteSubOptionCode: (idx) => {
                let data = subOptionCodes[idx];

                if(!window.confirm('정말 삭제하시겠습니까?')) {
                    return;
                }

                if (data.id) {
                    // delete api 요청
                    onActionDeleteSavedSubOptionData(data.id);
                } else {
                    onActionDeleteSubOptionData(idx);
                }
            },
            modifySubOption: (idx) => {
                let data = modifyingSubOptionCodeIdx.concat(idx);
                setModifyingSubOptionCodeIdx(data);
            }
        },
        submit: {
            // 기존 생성된 데이터면 수정 요청, 기존 생성된 데이터가 아니면 생성 요청
            createOrModifySubOption: (idx) => {
                let data = subOptionCodes[idx];
                
                try{
                    checkSubOptionSaveForm(data);

                    if(data.id) {
                        onActionModifySubOptionData(idx);
                    } else {
                        onActionCreateSubOptionData(idx);
                    }

                    let modifyingIdx = modifyingSubOptionCodeIdx.filter(index => index !== idx);
                    setModifyingSubOptionCodeIdx(modifyingIdx);
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
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
                            modifyingSubOptionCodeIdx={modifyingSubOptionCodeIdx}

                            onChangeSubOptionInputValue={onChangeSubOptionInputValue}
                            onActionDeleteSubOptionData={__handle.action.deleteSubOptionCode}
                            onSubmitCreateOrModifySubOption={__handle.submit.createOrModifySubOption}
                            onActionModifySubOption={__handle.action.modifySubOption}
                        />
                    }
                    <ButtonFieldView
                        onClick={__handle.action.addSubOptionCode}
                    />
                </div>
            }
            maxWidth={'sm'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}

export default SubOptionCodeModalComponent;