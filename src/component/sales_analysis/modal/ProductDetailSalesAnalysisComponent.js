import styled from "styled-components";
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react'

const Container = styled.div`
    padding-bottom: 3%;
    background: linear-gradient(to bottom right, #dce3f6, #f0fcff);
`;

const TitleContainer = styled.div`
    /* padding:10px; */
    border-bottom: 1px solid #000;
    padding: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BodyContainer = styled.div`
    padding: 3%;
`;

const BodyWrapper = styled.div`
    min-height: 30vh;
    max-height: 30vh;
    overflow: auto;
    background: white;
    border-radius: 5px;
    box-shadow: 2px 2px 15px #dde0e6;

    @media only screen and (max-width:576px){
        min-height: 20vh;
        min-height: 20vh;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding: 7px 20px;

    @media only screen and (max-width:576px){
        font-size: 16px;
    }

    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const ProdRankDetailInfo = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 10% 25% 20% 20% 10% 15%);
    align-items: center;
    border-bottom: 1px solid #eee;
    transition: 0.15s;

    &:hover {
        background-color: #d3d3eb44;
    }

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const CloseBtn = styled.div`
    color: #5c5c7e;

    &:hover {
        color: #7a7aff77;
    }
`;

const HeaderContainer = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 10% 25% 20% 20% 10% 15%);
    align-items: center;
    position: sticky;
    top: -1px;
    background: #d3d3eb;
    z-index:10;
    padding: 2px;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const ItemHeader = styled.div`
    vertical-align: middle !important;
    text-align: center;
    background-color: #d3d3eb;

    padding: 2px 0px;
    font-weight: 600;
`;

const ItemData = styled.div`
    padding: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.div`
    padding: 2%;
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;

const ImageWrapper = styled.div`
    width: 20%;

    @media only screen and (max-width: 768px) {
        width: 35%;
    }

    @media only screen and (max-width:320px){
        width: 45%;
    }
`;

const ImageEl = styled.img`
   position: absolute;
   object-fit: cover;
   width: 100%;
   height: 100%;
   transition: .5s;
   border:1px solid #f1f1f1;
`;

const TotalInfoBox = styled.div`
    display: flex;
    float: right;
    font-weight: 600;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const TotalInfoText = styled.div`
    padding: 10px;
`;

const ProductDetailSalesAnalysisComponent = (props) => {
    const [prodDetailRankList, setProdDetailRankList] = useState(null);
    const [prodTotalSales, setProdTotalSales] = useState(null);

    useEffect(() => {
        function getProdDetailRank () {
            if(!(props.salesAnalysisViewItems && props.selectedProductId)) {
                return;
            }

            let prodRank = props.salesAnalysisViewItems.map((r, index) => {
                if(r.salesProductId === props.selectedProductId) {
                    return {
                        ...r,
                        optionRank: parseInt(index+1)
                    }
                }
            }).filter(r => r);

            setProdDetailRankList(prodRank);
        }

        getProdDetailRank();
    }, []);

    // Get product total sales unit & revenue.
    useEffect(() => {
        function getTotalSales() {
            if(!prodDetailRankList) {
                return;
            }

            let prodTotalSales = prodDetailRankList.map(r => {
                return {
                    ...r,
                    unit : r[props.selectedStoreInfoState?.storeSalesUnit],
                    revenue : r[props.selectedStoreInfoState?.storeSalesUnit] * r.salesOptionPrice
                }
            });
            
            let totalUnit = 0;
            let totalRevenue = 0;
            prodTotalSales.forEach(r => {
                totalUnit += r.unit;
                totalRevenue += r.revenue;
            });

            setProdTotalSales({
                totalUnit : totalUnit,
                totalRevenue : totalRevenue?.toLocaleString()
            });
        }

        getTotalSales();
    }, [prodDetailRankList]);

    return (
        <>
            <Container>
                <TitleContainer>
                    <GroupTitle>상품별 옵션랭킹 순위</GroupTitle>
                    <CloseBtn>
                        <CancelIcon type="button" sx={{ fontSize: 33 }}
                            onClick={() => props.close()}
                        />
                    </CloseBtn>
                </TitleContainer>
                <BodyContainer>
                    <ImageContainer>
                        {prodDetailRankList &&
                            <ImageWrapper>
                                <ImageBox>
                                    {prodDetailRankList[0].salesProdImageUrl ?
                                        <ImageEl src={prodDetailRankList[0]?.salesProdImageUrl} title={prodDetailRankList[0]?.imageFileName} />
                                        :
                                        <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                    }
                                </ImageBox>
                            </ImageWrapper>
                        }
                    </ImageContainer>
                    <BodyWrapper>
                        <HeaderContainer>
                            <ItemHeader>
                                <span>통합 순위</span>
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
                                <span>판매 수량</span>
                            </ItemHeader>
                            <ItemHeader>
                                <span>매출</span>
                            </ItemHeader>
                        </HeaderContainer>

                        {prodDetailRankList?.map((r, index) => {
                            return (
                                <ProdRankDetailInfo key={'prod-sales-analysis' + index}>
                                    <ItemData>
                                        <span>{r.optionRank} 위</span>
                                    </ItemData>
                                    <ItemData>
                                        <span>{r.salesProdDefaultName}</span>
                                    </ItemData>
                                    <ItemData>
                                        <span>{r.salesOptionDefaultName}</span>
                                    </ItemData>
                                    <ItemData>
                                        <span>{r.salesOptionCode}</span>
                                    </ItemData>
                                    <ItemData>
                                        <span>{r[props.selectedStoreInfoState?.storeSalesUnit]}</span>
                                    </ItemData>
                                    <ItemData>
                                        <span>{(r.salesOptionPrice * r[props.selectedStoreInfoState?.storeSalesUnit])?.toLocaleString()}원</span>
                                    </ItemData>
                                </ProdRankDetailInfo>
                            )
                        })}
                    </BodyWrapper>
                    <TotalInfoBox>
                        <TotalInfoText>수량 합계: {prodTotalSales?.totalUnit}</TotalInfoText>
                        <TotalInfoText>매출 합계: {prodTotalSales?.totalRevenue}원</TotalInfoText>
                    </TotalInfoBox>
                </BodyContainer>
            </Container>
        </>
    )
}

export default ProductDetailSalesAnalysisComponent;