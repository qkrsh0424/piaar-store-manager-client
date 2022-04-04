import { useEffect, useReducer } from 'react';
import CodeInfoFieldView from './CodeInfoField.view';
import DefaultDetailInfoFieldView from './DefaultDetailInfoField.view';
import DefaultInfoFieldView from './DefaultInfoField.view';
import ImageSelectorFieldView from './ImageSelectorField.view';
import ImportInfoFieldView from './ImportInfoField.view';
import { Container } from './ProductInfoInput.styled';

const ProductInfoInputComponent = (props) => {
    const [productData, dispatchProductData] = useReducer(productDataReducer, initialProductData);
    
    useEffect(() => {
        if(!props.createProductData) {
            return;
        }

        dispatchProductData({
            type: 'INIT_DATA',
            payload: props.createProductData
        })
    }, [props.createProductData]);

    const onActionClickImageButton = () => {
        document.getElementById("i_pm_cb_uploader").click();
    }

    const onActionUploadProdImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props._onSubmit_uploadProdImageFile(e);
    }

    const onActionDeleteImageFile = () => {
        dispatchProductData({
            type: 'SET_DATA',
            payload: {
                name: "imageFileName",
                value: ""
            }
        });

        dispatchProductData({
            type: 'SET_DATA',
            payload: {
                name: "imageUrl",
                value: ""
            }
        });
    }

    const onChangeInputValue = (e) => {
        dispatchProductData({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    return (
        productData &&
        <Container>
            <ImageSelectorFieldView
                productData={productData}
                
                onActionClickImageButton={() => onActionClickImageButton()}
                onActionUploadProdImageFile={(e) => onActionUploadProdImageFile(e)}
                onActionDeleteImageFile={() => onActionDeleteImageFile()}
            ></ImageSelectorFieldView>

            <DefaultInfoFieldView
                productData={productData}

                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></DefaultInfoFieldView>

            <CodeInfoFieldView
                productData={productData}

                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></CodeInfoFieldView>

            <ImportInfoFieldView
                productData={productData}

                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></ImportInfoFieldView>

            <DefaultDetailInfoFieldView
                productData={productData}

                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></DefaultDetailInfoFieldView>
        </Container>
    );
}
export default ProductInfoInputComponent;

const initialProductData = null;

const productDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA' :
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialProductData;
        default: return initialProductData;
    }
}