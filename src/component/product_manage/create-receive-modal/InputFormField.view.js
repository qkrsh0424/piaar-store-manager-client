import React from 'react';

import { InputFormFieldWrapper } from "./CreateReceiveModal.styled"

export default function InputFormFieldView(props) {
    return (
        <InputFormFieldWrapper>
            <form onSubmit={(e) => props.onSubmitCreateReceiveData(e)}>
                <table className="table" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th scope="col" width='200'>상품명</th>
                            <th scope="col" width='200'>옵션명</th>
                            <th scope="col" width='100'>입고수량 <i className="icon-must" aria-label="필수항목"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.receiveAddData?.map(data => {
                            return (
                                <React.Fragment key={data.productReceive.id}>
                                    <tr>
                                        <td>
                                            <div>
                                                {data.product.defaultName}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {data.option.defaultName}
                                            </div>
                                        </td>
                                        <td>
                                            <input
                                                type='number'
                                                value={data.productReceive.receiveUnit ?? ''}
                                                name='receiveUnit'
                                                onChange={(e) => props.onActionChangeReceiveInputValue(e, data.productReceive.id)}
                                                min={0}
                                            ></input>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                입고 메모
                            </span>
                        </div>
                        <input
                            type="text"
                            className='form-control'
                            name='receiveAddMemo'
                            value={props.receiveAddMemo ?? ''}
                            onChange={(e) => props.onActionChangeReceiveMemoInputValue(e)}
                        />
                    </div>
                    <div className="submit-box">
                        <button type='submit' 
                        disabled={props.submitCheck.isSubmit}
                        >입고등록</button>
                    </div>
                </div>
            </form>
        </InputFormFieldWrapper>
    )
}