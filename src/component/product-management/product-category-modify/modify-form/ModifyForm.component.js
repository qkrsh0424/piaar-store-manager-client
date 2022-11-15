import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import RequiredIcon from "../../../module/icon/RequiredIcon";
import useProductCategoryHook from "../hooks/useProductCategoryHook";
import { CategoryInfoInputFieldWrapper, Container, CreateButtonFieldWrapper, PageTitleFieldWrapper } from "./ModifyForm.styled";

export default function ModifyFormComponent(props) {
    const {
        navigatePrevPage
    } = useRouterHook();

    const {
        selectedCategory,
        savedCategories,
        category: modifyCategoryData,
        reqSearchAllProductCategory,
        onChangeValueOfName: onChangeCategoryInputValue,
        checkSaveFormData: checkProductSaveFormData,
        reqModifyOne: reqModifyProductCategoryData,
        onChangeSelectedCategory,
        reqDeleteOne: reqDeleteProductCategoryData
    } = useProductCategoryHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllProductCategory();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    const __handle = {
        action: {
            cancelModifyCategory: () => {
                if(window.confirm('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                    navigatePrevPage();
                }
            }
        },
        submit: {
            modifyProductCategory: async (e) => {
                e.preventDefault();

                try{
                    checkProductSaveFormData();
                    
                    setButtonDisabled(true);
                    onActionOpenBackdrop();
                    await reqModifyProductCategoryData();
                    await reqSearchAllProductCategory();
                    onActionCloseBackdrop();
                } catch (err) {
                    alert(err.message);
                }
            },
            deleteProductCategory: async (e) => {
                e.preventDefault();

                if (!selectedCategory) {
                    alert('카테고리를 선택해주세요.');
                    return;
                }

                if (!window.confirm('선택된 카테고리를 제거하시곘습니까?\n카테고리를 제거하면 하위 상품과 옵션들도 함께 제거됩니다.')) {
                    return;
                }

                setButtonDisabled(true);
                onActionOpenBackdrop();
                await reqDeleteProductCategoryData();
                await reqSearchAllProductCategory();
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container>
                <PageTitleFieldView title={'카테고리 수정'} />
                <form onSubmit={__handle.submit.modifyProductCategory}>
                    {savedCategories &&
                        <CategoryInfoInputFieldView
                            buttonDisabled={buttonDisabled}
                            selectedCategory={selectedCategory}
                            savedCategories={savedCategories}
                            modifyCategoryData={modifyCategoryData}
                            onChangeCategoryInputValue={onChangeCategoryInputValue}
                            onChangeSelectedCategory={onChangeSelectedCategory}
                            onSubmitDeleteProductCategory={__handle.submit.deleteProductCategory}
                        />
                    }

                    <CreateButtonFieldView
                        buttonDisabled={buttonDisabled}
                        onActionCancelModifyProduct={__handle.action.cancelModifyCategory}
                    />
                </form>
            </Container>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
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
                    <span className='control-label'>선택</span>
                    <div className='flex-item place-items-center'>
                        <select
                            className='select-item'
                            value={props.selectedCategory?.id || ''}
                            name='name'
                            onChange={(e) => props.onChangeSelectedCategory(e)}
                        >
                            <option value=''>카테고리 선택</option>
                            {props.savedCategories?.map((r, idx) => {
                                return (
                                    <option key={'product_category_idx' + idx} value={r.id}>{r.name}</option>
                                )
                            })}
                        </select>
                        <div className='button-box'>
                            <button
                                type='button'
                                className='button-el'
                                onClick={(e) => props.onSubmitDeleteProductCategory(e)}
                                disabled={props.buttonDisabled}
                            >
                                <img
                                    src='/assets/icon/delete_default_ff3060.svg'
                                    style={{ width: '30px' }}
                                    alt=""
                                    loading='lazy'
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='inner-content'>
                <div className='input-group-box'>
                    <span className='control-label'>
                        이름
                        <RequiredIcon />
                    </span>
                    <input
                        type='text'
                        name='name'
                        value={props.modifyCategoryData?.name || ''}
                        onChange={(e) => props.onChangeCategoryInputValue(e)}
                        disabled={props.selectedCategory ? false : true}
                        required
                    />
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
                    onClick={() => props.onActionCancelModifyProduct()}
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