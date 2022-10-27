import useOptionPackagesHook from "../../../../hooks/option-package/useOptionPackagesHook";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import { ButtonFieldWrapper, InfoFieldWrapper } from "./OptionPackageModal.styled";

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

const OptionPackageModalComponent = (props) => {
    
    const {

    } = useOptionPackagesHook();

    const __handle = {
        action : {
    
        }
    }

    return (
        <CommonModalComponentV2
            open={true}
            title={'옵션패키지 설정'}
            element={
                <div style={{ padding: '20px 10px' }}>
                    <InfoFieldView
                        option={props.option}
                    />
                    {/* {subOptionCodes &&
                        <TableFieldView
                            subOptionCodes={subOptionCodes}
                            modifyingSubOptionCodeIdx={modifyingSubOptionCodeIdx}

                            onChangeSubOptionInputValue={onChangeSubOptionInputValue}
                            onActionDeleteSubOptionData={__handle.action.deleteSubOptionCode}
                            onSubmitCreateOrModifySubOption={__handle.submit.createOrModifySubOption}
                            onActionModifySubOption={__handle.action.modifySubOption}
                        />
                    } */}
                    {/* <ButtonFieldView
                        onClick={__handle.action.addSubOptionCode}
                    /> */}
                </div>
            }
            maxWidth={'sm'}

            onClose={() => props.onActionCloseModal()}
        />
    )
}

export default OptionPackageModalComponent;