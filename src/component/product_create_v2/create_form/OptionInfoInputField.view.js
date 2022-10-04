import Ripple from "../../module/button/Ripple";
import RequiredIcon from "../../module/icon/RequiredIcon";
import { OptionInfoInputWrapper, TableFieldWrapper } from "./CreateForm.styled";

export default function OptionInfoInputFieldView(props) {
    return (
        <OptionInfoInputWrapper>
            <div className='title-wrapper'>
                <div className="title-box">
                    <span>옵션</span>
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
                <div className='inner-wrapper'>
                    <div className='sub-title-text'>
                        <span>일괄등록</span>
                        <span className='info-text'>
                            일괄 등록할 옵션 데이터를 입력해주세요. ( , 로 구분)
                            <br />
                            옵션명 개수를 기준으로 등록됩니다.
                        </span>
                    </div>
                    <div className='batch-reg-box'>
                        <div className='input-group'>
                            <span className='title-text'>옵션명 <RequiredIcon /></span>
                            <input 
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.defaultName}
                                name='defaultName'
                                onChange={props.onChangeBatchRegOptionInputValue}
                                required
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>옵션설명</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.managementName}
                                name='managementName'
                                onChange={props.onChangeBatchRegOptionInputValue}
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>판매가</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.salesPrice}
                                name='salesPrice'
                                onChange={props.onChangeBatchRegOptionInputValue}
                                placeholder='숫자만 입력'
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>매입총합계</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.totalPurchasePrice}
                                name='totalPurchasePrice'
                                onChange={props.onChangeBatchRegOptionInputValue}
                                placeholder='숫자만 입력'
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>상태</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.status}
                                name='status'
                                onChange={props.onChangeBatchRegOptionInputValue}
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>출고지</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.releaseLocation}
                                name='releaseLocation'
                                onChange={props.onChangeBatchRegOptionInputValue}
                            ></input>
                        </div>
                        <div className='input-group'>
                            <span className='title-text'>안전재고 수량</span>
                            <input
                                type='text'
                                className='input-value'
                                value={props.batchRegOptionData.safetyStockUnit}
                                name='safetyStockUnit'
                                onChange={props.onChangeBatchRegOptionInputValue}
                                placeholder='숫자만 입력'
                            ></input>
                        </div>
        
                        <div>
                            <button
                                className='reg-btn'
                                onClick={props.onActionAddOptionDataList}
                            >
                                옵션 리스트 적용
                            </button>
                        </div>
                    </div>
                </div>
                <div className='inner-wrapper'>
                    <div className='sub-title-text'>옵션 리스트</div>
                    <TableFieldView 
                        createOptionDataList={props.createOptionDataList}

                        onChangeOptionInputValue={props.onChangeOptionInputValue}
                        onActionDeleteOption={props.onActionDeleteOption}
                    />
                    <div className='table-bottom-box'>
                        <button 
                            className='add-btn'
                            onClick={props.onActionAddOptionData}
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
            <div className='table-box'>
                <table className='table' style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th scope="col" width='50'>#</th>
                            <th scope="col" width='200'>옵션명 <RequiredIcon /> </th>
                            <th scope="col" width='200'>옵션설명</th>
                            <th scope="col" width='200'>판매가</th>
                            <th scope="col" width='200'>매입총합계</th>
                            <th scope="col" width='200'>상태</th>
                            <th scope="col" width='200'>출고지</th>
                            <th scope="col" width='200'>안전재고 수량</th>
                            <th scope="col" width='70'>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.createOptionDataList?.map((r, idx) => {
                            return (
                                <tr key={'create_po_idx' + idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.defaultName} name='defaultName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)} required></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.managementName} name='managementName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value' value={r.salesPrice} name='salesPrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value'value={r.totalPurchasePrice} name='totalPurchasePrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.status} name='status' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='text' className='input-value' value={r.releaseLocation} name='releaseLocation' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <input type='number' className='input-value' value={r.safetyStockUnit} name='safetyStockUnit' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                    </td>
                                    <td>
                                        <div className='button-box'>
                                            <button
                                                type='button'
                                                className='delete-button-el'
                                                onClick={(e) => props.onActionDeleteOption(e, r.id)}
                                            >
                                                <img
                                                    className='delete-button-icon'
                                                    src='/assets/icon/delete_icon.png'
                                                    alt=""
                                                ></img>
                                            </button>
                                        </div>
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