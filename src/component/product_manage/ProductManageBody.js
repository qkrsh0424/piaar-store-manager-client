import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
// components

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 200px;

`;

const TableContainer = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    & .fixedHeader {
        /* width:100%; */
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
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

const ReceiveBtn = styled.button`
    padding:3px 8px;
    background: #99CCCC;
    color:white;
    border:1px solid #99CCCC;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;
`;

const ReleaseBtn = styled.button`
    padding:3px 8px;
    background: #FF9966;
    color:white;
    border:1px solid #FF9966;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;
`;

const StockStatusBtn = styled.button`
    padding:3px 8px;
    background: #9fa0f1;
    color:white;
    border:1px solid #9fa0f1;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;
`;

const DeleteProductBtn = styled.button`
    padding:3px 8px;
    background: #ff5555;
    color:white;
    border:1px solid #ff5555;
    border-radius: 3px;
    font-weight: 600;
    margin-top:5px;
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

const CheckboxShape = styled.div`
    width:14px;
    height:14px;
    border:1px solid gray;
    border-radius:50%;
    background:${props => props.checked ? '#007bff' : 'white'};
    display:inline-block;
`;

const RowSpanTr = styled.tr`
    
`;

const ImageWrapper = styled.div`
   width:100%;
   height:auto;
   padding: 10px 15px;
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;
 
const ImageEl = styled.img`
   position: absolute;
   object-fit: cover;
   width: 100%;
   height: 100%;
   transition: .5s;
   border:1px solid #f1f1f1;
   border-radius: 8px;
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
                                        <HeaderTh className='fixedHeader' scope="col" width='100'>?????????</HeaderTh>
                                    }
                                    <HeaderTh className='fixedHeader' scope="col" width='250'>??????????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='140'>???????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>???????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='50'>
                                        <input type='checkbox' onChange={() => props.__handleEventControl().checkedOptionList().checkAll()} checked={props.__handleEventControl().checkedOptionList().isCheckedAll()}></input>
                                    </HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>??????????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='150'>???????????? ????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>?????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>???????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='100'>????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='100'>????????????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='200'>??????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='300'>??????</HeaderTh>
                                    <HeaderTh className='fixedHeader' scope="col" width='400'>???????????????</HeaderTh>
                                </tr>
                            </thead>
                            <tbody>
                                {props.productListData && props.productListData.map((product, productIdx) => {
                                    return (
                                        <React.Fragment key={productIdx}>
                                            <RowSpanTr style={{ background: productIdx % 2 === 1 ? '#f8f8f8' : '#ffffff' }}>
                                                {userRdx && userRdx.isLoading === false && userRdx.userInfo && ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(userRdx.userInfo.roles) &&
                                                    <BodyTh rowSpan={product.options.length + 1}>
                                                        <div>
                                                            <ModifyBtn
                                                                type='button'
                                                                onClick={() => props.__handleEventControl().product().modifyModalOpen(product.product.id)}
                                                            >????????????</ModifyBtn>
                                                        </div>
                                                        <div>

                                                            <DeleteProductBtn
                                                                type='button'
                                                                onClick={() => props.__handleEventControl().product().deleteOne(product.product.id)}
                                                            >????????????</DeleteProductBtn>
                                                        </div>
                                                    </BodyTh>
                                                }

                                                <BodyTh style={{ textAlign: 'left' }} rowSpan={product.options.length + 1}>
                                                    <div>{product.product.defaultName}</div>
                                                    <div>Code : {product.product.code}</div>
                                                    <div>M_Code : {product.product.manufacturingCode}</div>
                                                </BodyTh>
                                                <BodyTh style={{ textAlign: 'left' }} rowSpan={product.options.length + 1}>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {product.product.imageUrl ? 
                                                                <ImageEl src={product.product.imageUrl} title={product.product.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </BodyTh>
                                                <BodyTh rowSpan={product.options.length + 1}>
                                                    <div style={{ color: 'green' }}>[{product.category.name}]</div>
                                                    <div>{product.product.imageFileUri}</div>
                                                    <div>
                                                        <AddBtn type='button' onClick={() => props.__handleEventControl().productOption().addModalOpen(product.product.id)}>????????????</AddBtn>
                                                    </div>
                                                </BodyTh>
                                                <BodyTh colSpan={10} style={{background:'#7a7bda20', color:'#888'}}>
                                                    <div>{product.product.managementName}-{product.product.code}-{product.product.manufacturingCode}</div>
                                                </BodyTh>
                                            </RowSpanTr>
                                            {product.options && product.options.map((option, index2) => {
                                                return (
                                                    <BodyTr
                                                        key={'subitem' + index2}
                                                        onClick={() => props.__handleEventControl().checkedOptionList().checkOneTr(option.id)}
                                                        checked={props.__handleEventControl().checkedOptionList().isChecked(option.id)}
                                                    >
                                                        <BodyTd>
                                                            <CheckboxShape
                                                                checked={props.__handleEventControl().checkedOptionList().isChecked(option.id)}
                                                            ></CheckboxShape>
                                                            {/* ??????????????? ???????????? ?????????????????? ???????????? */}
                                                            {/* <input
                                                                type='checkbox'
                                                                onChange={(e) => props.__handleEventControl().checkedOptionList().checkOne(e, option.id)}
                                                                checked={props.__handleEventControl().checkedOptionList().isChecked(option.id)}
                                                            ></input> */}
                                                        </BodyTd>
                                                        <BodyTd>{option.code}</BodyTd>
                                                        <BodyTd>{option.nosUniqueCode}</BodyTd>
                                                        <BodyTd>{option.defaultName}</BodyTd>
                                                        <BodyTd>{option.managementName}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.stockUnit}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.status}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.salesPrice}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>{option.memo}</BodyTd>
                                                        <BodyTd style={{ fontWeight: '800' }}>
                                                            <ModifyBtn
                                                                type='button'
                                                                onClick={(e) => props.__handleEventControl().productOption().modifyModalOpen(e, product.product.id, option.id)}
                                                            >????????????</ModifyBtn>
                                                            <DeleteBtn
                                                                type='button'
                                                                onClick={(e) => props.__handleEventControl().productOption().deleteOne(e, product.product.id, option.id)}
                                                            >????????????</DeleteBtn>
                                                            {/* <ReceiveBtn
                                                                type='button'
                                                                onClick={(e) => props.__handleEventControl().receive().receiveStatusModalOpen(e, product.product.id, option.id)}
                                                            >????????????</ReceiveBtn>
                                                            <ReleaseBtn
                                                                type='button'
                                                                onClick={(e) => props.__handleEventControl().release().releaseStatusModalOpen(e, product.product.id, option.id)}
                                                            >????????????</ReleaseBtn> */}
                                                            <StockStatusBtn
                                                                type='button'
                                                                onClick={(e) => props.__handleEventControl().productOption().stockStatusModalOpen(e, product.product.id, option.id)}
                                                            >???????????????</StockStatusBtn>
                                                        </BodyTd>
                                                    </BodyTr>
                                                )
                                            })}
                                            {/* <tr style={{ background: '#ff000010' }}>
                                                    <td colSpan={2} style={{ fontWeight: '800', borderBottom: '2px solid black' }}>??? ??????</td>
                                                    <td style={{ fontWeight: '800', borderBottom: '2px solid black', color: 'red' }}>{product.unitSum}</td>
                                                </tr> */}
                                        </React.Fragment>
                                    );


                                })}

                            </tbody>
                        </table>

                    </TableContainer>
                    {/* <table style={{ border: '1px solid black' }}>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Month</th>
                            <th style={{ border: '1px solid black' }}>Savings</th>
                            <th style={{ border: '1px solid black' }}>Savings for holiday!</th>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black' }} rowSpan="2">
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                            </td>
                            <td style={{ border: '1px solid black' }}>January</td>
                            <td style={{ border: '1px solid black' }}>$100</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black' }}>February</td>
                            <td style={{ border: '1px solid black' }}>$80</td>
                        </tr>
                    </table> */}

                </Container>
            }

        </>
    );
}

export default ProductManageBody;