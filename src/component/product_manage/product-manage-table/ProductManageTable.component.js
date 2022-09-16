import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ProductManageTableFieldView from "./ProductManageTableField.view";
import { Container } from "./ProductManageTable.styled"
import ModifyProductModalComponent from '../modify-product-modal/ModifyProductModal.component';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import ModifyProductOptionModalComponent from '../modify-product-option-modal/ModifyProductOptionModal.component';
import StockStatusModalComponent from '../stock-status-modal/StockStatusModal.component';
import CreateProductOptionModalComponent from '../create-product-option-modal/CreateProductOptionModal.component';
import SubOptionCodeModalComponent from '../sub-option-code-modal/SubOptionCodeModal.component';
import ProductDetailPageModalComponent from '../product-detail-page-modal/ProductDetailPageModal.component';

class ProductOption {
    constructor(productId, optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.releaseLocation = '';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.totalPurchasePrice = 0;
        this.packageYn = 'n';
        this.safetyStockUnit = 0;
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
            stockUnit: this.stockUnit,
            status: this.status,
            releaseLocation: this.releaseLocation,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            totalPurchasePrice: this.totalPurchasePrice,
            packageYn: this.packageYn,
            safetyStockUnit: this.safetyStockUnit,
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

    const [subOptionCodeModalOpen, setSubOptionCodeModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductOptionData, setSelectedProductOptionData] = useState(null);

    const [productDetailPageModalOpen, setProductDetailPageModalOpen] = useState(false);

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
        setModifyProductData(null);
        setModifyProductModalOpen(false);
    }

    const onActionOpenCreateProductOptionModal = (productId) => {
        let selectedProduct = props.productViewList.filter(r => r.product.id === productId)[0].product;
        let option = new ProductOption(selectedProduct.id);
        option = {
            ...option,
            productCid: selectedProduct.cid,
            totalPurchasePrice: selectedProduct.defaultTotalPurchasePrice
        }

        setCreateProductOptionData(option);
        setCreateProductOptionModalOpen(true);
    }
    
    const onActionCloseCreateProductOptionModal = () => {
        setCreateProductOptionData(null);
        setCreateProductOptionModalOpen(false);
    }

    const onActionOpenModifyProductOptionModal = async (e, productId, optionId) => {
        e.preventDefault();
        e.stopPropagation();

        let product = props.productViewList.filter(r => r.product.id === productId)[0];
        let option = product.options.filter(r => r.id === optionId)[0];

        setModifyProductOptionData(option);
        await props._onAction_searchOptionPackage(option.id);
        setModifyProductOptionModalOpen(true);
    }
    
    const onActionCloseModifyProductOptionModal = () => {
        setModifyProductOptionData(null);
        setModifyProductOptionModalOpen(false);
    }

    const onActionModifyProduct = async (modifyProductData) => {
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_modifyProduct(modifyProductData);
        }
        onActionCloseModifyProductModal();
    }

    const onActionDeleteProduct = async (productId) => {
        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProduct(productId);
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
            let optionId = option.id;
            await props._onSubmit_deleteProductOption(optionId);
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

    const onActionOpenSubOptionCodeModal = async (e, productId, optionId) => {
        e.stopPropagation();

        let product = props.productViewList.filter(r => r.product.id === productId)[0];
        let option = product.options.filter(r => r.id === optionId)[0];

        setSubOptionCodeModalOpen(true);
        setSelectedProductOptionData(option);
    }

    const onActionCloseStockStatusModal = () => {
        setStockStatusListData(null);
        setStockStatusModalOpen(false);
    }

    const onActionCloseSubOptionCodeModal = () => {
        setSubOptionCodeModalOpen(false);
    }

    const onActionModifyReceiveStockStatusMemo = async (data) => {
        await props._onAction_modifyReceiveMemo(data);
    }

    const onActionModifyReleaseStockStatusMemo = async (data) => {
        await props._onAction_modifyReleaseMemo(data);
    }

    const onActionDeleteSubOptionCode = async (subOptionId) => {
        await props._onAction_deleteSubOptionCode(subOptionId);
    }

    const onActionOpenProductDetailPageModal = async (productId) => {
        let product = props.productViewList.filter(r => r.product.id === productId)[0];

        setSelectedProduct(product);
        await props._onAction_searchProductDetailPage(productId);
        setProductDetailPageModalOpen(true);
    }
    
    const onActionCloseProductDetailPageModal = () => {
        setProductDetailPageModalOpen(false);
    }

    const onSubmitCreateProductDetailPage = async (data) => {
        if(!props.submitCheck.isSubmit) {
            await props._onSubmit_createProductDetailPage(data);
        }
    }

    const onSubmitModifyProductDetailPage = async (data) => {
        await props._onSubmit_modifyProductDetailPage(data);
    }
     
    const onActionDeleteProductDetailPage = async (data) => {
        await props._onAction_deleteProductDetailPage(data);
    }
    
    const onActionUpdateProductDetailPageOfSelectedProduct = async (data) => {
        await props._onAction_updateProductDetailPageOfSelectedProduct(data);
        onActionCloseProductDetailPageModal();
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
                onActionOpenSubOptionCodeModal={(e, productId, optionId) => onActionOpenSubOptionCodeModal(e, productId, optionId)}
                checkOneTr={(optionId) => props._onAction_checkOneTr(optionId)}
                checkAll={() => props._onAction_checkAll()}
                isCheckedAll={() => props._onAction_isCheckedAll()}
                isChecked={(optionId) => props._onAction_isChecked(optionId)}
                onActionOpenProductDetailPageModal={onActionOpenProductDetailPageModal}
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
                    isSubmit={props.submitCheck}
                    onActionOpenBackdrop={props.onActionOpenBackdrop}
                    onActionCloseBackdrop={props.onActionCloseBackdrop}

                    onActionCloseModifyProductModal={() => onActionCloseModifyProductModal()}
                    onActionModifyProduct={(data) => onActionModifyProduct(data)}
                ></ModifyProductModalComponent>
            </CommonModalComponent>

            {/* ProductOption Modify Modal */}
            <CommonModalComponent
                open={productDetailPageModalOpen}
                maxWidth={'sm'}
                fullWidth={true}

                onClose={onActionCloseProductDetailPageModal}
            >
                <ProductDetailPageModalComponent
                    productDetailPageDataList={props.productDetailPageDataList}
                    selectedProduct={selectedProduct}

                    onActionCloseProductDetailPageModal={onActionCloseProductDetailPageModal}
                    onSubmitCreateProductDetailPage={onSubmitCreateProductDetailPage}
                    onSubmitModifyProductDetailPage={onSubmitModifyProductDetailPage}
                    onActionDeleteProductDetailPage={onActionDeleteProductDetailPage}
                    onActionUpdateProductDetailPageOfSelectedProduct={onActionUpdateProductDetailPageOfSelectedProduct}
                ></ProductDetailPageModalComponent>
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
                    isSubmit={props.submitCheck}
                    optionList={props.optionList}
                    onActionOpenBackdrop={props.onActionOpenBackdrop}
                    onActionCloseBackdrop={props.onActionCloseBackdrop}

                    onActionCloseCreateProductOptionModal={() => onActionCloseCreateProductOptionModal()}
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
                    isSubmit={props.submitCheck}
                    optionPackage={props.optionPackage}
                    optionList={props.optionList}
                    onActionOpenBackdrop={props.onActionOpenBackdrop}
                    onActionCloseBackdrop={props.onActionCloseBackdrop}

                    onActionCloseModifyProductOptionModal={() => onActionCloseModifyProductOptionModal()}
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

            {/* SubOptionCode Control Modal */}
            <CommonModalComponent
                open={subOptionCodeModalOpen}
                maxWidth={'sm'}
                fullWidth={true}

                onClose={onActionCloseSubOptionCodeModal}
            >
                <SubOptionCodeModalComponent
                    selectedProductOptionData={selectedProductOptionData}
                    subOptionCodeData={props.subOptionCodeData}

                    onActionCloseSubOptionCodeModal={() => onActionCloseSubOptionCodeModal()}
                    onActionDeleteSubOptionCode={(subOptionId) => onActionDeleteSubOptionCode(subOptionId)}
                ></SubOptionCodeModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default ProductManageTableComponent;
