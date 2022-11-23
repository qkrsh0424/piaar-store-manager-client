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
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { ConfirmSnackbarHookComponent, useConfirmSnackbarHook } from "../../../../hooks/snackbar/useConfirmSnackbarHook";

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
        navigateUrl,
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

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    const {
        open: confirmSnackbarOpen,
        message: confirmSnackbarMessage,
        confirmAction: snackbarConfirmAction,
        onActionOpen: onActionOpenConfirmSnackbar,
        onActionClose: onActionCloseConfirmSnackbar,
    } = useConfirmSnackbarHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        async function fetchInit() {
            let productId = query.productId;
            onActionOpenBackdrop();
            try{
                await reqSearchAllProductCategory();
                await reqSearchOneForProduct(productId)
            } catch (err) {
                let snackbarSetting = {
                    message: err?.message,
                    severity: 'error'
                }
                onActionOpenSnackbar(snackbarSetting);
            }
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    const __handle = {
        action: {
            cancelCreateProduct: () => {
                onActionOpenConfirmSnackbar(
                    '취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?',
                    () => () => navigatePrevPage()
                );
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

                onActionOpenConfirmSnackbar(
                    '기존 상품 정보로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다)',
                    () => () => {
                        onActionResetOriginProductData();

                        let snackbarSetting = {
                            message: '초기화되었습니다.',
                            severity: 'info'
                        }
                        onActionOpenSnackbar(snackbarSetting);
                    }
                );
            }
        },
        submit: {
            modifyProduct: async (e) => {
                e.preventDefault();
                e.stopPropagation();

                onActionOpenConfirmSnackbar(
                    '데이터 수정을 완료하시겠습니까?',
                    () => async () => {
                        try {
                            checkProductCreateFormData();

                            setButtonDisabled(true);
                            onActionOpenBackdrop();
                            await reqModifyOne(() => {
                                let data = {
                                    pathname: `/products`,
                                }
                                navigateUrl(data);
                            });
                            onActionCloseBackdrop();
                        } catch (err) {
                            let snackbarSetting = {
                                message: err?.message,
                                severity: 'error'
                            }

                            onActionOpenSnackbar(snackbarSetting);
                        }
                    }
                )
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

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }

            {/* Snackbar */}
            {confirmSnackbarOpen &&
                <ConfirmSnackbarHookComponent
                    open={confirmSnackbarOpen}
                    message={confirmSnackbarMessage}
                    onClose={onActionCloseConfirmSnackbar}
                    vertical={'top'}
                    horizontal={'center'}
                    onConfirm={snackbarConfirmAction}
                ></ConfirmSnackbarHookComponent>
            }
        </Container>
    )
}

export default ModifyFormComponent;
