import React, { useState } from "react";
import useProductReleaseHook from "../../hooks/useProductReleaseHook";
import SubmitModalComponentV2 from "../../../../module/modal/SubmitModalComponentV2";
import { BatchRegTooltipWrapper, CreateProductReleaseModalFieldWrapper } from "./CreateProductReleaseModal.styled";

function BatchRegTooltip({ inputType, name, tootipSize, onChangeInputValue, onActionCancel, onActionConfirm }) {
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

const CreateProductReleaseModalComponent = (props) => {
    const [memoBatchRegTooltipOpen, setMemoBatchRegTooltipOpen] = useState(false);
    const [memoBatchRegInput, setMemoBatchRegInput] = useState('');

    const [unitBatchRegTooltipOpen, setUnitBatchRegTooltipOpen] = useState(false);
    const [unitBatchRegInput, setUnitBatchRegInput] = useState('');

    const {
        productRelease: createReleaseData,
        
        onChangeValueOfNameByIdx: onChangeProductReleaseInputValue,
        onChangeBatchValueOfName: onChangeProductReleaseBatchInputValue,
        checkCreateFormData: checkProductReleaseCreateFormData
    } = useProductReleaseHook({ productRelease: props.createReleaseData});

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
            changeProductReleaseMemoTooltipInput: (e) => {
                setMemoBatchRegInput(e.target.value);
            },
            confirmMemoBatchReg: (e) => {
                e.preventDefault();

                let data = {
                    name: 'memo',
                    value: memoBatchRegInput
                }
                onChangeProductReleaseBatchInputValue(data);
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
            changeProductReleaseUnitTooltipInput: (e) => {
                setUnitBatchRegInput(e.target.value);
            },
            confirmUnitBatchReg: (e) => {
                e.preventDefault();

                let data = {
                    name: 'releaseUnit',
                    value: unitBatchRegInput
                }

                // 아무런 값을 입력하지 않는다면 0 등록
                if(unitBatchRegInput == '' || !unitBatchRegInput) {
                    data = {
                        ...data,
                        value: 0
                    }
                }
                onChangeProductReleaseBatchInputValue(data);
                __handle.action.closeUnitBatchRegTooltip();
            }
        },
        submit: {
            createProductRelease: (e) => {
                e.preventDefault();

                try {
                    checkProductReleaseCreateFormData();

                    let data = createReleaseData.filter(r => r.releaseUnit !== 0 && r.releaseUnit !== '0').map(r => {
                        return {
                            releaseUnit: r.releaseUnit,
                            memo: r.memo,
                            productOptionCid: r.option.cid,
                            productOptionId: r.option.id
                        }
                    })
                    props.onSubmitCreateProductRelease(data);
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    return (
        <SubmitModalComponentV2
            open={props.modalOpen}
            title={'출고 등록'}
            element={
                <div className='data-wrapper' style={{ padding: '0' }}>
                    <CreateProductReleaseModalFieldWrapper>
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

                                                        onChangeInputValue={__handle.action.changeProductReleaseMemoTooltipInput}
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
                                                        name='releaseUnit'

                                                        onChangeInputValue={__handle.action.changeProductReleaseUnitTooltipInput}
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
                                {createReleaseData?.map((r, idx) => {
                                    return (
                                        <tr key={'release-idx' + idx}>
                                            <td>{idx+1}.</td>
                                            <td>{r.product.defaultName}</td>
                                            <td>{r.option.defaultName}</td>
                                            <td>
                                                <input className='input-el' type='text' name='memo' value={r.memo} onChange={(e) => onChangeProductReleaseInputValue(e, idx)} />
                                            </td>
                                            <td>
                                                <input className='input-el' type='number' name='releaseUnit' value={r.releaseUnit} onChange={(e) => onChangeProductReleaseInputValue(e, idx)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </CreateProductReleaseModalFieldWrapper>
                </div>
            }
            maxWidth={'md'}

            _onSubmit={__handle.submit.createProductRelease}
            onClose={props.onActionCloseModal}
        />
    )
}

export default CreateProductReleaseModalComponent;