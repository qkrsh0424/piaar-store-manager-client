import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InfoContainer = styled.div`
    padding: 20px 3.2%;
	overflow: hidden;
    display: grid;
    height: auto;
    background: linear-gradient(to top right, #d3e1e5, #dce3f6);
    padding-bottom: 100px;
    
    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
        padding: 2px;
    }

    & .large-table {
        min-height: 130px;
    }

    & .detail-table {
        border-bottom: none;
    }

    @media only screen and (max-width: 992px) {
        padding: 20px 35px;
    }
`;

const BodyWrapper = styled.div`
    border-bottom: 1px solid #eee;
    padding: 10px;
    min-height: 200px;

    & .data-hover-active {
        &:hover{
            background:#9bb6d155;
            transition: .2s;
        }
    }

    & .detail-list-active{
        background: #9bb6d1DD;
        color: white;
        font-weight: 700;

        &:hover{
            background: #9bb6d1DD;
        }
    }

    & .detail-header {
        border-bottom : 1px solid #eee;
    }
`;

const ControlBox = styled.div`
    float: right;
    font-size: 1rem;
`;

const AddBtn = styled.button`
    padding:2px 4px;
    background: rgb(179 199 219);
    color:white;
    border:1px solid rgb(179 199 219);
    border-radius: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const ModifyBtn = styled.button`
    padding:2px 4px;
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
    padding:2px 4px;
    background: #868b9d;
    color:white;
    border:1px solid #868b9d;
    border-radius: 3px;
    margin-left: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const DataContainer = styled.div`
    display: block;
    padding: 10px;
    min-height: 100px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #b0b2b7;

    @media only screen and (max-width: 576px) {
        min-height: 70px;
    }
`;

const ImageWrapper = styled.div`
   width:100%;
   height:auto;
   padding: 10px 15px;

    @media only screen and (max-width:992px){
        width: 150px;
    }

    @media only screen and (max-width: 768px) {
        width: 130px;
    }

   @media only screen and (max-width: 576px){
        width: 110px;
    }
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

const DataBody = styled.div`
    display: grid;    
    grid-template-columns: 150px 80%;
    grid-gap: 30px;
    padding-bottom: 10px;

    @media only screen and (max-width:992px){
        grid-template-columns: 1fr;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding: 5px 0 10px 15px;

    @media only screen and (max-width: 768px){
        font-size: 15px;
    }

    @media only screen and (max-width:576px){
        padding: 15px 0;
        font-size: 14px;

        & .control-box {
            padding-right: 10px;
        }
    }
`;

const DataHeader = styled.div`
    display:inline;
    padding: 5px;
    color: #4a4949;
`;

const DataText = styled.div`
    color: #0085A5;
    font-weight: 700;
    display:inline;
    padding: 5px;
`;

const DetailText = styled.span`
    font-weight: 700;
    display:inline;
    padding: 5px;
`;

const DataDiv = styled.div`
    border-bottom: 1px solid #0085A522;
`;

const DataWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-size: 14px;

    & .grid-span-2 {
        grid-column: span 2;
    }

    & .grid-span-3 {
        grid-column: span 3;
    }

    & .grid-span-4 {
        grid-column: span 4;
    }

    & .grid-span-6 {
        grid-column: span 6;
    }

    @media only screen and (max-width: 768px){
        display: block;
    }

    @media only screen and (max-width: 576px) {
        font-size: 10px;
    }
`;

const DetailWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 14px;
    border-bottom: 1px solid #0085A522;
    text-align: center;
    padding: 5px;
    color: #0085A5;

    & .grid-span-2 {
        grid-column: span 2;
    }

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const ProductDetailTableBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            <InfoContainer>
                <DataContainer>
                    <BodyWrapper>
                        <GroupTitle>상품</GroupTitle>
                        {props.selectedProduct &&
                            <DataBody>
                                <ImageWrapper>
                                    <ImageBox>
                                        {props.selectedProduct.imageUrl ?
                                            <ImageEl src={props.selectedProduct.imageUrl} title={props.selectedProduct.imageFileName} />
                                            :
                                            <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                        }
                                    </ImageBox>
                                </ImageWrapper>
                                <DataWrapper>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>상품명 :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultName}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>관리 상품명 :</DataHeader>
                                        <DataText>{props.selectedProduct.managementName}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>상품코드 :</DataHeader>
                                        <DataText>{props.selectedProduct.code}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>제조번호 :</DataHeader>
                                        <DataText>{props.selectedProduct.manufacturingCode}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>네이버 상품코드 :</DataHeader>
                                        <DataText>{props.selectedProduct.naverProductCode}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>HS_CODE :</DataHeader>
                                        <DataText>{props.selectedProduct.hsCode}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-3">
                                        <DataHeader>STYLE :</DataHeader>
                                        <DataText>{props.selectedProduct.style}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-3">
                                        <DataHeader>관세율 :</DataHeader>
                                        <DataText>{props.selectedProduct.tariffRate}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>가로(cm) :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultWidth}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>세로(cm) :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultLength}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>높이(cm) :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultHeight}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>내품수량(ea) :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultQuantity}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>무게(kg) :</DataHeader>
                                        <DataText>{props.selectedProduct.defaultWeight}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>재고관리여부 :</DataHeader>
                                        <DataText>{props.selectedProduct.stockManagement ? "O" : "X"}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-6">
                                        <DataHeader>메모 :</DataHeader>
                                        <DataText>{props.selectedProduct.memo}</DataText>
                                    </DataDiv>
                                </DataWrapper>
                            </DataBody>
                        }
                    </BodyWrapper>

                    <BodyWrapper>
                        <GroupTitle>옵션</GroupTitle>
                        {props.selectedOption &&
                            <DataBody>
                                <ImageWrapper>
                                    <ImageBox>
                                        {props.selectedOption.imageUrl ?
                                            <ImageEl src={props.selectedOption.imageUrl} title={props.selectedOption.imageFileName} />
                                            :
                                            <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                        }
                                    </ImageBox>
                                </ImageWrapper>
                                <DataWrapper>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>옵션명 :</DataHeader>
                                        <DataText>{props.selectedOption.defaultName}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>관리 옵션명 :</DataHeader>
                                        <DataText>{props.selectedOption.managementName}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>관리코드 :</DataHeader>
                                        <DataText>{props.selectedOption.code}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>노스노스 고유코드 :</DataHeader>
                                        <DataText>{props.selectedOption.nosUniqueCode}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>판매가 :</DataHeader>
                                        <DataText>{props.selectedOption.salesPrice}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>재고수량 :</DataHeader>
                                        <DataText>{props.selectedOption.stockSumUnit}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>색상 :</DataHeader>
                                        <DataText>{props.selectedOption.color}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>CNY :</DataHeader>
                                        <DataText>{props.selectedOption.unitCny}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-2">
                                        <DataHeader>KRW :</DataHeader>
                                        <DataText>{props.selectedOption.unitKrw}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-6">
                                        <DataHeader>현재상태 :</DataHeader>
                                        <DataText>{props.selectedOption.status}</DataText>
                                    </DataDiv>
                                    <DataDiv className="grid-span-6">
                                        <DataHeader>비고 :</DataHeader>
                                        <DataText>{props.selectedOption.memo}</DataText>
                                    </DataDiv>
                                </DataWrapper>
                            </DataBody>
                        }
                    </BodyWrapper>
                    
                    <BodyWrapper className="detail-table">
                        <GroupTitle>상세
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
                        </GroupTitle>
                        <DetailWrapper className="detail-header">
                            <div>
                                <DataHeader>가로(cm)</DataHeader>
                            </div>
                            <div>
                                <DataHeader>세로(cm)</DataHeader>
                            </div>
                            <div>
                                <DataHeader>높이(cm)</DataHeader>
                            </div>
                            <div>
                                <DataHeader>내품수량(ea)</DataHeader>
                            </div>
                            <div>
                                <DataHeader>무게(kg)</DataHeader>
                            </div>
                            <div className="grid-span-2">
                                <DataHeader>CBM</DataHeader>
                            </div>
                        </DetailWrapper>
                        {props.detailViewData?.map((r, productDetailIdx) => {
                            return (
                                <DetailWrapper
                                    key={'product_detail_idx' + productDetailIdx}
                                    className={props.params.detailCid === r.cid.toString() ? `detail-list-active` : '' || `data-hover-active`}
                                    onClick={() => props.__handleEventControl().viewData().changeRouterByDetail(r.cid)}
                                >
                                    <div>
                                        <DetailText>{r.detailWidth}</DetailText>
                                    </div>
                                    <div>
                                        <DetailText>{r.detailLength}</DetailText>
                                    </div>
                                    <div>
                                        <DetailText>{r.detailHeight}</DetailText>
                                    </div>
                                    <div>
                                        <DetailText>{r.detailQuantity}</DetailText>
                                    </div>
                                    <div>
                                        <DetailText>{r.detailWeight}</DetailText>
                                    </div>
                                    <div className="grid-span-2">
                                        <DetailText>{r.detailCbm}</DetailText>
                                    </div>
                                </DetailWrapper>
                            )
                        })}
                    </BodyWrapper>
                </DataContainer>
            </InfoContainer>
        </>
    )
}

export default ProductDetailTableBody;