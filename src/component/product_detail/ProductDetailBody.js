import React,{useMemo} from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BloodtypeRounded } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
    height:auto;
    background-color: rgba(122, 123, 218, 0.125);
    padding-bottom: 100px;

    & .info-table {
        display: grid;
        grid-template-rows: 1fr;
    }
`;

const CategoryContainer = styled.div`
    padding: 30px 50px 0px 50px;
`;

const DataContainer = styled.div`
    padding: 20px;
	overflow: hidden;
    display: grid;
    grid-template-columns: 45% 10% 45%;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #e7e7e7;
        z-index:10;
        padding: 2px;
    }

    & .image-cell {
        width: 50px;
    }

    & .small-cell {
        width: 30px;
    }

    & .large-cell {
        width: 50px;
    }

    @media only screen and (max-width:768px){
        grid-template-columns: 48% 4% 48%;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
        grid-template-columns: repeat(1, 1fr);
        row-gap: 10px;
    }
`;

const ItemContainer = styled.div`
	overflow: hidden;
    display: grid;
    grid-template-columns: 15% 85%;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const InfoContainer = styled.div`
    padding: 20px 50px;
	overflow: hidden;
    display: grid;
    height: auto;
    
    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
        padding: 2px;
    }

    & .detail-list-active{
        background: #9bb6d180;

        &:hover{
            background: #9bb6d180;
        }
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
        padding: 2px;
    }
`;

const TableContainer = styled.div`
    display: block;
    margin: 10px;
    min-height: 100px;
`;

const BodyWrapper = styled.div`
    & .arrow-img {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .data-hover-active {
        &:hover{
            background:#9bb6d130;
        }
    }
`;

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1rem;
    padding:0 10px;
    column-gap: 5px;

    @media only screen and (max-width:576px){
        font-size: 12px;
        grid-template-columns: repeat(1, 1fr);
        row-gap: 10px;
    }

    & .category-btn-active{
        background: rgba(122,146,218,0.88);
        color:white;
    }
`;

// const CategorySelectBtn = styled(Link)`
const CategorySelectBtn = styled.button`
    padding: 5px 15px;
    background: white;
    border:1px solid #4682B480;
    border-radius: 15px;
    color:#333;
    font-weight: 600;
    box-shadow: 2px 2px 15px #b0b2b7;
`;

const DataBody = styled.div`
    width: 90%;
    height: 500px;
    overflow: scroll;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;

    & .product-btn-active{
        background: #9bb6d180;

        &:hover{
            background: #9bb6d180;
        }
    }

    @media only screen and (max-width:576px){
        height: 400px;
    }
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;

const ImageWrapper = styled.div`
    width: 100%;
`;

const ImageEl = styled.img`
   position: absolute;
   object-fit: cover;
   width: 100%;
   height: 100%;
   transition: .5s;
   border:1px solid #f1f1f1;
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

const ArrowSpan = styled.div`
    height: 100%;

    @media only screen and (max-width:576px){
        transform: rotate(90deg);
    }
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

const ItemHeader = styled.div`
    vertical-align: middle !important;
    text-align: center;
    background-color: #e7e7e7;

    padding: 2px 0px;
    font-weight: 600;
`;

const ItemData = styled.div`
    /* &:hover{
        background:#9bb6d130;
    } */

    &.default-name {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #efefef80;
    }
`;

const ProductDetailBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <CategoryContainer>
                        <CategoryGroup className='mb-3'>
                            {props.categoryListData && props.categoryListData.map((r) => {
                                return (
                                    <CategorySelectBtn key={r.cid} type='button'
                                        className={props.selectedCategory?.cid === r.cid ? `category-btn-active` : ''}
                                        onClick={() => { props.__handleEventControl().productViewData().onChangeCategoryData(r.id) }}
                                        // to={`product-detail?category=${r.cid}`}
                                    >{r.name}</CategorySelectBtn>
                                )
                            })}
                        </CategoryGroup>
                    </CategoryContainer>


                    <DataContainer>
                        <BodyWrapper>
                            <ControlBox>
                                <span>
                                    <AddBtn
                                        type='button'
                                        onClick={() => window.location.href = '/products/create'}
                                    ><AddIcon /></AddBtn>
                                </span>
                                <span>
                                    <ModifyBtn
                                        type='button'
                                        onClick={() => props.__handleEventControl().product().modifyModalOpen()}
                                    ><EditIcon /></ModifyBtn>
                                </span>
                                <span>
                                    <DeleteBtn
                                        type='button'
                                        onClick={() => props.__handleEventControl().product().deleteOne()}
                                    ><DeleteIcon /></DeleteBtn>
                                </span>
                            </ControlBox>
                            <DataBody>
                                <ItemContainer className="fixed-header">
                                    <ItemHeader>
                                        <span>상품</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>상품명</span>
                                    </ItemHeader>
                                </ItemContainer>
                                {props.productViewData && props.productViewData.map((r, index) => {
                                    return (
                                        <div
                                        key={'product_info_idx' + index}
                                        className={props.selectedProduct?.cid === r.product.cid ? `product-btn-active` : '' || `data-hover-active`}
                                        onClick={() => props.__handleEventControl().productViewData().onClickProductData(r.product.cid)}
                                        >
                                            <ItemContainer>
                                                <ItemData>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {r.product.imageUrl ?
                                                                <ImageEl src={r.product.imageUrl} title={r.product.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </ItemData>
                                                <ItemData className="default-name">
                                                    <span>{r.product.defaultName}</span>
                                                </ItemData>
                                            </ItemContainer>
                                        </div>
                                    )
                                })}
                            </DataBody>
                        </BodyWrapper>

                        <BodyWrapper>
                            <ArrowSpan className="arrow-img"><ArrowForwardIosIcon /></ArrowSpan>
                        </BodyWrapper>

                        <BodyWrapper>
                            <ControlBox>
                                <span>
                                    <AddBtn
                                        type='button'
                                        onClick={() => props.__handleEventControl().productOption().addModalOpen()}
                                    ><AddIcon /></AddBtn>
                                </span>
                                <span>
                                    <ModifyBtn
                                        type='button'
                                        onClick={(e) => props.__handleEventControl().productOption().modifyModalOpen(e)}
                                    ><EditIcon /></ModifyBtn>
                                </span>
                                <span>
                                    <DeleteBtn
                                        type='button'
                                        onClick={(e) => props.__handleEventControl().productOption().deleteOne(e)}
                                    ><DeleteIcon /></DeleteBtn>
                                </span>
                            </ControlBox>
                            <DataBody>
                                <ItemContainer className="fixed-header">
                                    <ItemHeader>
                                        <span>옵션</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>옵션명</span>
                                    </ItemHeader>
                                </ItemContainer>
                                {props.optionViewData && props.optionViewData.map((r, index) => {
                                    return (
                                        <div
                                            key={'option_info_idx' + index}
                                            className={props.selectedOption?.cid === r.cid ? `product-btn-active` : '' || `data-hover-active`}
                                            onClick={() => props.__handleEventControl().productViewData().onClickOptionData(r.cid)}
                                        >
                                            <ItemContainer>
                                                <ItemData>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {r.imageUrl ?
                                                                <ImageEl src={r.imageUrl} title={r.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </ItemData>
                                                <ItemData className="default-name">
                                                    <span>{r.defaultName}</span>
                                                </ItemData>
                                            </ItemContainer>
                                        </div>
                                    )
                                })}
                            </DataBody>
                        </BodyWrapper>
                    </DataContainer>



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
                                    {props.detailViewData && props.detailViewData.map((r, productDetailIdx) => {
                                        return (
                                            <DetailTr
                                                key={'product_detail_idx' + productDetailIdx}
                                                className={props.selectedDetail?.cid === r.cid ? `detail-list-active` : '' || `data-hover-active`}
                                                onClick={() => props.__handleEventControl().productViewData().onClickDetailData(r.cid)}
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
            </Container>
            }
        </>
    )
}

export default ProductDetailBody;