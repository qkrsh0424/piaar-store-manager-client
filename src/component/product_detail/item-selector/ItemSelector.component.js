import { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import ArrowField from './ArrowField.view';

import { Container } from "./ItemSelector.styled";
import ProductListFieldView from './ProductListField.view';
import OptionListFieldView from './OptionListField.view';
import ProductModifyModal from '../../product_manage/modal/ProductModifyModal';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import ModifyProductModalComponent from '../modify-product-modal/ModifyProductModal.component';

const ItemSelectorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const history = useHistory();

    const [productCid, dispatchProductCid] = useReducer(productCidReducer, initialProductCid);
    const [optionCid, dispatchOptionCid] = useReducer(optionCidReducer, initialOptionCid);
    
    const [modifyProductModalOpen, setModifyProductModalOpen] = useState(false);
    const [modifyProductData, setModifyProductData] = useState(null);

    const [uploadedImageData, dispatchUploadedImageData] = useReducer(uploadedImageDataReducer, initialUploadedImageData);

    useEffect(() => {
        if(!props.uploadedImage) {
            return;
        }

        dispatchUploadedImageData({
            type: 'SET_DATA',
            payload: props.uploadedImage
        })
    }, [props.uploadedImage])

    // 카테고리 변경된 경우
    useEffect(() => {
        if(query.productCid !== 0 && !query.productCid) {
            dispatchProductCid({
                type: 'CLEAR'
            });
        }else {
            dispatchProductCid({
                type: 'SET_DATA',
                payload: query.productCid
            })
        }
    }, [query.categoryCid])

    // 상품선택이 변경된 경우
    useEffect(() => {
        if(!(productCid === '0' || productCid)) {
            return;
        }
        onActionRouteToProductSearch();
    }, [productCid])

    // 상품이 변경된 경우
    useEffect(() => {
        if(query.optionCid !== 0 && !query.optionCid) {
            dispatchOptionCid({
                type: 'CLEAR'
            });
        }else {
            dispatchOptionCid({
                type: 'SET_DATA',
                payload: query.optionCid
            })
        }
    }, [query.productCid])

    // 옵션선택이 변경된 경우
    useEffect(() => {
        if(!(optionCid === '0' || optionCid)) {
            return;
        }

        onActionRouteToOptionSearch();
    }, [optionCid])

    const onChangeProductCidValue = (value) => {
        dispatchProductCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    const onChangeOptionCidValue = (value) => {
        dispatchOptionCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    // category 선택 시
    const onActionRouteToProductSearch = () => {
        delete query.productCid;
        delete query.optionCid;
        delete query.detailCid;

        query.productCid = productCid;

        history.replace({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    // product 선택 시
    const onActionRouteToOptionSearch = () => {
        delete query.optionCid;
        delete query.detailCid;

        query.optionCid = optionCid;

        history.replace({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    const onActionOpenModifyProductModal = () => {
        if (!query.productCid) {
            alert('상품을 먼저 선택해주세요.');
            return;
        }

        let data = props.productViewList.filter(r => r.cid === parseInt(query.productCid))[0];
        setModifyProductData(data);
        setModifyProductModalOpen(true);
    }

    const onActionCloseModifyProductModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setModifyProductData(null);
        setModifyProductModalOpen(false);
    }

    const onActionDeleteProduct = async () => {
        if(!query.productCid) {
            alert('상품을 먼저 선택해주세요.');
            return;
        }

        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProduct(query.productCid);
        }
    }

    const onActionDeleteProductOption = async () => {
        if(!query.optionCid) {
            alert('옵션을 먼저 선택해주세요.');
            return;
        }

        if (window.confirm('옵션을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProductOption(query.optionCid);
        }
    }

    const onActionUploadImage = async (e) => {
        await props._onSubmit_uploadProdImageFile(e);
    }

    const onActionModifyProduct = async (modifyProductData) => {
        await props._onSubmit_modifyProduct(modifyProductData);
        onActionCloseModifyProductModal();
    }
    
    return(
        <Container>
            <ProductListFieldView
                productCid={productCid}
                productViewList={props.productViewList}

                onChangeProductCidValue={(value) => onChangeProductCidValue(value)}
                onActionOpenModifyProductModal={() => onActionOpenModifyProductModal()}
                onActionDeleteProduct={() => onActionDeleteProduct()}
            ></ProductListFieldView>

            <ArrowField></ArrowField>

            <OptionListFieldView
                optionCid={optionCid}
                optionViewList={props.optionViewList}

                onChangeOptionCidValue={(value) => onChangeOptionCidValue(value)}
                onActionDeleteProductOption={() => onActionDeleteProductOption()}
            ></OptionListFieldView>

            {/* Product Modify Modal */}
            <CommonModalComponent
                open={modifyProductModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseModifyProductModal}
            >
                <ModifyProductModalComponent
                    categoryList={props.categoryList}
                    uploadedImageData={uploadedImageData}

                    modifyProductData={modifyProductData}
                    onActionCloseModifyProductModal={() => onActionCloseModifyProductModal()}
                    onActionUploadImage={(e) => onActionUploadImage(e)}
                    onActionModifyProduct={(data) => onActionModifyProduct(data)}
                ></ModifyProductModalComponent>
            </CommonModalComponent>

            {/* <CommonModalComponent
                open={optionModifyModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseOptionModifyModal}
            >
                <ProductOptionModifyModal
                ></ProductOptionModifyModal>
            </CommonModalComponent> */}
        </Container>
    )
}

export default ItemSelectorComponent;

const initialProductCid = '';
const initialOptionCid = '';
const initialUploadedImageData = '';

const productCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

const optionCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

const uploadedImageDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}