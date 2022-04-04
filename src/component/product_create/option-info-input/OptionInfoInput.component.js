import { useEffect, useReducer } from 'react';
import HeaderFieldView from './HeaderField.view';
import ImageSelectorFieldView from './OptionInfoField.view';
import { Container } from './OptionInfoInput.styled';

const OptionInfoInputComponent = (props) => {
    const [optionDataList, dispatchOptionDataList] = useReducer(optionDataListReducer, initialOptionDataList);
    
    useEffect(() => {
        if(!props.createProductData) {
            return;
        }

        dispatchOptionDataList({
            type: 'SET_DATA',
            payload: props.createProductData.productOptions
        })
    }, [props.createProductData]);

    const onActionClickImageButton = (optionId) => {
        document.getElementById("i_pm_cb_po_uploader_" + optionId).click();
    }

    const onActionUploadOptionImageFile = async (e, optionId) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props._onSubmit_uploadOptionImageFile(e, optionId);
    }

    const onActionDeleteImageFile = (optionId) => {

        let data = optionDataList?.map(option => {
            if(option.id === optionId){
                return {
                    ...option,
                    imageFileName: "",
                    imageUrl: ""
                }
            }else {
                return option;
            }
        });

        dispatchOptionDataList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const onChangeInputValue = (e, optionId) => {
       let data = optionDataList?.map(option => {
           if(option.id === optionId){
               return {
                   ...option,
                   [e.target.name] : e.target.value
               }
           }else{
               return option;
           }
       });

       dispatchOptionDataList({
           type: 'SET_DATA',
           payload: data
       });
    }

    const onActionDeleteOptionData = (optionId) => {
        if(optionDataList.length === 1) {
            alert('삭제가 불가능합니다.');
            return;
        }

        let productOptions = optionDataList?.filter(option => option.id !== optionId);;

        dispatchOptionDataList({
            type: 'SET_DATA',
            payload: productOptions
        });
    }

    const onActionCreateProductOption = () => {
        let data = props._onAction_createProductOption();
        let productOptions = [...optionDataList, data];

        dispatchOptionDataList({
            type: 'SET_DATA',
            payload: productOptions
        });
    }

    return (
        optionDataList &&
        <Container>
            <HeaderFieldView></HeaderFieldView>

            <ImageSelectorFieldView
                optionDataList={optionDataList}

                onActionClickImageButton={(optionId) => onActionClickImageButton(optionId)}
                onActionUploadOptionImageFile={(e, optionId) => onActionUploadOptionImageFile(e, optionId)}
                onActionDeleteImageFile={(optionId) => onActionDeleteImageFile(optionId)}
                onChangeInputValue={(e, optionId) => onChangeInputValue(e, optionId)}
                onActionDeleteOptionData={(optionId) => onActionDeleteOptionData(optionId)}
                onActionCreateProductOption={() => onActionCreateProductOption()}
            ></ImageSelectorFieldView>
        </Container>
    );
}
export default OptionInfoInputComponent;

const initialOptionDataList = null;

const optionDataListReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA' :
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialOptionDataList;
        default: return initialOptionDataList;
    }
}