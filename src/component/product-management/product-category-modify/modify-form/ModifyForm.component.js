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
        onChangeValueOfName: onChangeCategoryInputValue,
        checkSaveFormData: checkProductSaveFormData,
        onSubmitModifyData: onSubmitModifyCategoryData,
        onChangeSelectedCategory,
        onSubmitDeleteData: onSubmitDeleteProductCategory
    } = useProductCategoryHook();

    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    const __handle = {
        action: {
            cancelModifyCategory: () => {
                if(window.confirm('취소하면 현재 작업은 저장되지 않습니다. 정말 취소하시겠습니까?')) {
                    navigatePrevPage();
                }
            }
        },
        submit: {
            modifyProductCategory: (e) => {
                e.preventDefault();

                try{
                    checkProductSaveFormData();

                    setButtonDisabled(true);
                    onSubmitModifyCategoryData();
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <Container>
            <PageTitleFieldView title={'카테고리 수정'} />
            <form onSubmit={__handle.submit.modifyProductCategory}>
                {savedCategories &&
                    <CategoryInfoInputFieldView
                        selectedCategory={selectedCategory}
                        savedCategories={savedCategories}
                        modifyCategoryData={modifyCategoryData}
                        onChangeCategoryInputValue={onChangeCategoryInputValue}
                        onChangeSelectedCategory={onChangeSelectedCategory}
                        onSubmitDeleteProductCategory={onSubmitDeleteProductCategory}
                    />
                }

                <CreateButtonFieldView
                    buttonDisabled={buttonDisabled}
                    onActionCancelModifyProduct={__handle.action.cancelModifyCategory}
                />
            </form>
        </Container>
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