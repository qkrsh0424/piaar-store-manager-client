import React from "react";
import ResizableTh from "../../module/table/ResizableTh";
import { ManageTableFieldWrapper } from "./ManageTable.styled";

export default function ManageTableFieldView(props) {
    return (
        <ManageTableFieldWrapper>
            <table className='table table-sm' style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        <th className='fixed-header fixed-header-left' scope="col" width='50'>
                            <input
                                type='checkbox'
                                style={{ cursor: 'pointer' }}
                                checked={props.isCheckedAll()}
                                onChange={(e) => props.onActionCheckAll(e)}
                            />
                        </th>
                        <th className='fixed-header fixed-header-left' scope="col" width='100' style={{ left: '50px' }}>설정</th>
                        <th className='fixed-header fixed-header-left' scope="col" width='100' style={{ left: '150px' }}>카테고리</th>
                        <th className='fixed-header fixed-header-left' scope="col" width='140' style={{ left: '250px' }}>상품이미지</th>
                        <th className='fixed-header fixed-header-left' scope="col" width='200' style={{ left: '390px', boxShadow: '-0.5px 0 0 0 #e0e0e0 inset' }}>상품정보</th>
                        <th className='fixed-header' scope="col" width='50'>
                            <input
                                type='checkbox'
                                style={{ cursor: 'pointer' }}
                                checked={props.isCheckedAll()}
                                onChange={(e) => props.onActionCheckAll(e)}
                            />
                        </th>
                        {/* 옵션 th */}
                        <ResizableTh className='fixed-header' scope="col" width={200}>옵션관리코드</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>옵션명</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>옵션설명</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={100}>재고수량</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>상태</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>가격</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>출고지</ResizableTh>
                        <ResizableTh className='fixed-header' scope="col" width={200}>비고</ResizableTh>
                        <th className='fixed-header' scope="col" width={100}>대체코드</th>
                        <th className='fixed-header' scope="col" width={100}>옵션패키지</th>
                        <th className='fixed-header' scope="col" width={100}>삭제</th>
                    </tr>
                </thead>
                <tbody style={{ borderTop: 'none' }}>
                    {props.productManagementList?.map((r, idx) => {
                        let tdBackgroundColor = (idx % 2 === 1) ? '#f7f7f7' : '#ffffff';
                        let rowSpanSize = r.options.length + 1;
                        let checkedProduct = props.isProductCheckedOne(r.product.id);

                        return (
                            <React.Fragment key={idx}>
                                <tr
                                    className={`${checkedProduct && 'fixed-tr-active'}`}
                                    style={{ fontWeight: '600' }}
                                    onClick={(e) => props.onActionProductCheckOne(e, r.product.id)}
                                >
                                    <td
                                        rowSpan={rowSpanSize}
                                        className='fixed-col-left'
                                        style={{ backgroundColor: tdBackgroundColor }}
                                    >
                                        <input
                                            type='checkbox'
                                            style={{ cursor: 'pointer' }}
                                            checked={checkedProduct}
                                            onChange={(e) => props.onActionProductCheckOne(e, r.product.id)}
                                        />
                                    </td>
                                    <td
                                        rowSpan={rowSpanSize}
                                        className='fixed-col-left'
                                        style={{ backgroundColor: tdBackgroundColor, left: '50px' }}
                                    >
                                        <div className='control-btn'>
                                            <button
                                                className='button-el'
                                                onClick={(e) => props.onActionModifyProductAndOptions(e, r.product.id)}
                                            >
                                                상품수정
                                            </button>
                                        </div>
                                        <div className='control-btn'>
                                            <button
                                                className='button-el'
                                                onClick={(e) => props.onSubmitDeleteProductOne(e, r.product.id)}
                                            >
                                                상품삭제
                                            </button>
                                        </div>
                                        {/* <div className='control-btn'>
                                                <button
                                                    className='button-el'
                                                >
                                                    옵션추가
                                                </button>
                                            </div> */}
                                    </td>
                                    <td
                                        rowSpan={rowSpanSize}
                                        className='fixed-col-left'
                                        style={{ backgroundColor: tdBackgroundColor, left: '150px' }}
                                    >
                                        <div style={{ color: 'var(--erp-main-color)' }}>[{r.category.name}]</div>
                                    </td>
                                    <td
                                        rowSpan={rowSpanSize}
                                        className='fixed-col-left'
                                        style={{ textAlign: 'left', backgroundColor: tdBackgroundColor, left: '250px' }}
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
                                        rowSpan={rowSpanSize}
                                        className='fixed-col-left'
                                        style={{ backgroundColor: tdBackgroundColor, left: '390px', boxShadow: '-0.5px 0 0 0 #e0e0e0 inset' }}
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
                                                        className='link-img'
                                                    ></img>
                                                </a>
                                                :
                                                <button
                                                    type='button'
                                                    className='button-el'
                                                    onClick={(e) => { e.stopPropagation(); alert('구매링크를 먼저 등록해주세요.'); }}
                                                >
                                                    <img
                                                        src='/assets/icon/link_off_default_000000.svg'
                                                        style={{ width: '30px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                        alt=""
                                                        loading='lazy'
                                                        className='link-img'
                                                    ></img>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                                {r.options && r.options.map((option, idx2) => {
                                    let checked = props.isCheckedOne(option.id);

                                    return (
                                        <tr
                                            key={'option-idx' + idx2}
                                            className={`${checked && 'tr-active'}`}
                                            onClick={(e) => props.onActionCheckOne(e, option.id)}
                                        >
                                            <td>
                                                <input type='checkbox' style={{ cursor: 'pointer' }} checked={checked} onChange={(e) => props.onActionCheckOne(e, option.id)} />
                                            </td>
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
                                            <td>
                                                <div className='control-btn'>
                                                    <button
                                                        className='button-el'
                                                        onClick={(e) => props.onActionOpenSubOptionCodeModal(e, option.id)}
                                                    >
                                                        대체코드
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='control-btn'>
                                                    <button
                                                        className='button-el'
                                                        onClick={(e) => props.onActionOpenOptionPackageModal(e, option.id)}
                                                    >
                                                        옵션패키지
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='option-control-box'>
                                                    {/* <div className='option-control-btn'>
                                                            <button
                                                                className='button-el'
                                                            >
                                                                <img
                                                                    src='/assets/icon/edit_default_595d61.svg'
                                                                    style={{ width: '20px' }}
                                                                    alt=""
                                                                    loading='lazy'
                                                                />
                                                            </button>
                                                        </div> */}
                                                    <div className='option-control-btn'>
                                                        <button
                                                            className='button-el'
                                                        >
                                                            <img
                                                                src='/assets/icon/delete_default_ff3060.svg'
                                                                style={{ width: '20px' }}
                                                                alt=""
                                                                loading='lazy'
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </ManageTableFieldWrapper>
    )
}