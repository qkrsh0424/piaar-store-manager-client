import React,{useMemo} from 'react';
import styled, {css} from 'styled-components';
import { useSelector } from 'react-redux';
import { BloodtypeRounded } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Container = styled.div`
    padding: 0px 20px 50px 20px;
    /* padding-bottom: 50px; */
    height:auto;
    height: 100vh;
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
    padding: 0 20px;

    & .fixedHeader {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }

    & .image-cell {
        width: 30%;
    }

    & .large-cell {
        width: 70%;
    }
`;

const TableContainer = styled.div`
`;

const BodyWrapper = styled.div`
    display: table;
`;

const GroupTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    padding:15px;
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
    padding: 10px 15px;
    background: white;
    border:1px solid #4682B480;
    border-radius: 15px;
    color:#333;
    font-weight: 600;
`;

const DataBody = styled.div`
    width: 80%;
    height: 40vh;
    overflow: scroll;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;

const ImageWrapper = styled.div`
    width: 70%;
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
            background:#7a7bda80;
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

const ArrowSpan = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const ProductInformationBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
        {userRdx.isLoading === false &&
            <Container>
                <CategoryContainer>
                    {/* <GroupTitle className="categoryTitle">카테고리</GroupTitle> */}
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
                        <GroupTitle>상품</GroupTitle>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.productViewData && props.productViewData.map((r, index) => {
                                        return (
                                            <BodyTr
                                                key={'product_info_idx' + index}
                                                onClick={() => props.__handleEventControl().productViewData().onClickProductData(r.product.cid)}
                                                // checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
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
                        <GroupTitle>옵션</GroupTitle>
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
                
                <TableContainer>
                </TableContainer>
            </Container>
        }
        </>
    )
}

export default ProductInformationBody;