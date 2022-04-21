import { Container } from "./CreateProductDetailModal.styled";
import HeaderFieldView from "./HeaderField.view";
import CreateFormFieldView from "./CreateFormField.view";
import { useEffect, useReducer } from "react";

const CreateProductDetailModalComponent = (props) => {
    const [createDetailData, dispatchCreateDetailData] = useReducer(createDetailDataReducer, initialCreateDetailData);

    useEffect(() => {
        if(!props.createProductDetailData) {
            return;
        }

        if(createDetailData) {
            return;
        }

        dispatchCreateDetailData({
            type: 'INIT_DATA',
            payload: props.createProductDetailData
        });

    }, [props.createProductDetailData]);

    const onChangeCreateDetailDataInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchCreateDetailData({
            type: 'CHANGE_DATA',
            payload: {
                name: name,
                value: value
            }
        })
    }

    const onActionCreateDetail = async (e) => {
        e.preventDefault();

        await props.onActionCreateProductDetail(createDetailData);
    }

    return (
        <Container>
            <HeaderFieldView
                onActionCloseCreateProductDetailModal={() => props.onActionCloseCreateProductDetailModal()}
            ></HeaderFieldView>

            <CreateFormFieldView
                createDetailData={createDetailData}
                onActionCreateDetail={(e) => onActionCreateDetail(e)}
                onChangeCreateDetailDataInputValue={(e) => onChangeCreateDetailDataInputValue(e)}
            ></CreateFormFieldView>
        </Container>
    )
}

export default CreateProductDetailModalComponent;

// TODO :: input데이터 수정
const initialCreateDetailData = null;

const createDetailDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialCreateDetailData;
        default: return initialCreateDetailData;
    }
}
