import { useEffect, useState } from "react";
import { BackdropHookComponent } from "../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import useOptionPackagesHook from "../../../../hooks/option-package/useOptionPackagesHook";
import useProductOptionsSearchHook from "../../../../hooks/product-option/useProductOptionsSearchHook";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import ListFieldView from "./ListField.view";
import { ButtonFieldWrapper, InfoFieldWrapper, InputFieldWrapper } from "./OptionPackageModal.styled";
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

function InputFieldView({ inputValue, onChange }) {
    return (
        <InputFieldWrapper>
            <input
                type='text'
                className='input-el'
                placeholder='옵션코드, 상품명, 옵션명을 입력해주세요.'
                value={inputValue || ''}
                onChange={(e) => onChange(e)}
            ></input>
        </InputFieldWrapper>
    )
}


function ButtonFieldView({ buttonDisabled, onActionReset, onSubmit }) {
    return (
        <ButtonFieldWrapper>
            <button
                className='button-el'
                onClick={() => onActionReset()}
            >
                초기화
            </button>
            <button
                className='button-el'
                style={{ backgroundColor: 'var(--piaar-main-color)', color: '#fff' }}
                onClick={() => onSubmit()}
                disabled={buttonDisabled}
            >
                저장
            </button>
        </ButtonFieldWrapper>
    )
}

const OptionPackageModalComponent = (props) => {
    const [inputValue, setInputValue] = useState('');

    const {
        productOptions,

        reqSearchAllM2OJ
    } = useProductOptionsSearchHook();

    const {
        optionPackages,

        onActionAddData: onActionAddPackageOption,
        onChangeValueOfName,
        onSumbitCreateData: onSubmitCreateOptionPackages,
        onActionDeleteData: onActionDeleteOptionPackageData,
        onActionResetData: onActionResetOriginOptionPackages,
        checkSaveForm: checkOptionPackagesSaveForm
    } = useOptionPackagesHook({ option: props.option });

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchAllM2OJ();
        }

        fetchInit();
    }, [])

    const __handle = {
        action : {
            changeInputValue: (e) => {
                setInputValue(e.target.value);
            },
            deleteOptionPackage: (id) => {    
                onActionDeleteOptionPackageData(id);
            }
        },
        submit: {
            createOptionPackages: () => {
                try {
                    checkOptionPackagesSaveForm();

                    setButtonDisabled(true);
                    onSubmitCreateOptionPackages(props.option.id);
                    props.onActionCloseModal();
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <>
            {(optionPackages && productOptions) ?
                <CommonModalComponentV2
                    open={true}
                    title={'옵션패키지 설정'}
                    element={
                        <div style={{ padding: '20px 10px' }}>
                            <InfoFieldView
                                option={props.option}
                            />
                            <InputFieldView
                                inputValue={inputValue}

                                onChange={__handle.action.changeInputValue}
                            ></InputFieldView>
                            <ListFieldView
                                productOptions={productOptions}
                                inputValue={inputValue}

                                onActionAddPackageOption={onActionAddPackageOption}
                            ></ListFieldView>
                            {optionPackages &&
                                <TableFieldView
                                    optionPackages={optionPackages}

                                    onChangeValueOfName={onChangeValueOfName}
                                    onActionDeleteOptionPackageData={__handle.action.deleteOptionPackage}
                                />
                            }
                            <ButtonFieldView
                                buttonDisabled={buttonDisabled}

                                onActionReset={onActionResetOriginOptionPackages}
                                onSubmit={__handle.submit.createOptionPackages}
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

export default OptionPackageModalComponent;