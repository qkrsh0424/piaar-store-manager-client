import { useState } from "react";
import { InfoFieldWrapper } from "./CreateOptionDefaultNameModal.styled";
import useProductOptionDefaultNameHook from "../../../hooks/useProductOptionDefaultNameHook";
import valueUtils from "../../../../../../utils/valueUtils";
import SubmitModalComponentV2 from "../../../../../module/modal/SubmitModalComponentV2";
import InputFieldView from "./view/InputField.view";

function InfoFieldView() {
    return (
        <InfoFieldWrapper>
            <div>일괄 생성할 옵션명을 입력해주세요. (, 로 구분)</div>
            <div>최대 3개까지 등록할 수 있습니다.</div>
            <div>옵션명을 구분하는 문자로 ','(반점)는 포함할 수 없습니다.</div>
            <br />
            <div>TIP : [체어-블랙], [체어-카키], [체어-블랙], [체어-카키] 를 생성하고 싶다면</div>
            <div>[구분자 : - / 옵션1 : 체어 / 옵션2 : 블랙, 카키] 를 입력</div>
        </InfoFieldWrapper>
    )
}

const CreateOptionDefaultNameModalComponent = (props) => {
    const [separator, setSeparator] = useState(null);

    const {
        defaultNameList: optionDefaultNameList,
        onChangeValueOfNameById: onChangeOptionDefaultNameInputValue,
        onActionAddRow: onActionAddDefaultNameRow,
        onActionDeleteRow: onActionDeleteDefaultNameRow
    } = useProductOptionDefaultNameHook();

    const __handle = {
        action: {
            changeSeparatorInputValue: (e) => {
                let result = (e.target.value).replace(' ', '');
        
                setSeparator(result);
            },
            returnCombinationOptionName: () => {
                let defaultNameList = optionDefaultNameList.map(r => valueUtils.trimAndSplit(r.defaultName, ','));
        
                // TODO :: 구현 개선
                let data = [];
                for(var i = 0; i < defaultNameList[0].length; i++) {
                    for(var j = 0; j < defaultNameList[1].length; j++) {
                        if(defaultNameList[2] && defaultNameList.length > 0) {
                            for(var k = 0; k < defaultNameList[2].length; k++) {
                                let defaultName = defaultNameList[0][i] + separator + defaultNameList[1][j] + separator + defaultNameList[2][k];
                                data.push(defaultName);
                            }
                        }else {
                            let defaultName = defaultNameList[0][i] + separator + defaultNameList[1][j];
                            data.push(defaultName);
                        }
                    }
                }
                return data.join(',');
            }
        },
        submit: {
            batchOptionDefaultName: (e) => {
                e.preventDefault();

                if(separator?.indexOf(',') !== -1) {
                    alert('옵션명을 구분하는 문자로 (,)는 포함할 수 없습니다.');
                    return;
                }
        
                // 옵션명 일괄 생성
                let defaultNameList = __handle.action.returnCombinationOptionName();
                props.onChangeBatchRegOptionDefaultNameInputValue(defaultNameList);
                props.onActionCloseOptionDefaultNameCreateModal();
            }
        }
    }

    return (
        <SubmitModalComponentV2
            open={props.modalOpen}
            title={'옵션명 일괄 생성'}
            element={
                <>
                    <InfoFieldView />
                    <InputFieldView
                        optionDefaultNameList={optionDefaultNameList}
                        separator={separator}

                        onActionAddDefaultNameRow={onActionAddDefaultNameRow}
                        onActionDeleteDefaultNameRow={onActionDeleteDefaultNameRow}
                        onChangeSeparatorInputValue={__handle.action.changeSeparatorInputValue}
                        onChangeDefaultNameInputValue={onChangeOptionDefaultNameInputValue}
                    />
                </>
            }
            maxWidth={'sm'}

            _onSubmit={__handle.submit.batchOptionDefaultName}
            onClose={props.onActionCloseOptionDefaultNameCreateModal}
        />
    )
}

export default CreateOptionDefaultNameModalComponent;
