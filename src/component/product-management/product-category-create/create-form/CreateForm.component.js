import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { ConfirmSnackbarHookComponent, useConfirmSnackbarHook } from "../../../../hooks/snackbar/useConfirmSnackbarHook";
import RequiredIcon from "../../../module/icon/RequiredIcon";
import useProductCategoryHook from "../hooks/useProductCategoryHook";
import { CategoryInfoInputFieldWrapper, Container, CreateButtonFieldWrapper, PageTitleFieldWrapper } from "./CreateForm.styled"

export default function CreateFormComponent() {

    const {
        navigateUrl
    } = useRouterHook();

    const {
        savedCategories,
        category: createCategoryData,

        reqSearchAllProductCategory,
        onChangeValueOfName: onChangeCategoryInputValue,
        checkCreateFormData: checkProductCreateFormData,
        reqCreateOne: reqCreateProductCategoryData
    } = useProductCategoryHook();

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
            onActionOpenBackdrop();
            try {
                await reqSearchAllProductCategory();
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
            cancelCreateCategory: () => {
                if(!(createCategoryData && createCategoryData.name)) {
                    navigateUrl({ pathname: '/products'})
                    return;
                }

                onActionOpenConfirmSnackbar('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?', 
                    () => () => navigateUrl({ pathname: '/products'})
                );
            }
        },
        submit: {
            createProductCategory: async (e) => {
                e.preventDefault();

                onActionOpenBackdrop();
                try{
                    checkProductCreateFormData();

                    setButtonDisabled(true);
                    await reqCreateProductCategoryData(() => {
                        let snackbarSetting = {
                            message: '완료되었습니다.',
                            severity: 'info'
                        }

                        onActionOpenSnackbar(snackbarSetting);
                    });
                    await reqSearchAllProductCategory();
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                }
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container>
                <PageTitleFieldView title={'카테고리 생성'} />
                <form onSubmit={__handle.submit.createProductCategory}>
                    {createCategoryData &&
                        <CategoryInfoInputFieldView
                            savedCategories={savedCategories}
                            createCategoryData={createCategoryData}
                            onChangeCategoryInputValue={onChangeCategoryInputValue}
                        />
                    }

                    <CreateButtonFieldView
                        buttonDisabled={buttonDisabled}
                        onActionCancelCreateProduct={__handle.action.cancelCreateCategory}
                    />
                </form>
            </Container>

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
        </>
    )
}

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div className='page-title'>{title}</div>
        </PageTitleFieldWrapper>
    )
}

function CategoryInfoInputFieldView(props) {
    return (
        <CategoryInfoInputFieldWrapper>
            <div className='title-line'>
                <div className='title-label'>
                    <span>카테고리</span>
                    <RequiredIcon />
                </div>
            </div>

            <div className='inner-content'>
                <div className='input-group-box'>
                    <span className='control-label'>
                        이름
                        <RequiredIcon />
                    </span>
                    <input type='text' name='name' value={props.createCategoryData.name} onChange={(e) => props.onChangeCategoryInputValue(e)} required/>
                    <select
                        className='select-item'
                        value=''
                        readOnly
                    >
                        <option value=''>카테고리 보기</option>
                        {props.savedCategories?.map((r, idx) => {
                            return (
                                <option key={'product_category_idx' + idx} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </CategoryInfoInputFieldWrapper>
    )
}

function CreateButtonFieldView(props) {
    return (
        <CreateButtonFieldWrapper>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionCancelCreateProduct()}
                >
                    취소
                </button>
                <button
                    type='submit'
                    className='button-el store-btn'
                    disabled={props.buttonDisabled}
                >
                    저장
                </button>
            </div>
        </CreateButtonFieldWrapper>
    )
}