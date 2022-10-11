import { useState } from "react";
import { getReturnDefaultHeaderDetails } from "../../../../../static-data/erp/erpReturnItemStaticData";
import Ripple from "../../../../module/button/Ripple";
import { Container, ContentFieldWrapper, HeaderFieldWrapper, TipFieldWrapper } from "./FixOrderItemModal.styled";

const defaultHeaderDetails = getReturnDefaultHeaderDetails();

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
                        {defaultHeaderDetails?.headerDetail.details.slice(0, 13).map(r => {
                            let matchedColumnName = r.matchedColumnName;

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
        
                            if(r.matchedColumnName === 'deliveryChargeReturnYn') {
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
                                            value={props.fixTargetItem[matchedColumnName] === 'y' ? '입금완료' : '미입금'}
                                            required={r.requiredFlag && true}
                                            disabled
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