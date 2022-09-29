import React from 'react';

import { InputFormFieldWrapper } from "./CreateReleaseModal.styled"

export default function InputFormFieldView(props) {
    return (
        <InputFormFieldWrapper>
            <form onSubmit={(e) => props.onSubmitCreateReleaseData(e)}>
                <table className="table" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th scope="col" width='200'>상품명</th>
                            <th scope="col" width='200'>옵션명</th>
                            <th scope="col" width='100'>출고수량 <i className="icon-must" aria-label="필수항목"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.releaseAddData?.map(data => {
                            return (
                                <React.Fragment key={data.productRelease.id}>
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
                                                value={data.productRelease.releaseUnit ?? ''}
                                                name='releaseUnit'
                                                onChange={(e) => props.onActionChangeReleaseInputValue(e, data.productRelease.id)}
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
                                출고 메모
                            </span>
                        </div>
                        <input
                            type="text"
                            className='form-control'
                            name='releaseAddMemo'
                            value={props.releaseAddMemo ?? ''}
                            onChange={(e) => props.onActionChangeReleaseMemoInputValue(e)}
                        />
                    </div>
                    <div className="submit-box">
                        <button type='submit'
                            disabled={props.submitCheck.isSubmit}
                        >출고등록</button>
                    </div>
                </div>
            </form>
        </InputFormFieldWrapper>
    )
}