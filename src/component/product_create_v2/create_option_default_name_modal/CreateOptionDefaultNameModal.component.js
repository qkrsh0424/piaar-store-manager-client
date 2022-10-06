import { useEffect, useReducer } from "react";
import ButtonFieldView from "./ButtonField.view";
import { Container, InfoFieldWrapper } from "./CreateOptionDefaultNameModal.styled";
import HeaderFieldView from "./HeaderField.view";
import InputFieldView from "./InputField.view";
import { v4 as uuidv4 } from 'uuid';

function InfoFieldView() {
    return (
        <InfoFieldWrapper>
            <span>일괄 생성할 옵션명을 순서대로 입력해주세요.</span>
        </InfoFieldWrapper>
    )
}

const CreateOptionDefaultNameModalComponent = (props) => {
    const [optionDefaultNameList, dispatchOptionDefaultNameList] = useReducer(optionDefaultNameListReducer, initialOptionDefaultNameList);

    useEffect(() => {
        let data = [{
            id: uuidv4(),
            defaultName: ''
        }];

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }, [])

    const onActionAddDefaultName = () => {
        if(optionDefaultNameList.length > 2) {
            alert('더이상 추가할 수 없습니다.');
            return;
        }

        let data = [
            ...optionDefaultNameList,
            {
                id: uuidv4(),
                defaultName: ''
            }
        ];

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onActionDeleteDefaultName = (id) => {
        let data = optionDefaultNameList.filter(r => r.id !== id);

        if(data.length < 1) {
            return;
        }

        dispatchOptionDefaultNameList({
            type: 'INIT_DATA',
            payload: data
        })
    }

    return (
        <Container>
            <HeaderFieldView
                element={'옵션명 일괄 생성'}
            ></HeaderFieldView>
            <InfoFieldView />
            <InputFieldView
                optionDefaultNameList={optionDefaultNameList}

                onActionAddDefaultName={onActionAddDefaultName}
                onActionDeleteDefaultName={onActionDeleteDefaultName}
            ></InputFieldView>
            <ButtonFieldView
                onActionCloseOptionDefaultNameCreateModal={props.onActionCloseOptionDefaultNameCreateModal}
            ></ButtonFieldView>
        </Container>
    )
}

export default CreateOptionDefaultNameModalComponent;

const initialOptionDefaultNameList = null;

const optionDefaultNameListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionDefaultNameList;
        default: return initialOptionDefaultNameList;
    }
}