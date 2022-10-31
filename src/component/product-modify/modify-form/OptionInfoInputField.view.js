import RequiredIcon from "../../module/icon/RequiredIcon";
import { OptionInfoInputWrapper, TableFieldWrapper } from "./ModifyForm.styled";

export default function OptionInfoInputFieldView(props) {
    return (
        <OptionInfoInputWrapper>
            <div className='title-wrapper' onClick={(e) => props.onActionSlideEffectControl(e, 'option')}>
                <div className="title-box">
                    <span>옵션</span>
                    <RequiredIcon />
                </div>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={(e) => props.onActionSlideEffectControl(e, 'option')}
                    >
                        {props.slideDownEffect?.option ?
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

            <div className={`body-wrapper ${props.slideDownEffect?.option ? `slide-down` : `slide-up`}`}>
                <div className='inner-wrapper'>
                    <div className='sub-title-text'>
                        <span>일괄등록</span>
                        <div className='info-text'>
                            <div>일괄 등록할 옵션 데이터를 입력해주세요. ( , 로 구분)</div>
                            <div>옵션명은 필수항목이며, 옵션명 개수를 기준으로 등록됩니다.</div>
                        </div>
                    </div>
                    <div className='batch-reg-box'>
                        <div className='input-box'>
                            <div className='input-group'>
                                <span className='title-text'>옵션명</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.defaultName}
                                    name='defaultName'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                ></input>
                                <div>
                                    <button
                                        type='button'
                                        className='modal-open-btn'
                                        onClick={(e) => props.onActionOpenOptionDefaultNameCreateModal(e)}
                                    >옵션명 일괄 생성</button>
                                </div>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>옵션설명</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.managementName}
                                    name='managementName'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>판매가</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.salesPrice}
                                    name='salesPrice'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>매입총합계</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.totalPurchasePrice}
                                    name='totalPurchasePrice'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>출고지</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.releaseLocation}
                                    name='releaseLocation'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>상태</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.status}
                                    name='status'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>메모</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.memo}
                                    name='memo'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                ></input>
                            </div>
                            <div className='input-group'>
                                <span className='title-text'>안전재고 수량</span>
                                <input
                                    type='text'
                                    className='input-value'
                                    value={props.productOptionBatchReg.safetyStockUnit}
                                    name='safetyStockUnit'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                ></input>
                            </div>
                        </div>

                        <div>
                            <button
                                type='button'
                                className='reg-btn'
                                onClick={(e) => props.onActionAddOptionDataListByBatchRegData(e)}
                            >
                                옵션 리스트 적용
                            </button>
                        </div>
                    </div>
                </div>
                <div className='inner-wrapper'>
                    <div className='sub-title-text'>옵션 리스트</div>
                    <TableFieldView
                        modifyOptionDataList={props.modifyOptionDataList}

                        onChangeOptionInputValue={props.onChangeOptionInputValue}
                        onActionDeleteOption={props.onActionDeleteOption}
                        onChangeOrderWithDragAndDrop={props.onChangeOrderWithDragAndDrop}
                    />
                    <div className='table-bottom-box'>
                        <button
                            type='button'
                            className='add-btn'
                            onClick={(e) => props.onActionAddOptionData(e)}
                        >
                            추가
                        </button>
                    </div>
                </div>
            </div>
        </OptionInfoInputWrapper>
    )
}

function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div style={{ overflow: 'auto' }}>
                <table className='table table-sm' style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th scope="col" width='50'>삭제</th>
                            <th scope="col" width='50'>#</th>
                            <th scope="col" width='200'>옵션명 <RequiredIcon /> </th>
                            <th scope="col" width='200'>옵션설명</th>
                            <th scope="col" width='200'>판매가</th>
                            <th scope="col" width='200'>매입총합계</th>
                            <th scope="col" width='200'>출고지</th>
                            <th scope="col" width='200'>상태</th>
                            <th scope="col" width='200'>메모</th>
                            <th scope="col" width='200'>안전재고 수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.modifyOptionDataList?.map((r, idx) => {
                            return (
                                <tr key={'create_po_idx' + idx}>
                                    <td>
                                        <div className='button-box'>
                                            <button
                                                type='button'
                                                className='delete-button-el'
                                                style={{ border: '1px solid #fff', background: '#fff' }}
                                                onClick={(e) => props.onActionDeleteOption(e, r.id)}
                                            >
                                                <img
                                                    className='delete-button-icon'
                                                    src='/assets/icon/delete_default_ff3060.svg'
                                                    alt=""
                                                ></img>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.defaultName} name='defaultName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.managementName} name='managementName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value' value={r.salesPrice} name='salesPrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value' value={r.totalPurchasePrice} name='totalPurchasePrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.releaseLocation} name='releaseLocation' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.status} name='status' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.memo} name='memo' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value' value={r.safetyStockUnit} name='safetyStockUnit' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}