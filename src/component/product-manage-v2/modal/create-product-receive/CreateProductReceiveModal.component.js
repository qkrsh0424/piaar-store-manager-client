import React, { useState } from "react";
import useProductReceiveHook from "../../../../hooks/product-receive/useProductReceiveHook";
import SubmitModalComponentV2 from "../../../module/modal/SubmitModalComponentV2";
import { CreateProductReceiveModalFieldWrapper } from "./CreateProductReceiveModal.styled";

const CreateProductReceiveModalComponent = (props) => {
    const [memoBatchRegTooltipOpen, setMemoBatchRegTooltipOpen] = useState(false);
    const [memoBatchRegInput, setMemoBatchRegInput] = useState('');

    const [unitBatchRegTooltipOpen, setUnitBatchRegTooltipOpen] = useState(false);
    const [unitBatchRegInput, setUnitBatchRegInput] = useState('');

    const {
        productReceive: createReceiveData,
        
        onChangeValueOfNameByIdx: onChangeProductReceiveInputValue,
        onChangeBatchValueOfName: onChangeProductReceiveBatchInputValue,
    } = useProductReceiveHook({ productReceive: props.createReceiveData});

    const __handle = {
        action: {
            openMemoBatchRegTooltip: (e) => {
                e.preventDefault();
            
                setMemoBatchRegTooltipOpen(true);
            },
            closeMemoBatchRegTooltip: () => {
                setMemoBatchRegInput('');
                setMemoBatchRegTooltipOpen(false);
            },
            changeProductReceiveMemoTooltipInput: (e) => {
                setMemoBatchRegInput(e.target.value);
            },
            confirmMemoBatchReg: (e) => {
                e.preventDefault();

                let data = {
                    name: 'memo',
                    value: memoBatchRegInput
                }
                onChangeProductReceiveBatchInputValue(data);
                __handle.action.closeMemoBatchRegTooltip();
            },
            openUnitBatchRegTooltip: (e) => {
                e.preventDefault();
            
                setUnitBatchRegTooltipOpen(true);
            },
            closeUnitBatchRegTooltip: () => {
                setUnitBatchRegInput('');
                setUnitBatchRegTooltipOpen(false);
            },
            changeProductReceiveUnitTooltipInput: (e) => {
                setUnitBatchRegInput(e.target.value);
            },
            confirmUnitBatchReg: (e) => {
                e.preventDefault();

                let data = {
                    name: 'receiveUnit',
                    value: unitBatchRegInput
                }

                // 아무런 값을 입력하지 않는다면 0 등록
                if(unitBatchRegInput == '' || !unitBatchRegInput) {
                    data = {
                        ...data,
                        value: 0
                    }
                }
                onChangeProductReceiveBatchInputValue(data);
                __handle.action.closeUnitBatchRegTooltip();
            }
        },
        submit: {
            createProductReceive: (e) => {
                e.preventDefault();
                
                let data = createReceiveData.filter(r => r.receiveUnit !== 0 && r.receiveUnit !== '0').map(r => {
                    return {
                        receiveUnit: r.receiveUnit,
                        memo: r.memo,
                        productOptionCid: r.option.cid,
                        productOptionId: r.option.id
                    }
                })
                props.onSubmitCreateProductReceive(data);
            }
        }
    }

    return (
        <SubmitModalComponentV2
            open={props.modalOpen}
            title={'입고 등록'}
            message={
                <>
                    <CreateProductReceiveModalFieldWrapper>
                        <table className='table table-sm' style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                            <thead>
                                <tr>
                                    <th className='fixed-header' scope='col' width='50'>번호</th>
                                    <th className='fixed-header' scope='col' width='150'>상품명</th>
                                    <th className='fixed-header' scope='col' width='150'>옵션명</th>
                                    <th className='fixed-header' scope='col' width='250'>
                                        <div className='button-header'>
                                            <div>메모</div>
                                            <div>
                                                <button
                                                    type='button'
                                                    className='button-el'
                                                    onClick={(e) => __handle.action.openMemoBatchRegTooltip(e)}
                                                >
                                                    일괄 적용
                                                </button>
                                                {memoBatchRegTooltipOpen &&
                                                    <div className='tooltip-box'>
                                                        <input
                                                            type='text'
                                                            name='batch-memo'
                                                            className='input-el'
                                                            style={{width: '100%'}} 
                                                            onChange={(e) => __handle.action.changeProductReceiveMemoTooltipInput(e)}
                                                        />
                                                        <div className='button-box'>
                                                            <button
                                                                className='button-el'
                                                                onClick={() => __handle.action.closeMemoBatchRegTooltip()}
                                                            >
                                                                취소
                                                            </button>
                                                            <button className='button-el'
                                                                onClick={(e) => __handle.action.confirmMemoBatchReg(e)}
                                                            >
                                                                확인
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </th>
                                    <th className='fixed-header' scope='col' width='150'>
                                        <div className='button-header'>
                                            <div>수량</div>
                                            <div>
                                                <button
                                                    type='button'
                                                    className='button-el'
                                                    onClick={(e) => __handle.action.openUnitBatchRegTooltip(e)}
                                                >
                                                    일괄 적용
                                                </button>
                                                {unitBatchRegTooltipOpen &&
                                                    <div className='tooltip-box' style={{width: '80%'}}>
                                                        <input
                                                            type='number'
                                                            name='batch-unit'
                                                            className='input-el'
                                                            style={{width: '100%'}} 
                                                            onChange={(e) => __handle.action.changeProductReceiveUnitTooltipInput(e)}
                                                        />
                                                        <div className='button-box'>
                                                            <button
                                                                className='button-el'
                                                                onClick={() => __handle.action.closeUnitBatchRegTooltip()}
                                                            >
                                                                취소
                                                            </button>
                                                            <button className='button-el'
                                                                onClick={(e) => __handle.action.confirmUnitBatchReg(e)}
                                                            >
                                                                확인
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ borderTop: 'none' }}>
                                {createReceiveData?.map((r, idx) => {
                                    return (
                                        <tr key={'receive-idx' + idx}>
                                            <td>{idx+1}.</td>
                                            <td>{r.product.defaultName}</td>
                                            <td>{r.option.defaultName}</td>
                                            <td>
                                                <input className='input-el' type='text' name='memo' value={r.memo} onChange={(e) => onChangeProductReceiveInputValue(e, idx)} />
                                            </td>
                                            <td>
                                                <input className='input-el' type='number' name='receiveUnit' value={r.receiveUnit} onChange={(e) => onChangeProductReceiveInputValue(e, idx)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </CreateProductReceiveModalFieldWrapper>
                </>
            }
            maxWidth={'md'}

            _onSubmit={__handle.submit.createProductReceive}
            onClose={props.onActionCloseModal}
        />
    )
}

export default CreateProductReceiveModalComponent;