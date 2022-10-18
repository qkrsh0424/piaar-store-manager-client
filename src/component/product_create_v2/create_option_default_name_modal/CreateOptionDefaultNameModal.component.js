import { useEffect, useReducer } from "react";
import ButtonFieldView from "./ButtonField.view";
import { Container, InfoFieldWrapper } from "./CreateOptionDefaultNameModal.styled";
import HeaderFieldView from "./HeaderField.view";
import InputFieldView from "./InputField.view";
import { v4 as uuidv4 } from 'uuid';
import valueUtils from "../../../utils/valueUtils";

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

const OTION_BATCH_MAX_SIZE = 3;
const OTION_BATCH_MIN_SIZE = 2;

const CreateOptionDefaultNameModalComponent = (props) => {
    const [optionDefaultNameList, dispatchOptionDefaultNameList] = useReducer(optionDefaultNameListReducer, initialOptionDefaultNameList);
    const [separator, dispatchSeparator] = useReducer(separatorReducer, initialSeparator);

    useEffect(() => {
        // 기본 일괄 생성 옵션 2개 생성
        let data = [{
            id: uuidv4(),
            defaultName: ''
        },
        {
            id: uuidv4(),
            defaultName: ''
        }];

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }, [])

    const onActionAddDefaultName = () => {
        let data = [
            ...optionDefaultNameList,
            {
                id: uuidv4(),
                defaultName: ''
            }
        ];

        if(data.length > OTION_BATCH_MAX_SIZE) {
            alert('더이상 추가할 수 없습니다.');
            return;
        }

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onActionDeleteDefaultName = (id) => {
        let data = optionDefaultNameList.filter(r => r.id !== id);

        if(data.length < OTION_BATCH_MIN_SIZE) {
            alert('더이상 삭제할 수 없습니다.')
            return;
        }

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onChangeSeparatorInputValue = (e) => {
        let result = (e.target.value).replace(' ', '');

        dispatchSeparator({
            type: 'INIT_DATA',
            payload: result
        })
    }

    const onChangeDefaultNameInputValue = (e, id) => {
        let data = optionDefaultNameList.map(r => {
            if(r.id === id) {
                return {
                    ...r,
                    [e.target.name]: e.target.value
                }
            }else {
                return r;
            }
        });

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onSubmitBatchOptionDefaultName = (e) => {
        e.preventDefault();
        
        if(separator.indexOf(',') !== -1) {
            alert('옵션명을 구분하는 문자로 (,)는 포함할 수 없습니다.');
            return;
        }

        // 옵션명 일괄 생성
        let defaultNameList = combinationOptionName();
        props.onChangeBatchRegOptionDefaultNameInputValue(defaultNameList);
        props.onActionCloseOptionDefaultNameCreateModal();
    }

    // 옵션명 일괄 생성
    const combinationOptionName = () => {
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

    return (
        <Container>
            <HeaderFieldView
                element={'옵션명 일괄 생성'}
            ></HeaderFieldView>
            <InfoFieldView />
            <form onSubmit={onSubmitBatchOptionDefaultName}>
                <InputFieldView
                    optionDefaultNameList={optionDefaultNameList}
                    separator={separator}

                    onActionAddDefaultName={onActionAddDefaultName}
                    onActionDeleteDefaultName={onActionDeleteDefaultName}
                    onChangeSeparatorInputValue={onChangeSeparatorInputValue}
                    onChangeDefaultNameInputValue={onChangeDefaultNameInputValue}
                ></InputFieldView>
                <ButtonFieldView
                    onActionCloseOptionDefaultNameCreateModal={props.onActionCloseOptionDefaultNameCreateModal}
                ></ButtonFieldView>
            </form>
        </Container>
    )
}

export default CreateOptionDefaultNameModalComponent;

const initialOptionDefaultNameList = null;
const initialSeparator = null;

const optionDefaultNameListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionDefaultNameList;
        default: return initialOptionDefaultNameList;
    }
}

const separatorReducer = (state, action) => {
    switch (action. type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSeparator;
        default: return initialSeparator;
    }
}