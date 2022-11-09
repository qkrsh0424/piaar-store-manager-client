import RequiredIcon from "../../../../module/icon/RequiredIcon";
import { v4 as uuidv4 } from 'uuid';
import { BatchRegTooltipWrapper, OptionInfoInputWrapper, TableFieldWrapper } from "../CreateForm.styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function BatchRegTooltip({ name, inputType, tootipSize, onChangeInputValue, onActionCancel, onActionConfirm }) {
    return (
        <BatchRegTooltipWrapper>
            <div className='tooltip-box' style={tootipSize}>
                <input
                    type={inputType}
                    name={name}
                    className='input-el'
                    style={{ width: '100%' }}
                    onChange={(e) => onChangeInputValue(e)}
                    autoFocus
                />
                <div className='arrow-btn-box'>
                    <button type='button' className='button-el' name={name} onClick={(e) => onActionCancel(e)}>
                        취소
                    </button>
                    <button type='button' className='button-el' name={name} onClick={(e) => onActionConfirm(e)}>
                        확인
                    </button>
                </div>
            </div>
        </BatchRegTooltipWrapper>
    )
}

export default function OptionInfoInputFieldView(props) {
    return (
        <OptionInfoInputWrapper>
            <div className='title-line' onClick={(e) => props.onActionSlideEffectControl(e, 'option')}>
                <div className="title-label">
                    <span>옵션</span>
                    <RequiredIcon />
                </div>
                <div className='arrow-btn-box'>
                    <button
                        type='button'
                        className='button-el'
                        name='option'
                        onClick={(e) => props.onActionSlideEffectControl(e, 'option')}
                    >
                        <img
                            src={`/assets/icon/${props.slideDownEffect?.option ? 'up_arrow_black_icon.png' : 'down_arrow_black_icon.png'}`}
                            style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            alt=""
                            loading='lazy'
                        ></img>
                    </button>
                </div>
            </div>

            {props.slideDownEffect?.option &&
                <div className='inner-content'>
                    <div className='inner-title-label'>
                        <span>일괄등록</span>
                        <div className='info-text'>
                            <div>일괄 등록할 옵션 데이터를 입력해주세요. ( , 로 구분)</div>
                            <div>옵션명은 필수항목이며, 옵션명 개수를 기준으로 등록됩니다.</div>
                        </div>
                    </div>
                    <div className='batch-reg-box'>
                        <div style={{ padding: '10px 30px' }}>
                            <div className='input-group-box'>
                                <span className='control-label'>
                                   <div>옵션명</div>
                                    <button
                                        type='button'
                                        className='button-el'
                                        onClick={(e) => props.onActionOpenOptionDefaultNameCreateModal(e)}
                                    >일괄생성</button>
                                </span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.defaultName}
                                    name='defaultName'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>옵션설명</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.managementName}
                                    name='managementName'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>판매가</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.salesPrice}
                                    name='salesPrice'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>매입총합계</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.totalPurchasePrice}
                                    name='totalPurchasePrice'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>출고지</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.releaseLocation}
                                    name='releaseLocation'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>상태</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.status}
                                    name='status'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>메모</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.memo}
                                    name='memo'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                />
                            </div>
                            <div className='input-group-box'>
                                <span className='control-label'>안전재고 수량</span>
                                <input
                                    type='text'
                                    value={props.productOptionBatchReg.safetyStockUnit}
                                    name='safetyStockUnit'
                                    onChange={(e) => props.onChangeBatchRegOptionInputValue(e)}
                                    placeholder='숫자만 입력'
                                />
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
                    
                    <div className='option-list'>
                        <div className='inner-title-label'>옵션 리스트</div>
                        <TableFieldView
                            createOptionDataList={props.createOptionDataList}

                            onChangeOptionInputValue={props.onChangeOptionInputValue}
                            onActionDeleteOption={props.onActionDeleteOption}
                            onChangeOrderWithDragAndDrop={props.onChangeOrderWithDragAndDrop}
                            batchRegTooltipOpen={props.batchRegTooltipOpen}
                            batchRegInput={props.batchRegInput}
                            onActionOpenBatchRegToolTip={props.onActionOpenBatchRegToolTip}
                            onChangeBatchRegInput={props.onChangeBatchRegInput}
                            onActionConfirmBatchRegInput={props.onActionConfirmBatchRegInput}
                            onActionCloseBatchRegTooltip={props.onActionCloseBatchRegTooltip}
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
            }
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
                            <th scope="col" width='50'>
                                <div>삭제</div>
                            </th>
                            <th scope="col" width='50'>
                                <div>#</div>
                            </th>
                            <th scope="col" width='200'>
                                <div>옵션명 <RequiredIcon /></div>
                            </th>
                            <th scope="col" width='200'>
                                <div>옵션설명</div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>판매가</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='salesPrice'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.salesPrice &&
                                            <BatchRegTooltip
                                                inputType={'number'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'salesPrice'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>매입총합계</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='totalPurchasePrice'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.totalPurchasePrice &&
                                            <BatchRegTooltip
                                                inputType={'number'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'totalPurchasePrice'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>출고지</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='releaseLocation'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.releaseLocation &&
                                            <BatchRegTooltip
                                                inputType={'text'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'releaseLocation'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>상태</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='status'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.status &&
                                            <BatchRegTooltip
                                                inputType={'text'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'status'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>메모</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='memo'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.memo &&
                                            <BatchRegTooltip
                                                inputType={'text'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'memo'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                            <th scope="col" width='200'>
                                <div className='button-header'>
                                    <div>안전재고 수량</div>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            name='safetyStockUnit'
                                            onClick={(e) => props.onActionOpenBatchRegToolTip(e)}
                                        >
                                            일괄 적용
                                        </button>
                                        {props.batchRegTooltipOpen?.safetyStockUnit &&
                                            <BatchRegTooltip
                                                inputType={'number'}
                                                tootipSize={{ width: '220px' }}
                                                onChangeInputValue={props.onChangeBatchRegInput}
                                                name={'safetyStockUnit'}
                                                onActionConfirm={props.onActionConfirmBatchRegInput}
                                                onActionCancel={props.onActionCloseBatchRegTooltip}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={(res) => props.onChangeOrderWithDragAndDrop(res)}>
                        <Droppable droppableId={uuidv4()}>
                            {(provided) => (
                                <tbody
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ borderTop: 'none' }}
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
                                                            <div className='arrow-btn-box'>
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
                                                            <input type='text' value={r.defaultName} name='defaultName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='text' value={r.managementName} name='managementName' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='number' value={r.salesPrice} name='salesPrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)} min={0}></input>
                                                        </td>
                                                        <td>
                                                            <input type='number' value={r.totalPurchasePrice} name='totalPurchasePrice' onChange={(e) => props.onChangeOptionInputValue(e, r.id)} min={0}></input>
                                                        </td>
                                                        <td>
                                                            <input type='text' value={r.releaseLocation} name='releaseLocation' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='text' value={r.status} name='status' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='text' value={r.memo} name='memo' onChange={(e) => props.onChangeOptionInputValue(e, r.id)}></input>
                                                        </td>
                                                        <td>
                                                            <input type='number' value={r.safetyStockUnit} name='safetyStockUnit' onChange={(e) => props.onChangeOptionInputValue(e, r.id)} min={0}></input>
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