import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';
import ArrowField from './ArrowField.view';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container } from "./ItemSelector.styled";
import ProductListFieldView from './ProductListField.view';
import OptionListFieldView from './OptionListField.view';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import ModifyProductModalComponent from '../modify-product-modal/ModifyProductModal.component';
import CreateProductOptionModalComponent from '../create-product-option-modal/CreateProductOptionModal.component';
import ModifyProductOptionModalComponent from '../modify-product-option-modal/ModifyProductOptionModal.component';
import { generateOptionManagementCode } from '../../../utils/keyGeneratorUtils';

class ProductOption {
    constructor(productId, code = '', optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = code;
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.salesPrice = 0;
        this.totalPurchasePrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unit_cny = '';
        this.unit_krw = '';
        this.totalPurchasePrice = 0;
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            salesPrice: this.salesPrice,
            totalPurchasePrice: this.totalPurchasePrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.unitKrw,
            totalPurchasePrice: this.totalPurchasePrice,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

const ItemSelectorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const [productCid, dispatchProductCid] = useReducer(productCidReducer, initialProductCid);
    const [optionCid, dispatchOptionCid] = useReducer(optionCidReducer, initialOptionCid);
    
    const [modifyProductModalOpen, setModifyProductModalOpen] = useState(false);
    const [modifyProductData, setModifyProductData] = useState(null);

    const [createProductOptionModalOpen, setCreateProductOptionModalOpen] = useState(false);
    const [createProductOptionData, setCreateProductOptionData] = useState(null);

    const [modifyProductOptionModalOpen, setModifyProductOptionModalOpen] = useState(false);
    const [modifyProductOptionData, setModifyProductOptionData] = useState(null);

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

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    // product 선택 시
    const onActionRouteToOptionSearch = () => {
        delete query.optionCid;
        delete query.detailCid;

        query.optionCid = optionCid;

        navigate({
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

    const onActionOpenCreateProductOptionModal = () => {
        if (!query.productCid) {
            alert('상품을 먼저 선택해주세요.');
            return;
        }

        let selectedProduct = props.productViewList.filter(r => r.cid === parseInt(query.productCid))[0];
        let option = new ProductOption(selectedProduct.id, generateOptionManagementCode());
        option.productCid = selectedProduct.cid;

        setCreateProductOptionData(option);
        setCreateProductOptionModalOpen(true);
    }
    
    const onActionCloseCreateProductOptionModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setCreateProductOptionData(null);
        setCreateProductOptionModalOpen(false);
    }

    const onActionOpenModifyProductOptionModal = async () => {
        if (!query.optionCid) {
            alert('옵션을 먼저 선택해주세요.');
            return;
        }

        let selectedOption = props.optionViewList.filter(r => r.cid === parseInt(query.optionCid))[0];
        setModifyProductOptionData(selectedOption);

        await props._onAction_searchOptionPackage(selectedOption.id);
        setModifyProductOptionModalOpen(true);
    }
    
    const onActionCloseModifyProductOptionModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setModifyProductOptionData(null);
        setModifyProductOptionModalOpen(false);
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
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_modifyProduct(modifyProductData);
        }
        onActionCloseModifyProductModal();
    }

    const onActionCreateProductOption = async (createOptionData) => {
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_createProductOption(createOptionData);
        }
        onActionCloseCreateProductOptionModal();
    }

    const onActionModifyProductOption = async (modifyOptionData) => {
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_modifyProductOption(modifyOptionData);
        }
        onActionCloseModifyProductOptionModal();
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
                onActionOpenCreateProductOptionModal={() => onActionOpenCreateProductOptionModal()}
                onActionOpenModifyProductOptionModal={() => onActionOpenModifyProductOptionModal()}
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
                    isSubmit={props.submitCheck}

                    modifyProductData={modifyProductData}
                    onActionCloseModifyProductModal={() => onActionCloseModifyProductModal()}
                    onActionUploadImage={(e) => onActionUploadImage(e)}
                    onActionModifyProduct={(data) => onActionModifyProduct(data)}
                ></ModifyProductModalComponent>
            </CommonModalComponent>

            {/* ProductOption Create Modal */}
            <CommonModalComponent
                open={createProductOptionModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseCreateProductOptionModal}
            >
                <CreateProductOptionModalComponent
                    createProductOptionData={createProductOptionData}
                    uploadedImageData={uploadedImageData}
                    isSubmit={props.submitCheck}
                    optionList={props.optionList}

                    onActionCloseCreateProductOptionModal={() => onActionCloseCreateProductOptionModal()}
                    onActionUploadImage={(e) => onActionUploadImage(e)}
                    onActionCreateProductOption={(data) => onActionCreateProductOption(data)}
                ></CreateProductOptionModalComponent>
            </CommonModalComponent>

            {/* ProductOption Modify Modal */}
            <CommonModalComponent
                open={modifyProductOptionModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseModifyProductOptionModal}
            >
                <ModifyProductOptionModalComponent
                    modifyProductOptionData={modifyProductOptionData}
                    uploadedImageData={uploadedImageData}
                    isSubmit={props.submitCheck}
                    optionPackage={props.optionPackage}
                    optionList={props.optionList}

                    onActionCloseModifyProductOptionModal={() => onActionCloseModifyProductOptionModal()}
                    onActionUploadImage={(e) => onActionUploadImage(e)}
                    onActionModifyProductOption={(data) => onActionModifyProductOption(data)}
                ></ModifyProductOptionModalComponent>
            </CommonModalComponent>
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