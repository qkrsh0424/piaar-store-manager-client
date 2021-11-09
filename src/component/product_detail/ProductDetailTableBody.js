import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InfoContainer = styled.div`
    padding: 20px 50px;
	overflow: hidden;
    display: grid;
    height: auto;
    background-color: rgba(122, 123, 218, 0.125);
    padding-bottom: 100px;
    
    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
        padding: 2px;
    }

    & .detail-list-active{
        background: #9bb6d1DD;
        color: white;
        font-weight: 700;

        &:hover{
            background: #9bb6d1DD;
        }
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
        padding: 2px;
    }
`;

const BodyWrapper = styled.div`
    & .arrow-img {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .data-hover-active {
        &:hover{
            background:#9bb6d155;
            transition: .2s;
        }
    }
`;

const TableContainer = styled.div`
    display: block;
    margin: 10px;
    min-height: 100px;
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;

    @media only screen and (max-width:576px){
        font-weight: 400;
        font-size: 10px;
    }
`;

const DetailTd = styled.td`
    border-right: 1px solid #a7a7a720;
    height: auto;

    vertical-align: middle !important;
    text-align: center;
`;

const DetailTr = styled.tr`
`;

const ControlBox = styled.div`
    float: right;
    padding: 5px;
    padding-right: 45px;
`;

const AddBtn = styled.button`
    padding:1px 3px;
    background: rgb(179 199 219);
    color:white;
    border:1px solid rgb(179 199 219);
    border-radius: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const ModifyBtn = styled.button`
    padding:1px 3px;
    background: #a2a9c1;
    color:white;
    border:1px solid #a2a9c1;
    border-radius: 3px;
    margin-left: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const DeleteBtn = styled.button`
    padding:1px 3px;
    background: #868b9d;
    color:white;
    border:1px solid #868b9d;
    border-radius: 3px;
    margin-left: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const ProductDetailTableBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            <InfoContainer>
                    <TableContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor: 'white' }}>
                            <thead>
                                <tr>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>상품명</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>상품코드</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>HS_CODE</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>STYLE</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col" width="100">
                                        <span>재고관리여부</span>
                                    </HeaderTh>
                                </tr>
                            </thead>
                            <tbody>
                                {props.selectedProduct &&
                                    <DetailTr>
                                        <DetailTd className="col">
                                            <span>{props.selectedProduct.defaultName}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedProduct.code}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedProduct.hsCode}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedProduct.style}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedProduct.stockManagement ? "O" : "X"}</span>
                                        </DetailTd>
                                    </DetailTr>
                                }
                            </tbody>
                        </table>
                    </TableContainer>

                    <TableContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor: 'white' }}>
                            <thead>
                                <tr>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>옵션명</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>옵션코드</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>노스노스 고유코드</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col" width="100">
                                        <span>가격</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col" width="100">
                                        <span>재고</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>상태</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>메모</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>색상</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>CNY</span>
                                    </HeaderTh>
                                    <HeaderTh className="fixed-header fixed-header" scope="col">
                                        <span>KRW</span>
                                    </HeaderTh>
                                </tr>
                            </thead>
                            <tbody>
                                {props.selectedOption &&
                                    <DetailTr>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.defaultName}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.code}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.nosUniqueCode}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.salesPrice}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.stockUnit}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.status}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.memo}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.color}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.unitCny}</span>
                                        </DetailTd>
                                        <DetailTd className="col">
                                            <span>{props.selectedOption.unitKrw}</span>
                                        </DetailTd>
                                    </DetailTr>
                                }
                            </tbody>
                        </table>
                    </TableContainer>

                    <BodyWrapper>
                        <ControlBox>
                            <span>
                                <AddBtn
                                    type='button'
                                    onClick={() => props.__handleEventControl().productDetail().addModalOpen()}
                                ><AddIcon /></AddBtn>
                            </span>
                            <span>
                                <ModifyBtn
                                    type='button'
                                onClick={() => props.__handleEventControl().productDetail().modifyModalOpen()}
                                ><EditIcon /></ModifyBtn>
                            </span>
                            <span>
                                <DeleteBtn
                                    type='button'
                                onClick={() => props.__handleEventControl().productDetail().deleteOne()}
                                ><DeleteIcon /></DeleteBtn>
                            </span>
                        </ControlBox>
                        <TableContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor: 'white', marginTop: '5px' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>가로(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>세로(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>높이(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>내품수량(ea)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>무게(kg)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixed-header" scope="col">
                                            <span>CBM</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.detailViewData?.map((r, productDetailIdx) => {
                                        return (
                                            <DetailTr
                                                key={'product_detail_idx' + productDetailIdx}
                                                className={props.params.detailCid === r.cid.toString() ? `detail-list-active` : '' || `data-hover-active`}
                                                onClick={() => props.__handleEventControl().productViewData().changeRouterByDetail(r.cid)}
                                            >
                                                <DetailTd className="col">
                                                    <span>{r.detailWidth}</span>
                                                </DetailTd>
                                                <DetailTd className="col">
                                                    <span>{r.detailLength}</span>
                                                </DetailTd>
                                                <DetailTd className="col">
                                                    <span>{r.detailHeight}</span>
                                                </DetailTd>
                                                <DetailTd className="col">
                                                    <span>{r.detailQuantity}</span>
                                                </DetailTd>
                                                <DetailTd className="col">
                                                    <span>{r.detailWeight}</span>
                                                </DetailTd>
                                                <DetailTd className="col">
                                                    <span>{r.detailCbm}</span>
                                                </DetailTd>
                                            </DetailTr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </TableContainer>
                    </BodyWrapper>
                </InfoContainer>
        </>
    )
}

export default ProductDetailTableBody;