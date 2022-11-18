import React from "react";
import { dateToYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import ResizableTh from "../../../../../module/table/ResizableTh";
import { StockStatusFieldWrapper } from "../SearchProductReceiveAndReleaseModal.styled";

export default function ReleaseStatusTableFieldView(props) {
    return (
        <StockStatusFieldWrapper>
            <table className="table table-sm" style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        <ResizableTh className='fixed-header' scope="col" width={100}>출고일시</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>상품명</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>옵션명</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>옵션코드</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={150}>출고지</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={50} style={{ color: '#292be4' }}>출고량</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>출고메모</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={50}>수정</ResizableTh>

                    </tr>
                </thead>

                <tbody style={{ borderTop: 'none'}}>
                    {props.optionReleaseStatus?.length === 0 && <tr><td colSpan={8}>출고 내역이 없습니다.</td></tr>}
                    {props.optionReleaseStatus?.map((r, idx) => {
                        let tdBackgroundColor = (idx % 2 === 1) ? '#f7f7f7' : '#ffffff';
                        let isModifying = (props.modifyingData?.id === r.productRelease.id);

                        return (
                            <React.Fragment key={idx}>
                                <tr style={{ backgroundColor: tdBackgroundColor }}>
                                    <td>
                                        {dateToYYMMDDhhmmss(r.productRelease.createdAt)}
                                    </td>
                                    <td>
                                        {r.product.defaultName}
                                    </td>
                                    <td>
                                        {r.productOption.defaultName}
                                    </td>
                                    <td>
                                        {r.productOption.code}
                                    </td>
                                    <td>
                                        {r.productOption.releaseLocation}
                                    </td>
                                    <td>
                                        {r.productRelease.releaseUnit}
                                    </td>
                                    <td>
                                        {isModifying ?
                                            <div>
                                                <input
                                                    type='text'
                                                    className='input-el'
                                                    name='memo'
                                                    value={props.modifyingData.memo || ''}
                                                    onChange={(e) => props.onChangeInputValue(e)}
                                                    autoFocus
                                                />
                                            </div>
                                            :
                                            <div className='memo-box'>
                                                <div>{r.productRelease.memo}</div>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {isModifying ?
                                            <div>
                                                <button
                                                    type='button'
                                                    className='button-el'
                                                    onClick={() => props.onSubmitModifyMemo()}
                                                    disabled={props.buttonDisabled}
                                                >
                                                    <img
                                                        src='/assets/icon/done_outline_2c73d2.svg'
                                                        style={{ width: '23px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                        alt=""
                                                        loading='lazy'
                                                        className='link-img'
                                                    ></img>
                                                </button>
                                            </div>
                                            :
                                            <div>
                                                <button
                                                    type='button'
                                                    className='button-el'
                                                    onClick={() => props.onActionSetModifyingData(r.productRelease.id)}
                                                >
                                                    <img
                                                        src='/assets/icon/edit_default_888888.svg'
                                                        style={{ width: '23px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                        alt=""
                                                        loading='lazy'
                                                        className='link-img'
                                                    ></img>
                                                </button>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </StockStatusFieldWrapper>
    )
}