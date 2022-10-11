import Ripple from "../../module/button/Ripple";
import RequiredIcon from "../../module/icon/RequiredIcon";
import { v4 as uuidv4 } from 'uuid';
import { OptionInfoInputWrapper, TableFieldWrapper } from "./CreateForm.styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function OptionInfoInputFieldView(props) {
    return (
        <OptionInfoInputWrapper>
            <div className='title-wrapper' onClick={props.onActionSlideEffectControl}>
                <div className="title-box">
                    <span>옵션</span>
                    <RequiredIcon />
                </div>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionSlideEffectControl}
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
                        <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
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
                                    value={props.batchRegOptionData.defaultName}
                                    name='defaultName'
                                    onChange={props.onChangeBatchRegOptionInputValue}
                                ></input>
                                <div>
                                    <button
                                        type='button'
                                        className='modal-open-btn'
                                        onClick={props.onActionOpenOptionDefaultNameCreateModal}
                                    >옵션명 일괄 생성</button>
                                </div>
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
                        </div>

                        <div>
                            <button
                                type='submit'
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
                        onChangeOrderWithDragAndDrop={props.onChangeOrderWithDragAndDrop}
                    />
                    <div className='table-bottom-box'>
                        <button
                            type='button'
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
                            <th scope="col" width='200'>상태</th>
                            <th scope="col" width='200'>출고지</th>
                            <th scope="col" width='200'>안전재고 수량</th>
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={props.onChangeOrderWithDragAndDrop}>
                        <Droppable droppableId={uuidv4()}>
                            {(provided) => (
                                <tbody
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {props.createOptionDataList?.map((r, idx) => {
                                        return (
                                            <Draggable
                                                key={r.id}
                                                draggableId={r.id}
                                                index={idx}
                                            >
                                                {(provided) => (
                                                    <tr
                                                        key={'create_po_idx' + idx}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
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
                                                            <input type='text' className='input-value' value={r.status} name='status' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='text' className='input-value' value={r.releaseLocation} name='releaseLocation' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='number' className='input-value' value={r.safetyStockUnit} name='safetyStockUnit' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </DragDropContext>
                </table>
            </div>
        </TableFieldWrapper>
    )
}