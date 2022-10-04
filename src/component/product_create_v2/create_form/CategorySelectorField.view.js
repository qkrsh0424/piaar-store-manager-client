import Ripple from "../../module/button/Ripple";
import RequiredIcon from "../../module/icon/RequiredIcon";
import { CategorySelectorWrapper } from "./CreateForm.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <CategorySelectorWrapper>
            <div className='title-wrapper'>
                <div className="title-box">
                    <span>카테고리</span>
                    <RequiredIcon />
                </div>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                    // onClick={props.onActionDeleteHeaderConfirmModalOpen}
                    >
                        <img
                            src='/assets/icon/down_arrow_black_icon.png'
                            style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            alt=""
                            loading='lazy'
                        ></img>
                        <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
                    </button>
                </div>
            </div>

            <div className='body-wrapper'>
                <div>
                    <select
                        className='select-item'
                        // value={props.createData}
                        // onChange={}
                    >
                        <option value=''>카테고리 선택</option>
                        {props.categoryList?.map((r, idx) => {
                            return (
                                <option key={'product_category_idx' + idx} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </CategorySelectorWrapper>
    )
}