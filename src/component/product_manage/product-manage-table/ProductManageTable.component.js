import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ProductManageTableFieldView from "./ProductManageTableField.view";
import { Container } from "./ProductManageTable.styled"
import ModifyProductModalComponent from '../modify-product-modal/ModifyProductModal.component';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateProductOptionModalComponent from '../../product_detail/create-product-option-modal/CreateProductOptionModal.component';
import { generateOptionManagementCode } from '../../../utils/keyGeneratorUtils';
import ModifyProductOptionModalComponent from '../modify-product-option-modal/ModifyProductOptionModal.component';
import StockStatusModalComponent from '../stock-status-modal/StockStatusModal.component';

class ProductOption {
    constructor(productId, code = '', optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = code;
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.nosUniqueCode = '';
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unitCny = '';
        this.unitKrw = '';
        this.totalPurchasePrice = 0;
        this.packageYn = 'n';
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            nosUniqueCode: this.nosUniqueCode,
            salesPrice: this.salesPrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.unitKrw,
            totalPurchasePrice: this.totalPurchasePrice,
            packageYn: this.packageYn,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

const ProductManageTableComponent = (props) => {
    const [modifyProductModalOpen, setModifyProductModalOpen] = useState(false);
    const [modifyProductData, setModifyProductData] = useState(null);
    
    const [createProductOptionModalOpen, setCreateProductOptionModalOpen] = useState(false);
    const [createProductOptionData, setCreateProductOptionData] = useState(null);

    const [modifyProductOptionModalOpen, setModifyProductOptionModalOpen] = useState(false);
    const [modifyProductOptionData, setModifyProductOptionData] = useState(null);

    const [stockStatusModalOpen, setStockStatusModalOpen] = useState(false);
    const [stockStatusListData, setStockStatusListData] = useState(null);

    const [uploadedImageData, dispatchUploadedImageData] = useReducer(uploadedImageDataReducer, initialUploadedImageData);

    useEffect(() => {
        if(!props.uploadedImage) {
            return;
        }

        dispatchUploadedImageData({
            type: 'SET_DATA',
            payload: props.uploadedImage
        })
    }, [props.uploadedImage]);

    useEffect(() => {
        if(!props.stockStatusList) {
            return;
        }

        let sortedByDate = [...props.stockStatusList.productRelease, ...props.stockStatusList.productReceive];

        // 날짜 오름차순으로 정렬 - 재고 현황을 위해
        sortedByDate.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

        // 재고현황 기록
        let sum = 0;
        sortedByDate = sortedByDate.map(r => {
            if (r.receiveUnit) {
                sum += r.receiveUnit;
                return {
                    ...r,
                    currentStock: sum
                }
            } else {
                sum -= r.releaseUnit;
                return {
                    ...r,
                    currentStock: sum
                }
            }
        });

        // 화면에는 최신 데이터부터 보여주도록 함.
        sortedByDate.reverse();

        setStockStatusListData(sortedByDate);
    }, [props.stockStatusList])

    const onActionOpenModifyProductModal = (productId) => {
        let product = props.productViewList.filter(product => product.product.id === productId)[0].product;
        setModifyProductData(product);
        setModifyProductModalOpen(true);
    }

    const onActionCloseModifyProductModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setModifyProductData(null);
        setModifyProductModalOpen(false);
    }

    const onActionOpenCreateProductOptionModal = (productId) => {
        let selectedProduct = props.productViewList.filter(r => r.product.id === productId)[0].product;
        let option = new ProductOption(selectedProduct.id, generateOptionManagementCode());
        option.productCid = selectedProduct.cid;

        console.log(option);

        setCreateProductOptionData(option);
        setCreateProductOptionModalOpen(true);
    }
    
    const onActionCloseCreateProductOptionModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setCreateProductOptionData(null);
        setCreateProductOptionModalOpen(false);
    }

    const onActionOpenModifyProductOptionModal = async (e, productId, optionId) => {
        e.preventDefault();

        let product = props.productViewList.filter(r => r.product.id === productId)[0];
        let option = product.options.filter(r => r.id === optionId)[0];

        setModifyProductOptionData(option);
        await props._onAction_searchOptionPackage(option.id);
        setModifyProductOptionModalOpen(true);
    }
    
    const onActionCloseModifyProductOptionModal = () => {
        dispatchUploadedImageData({ type: 'CLEAR' });
        setModifyProductOptionData(null);
        setModifyProductOptionModalOpen(false);
    }

    const onActionModifyProduct = async (modifyProductData) => {
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_modifyProduct(modifyProductData);
        }
        onActionCloseModifyProductModal();
    }

    const onActionUploadImage = async (e) => {
        await props._onSubmit_uploadProdImageFile(e);
    }

    const onActionDeleteProduct = async (productId) => {
        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            let product = props.productViewList.filter(product => product.product.id === productId)[0].product;
            await props._onSubmit_deleteProduct(product.cid);
        }
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

    const onActionDeleteProductOption = async (e, productId, productOptionId) => {
        e.stopPropagation();

        if (window.confirm('옵션을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            let product = props.productViewList.filter(r => r.product.id === productId)[0];
            let option = product.options.filter(r => r.id === productOptionId)[0];
            let optionCid = option.cid;
            await props._onSubmit_deleteProductOption(optionCid);
        }
    }

    const onActionOpenStockStatusModal = async (e, productId, optionId) => {
        e.stopPropagation();
        let product = props.productViewList.filter(r => r.product.id === productId)[0];
        let option = product.options.filter(r => r.id === optionId)[0];
        let optionCid = option.cid;
        await props._onAction_searchStockStatus(optionCid);
        setStockStatusModalOpen(true);
    }

    const onActionCloseStockStatusModal = () => {
        setStockStatusListData(null);
        setStockStatusModalOpen(false);
    }

    const onActionModifyReceiveStockStatusMemo = async (data) => {
        await props._onAction_modifyReceiveMemo(data);
    }

    const onActionModifyReleaseStockStatusMemo = async (data) => {
        await props._onAction_modifyReleaseMemo(data);
    }

    return (
        <Container>
            <ProductManageTableFieldView
                productViewList={props.productViewList}

                onActionOpenModifyProductModal={(productId) => onActionOpenModifyProductModal(productId)}
                onActionDeleteProduct={(productId) => onActionDeleteProduct(productId)}
                onActionOpenCreateProductOptionModal={(productId) => onActionOpenCreateProductOptionModal(productId)}
                onActionOpenModifyProductOptionModal={(e, productId, optionId) => onActionOpenModifyProductOptionModal(e, productId, optionId)}
                onActionDeleteProductOption={(e, productId, optionId) => onActionDeleteProductOption(e, productId, optionId)}
                onActionOpenStockStatusModal={(e, productId, optionId) => onActionOpenStockStatusModal(e, productId, optionId)}
                checkOneTr={(optionId) => props._onAction_checkOneTr(optionId)}
                checkAll={() => props._onAction_checkAll()}
                isCheckedAll={() => props._onAction_isCheckedAll()}
                isChecked={(optionId) => props._onAction_isChecked(optionId)}
            ></ProductManageTableFieldView>

            {/* Product Modify Modal */}
            <CommonModalComponent
                open={modifyProductModalOpen}
                maxWidth={'md'}
                fullWidth={true}
    
                onClose={onActionCloseModifyProductModal}
            >
                <ModifyProductModalComponent
                    modifyProductData={modifyProductData}
                    categoryList={props.categoryList}
                    uploadedImageData={uploadedImageData}
                    isSubmit={props.submitCheck}

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

            {/* StockStatus Search Modal */}
            <CommonModalComponent
                open={stockStatusModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseStockStatusModal}
            >
                <StockStatusModalComponent
                    stockStatusListData={stockStatusListData}

                    onActionCloseStockStatusModal={() => onActionCloseStockStatusModal()}
                    onActionModifyReceiveStockStatusMemo={(data) => onActionModifyReceiveStockStatusMemo(data)}
                    onActionModifyReleaseStockStatusMemo={(data) => onActionModifyReleaseStockStatusMemo(data)}
                ></StockStatusModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default ProductManageTableComponent;

const initialUploadedImageData = '';

const uploadedImageDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}