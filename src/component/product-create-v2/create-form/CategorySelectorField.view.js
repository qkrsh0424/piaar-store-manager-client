import RequiredIcon from "../../module/icon/RequiredIcon";
import { CategorySelectorWrapper } from "./CreateForm.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <CategorySelectorWrapper>
            <div className='title-wrapper' onClick={(e) => props.onActionSlideEffectControl(e, 'category')}>
                <div className="title-box">
                    <span>카테고리</span>
                    <RequiredIcon />
                </div>
                <div className='button-box'>
                    <button
                        id='category'
                        type='button'
                        className='button-el'
                        name='category'
                        onClick={props.onActionSlideEffectControl}
                    >
                        {props.slideDownEffect?.category ?
                            <img
                                src='/assets/icon/up_arrow_black_icon.png'
                                style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                alt=""
                                loading='lazy'
                            ></img>
                            :
                            <img
                                src='/assets/icon/down_arrow_black_icon.png'
                                style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                alt=""
                                loading='lazy'
                            ></img>
                        }
                    </button>
                </div>
            </div>
            <div className={`body-wrapper ${props.slideDownEffect?.category ? `slide-down` : `slide-up`}`}>
                <div className='inner-wrapper'>
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
            </div>
        </CategorySelectorWrapper>
    )
}