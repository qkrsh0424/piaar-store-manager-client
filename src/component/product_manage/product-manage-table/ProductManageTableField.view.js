import React from 'react';
import { useSelector } from 'react-redux';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

import { ProductManageTableWrapper, OptionTr, CheckCircle } from "./ProductManageTable.styled";

export default function ProductManageTableFieldView(props) {
    const userRdx = useSelector(state => state.user);

    return (
        <ProductManageTableWrapper>
            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        {userRdx.userInfo && ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(userRdx.userInfo.roles) &&
                            <th className='fixedHeader' scope="col" width='100'>컨트롤</th>
                        }
                        <th className='fixedHeader' scope="col" width='250'>상품식별코드</th>
                        <th className='fixedHeader' scope="col" width='140'>상품이미지</th>
                        
                        {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                            <th className='fixedHeader' scope="col" width='200'>상품관리</th>
                        }
                        <th className='fixedHeader' scope="col" width='50'>
                            <input type='checkbox' 
                                onChange={() => props.checkAll()} 
                                checked={props.isCheckedAll()}
                            ></input>
                        </th>
                        <th className='fixedHeader' scope="col" width='200'>옵션관리코드</th>
                        <th className='fixedHeader' scope="col" width='100'>세트상품 여부</th>
                        {/* <th className='fixedHeader' scope="col" width='150'>노스노스 고유코드</th> */}
                        <th className='fixedHeader' scope="col" width='200'>옵션명</th>
                        <th className='fixedHeader' scope="col" width='200'>옵션관리명</th>
                        <th className='fixedHeader' scope="col" width='100'>재고수량</th>
                        <th className='fixedHeader' scope="col" width='150'>현재상태</th>
                        {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                            <th className='fixedHeader' scope="col" width='150'>가격</th>
                        }
                        <th className='fixedHeader' scope="col" width='200'>출고지</th>
                        <th className='fixedHeader' scope="col" width='200'>비고</th>
                        {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                            <th className='fixedHeader' scope="col" width='100'>대체코드</th>
                        }
                        <th className='fixedHeader' scope="col" width='400'>옵션컨트롤</th>
                    </tr>
                </thead>
                <tbody>
                    {props.productViewList && props.productViewList.map((product, productIdx) => {
                        return (
                            <React.Fragment key={productIdx}>
                                <tr style={{ background: productIdx % 2 === 1 ? '#f8f8f8' : '#ffffff' }}>
                                    {userRdx && userRdx.isLoading === false && userRdx.userInfo && ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(userRdx.userInfo.roles) &&
                                        <th rowSpan={product.options.length + 1} className="control-btn">
                                            <div>
                                                <button
                                                    type='button'
                                                    className="modify-btn"
                                                    onClick={() => props.onActionOpenModifyProductModal(product.product.id)}
                                                >상품수정</button>
                                            </div>
                                            <div>

                                                <button
                                                    type='button'
                                                    className="delete-btn"
                                                    onClick={() => props.onActionDeleteProduct(product.product.id)}
                                                >상품삭제</button>
                                            </div>
                                        </th>
                                    }

                                    <th style={{ textAlign: 'left' }} rowSpan={product.options.length + 1}>
                                        <div>{product.product.defaultName}</div>
                                        <div>Code : {product.product.code}</div>
                                        <div>M_Code : {product.product.manufacturingCode}</div>
                                    </th>
                                    <th style={{ textAlign: 'left' }} rowSpan={product.options.length + 1}>
                                        <div className="image-wrapper">
                                            <div className="image-box">
                                                {product.product.imageUrl ?
                                                    <img src={product.product.imageUrl} title={product.product.imageFileName} />
                                                    :
                                                    <img src='/images/icon/no-image.jpg' title='no-image' />
                                                }
                                            </div>
                                        </div>
                                    </th>
                                    {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                                        <th rowSpan={product.options.length + 1}>
                                            <div>
                                                {product.product.purchaseUrl ?
                                                    <a href={product.product.purchaseUrl} target='_blank'>
                                                        <LinkIcon type='button'>구매링크</LinkIcon>
                                                    </a>
                                                    :
                                                    <LinkOffIcon type='button' onClick={() => alert('구매링크를 먼저 등록해주세요.')}>구매링크</LinkOffIcon>
                                                }
                                            </div>
                                            <div style={{ color: 'green' }}>[{product.category.name}]</div>
                                            <div>{product.product.imageFileUri}</div>
                                            <div>
                                                <button type='button' className="add-btn" onClick={() => props.onActionOpenCreateProductOptionModal(product.product.id)}>옵션추가</button>
                                            </div>
                                        </th>
                                    }
                                    <th colSpan={12} style={{ background: '#7a7bda20', color: '#888' }}>
                                        <div>{product.product.managementName}-{product.product.code}-{product.product.manufacturingCode}</div>
                                    </th>

                                </tr>
                                {product.options && product.options.map((option, index2) => {
                                    return (
                                        <OptionTr
                                            key={'subitem' + index2}
                                            className="option-check-list"
                                            onClick={() => props.checkOneTr(option.id)}
                                            checked={props.isChecked(option.id)}
                                        >
                                            <td>
                                                <CheckCircle
                                                    className="check-box"
                                                    checked={props.isChecked(option.id)}
                                                ></CheckCircle>
                                            </td>
                                            <td>{option.code}</td>
                                            <td style={{ fontWeight: '800' }}>{option.packageYn === 'y' ? 'O' : '-'}</td>
                                            {/* <td>{option.nosUniqueCode}</td> */}
                                            <td>{option.defaultName}</td>
                                            <td>{option.managementName}</td>
                                            <td style={{ fontWeight: '800' }}>{option.stockSumUnit}</td>
                                            <td style={{ fontWeight: '800' }}>{option.status}</td>
                                            {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                                                <td style={{ fontWeight: '800' }}>{option.salesPrice}</td>
                                            }
                                            <td style={{ fontWeight: '800' }}>{option.releaseLocation}</td>
                                            <td style={{ fontWeight: '800' }}>{option.memo}</td>
                                            {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&

                                                <td style={{ fontWeight: '800' }}>
                                                    <button
                                                        type='button'
                                                        className='sub-option-code-btn'
                                                        onClick={(e) => props.onActionOpenSubOptionCodeModal(e, product.product.id, option.id)}
                                                    >대체코드</button>
                                                </td>
                                            }
                                            <td style={{ fontWeight: '800' }} className="option-control">
                                                {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                                                    <>
                                                        <button
                                                            type='button'
                                                            className="modify-btn"
                                                            onClick={(e) => props.onActionOpenModifyProductOptionModal(e, product.product.id, option.id)}
                                                        >옵션수정</button>
                                                        <button
                                                            type='button'
                                                            className="delete-btn"
                                                            onClick={(e) => props.onActionDeleteProductOption(e, product.product.id, option.id)}
                                                        >옵션삭제</button>
                                                    </>
                                                }
                                                <button
                                                    type='button'
                                                    className="status-btn"
                                                    onClick={(e) => props.onActionOpenStockStatusModal(e, product.product.id, option.id)}
                                                >입출고현황</button>
                                            </td>
                                        </OptionTr>
                                    )
                                })}
                            </React.Fragment>
                        );


                    })}

                </tbody>
            </table>
        </ProductManageTableWrapper>
    )
}