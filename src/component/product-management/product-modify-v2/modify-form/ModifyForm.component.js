import { Container, PageTitleFieldWrapper } from "./ModifyForm.styled";
import ProductInfoInputFieldView from "./view/ProductInfoInputField.view";
import { useEffect } from "react";
import { useImageFileUploaderHook } from "../../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./view/ButtonField.view";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useProductHook from "../hooks/useProductHook";
import useProductCategoryHook from "../hooks/useProductCategoryHook";

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const ModifyFormComponent = (props) => {
    
    const {
        query,
        navigatePrevPage
    } = useRouterHook();

    const {
        productCategoryList,
        reqSearchAllProductCategory
    } = useProductCategoryHook();

    const {
        product: modifyProductData,
        onChangeValueOfName: onChangeProductInputValue,
        onChangeImageFileNameAndImageUrl,
        onActionDeleteImageFileNameAndImageUrl,
        checkCreateFormData: checkProductCreateFormData,
        onActionResetOriginData: onActionResetOriginProductData,
        onChangeStockManagement: onChangeProductStockManagement,
        reqSearchOneForProduct,
        reqModifyOne
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
        async function fetchInit() {
            let productId = query.productId;
            onActionOpenBackdrop();
            await reqSearchAllProductCategory();
            await reqSearchOneForProduct(productId)
            onActionCloseBackdrop();
        }

        fetchInit();        
    }, [])

    const __handle = {
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
                    onActionResetOriginProductData();
                }
            }
        },
        submit: {
            modifyProduct: async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if(!window.confirm('데이터 수정을 완료하시겠습니까?')) {
                    return;
                }
        
                try {
                    checkProductCreateFormData();

                    setButtonDisabled(true);
                    onActionOpenBackdrop();
                    await reqModifyOne();                    
                    onActionCloseBackdrop();
                    
                    navigatePrevPage();
                } catch (err) {
                    alert(err.message)
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'상품 수정'} />

            <form onSubmit={__handle.submit.modifyProduct}>
                {modifyProductData &&
                    <ProductInfoInputFieldView
                        categoryList={productCategoryList}
                        modifyProductData={modifyProductData}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionUploadProductImageFile={__handle.action.uploadProductImageFile}
                        onActionRemoveImage={onActionDeleteImageFileNameAndImageUrl}
                        onChangeProductStockManagement={onChangeProductStockManagement}
                    />
                }

                <CreateButtonFieldView
                    buttonDisabled={buttonDisabled}

                    onActionCancelCreateProduct={__handle.action.cancelCreateProduct}
                    onActionResetProduct={__handle.action.resetProduct}
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
