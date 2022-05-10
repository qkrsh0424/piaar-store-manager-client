import { Container } from "./ModifyProductDetailModal.styled";
import HeaderFieldView from "./HeaderField.view";
import ModifyFormFieldView from "./ModifyFormField.view";
import { useEffect, useReducer } from "react";

const ModifyProductDetailModalComponent = (props) => {
    const [modifyDetailData, dispatchModifyDetailData] = useReducer(modifyDetailDataReducer, initialModifyDetailData);

    useEffect(() => {
        if(!props.modifyProductDetailData) {
            return;
        }

        if(modifyDetailData) {
            return;
        }

        dispatchModifyDetailData({
            type: 'INIT_DATA',
            payload: props.modifyProductDetailData
        });

    }, [props.modifyProductDetailData]);

    const onChangeModifyDetailDataInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchModifyDetailData({
            type: 'CHANGE_DATA',
            payload: {
                name: name,
                value: value
            }
        })
    }

    const onActionModifyDetail = async (e) => {
        e.preventDefault();

        await props.onActionModifyProductDetail(modifyDetailData);
    }

    return (
        <Container>
            <HeaderFieldView
                onActionCloseModifyProductDetailModal={() => props.onActionCloseModifyProductDetailModal()}
            ></HeaderFieldView>

            <ModifyFormFieldView
                modifyDetailData={modifyDetailData}
                onActionModifyDetail={(e) => onActionModifyDetail(e)}
                onChangeModifyDetailDataInputValue={(e) => onChangeModifyDetailDataInputValue(e)}
            ></ModifyFormFieldView>
        </Container>
    )
}

export default ModifyProductDetailModalComponent;

// TODO :: input데이터 수정
const initialModifyDetailData = null;

const modifyDetailDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialModifyDetailData;
        default: return initialModifyDetailData;
    }
}
