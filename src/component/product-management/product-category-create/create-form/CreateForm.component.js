import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import RequiredIcon from "../../../module/icon/RequiredIcon";
import useProductCategoryHook from "../hooks/useProductCategoryHook";
import { CategoryInfoInputFieldWrapper, Container, CreateButtonFieldWrapper, PageTitleFieldWrapper } from "./CreateForm.styled"

export default function CreateFormComponent() {

    const {
        navigatePrevPage
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
            cancelCreateCategory: () => {
                if(!(createCategoryData && createCategoryData.name)) {
                    navigatePrevPage();
                    return;
                }

                if(window.confirm('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                    navigatePrevPage();
                }
            }
        },
        submit: {
            createProductCategory: async (e) => {
                e.preventDefault();

                try{
                    checkProductCreateFormData();

                    setButtonDisabled(true);
                    onActionOpenBackdrop();
                    await reqCreateProductCategoryData();
                    await reqSearchAllProductCategory();
                    onActionCloseBackdrop();
                } catch (err) {
                    alert(err.message);
                }
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