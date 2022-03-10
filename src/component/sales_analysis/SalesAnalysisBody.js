import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const Container = styled.div`
    height:100vh;
    overflow: auto;
    background: linear-gradient(to bottom right, #d3e1e5, #dce3f6);

    & .info-table {
        display: grid;
        grid-template-rows: 1fr;
    }
`;

const DataContainer = styled.div`
	overflow: hidden;
    padding: 0 5%;
    padding-bottom: 10%;

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
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    border-bottom: 1px solid #eee;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const BodyWrapper = styled.div`
`;

const DataBody = styled.div`
    width: 100%;
    min-height: 70vh;
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

const ItemHeader = styled.div`
    vertical-align: middle !important;
    text-align: center;
    background-color: #e7e7e7;

    padding: 2px 0px;
    font-weight: 600;
`;

const ItemData = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleGroup = styled.div`
    padding: 2% 5%;
    font-weight: 700;
    font-size: 1.2rem;
`;

const SalesAnalysisBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <TitleGroup>
                        <div>피아르 판매 랭킹</div>
                    </TitleGroup>
                    <DataContainer>
                        <BodyWrapper>
                            <DataBody>
                                <ItemContainer className="fixed-header">
                                    <ItemHeader>
                                        <span>통합 순위</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>이미지</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>상품명</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>옵션명</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>옵션코드</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>네이버 판매 개수</span>
                                    </ItemHeader>
                                    <ItemHeader>
                                        <span>쿠팡 판매 개수</span>
                                    </ItemHeader>
                                </ItemContainer>
                                {props.salesAnalysisItems?.map((r, index) => {
                                    return (
                                        <div key={'sales-analysis-item' + index}>
                                            <ItemContainer>
                                                <ItemData>
                                                    <span>{index + 1} 위</span>
                                                </ItemData>
                                                <ItemData>
                                                    <ImageWrapper>
                                                        <ImageBox>
                                                            {r.salesProdImageUrl ?
                                                                <ImageEl src={r.salesProdImageUrl} title={r.imageFileName} />
                                                                :
                                                                <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                            }
                                                        </ImageBox>
                                                    </ImageWrapper>
                                                </ItemData>
                                                <ItemData>
                                                    <span>{r.salesProdManagementName}</span>
                                                </ItemData>
                                                <ItemData>
                                                    <span>{r.salesOptionManagementName}</span>
                                                </ItemData>
                                                <ItemData>
                                                    <span>{r.salesOptionCode}</span>
                                                </ItemData>
                                                <ItemData>
                                                    <span>{r.naverSalesUnit}</span>
                                                </ItemData>
                                                <ItemData>
                                                    <span>{r.coupangSalesUnit}</span>
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

export default withRouter(SalesAnalysisBody);