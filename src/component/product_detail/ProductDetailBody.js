import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { withRouter } from 'react-router';

const Container = styled.div`
    height:auto;
    background: linear-gradient(to bottom right, #d3e1e5, #dce3f6);

    & .info-table {
        display: grid;
        grid-template-rows: 1fr;
    }
`;

const CategoryContainer = styled.div`
    padding: 30px 50px 0px 50px;

    @media only screen and (max-width: 768px) {
        padding: 4%;
    }

    @media only screen and (max-width: 576px) {
        padding: 2% 7%;
    }
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

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 1rem;
    padding:0 10px;
    column-gap: 5px;

    @media only screen and (max-width:768px){
        font-size: 14px;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 10px;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
        grid-template-columns: repeat(1, 1fr);
        row-gap: 10px;
    }

    & .category-btn-active{
        background: #4360A3C9;
        color:white;
    }

    & .non-category {
        color: rgba(95,115,205);
    }
`;

const CategorySelectBtn = styled.button`
    padding: 5px 15px;
    background: white;
    border:1px solid #4682B480;
    border-radius: 15px;
    color:#333;
    font-weight: 600;
    box-shadow: 2px 2px 15px #b0b2b7;

    transition: .2s;

    &:hover{
        background: #4360A3C9;
        color: white;
    }
`;

const DataBody = styled.div`
    width: 90%;
    height: 500px;
    overflow: scroll;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
    box-shadow: 2px 2px 15px #b0b2b799;

    & .product-btn-active{
        background: #9bb6d1DD;
        color: white;
        font-weight: 700;

        &:hover{
            background: #9bb6d1DD;
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

const ArrowSpan = styled.div`
    height: 100%;

    @media only screen and (max-width:576px){
        transform: rotate(90deg);
    }
`;

const ControlBox = styled.div`
    float: right;
    padding: 5px;
    padding-right: 7%;
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

    &.default-name {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #efefef80;
    }
`;



const ProductDetailBody = (props) => {
    const userRdx = useSelector(state => state.user);
    let routerState = {
        prevUrl: props.location.pathname
    }

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <CategoryContainer>
                        <CategoryGroup className='mb-3'>
                            <CategorySelectBtn key={4} type='button'
                                className={props.params.categoryCid === '4' ? `category-btn-active` : '' || 'non-category'}
                                onClick={() => props.__handleEventControl().viewData().changeRouterByCategory(4)}
                            >전체조회</CategorySelectBtn>
                            {props.categoryListData?.map((r) => {
                                return (
                                    <CategorySelectBtn key={r.cid} type='button'
                                        className={props.params.categoryCid === r.cid.toString() ? `category-btn-active` : ''}
                                        onClick={() => props.__handleEventControl().viewData().changeRouterByCategory(r.cid)}
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
                                        onClick={() => props.history.push({
                                            pathname:'/products/create',
                                            state:routerState
                                        })}
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
                                {props.productViewData?.map((r, index) => {
                                    return (
                                        <div
                                            key={'product_info_idx' + index}
                                            className={props.params.productCid === r.cid.toString() ? `product-btn-active` : '' || `data-hover-active`}
                                            onClick={() => props.__handleEventControl().viewData().changeRouterByProduct(r.cid)}
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
                                {props.optionViewData?.map((r, index) => {
                                    return (
                                        <div
                                            key={'option_info_idx' + index}
                                            className={props.params.optionCid === r.cid.toString() ? `product-btn-active` : '' || `data-hover-active`}
                                            onClick={() => props.__handleEventControl().viewData().changeRouterByOption(r.cid)}
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
            </Container>
            }
        </>
    )
}

export default withRouter(ProductDetailBody);