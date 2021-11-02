import React,{useMemo} from 'react';
import styled, {css} from 'styled-components';
import { useSelector } from 'react-redux';
import { BloodtypeRounded } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Container = styled.div`
    padding: 10px 50px 50px 50px;
    height:auto;
    background-color: rgba(122, 123, 218, 0.125);
`;

const CategoryContainer = styled.div`
    padding: 30px 30px 0 30px;
    /* & .categoryTitle {
        text-align: left;
    } */
`;

const DataContainer = styled.div`
    display: flex;
    padding: 20px;
	overflow: hidden;

    & .fixedHeader {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
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
`;

const TableContainer = styled.div`
    display: block;
    margin: 10px;
    /* height: 10vh; */
`;

const BodyWrapper = styled.div`
    display: table;
    /* overflow: auto; */
`;

const GroupTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    padding:10px;
    text-align: center;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1rem;
    padding:0 10px;
    column-gap: 5px;
    @media only screen and (max-width:425px){
        font-size: 12px;
        padding: 0;
    }

    & .category-btn-active{
        background: rgba(122,146,218,0.88);
        color:white;
    }
`;

const CategorySelectBtn = styled.button`
    padding: 5px 15px;
    background: white;
    border:1px solid #4682B480;
    border-radius: 15px;
    color:#333;
    font-weight: 600;
`;

const DataBody = styled.div`
    width: 90%;
    height: 40vh;
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
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;

const ImageWrapper = styled.div`
    width: 50%;
    margin: 0 auto;

    @media only screen and (max-width:992px){
        width:35%;
   }
    @media only screen and (max-width:425px){
        width:50%;
    }
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

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
`;

const BodyTr = styled.tr`
    height: auto;

    ${(props) => props.checked ?
        css`
            background:#9bb6d180;
        `
        :
        css`
            &:hover{
                background:#9bb6d130;
            }
        `
    }
`;

const BodyTd = styled.td`
    /* vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720; */
    height: 0;

    vertical-align: middle !important;
    /* text-align: center; */
`;

const DetailTd = styled.td`
    /* vertical-align: middle !important;
    text-align: center;
    width: 150px; */
    border-right: 1px solid #a7a7a720;
    height: 0;

    vertical-align: middle !important;
    text-align: center;
`;

const ArrowSpan = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const DetailTr = styled.tr`
`;

const ControlBox = styled.div`
    float: right;
    margin-right: 35px;
`;

const AddBtn = styled.button`
    padding:3px 8px;
    background: rgb(179 199 219);
    color:white;
    border:1px solid rgb(179 199 219);
    font-weight: 600;
    border-radius: 3px;
`;

const ModifyBtn = styled.button`
    padding:3px 8px;
    background: #a2a9c1;
    color:white;
    border:1px solid #a2a9c1;
    font-weight: 600;
    border-radius: 3px;
    margin-left: 5px;
`;

const DeleteBtn = styled.button`
    padding:3px 8px;
    background: #ffc1a7;
    color:white;
    border:1px solid #ffc1a7;
    border-radius: 3px;
    font-weight: 600;
    margin-left: 5px;
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
                                    className={props.selectedCategory === r.cid ? `category-btn-active` : ''}
                                    onClick={() => { props.__handleEventControl().productViewData().onChangeCategoryValue(r.cid, r.id) }}
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
                                // onClick={() => props.__handleEventControl().product().modifyModalOpen(props.selectedProduct.id)}
                                >추가</AddBtn>
                            </span>
                            <span>
                                <ModifyBtn
                                    type='button'
                                    onClick={() => props.__handleEventControl().product().modifyModalOpen(props.selectedProduct.id)}
                                >수정</ModifyBtn>
                            </span>
                            <span>
                                <DeleteBtn
                                    type='button'
                                    onClick={() => props.__handleEventControl().product().deleteOne(props.selectedProduct.id)}
                                >삭제</DeleteBtn>
                            </span>
                        </ControlBox>
                        <DataBody>
                            <table className="table table-sm" style={{ tableLayout: 'fixed'}}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="col fixedHeader image-cell">
                                            <span>상품이미지</span>
                                        </HeaderTh>
                                        <HeaderTh className="col fixedHeader large-cell">
                                            <span>상품명</span>
                                        </HeaderTh>
                                        {/* <HeaderTh className="col fixedHeader small-cell">
                                            <span></span>
                                        </HeaderTh> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.productViewData && props.productViewData.map((r, index) => {
                                        return (
                                            <BodyTr
                                                key={'product_info_idx' + index}
                                                className={props.selectedProduct?.cid === r.product.cid ? `product-btn-active` : ''}
                                                onClick={() => props.__handleEventControl().productViewData().onClickProductData(r.product.cid)}
                                            >
                                                <BodyTd>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {r.product.imageUrl ?
                                                                <ImageEl src={r.product.imageUrl} title={r.product.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{r.product.defaultName}</span>
                                                </BodyTd>
                                                {/* <BodyTd>
                                                    <span>
                                                    <ModifyBtn
                                                        type='button'
                                                        onClick={() => props.__handleEventControl().product().modifyModalOpen(r.product.id)}
                                                    >수정</ModifyBtn>
                                                    </span>
                                                    <span>
                                                    <DeleteBtn
                                                        type='button'
                                                        onClick={() => props.__handleEventControl().product().deleteOne(r.product.id)}
                                                    >삭제</DeleteBtn>
                                                    </span>
                                                </BodyTd> */}
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </DataBody>
                    </BodyWrapper>
                    
                    <BodyWrapper>
                        <ArrowSpan><ArrowForwardIosIcon /></ArrowSpan>
                    </BodyWrapper>

                    <BodyWrapper>
                        <ControlBox>
                            <span>
                                <AddBtn
                                    type='button'
                                // onClick={() => props.__handleEventControl().product().modifyModalOpen(props.selectedProduct.id)}
                                >추가</AddBtn>
                            </span>
                            <span>
                                <ModifyBtn
                                    type='button'
                                    onClick={() => props.__handleEventControl().product().modifyModalOpen(props.selectedOption.id)}
                                >수정</ModifyBtn>
                            </span>
                            <span>
                                <DeleteBtn
                                    type='button'
                                    onClick={() => props.__handleEventControl().product().deleteOne(props.selectedOption.id)}
                                >삭제</DeleteBtn>
                            </span>
                        </ControlBox>
                        <DataBody>
                            <table className="table table-sm" style={{ tableLayout: 'fixed'}}>
                                <thead>
                                    <tr
                                        key={'product_option_idx'}
                                    // onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                    // checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                    >
                                        <HeaderTh className="col fixedHeader image-cell">
                                            <span>옵션이미지</span>
                                        </HeaderTh>
                                        <HeaderTh className="col fixedHeader large-cell">
                                            <span>옵션명</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.optionViewData && props.optionViewData.map((r, index) => {
                                        return (
                                            <BodyTr
                                            key={'option_info_idx' + index}
                                            className={props.selectedOption?.cid === r.cid ? `product-btn-active` : ''}
                                            onClick={() => props.__handleEventControl().productViewData().onClickOptionData(r.cid)}
                                            // onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                            // checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                            >
                                                <BodyTd>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {r.imageUrl ?
                                                                <ImageEl src={r.imageUrl} title={r.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{r.defaultName}</span>
                                                </BodyTd>
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </DataBody>
                    </BodyWrapper>
                </DataContainer>
                
                {/* <DataContainer> */}
                    <TableContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor:'white'}}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>상품코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>HS_CODE</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>STYLE</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>재고관리여부</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.selectedProduct && 
                                                <DetailTr
                                                    // key={'unreleasedItem' + unreleasedDataIdx}
                                                    // onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                                    // checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                                >
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
                                                        <span>{props.selectedProduct.stockManagement}</span>
                                                    </DetailTd>
                                                </DetailTr>
                                    }
                                </tbody>
                            </table>
                            </TableContainer>

                            <TableContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor:'white'}}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>옵션명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>옵션코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>노스노스 고유코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>가격</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>재고</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>상태</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>메모</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>색상</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>CNY</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>KRW</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.selectedOption && 
                                                <DetailTr
                                                    // key={'unreleasedItem' + unreleasedDataIdx}
                                                    // onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                                    // checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                                >
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
                            <TableContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed', marginBottom: '0', backgroundColor:'white'}}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>가로(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>세로(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>높이(cm)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>내품수량(ea)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>무게(kg)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header fixedHeader" scope="col">
                                            <span>CBM</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.detailViewData && props.detailViewData.map((r, productDetailIdx) => {
                                        return(
                                        <DetailTr key={'product_detail_idx' + productDetailIdx}>
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
                                        )})
                                    }
                                </tbody>
                            </table>
                    </TableContainer>
                {/* </DataContainer> */}

            </Container>
        }
        </>
    )
}

export default ProductDetailBody;