import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
// components

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 200px;
`;

const TableContainer = styled.div`
    height: 500px;
	overflow: auto;
    & .fixedHeader {
        /* width:100%; */
        position: sticky;
        top: -1px;
        background: #f1f1f1;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
`;

const BodyTr = styled.tr`
    ${(props) => props.checked ?
        css`
            background:#7a7bda80;
        `
        :
        css`
            &:hover{
                background:#f1f1f1;
            }
        `
    }
    
`;

const BodyTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    
`;

const ModifyBtn = styled.button`
    padding:3px 8px;
    background: #7a7bda;
    color:white;
    border:1px solid #7a7bda;
    border-radius: 3px;
    font-weight: 600;
`;

const DeleteBtn = styled.button`
    padding:3px 8px;
    background: #ff5555;
    color:white;
    border:1px solid #ff5555;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;

`;

const AddBtn = styled.button`
    padding:0 8px;
    background: #4682B4e0;
    color:white;
    border:1px solid #4682B4e0;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;

`;

const ProductManageBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container className='mt-3'>
                    <TableContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr>
                                    {userRdx.userInfo && ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(userRdx.userInfo.roles) &&
                                        <HeaderTh className='fixedHeader' scope="col" width='200'>컨트롤</HeaderTh>
                                    }
                                    <HeaderTh className='fixedHeader' scope="col" width='250'>상품식별코드</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>상품관리명</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='50'>
                                        <input type='checkbox' onChange={() => props.__handleEventControl().checkedOptionList().checkAll()} checked={props.__handleEventControl().checkedOptionList().isCheckedAll()}></input>
                                    </HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>옵션식별코드</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>옵션명</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>옵션관리명</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='100'>재고수량</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='100'>현재상태</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>가격</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='300'>비고</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>옵션컨트롤</HeaderTh>
                                </tr>
                            </thead>
                            <tbody>
                                {props.productListData && props.productListData.map((product, productIdx) => {
                                    return (
                                        <React.Fragment key={productIdx}>
                                            <tr style={{background: productIdx%2===1 ? '#f8f8f8' : '#ffffff'}}>
                                                {userRdx && userRdx.isLoading === false && userRdx.userInfo && ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(userRdx.userInfo.roles) &&
                                                    <BodyTh rowSpan={product.options.length + 1}>
                                                        <ModifyBtn 
                                                            type='button'
                                                            onClick={() => props.__handleEventControl().product().modifyModalOpen(product.product.id)}
                                                        >상품수정</ModifyBtn>
                                                        <DeleteBtn 
                                                            type='button'
                                                            onClick={() => props.__handleEventControl().product().deleteOne(product.product.id)}
                                                        >상품삭제</DeleteBtn>
                                                    </BodyTh>
                                                }

                                                <BodyTh style={{ textAlign: 'left' }} rowSpan={product.options.length + 1}>
                                                    <div>{product.product.defaultName}</div>
                                                    <div>Code : {product.product.code}</div>
                                                    <div>M_Code : {product.product.manufacturingCode}</div>
                                                </BodyTh>
                                                <BodyTh rowSpan={product.options.length + 1}>
                                                    <div style={{ color: 'green' }}>[{product.category.name}]</div>
                                                    <div>{product.product.managementName}</div>
                                                    <div>
                                                        <AddBtn type='button' onClick={()=>props.__handleEventControl().productOption().addModalOpen(product.product.id)}>옵션추가</AddBtn>
                                                    </div>
                                                </BodyTh>
                                            </tr>
                                            {product.options && product.options.map((option, index2) => {
                                                return (
                                                    <BodyTr
                                                        key={'subitem' + index2}
                                                        checked={props.__handleEventControl().checkedOptionList().isChecked(option.id)}
                                                    >
                                                        <BodyTd>
                                                            <input
                                                                type='checkbox'
                                                                onChange={(e) => props.__handleEventControl().checkedOptionList().checkOne(e, option.id)}
                                                                checked={props.__handleEventControl().checkedOptionList().isChecked(option.id)}
                                                            ></input>
                                                        </BodyTd>
                                                        <BodyTd>{option.code}</BodyTd>
                                                        <BodyTd>{option.defaultName}</BodyTd>
                                                        <BodyTd>{option.managementName}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.stockUnit}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.status}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.salesPrice}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.memo}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>
                                                            <ModifyBtn
                                                                type='button'
                                                                onClick={() => props.__handleEventControl().productOption().modifyModalOpen(product.product.id, option.id)}
                                                            >옵션수정</ModifyBtn>
                                                            <DeleteBtn
                                                                type='button'
                                                                onClick={() => props.__handleEventControl().productOption().deleteOne(product.product.id, option.id)}
                                                            >옵션삭제</DeleteBtn>
                                                        </BodyTd>
                                                    </BodyTr>
                                                )
                                            })}
                                            {/* <tr style={{ background: '#ff000010' }}>
                                                    <td colSpan={2} style={{ fontWeight: '800', borderBottom: '2px solid black' }}>총 개수</td>
                                                    <td style={{ fontWeight: '800', borderBottom: '2px solid black', color: 'red' }}>{product.unitSum}</td>
                                                </tr> */}
                                        </React.Fragment>
                                    );


                                })}

                            </tbody>
                        </table>
                    </TableContainer>
                </Container>
            }

        </>
    );
}

export default ProductManageBody;