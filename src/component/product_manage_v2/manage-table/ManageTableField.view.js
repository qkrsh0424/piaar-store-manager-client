import React from "react";
import { ManageTableFieldWrapper } from "./ManageTable.styled";

export default function ManageTableFieldView(props) {
    return (
        <ManageTableFieldWrapper>
            <div>
                <table className='table table-sm' style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th className='fixed-header fixed-header-left' scope="col" width='100'>카테고리</th>
                            <th className='fixed-header fixed-header-left2' scope="col" width='140'>상품이미지</th>
                            <th className='fixed-header fixed-header-left3' scope="col" width='200'>상품정보</th>
                            <th className='fixed-header' scope="col" width='200'>옵션관리코드</th>
                            <th className='fixed-header' scope="col" width='200'>옵션명</th>
                            <th className='fixed-header' scope="col" width='200'>옵션설명</th>
                            <th className='fixed-header' scope="col" width='200'>재고수량</th>
                            <th className='fixed-header' scope="col" width='200'>상태</th>
                            <th className='fixed-header' scope="col" width='200'>가격</th>
                            <th className='fixed-header' scope="col" width='200'>출고지</th>
                            <th className='fixed-header' scope="col" width='200'>비고</th>
                        </tr>
                    </thead>
                    <tbody style={{borderTop: 'none'}}>
                        {props.productFJList?.map((r, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <tr key={'create_po_idx' + idx} style={{ fontWeight: '600' }}>
                                        <td
                                            rowSpan={r.options.length + 1}
                                            className='fixed-col-left'
                                            style={{ backgroundColor: idx % 2 === 1 ? '#f7f7f7' : '#ffffff' }}
                                        >
                                            <div style={{color: 'var(--erp-main-color)'}}>[{r.category.name}]</div>
                                        </td>
                                        <td
                                            rowSpan={r.options.length + 1}
                                            className='fixed-col-left2'
                                            style={{ textAlign: 'left', backgroundColor: idx % 2 === 1 ? '#f7f7f7' : '#ffffff' }}
                                        >
                                            <div className="image-wrapper">
                                                <div className="image-box">
                                                    {r.product.imageUrl ?
                                                        <img src={r.product.imageUrl} title={r.product.imageFileName} />
                                                        :
                                                        <img src='/images/icon/no-image.jpg' title='no-image' />
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            rowSpan={r.options.length + 1}
                                            className='fixed-col-left3'
                                            style={{ backgroundColor: idx % 2 === 1 ? '#f7f7f7' : '#ffffff' }}
                                        >
                                            <div>{r.product.defaultName}</div>
                                            <div>{r.product.code}</div>
                                            <div className='button-box'>
                                                {r.product.purchaseUrl ?
                                                    <a href={r.product.purchaseUrl} target='_blank'>
                                                        <img
                                                            src='/assets/icon/link_default_2C73D2.svg'
                                                            style={{ width: '30px' }}
                                                            alt=""
                                                            loading='lazy'
                                                        ></img>
                                                    </a>
                                                    :
                                                    <button
                                                        type='button'
                                                        className='button-el'
                                                        onClick={() => alert('구매링크를 먼저 등록해주세요.')}
                                                        style={{ backgroundColor: idx % 2 === 1 ? '#f7f7f7' : '#ffffff', border: 'none' }}
                                                    >
                                                        <img
                                                            src='/assets/icon/link_off_default_000000.svg'
                                                            style={{ width: '30px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                            alt=""
                                                            loading='lazy'
                                                        ></img>
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    {r.options && r.options.map((option, idx2) => {
                                        return (
                                            <tr key={'option-idx' + idx2}>
                                                <td>
                                                    {option.code}
                                                </td>
                                                <td>
                                                    {option.defaultName}
                                                </td>
                                                <td>
                                                    {option.managementName}
                                                </td>
                                                <td>
                                                    {option.stockSumUnit}
                                                </td>
                                                <td>
                                                    {option.status}
                                                </td>
                                                <td>
                                                    {option.salesPrice}
                                                </td>
                                                <td>
                                                    {option.releaseLocation}
                                                </td>
                                                <td>
                                                    {option.memo}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </ManageTableFieldWrapper>
    )
}