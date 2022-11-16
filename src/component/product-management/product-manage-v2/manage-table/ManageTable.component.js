import { useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import OptionPackageModalComponent from "../modal/option-package-modal/OptionPackageModal.component";
import ProductDetailPageModalComponent from "../modal/product-detail-page-modal/ProductDetailPageModal.component";
import SubOptionCodeModalComponent from "../modal/sub-option-code-modal/SubOptionCodeModal.component";
import { Container } from "./ManageTable.styled";
import ManageTableFieldView from "./ManageTableField.view";

const ManageTableComponent = (props) => {
    const [subOptionCodeModalOpen, setSubOptionCodeModalOpen] = useState(false);
    const [optionPackageModalOpen, setOptionPackageModalOpen] = useState(false);
    const [productDetailPageModalOpen, setProductDetailPageModalOpen] = useState(false);
    const [option, setOption] = useState(null);
    const [product,setProduct] = useState(null);

    const __handle = {
        action: {
            openSubOptionCodeModal: (e, optionId) => {
                e.stopPropagation();

                // 대체코드 조회
                props.productManagementList.forEach(r => {
                    let option = r.options?.filter(option => option.id === optionId)[0];
                    
                    if(option){
                        setOption(option);
                    }
                });
                
                setSubOptionCodeModalOpen(true);
            },
            closeSubOptionCodeModal: () => {
                setOption(null);
                setSubOptionCodeModalOpen(false);
            },
            openOptionPackageModal: (e, optionId) => {
                e.stopPropagation();

                props.productManagementList.forEach(r => {
                    let option = r.options?.filter(option => option.id === optionId)[0];

                    if(option) {
                        setOption(option);
                    }
                })
                setOptionPackageModalOpen(true);
            },
            closeOptionPackageModal: () => {
                setOption(null);
                setOptionPackageModalOpen(false);
            },
            openProductDetailPageModal: (e, productId) => {
                e.stopPropagation();

                let data = props.productManagementList.filter(r => r.product.id === productId)[0]?.product;
                setProduct(data);

                setProductDetailPageModalOpen(true);
            },
            closeProductDetailPageModal: () => {
                setProduct(null);
                setProductDetailPageModalOpen(false);
            },
            routePurchaseUrl: (e, productId) => {
                e.stopPropagation();

                let data = props.productManagementList.filter(r => r.product.id === productId)[0]?.product;
                
                if(data.purchaseUrl == '' || !data.purchaseUrl) {
                    alert('구매링크를 먼저 등록해주세요.');
                    return;
                }
                window.open(data.purchaseUrl, '_blank');
            }
        }
    }

    return (
        <>
            <Container>
                {props.productManagementList &&
                    <ManageTableFieldView
                        buttonDisabled={props.buttonDisabled}
                        productManagementList={props.productManagementList}

                        isCheckedOne={props.isCheckedOne}
                        isCheckedAll={props.isCheckedAll}
                        onActionCheckOne={props.onActionCheckOne}
                        onActionCheckAll={props.onActionCheckAll}
                        isProductCheckedOne={props.isProductCheckedOne}
                        onActionProductCheckOne={props.onActionProductCheckOne}
                        onSubmitDeleteProductOne={props.onSubmitDeleteProductOne}
                        onActionModifyProduct={props.onActionModifyProduct}
                        onActionModifyOptions={props.onActionModifyOptions}
                        
                        onActionRoutePurchaseUrl={__handle.action.routePurchaseUrl}
                        onActionOpenSubOptionCodeModal={__handle.action.openSubOptionCodeModal}
                        onActionOpenOptionPackageModal={__handle.action.openOptionPackageModal}
                        onActionProductDetailPageModal={__handle.action.openProductDetailPageModal}
                    />
                }
            </Container>
            
            {subOptionCodeModalOpen && option &&
                <SubOptionCodeModalComponent
                    option={option}
                    onActionCloseModal={__handle.action.closeSubOptionCodeModal}
                />
            }

            {/* OptionPackage Control Modal */}
            {optionPackageModalOpen && option &&
                <OptionPackageModalComponent
                    option={option}
                    onActionCloseModal={__handle.action.closeOptionPackageModal}
                />
            }

            {productDetailPageModalOpen && product &&
                <ProductDetailPageModalComponent
                    product={product}
                    onActionCloseModal={__handle.action.closeProductDetailPageModal}
                />
            }
        </>
    )
}

export default ManageTableComponent;