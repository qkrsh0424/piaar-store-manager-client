import RequiredIcon from "../../../../module/icon/RequiredIcon";
import { CategorySelectorWrapper } from "../CreateForm.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <CategorySelectorWrapper>
            <div className='title-line' onClick={(e) => props.onActionSlideEffectControl(e, 'category')}>
                <div className="title-label">
                    <span>카테고리</span>
                    <RequiredIcon />
                </div>
                <div className='arrow-btn-box'>
                    <button
                        type='button'
                        className='button-el'
                        name='category'
                        onClick={(e) => props.onActionSlideEffectControl(e, 'category')}
                    >
                        <img
                            src={`/assets/icon/${props.slideDownEffect?.category ? 'up_arrow_black_icon.png' : 'down_arrow_black_icon.png'}`}
                            style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            alt=""
                            loading='lazy'
                        ></img>
                    </button>
                </div>
            </div>
            {props.slideDownEffect?.category &&
                <div className='inner-content'>
                    <select
                        name='productCategoryCid'
                        className='select-item'
                        value={props.createProductData?.productCategoryCid || ''}
                        onChange={(e) => props.onChangeProductInputValue(e)}
                    >
                        <option value=''>카테고리 선택</option>
                        {props.categoryList?.map((r, idx) => {
                            return (
                                <option key={'product_category_idx' + idx} value={r.cid}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
            }
        </CategorySelectorWrapper>
    )
}