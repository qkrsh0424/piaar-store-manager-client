import { Container } from "./ModifyProductModal.styled";
import HeaderFieldView from "./HeaderField.view";
import ModifyFormFieldView from "./ModifyFormField.view";
import { useEffect, useReducer } from "react";
import StockReflectedSelectorFieldView from "./StockReflectedSelectorField.view";
import CategorySelectorFieldView from "./CategorySelectorField.view";
import ImageSelectorFieldView from "./ImageSelectorField.view";
import CodeInfoFieldView from "./CodeInfoField.view";
import ImportInfoFieldView from "./ImportInfoField.view";
import DefaultDetailInfoFieldView from "./DefaultDetailInfoField.view";
import DefaultInfoFieldView from "./DefaultInfoField.view";

const ModifyProductModalComponent = (props) => {
    const [modifyProductData, dispatchModifyProductData] = useReducer(modifyProductDataReducer, initialModifyProductData);

    useEffect(() => {
        if(!props.modifyProductData) {
            return;
        }

        dispatchModifyProductData({
            type: 'INIT_DATA',
            payload: props.modifyProductData
        });
    }, [props.modifyProductData]);

    useEffect(() => {
        if(props.uploadedImageData) {
            dispatchModifyProductData({
                type: 'CHANGE_DATA',
                payload: {
                    name: "imageFileName",
                    value: props.uploadedImageData.imageFileName,
                }
            });
    
            dispatchModifyProductData({
                type: 'CHANGE_DATA',
                payload: {
                    name: "imageUrl",
                    value: props.uploadedImageData.imageUrl
                }
            });
        }
    }, [props.uploadedImageData]);

    const onChangeStockReflectedSelector = () => {
        let stockManagement = !modifyProductData.stockManagement;

        dispatchModifyProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "stockManagement",
                value: stockManagement
            }
        });
    }

    const onChangeCategoryCidValue = (categoryCid) => {
        dispatchModifyProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "productCategoryCid",
                value: categoryCid
            }
        })
    }

    const onChangeProductInputValue = (e) => {
        dispatchModifyProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionClickProductImageButton = () => {
        document.getElementById("mp_image_uploader").click();
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        // 파일을 선택하지 않은 경우
        if (e.target.files.length == 0) return;
        await props.onActionUploadImage(e);
    }

    const onActionDeleteProductImageFile = () => {
        dispatchModifyProductData({
            type: "CHANGE_DATA",
            payload: {
                name : "imageFileName",
                value: ""
            }
        });

        dispatchModifyProductData({
            type: "CHANGE_DATA",
            payload: {
                name : "imageUrl",
                value: ""
            }
        });
    }

    const onSubmitModifyProduct = async (e) => {
        e.preventDefault();

        if (checkRequiredData()) {
            await props.onActionModifyProduct(modifyProductData);
        } else {
            return;
        }
    }

    const checkRequiredData = () => {
        if (modifyProductData.productCategoryCid == null || modifyProductData.productCategoryCid == undefined || modifyProductData.productCategoryCid == '' || modifyProductData.productCategoryCid == 0) {
            alert('카테고리 선택은 필수항목입니다.');
            return false;
        }

        if (modifyProductData.defaultName == null || modifyProductData.defaultName == undefined || modifyProductData.defaultName == '') {
            alert('상품명은 필수항목입니다.');
            return false;
        }

        if (modifyProductData.managementName == null || modifyProductData.managementName == undefined || modifyProductData.managementName == '') {
            alert('관리상품명은 필수항목입니다.');
            return false;
        }

        return true;
    }

    return (
        modifyProductData &&
        <Container>
            <HeaderFieldView
                onActionCloseModifyProductModal={() => props.onActionCloseModifyProductModal()}
            ></HeaderFieldView>

            <form onSubmit={(e) => onSubmitModifyProduct(e)}>
                <StockReflectedSelectorFieldView
                    modifyProductData={modifyProductData}

                    onChangeStockReflectedSelector={() => onChangeStockReflectedSelector()}
                ></StockReflectedSelectorFieldView>
                <CategorySelectorFieldView
                    modifyProductData={modifyProductData}
                    categoryList={props.categoryList}

                    onChangeCategoryCidValue={(categoryCid) => onChangeCategoryCidValue(categoryCid)}
                ></CategorySelectorFieldView>
                <ImageSelectorFieldView
                    modifyProductData={modifyProductData}

                    onActionClickProductImageButton={() => onActionClickProductImageButton()}
                    onActionUploadProductImageFile={(e) => onActionUploadProductImageFile(e)}
                    onActionDeleteProductImageFile={() => onActionDeleteProductImageFile()}
                ></ImageSelectorFieldView>
                <DefaultInfoFieldView
                    modifyProductData={modifyProductData}

                    onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                ></DefaultInfoFieldView>
                <CodeInfoFieldView
                    modifyProductData={modifyProductData}

                    onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                ></CodeInfoFieldView>
                <ImportInfoFieldView
                    modifyProductData={modifyProductData}

                    onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                ></ImportInfoFieldView>
                <DefaultDetailInfoFieldView
                    modifyProductData={modifyProductData}

                    onChangeProductInputValue={(e) => onChangeProductInputValue(e)}
                ></DefaultDetailInfoFieldView>
                <div>
                    <button type="submit" className="submit-btn">등록</button>
                </div>
            </form>
        </Container>
    )
}

export default ModifyProductModalComponent;

// TODO :: input데이터 수정
const initialModifyProductData = null;

const modifyProductDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialModifyProductData;
        default: return initialModifyProductData;
    }
}
