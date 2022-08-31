import { useState } from "react";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import Ripple from "../../../../module/button/Ripple";
import { Container, ContentFieldWrapper, HeaderFieldWrapper, TipFieldWrapper } from "./FixOrderItemModal.styled";

const defaultHeaderDetails = getDefaultHeaderDetails();

const EXCLUDED_COLUMN_NAME = [
    'uniqueCode'
];
const FixOrderItemModalComponent = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(false);
    return (
        <>
            <Container>
                <form onSubmit={(e) => { setDisabledBtn(true); props.onActionConfirmUpdateFixOrderItem(e); }}>
                    <HeaderFieldWrapper>
                        <div className='flex-box'>
                            <div className='title-box'>
                                데이터 수정
                            </div>
                            <div className='button-box'>
                                <button
                                    type='button'
                                    className='button-el'
                                    style={{ background: '#ef5656', border: '1px solid #ef5656' }}
                                    onClick={props.onActionCloseFixItemModal}
                                >
                                    닫기
                                    <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
                                </button>
                                <button
                                    type='submit'
                                    className='button-el'
                                    disabled={disabledBtn}
                                >
                                    수정하기
                                    <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
                                </button>
                            </div>
                        </div>
                    </HeaderFieldWrapper>
                    <TipFieldWrapper>
                        <span style={{ color: 'red' }}>[*]</span> 은 필수 입력 값 입니다.
                    </TipFieldWrapper>
                    <ContentFieldWrapper>
                        {defaultHeaderDetails.slice(0, 36).map(r => {
                            let matchedColumnName = r.matchedColumnName;

                            if (EXCLUDED_COLUMN_NAME.includes(matchedColumnName)) {
                                return (
                                    <div
                                        key={matchedColumnName}
                                        className='input-box'
                                    >
                                        <div className='input-label'>
                                            {r.originCellName}
                                            {r.requiredFlag &&
                                                <span style={{ color: 'red' }}> *</span>
                                            }
                                        </div>
                                        <input
                                            type='text'
                                            className='input-el readonly'
                                            defaultValue={props.fixTargetItem[matchedColumnName]}
                                            readOnly
                                            required={r.requiredFlag && true}
                                        >
                                        </input>
                                    </div>
                                );
                            }
                            if (r.variableType === 'number') {
                                return (
                                    <div
                                        key={matchedColumnName}
                                        className='input-box'
                                    >
                                        <div className='input-label'>
                                            {r.originCellName}
                                            {r.requiredFlag &&
                                                <span style={{ color: 'red' }}> *</span>
                                            }
                                        </div>
                                        <input
                                            type='number'
                                            className='input-el'
                                            name={matchedColumnName}
                                            value={props.fixTargetItem[matchedColumnName] || ''}
                                            onChange={props.onChangeFixTargetItem}
                                            required={r.requiredFlag && true}
                                        ></input>
                                    </div>
                                );
                            }

                            if (matchedColumnName === 'channelOrderDate') {
                                return (
                                    <div
                                        key={matchedColumnName}
                                        className='input-box'
                                    >
                                        <div className='input-label'>
                                            {r.originCellName}
                                            {r.requiredFlag &&
                                                <span style={{ color: 'red' }}> *</span>
                                            }
                                        </div>
                                        <input
                                            type='text'
                                            className='input-el'
                                            name={matchedColumnName}
                                            value={props.fixTargetItem[matchedColumnName] || ''}
                                            placeholder='ex) 2022-01-01 09:00:00'
                                            onChange={props.onChangeFixTargetItem}
                                            required={r.requiredFlag && true}
                                        ></input>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={matchedColumnName}
                                    className='input-box'
                                >
                                    <div className='input-label'>
                                        {r.originCellName}
                                        {r.requiredFlag &&
                                            <span style={{ color: 'red' }}> *</span>
                                        }
                                    </div>
                                    <input
                                        type='text'
                                        className='input-el'
                                        name={matchedColumnName}
                                        value={props.fixTargetItem[matchedColumnName] || ''}
                                        onChange={props.onChangeFixTargetItem}
                                        required={r.requiredFlag && true}
                                    ></input>
                                </div>
                            );
                        })}
                    </ContentFieldWrapper>
                </form>
            </Container>
        </>
    );
}
export default FixOrderItemModalComponent;