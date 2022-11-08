import { Container, PageTitleFieldWrapper } from "./ModifyForm.styled";
import ProductInfoInputFieldView from "./view/ProductInfoInputField.view";
import { useEffect, useReducer } from "react";
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./view/ButtonField.view";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { useDisabledButtonHook } from "../../../hooks/button-disabled/useDisabledButtonHook";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useProductHook from "../hooks/useProductHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const ModifyFormComponent = (props) => {
    
    const {
        navigatePrevPage
    } = useRouterHook();

    const {
        product: modifyProductData,
        onChangeValueOfName: onChangeProductInputValue,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData: checkProductCreateFormData,
        onActionUpdateProduct,
        onChangeStockManagement: onChangeProductStockManagement
    } = useProductHook();

    const {
        __reqUploadImageFile
    } = useImageFileUploaderHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        function setProduct() {
            let product = {...props.product};

            onActionUpdateProduct(product);
        }

        if(!props.product) {
            return;
        }
        setProduct();
    }, [props.product])

    const __hanlde = {
        action: {
            cancelCreateProduct: () => {
                if(window.confirm('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                    navigatePrevPage();
                }
            },
            uploadProductImageFile: async (e) => {
                e.preventDefault();
        
                if(e.target.files.length == 0) return;
        
                onActionOpenBackdrop();
                let imageInfo = await __reqUploadImageFile(e);
                onActionCloseBackdrop();
        
                onChangeImageFileNameAndImageUrl(imageInfo);
            },
            changeStockManagement: (e) => {
                e.preventDefault();

                let stockManagement = modifyProductData.stockManagement;
                let target = {
                    name: 'stockManagement',
                    value: !stockManagement
                }
                onChangeProductInputValue({target});
            },
            resetProduct: (e) => {
                e.preventDefault();

                if(window.confirm('기존 상품 정보로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다)')) {
                    let data = {...props.product};
                    onActionUpdateProduct(data);
                }
            }
        },
        submit: {
            modifyProduct: (e) => {
                e.preventDefault();
                e.stopPropagation();

                if(!window.confirm('데이터 수정을 완료하시겠습니까?')) {
                    return;
                }
        
                try {
                    checkProductCreateFormData();

                    setButtonDisabled(true);
                    props._onSubmit_modifyProduct(modifyProductData);
                } catch (err) {
                    alert(err.message)
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'상품 수정'} />

            <form onSubmit={__hanlde.submit.modifyProduct}>
                {modifyProductData &&
                    <ProductInfoInputFieldView
                        categoryList={props.categoryList}
                        modifyProductData={modifyProductData}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionUploadProductImageFile={__hanlde.action.uploadProductImageFile}
                        onActionRemoveImage={onActionDeleteImageFileNameAndImageUrl}
                        onChangeProductStockManagement={onChangeProductStockManagement}
                    />
                }

                <CreateButtonFieldView
                    buttonDisabled={buttonDisabled}

                    onActionCancelCreateProduct={__hanlde.action.cancelCreateProduct}
                    onActionResetProduct={__hanlde.action.resetProduct}
                />
            </form>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ModifyFormComponent;
