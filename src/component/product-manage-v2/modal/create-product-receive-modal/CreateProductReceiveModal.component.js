import React, { useState } from "react";
import useProductReceiveHook from "../../hooks/useProductReceiveHook";
import SubmitModalComponentV2 from "../../../module/modal/SubmitModalComponentV2";
import { BatchRegTooltipWrapper, CreateProductReceiveModalFieldWrapper } from "./CreateProductReceiveModal.styled";

function BatchRegTooltip({ inputType, name, tootipSize, onChangeInputValue, onActionCancel, onActionConfirm }) {
    return (
        <BatchRegTooltipWrapper>
            <div className='tooltip-box' style={tootipSize}>
                <input
                    type={inputType}
                    name={name}
                    style={{ width: '100%' }}
                    onChange={(e) => onChangeInputValue(e)}
                    autoFocus
                />
                <div className='button-box'>
                    <button className='button-el' onClick={() => onActionCancel()}>
                        취소
                    </button>
                    <button className='button-el' onClick={(e) => onActionConfirm(e)}>
                        확인
                    </button>
                </div>
            </div>
        </BatchRegTooltipWrapper>
    )
}

const CreateProductReceiveModalComponent = (props) => {
    const [memoBatchRegTooltipOpen, setMemoBatchRegTooltipOpen] = useState(false);
    const [memoBatchRegInput, setMemoBatchRegInput] = useState('');

    const [unitBatchRegTooltipOpen, setUnitBatchRegTooltipOpen] = useState(false);
    const [unitBatchRegInput, setUnitBatchRegInput] = useState('');

    const {
        productReceive: createReceiveData,
        
        onChangeValueOfNameByIdx: onChangeProductReceiveInputValue,
        onChangeBatchValueOfName: onChangeProductReceiveBatchInputValue,
        checkCreateFormData: checkProductReceiveCreateFormData,
    } = useProductReceiveHook({ productReceive: props.createReceiveData});

    const __handle = {
        action: {
            openMemoBatchRegTooltip: (e) => {
                e.preventDefault();
            
                setMemoBatchRegTooltipOpen(true);
                setUnitBatchRegTooltipOpen(false);
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
                setMemoBatchRegTooltipOpen(false);
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

                try {
                    checkProductReceiveCreateFormData();
                
                    let data = createReceiveData.filter(r => r.receiveUnit !== 0 && r.receiveUnit !== '0').map(r => {
                        return {
                            receiveUnit: r.receiveUnit,
                            memo: r.memo,
                            productOptionCid: r.option.cid,
                            productOptionId: r.option.id
                        }
                    })

                    props.onSubmitCreateProductReceive(data);
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <SubmitModalComponentV2
            open={props.modalOpen}
            title={'입고 등록'}
            element={
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
                                                    <BatchRegTooltip
                                                        inputType={'text'}
                                                        tootipSize={{ width: '80%' }}
                                                        name='memo'

                                                        onChangeInputValue={__handle.action.changeProductReceiveMemoTooltipInput}
                                                        onActionCancel={__handle.action.closeMemoBatchRegTooltip}
                                                        onActionConfirm={__handle.action.confirmMemoBatchReg}
                                                    />
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
                                                    <BatchRegTooltip
                                                        inputType={'number'}
                                                        tootipSize={{ width: '150px' }}
                                                        name='receiveUnit'

                                                        onChangeInputValue={__handle.action.changeProductReceiveUnitTooltipInput}
                                                        onActionCancel={__handle.action.closeUnitBatchRegTooltip}
                                                        onActionConfirm={__handle.action.confirmUnitBatchReg}
                                                    />
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