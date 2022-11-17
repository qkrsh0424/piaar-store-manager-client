import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import useOptionPackagesHook from "./hooks/useOptionPackagesHook";
import useProductOptionsSearchHook from "./hooks/useProductOptionsSearchHook";
import SubmitModalComponentV2 from "../../../../module/modal/SubmitModalComponentV2";
import ListFieldView from "./ListField.view";
import { ButtonFieldWrapper, InfoFieldWrapper, InputFieldWrapper, TextFieldWrapper } from "./OptionPackageModal.styled";
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

function TextFieldView({ elements }) {
    return (
        <TextFieldWrapper>
            {elements}
        </TextFieldWrapper>
    )
}


function ButtonFieldView({ onActionReset }) {
    return (
        <ButtonFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={(e) => onActionReset(e)}
            >
                초기화
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
        totalPackageUnit,

        reqSearchOptionPackages,
        onActionAddData: onActionAddPackageOption,
        onChangeValueOfName: onChangeOptionPackageValueOfName,
        onSumbitCreateData: onSubmitCreateOptionPackages,
        onActionDeleteData: onActionDeleteOptionPackageData,
        onActionResetData: onActionResetOriginOptionPackages,
        checkSaveForm: checkOptionPackagesSaveForm
    } = useOptionPackagesHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllM2OJ();
            await reqSearchOptionPackages(props.option.id);
            onActionCloseBackdrop();
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
            },
            addSubOption: (data) => {
                let addData = {
                    id: uuidv4(),
                    packageUnit: 0,
                    originOptionCode: data.option.code,
                    originOptionId: data.option.id,
                    originOptionDefaultName: data.option.defaultName,
                    parentOptionId: props.option.id
                }

                onActionAddPackageOption(addData);
            }
        },
        submit: {
            createOptionPackages: async () => {
                try {
                    checkOptionPackagesSaveForm();

                    onActionOpenBackdrop();
                    await onSubmitCreateOptionPackages(props.option.id);
                    await reqSearchOptionPackages(props.option.id);
                    onActionCloseBackdrop();
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <>
            {(optionPackages && productOptions) &&
                <SubmitModalComponentV2
                    open={true}
                    title={'옵션패키지 설정'}
                    element={
                        <div className='data-wrapper-group'>
                            <div className='data-wrapper' style={{ height: '400px' }}>
                                {console.log(props.option)}
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

                                    onActionAddPackageOption={__handle.action.addSubOption}
                                ></ListFieldView>
                            </div>
                            <div className='data-wrapper' style={{ height: '400px' }}>
                                {optionPackages &&
                                    <>
                                        <div className='flex-item place-items-center' style={{ justifyContent: "space-between" }}>
                                            <TextFieldView 
                                                elements={
                                                    <div>
                                                        총 <span className='info-text'>{totalPackageUnit}</span>개
                                                    </div>
                                                }
                                            />
                                            <ButtonFieldView
                                                onActionReset={onActionResetOriginOptionPackages}
                                            />
                                        </div>
                                        {console.log(optionPackages)}
                                        <TableFieldView
                                            optionPackages={optionPackages}

                                            onChangeOptionPackageValueOfName={onChangeOptionPackageValueOfName}
                                            onActionDeleteOptionPackageData={__handle.action.deleteOptionPackage}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                    }
                    maxWidth={'lg'}

                    _onSubmit={__handle.submit.createOptionPackages}
                    onClose={props.onActionCloseModal}
                />
            }

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default OptionPackageModalComponent;