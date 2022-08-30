import { useEffect, useReducer } from "react";
import { useLocalStorageHook } from "../../../../../hooks/local_storage/useLocalStorageHook";
import valueUtils from "../../../../../utils/valueUtils";
import ButtonFieldView from "./ButtonField.view";
import { Container } from "./ExcelTranslatorFormControl.styled";
import HeaderFieldView from "./HeaderField.view";
import SelectorFieldView from "./SelectorField.view";

const ExcelTranslatorFormControlModalComponent = (props) => {
    const [excelTranslatorViewFormIds, setExcelTranslatorViewFormIds] = useLocalStorageHook("excelTranslatorViewOrder", []);
    
    const [excelTranslatorData, dispatchExcelTranslatorData] = useReducer(excelTranslatorDataReducer, initialExcelTranslatorData);
    const [excelTranslatorViewData, dispatchExcelTranslatorViewData] = useReducer(excelTranslatorViewDataReducer, initialExcelTranslatorViewData);

    useEffect(() => {
        if(!(props.excelTranslatorData && excelTranslatorViewFormIds)) {
            return;
        }

        let translator = props.excelTranslatorData.filter(r => !excelTranslatorViewFormIds.includes(r.id));
        let viewTranslator = excelTranslatorViewFormIds.map(r => props.excelTranslatorData.filter(r2 => r2.id === r)[0]);

        dispatchExcelTranslatorData({
            type: 'SET_DATA',
            payload: translator
        })
        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: viewTranslator
        })
    }, [props.excelTranslatorData, excelTranslatorViewFormIds])

    const onActionAddViewForm = (e, id) => {
        e.preventDefault();

        let selected = excelTranslatorData.filter(r => r.id === id)[0];

        let translator = excelTranslatorData.filter(r => r.id !== id);
        let viewTranslator = excelTranslatorViewData.concat(selected);
        
        dispatchExcelTranslatorData({
            type: 'SET_DATA',
            payload: translator
        })
        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: viewTranslator
        })
    }

    const onActionDeleteViewForm = (e, id) => {
        e.preventDefault();

        let viewTranslator = excelTranslatorViewData.filter(r => r.id !== id);
        let translator = props.excelTranslatorData.filter(r => {
            if(!viewTranslator.filter(r2 => r2.id === r.id)[0]){
                return r;
            }
        });
        
        dispatchExcelTranslatorData({
            type: 'SET_DATA',
            payload: translator
        })
        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: viewTranslator
        })
    }

    // 헤더 세팅 초기화
    const onActionResetExcelTranslatorViewOrder = () => {
        let data = [...props.excelTranslatorData]
        
        dispatchExcelTranslatorData({
            type: 'SET_DATA',
            payload: data
        })
        dispatchExcelTranslatorViewData({
            type: 'CLEAR'
        })
    }

    // 헤더 세팅 업데이트
    const onActionUpdateExcelTranslatorViewOrder = () => {
        let ids = excelTranslatorViewData.map(r => r.id);
        setExcelTranslatorViewFormIds(ids);
        props.onActionCloseExcelTranslatorFormControlModal();
    }

    // dnd 헤더 순서 설정
    const onChangeViewFormOrder = (res) => {
        if (!res.destination) return;

        let viewData = [...excelTranslatorViewData];

        const orderData = valueUtils.reorder(
            viewData,
            res.source.index,
            res.destination.index
        );

        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: orderData
        })
    }

    return(
        <Container>
            <HeaderFieldView
                onActionCloseModal={props.onActionCloseExcelTranslatorFormControlModal}
            ></HeaderFieldView>

            <form onSubmit={onActionUpdateExcelTranslatorViewOrder}>
                <ButtonFieldView
                    onActionResetExcelTranslatorViewOrder={onActionResetExcelTranslatorViewOrder}
                ></ButtonFieldView>

                <SelectorFieldView
                    excelTranslatorData={excelTranslatorData}
                    excelTranslatorViewData={excelTranslatorViewData}

                    onActionAddViewForm={onActionAddViewForm}
                    onActionDeleteViewForm={onActionDeleteViewForm}
                    onChangeViewFormOrder={onChangeViewFormOrder}
                ></SelectorFieldView>
            </form>
        </Container>
    )
}

export default ExcelTranslatorFormControlModalComponent;

const initialExcelTranslatorData = [];
const initialExcelTranslatorViewData = [];

const excelTranslatorDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialExcelTranslatorData;
        default: return {...state};
    }
}

const excelTranslatorViewDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialExcelTranslatorViewData;
        default: return {...state};
    }
}
