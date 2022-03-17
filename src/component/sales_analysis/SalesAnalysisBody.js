import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';


const Container = styled.div`
`;

const ItemContainer = styled.div`
	overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 10% 25% 20% 20% 10% 15%);
    align-items: center;
    border-bottom: 1px solid #eee;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }

    &:hover {
        background-color: #dce3f6;
    }
`;

const HeaderContainer = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 10% 25% 20% 20% 10% 15%);
    align-items: center;
    position: sticky;
    top: -1px;
    background: #e7e7e7;
    z-index:10;
    padding: 2px;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
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
    position: absolute;
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
    padding: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SalesAnalysisBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                        <DataBody>
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
                                    <span>판매 수익</span>
                                </ItemHeader>
                            </HeaderContainer>
                            {props.salesAnalysisViewItems?.map((r, index) => {
                                return (
                                    <div key={'sales-analysis-item' + index}>
                                        <ItemContainer>
                                            <ItemData>
                                                <span>{index + 1} 위</span>
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
                                                <span>{r[props.selectedStoreInfoState?.storeSalesUnit]}</span>
                                            </ItemData>
                                            <ItemData>
                                                <span>{(r.salesOptionPrice * r[props.selectedStoreInfoState?.storeSalesUnit]).toLocaleString()}원</span>
                                            </ItemData>
                                        </ItemContainer>
                                    </div>
                                )
                            })}
                        </DataBody>
                </Container>
            }
        </>
    )
}

export default withRouter(SalesAnalysisBody);