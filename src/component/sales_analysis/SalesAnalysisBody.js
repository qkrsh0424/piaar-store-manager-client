import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useState } from 'react';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SalesAnalysisCommonModal from './modal/SalesAnalysisCommonModal';
import ProductDetailSalesAnalysisComponent from './modal/ProductDetailSalesAnalysisComponent';

const Container = styled.div`
    padding-bottom: 6%;
`;

const ItemContainer = styled.div`
	overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 10% 25% 20% 20% 10% 15%);
    align-items: center;
    border-bottom: 1px solid #eee;
    transition: 0.15s;

    @media only screen and (max-width:576px){
        font-size: 10px;
    }

    &:hover {
        cursor: pointer;
        background-color: rgb(185 190 211 / 40%)
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

const RankIcon = styled.span`
    ${(props) => (props.rank === 1) &&
        css`
            color : #ffcb3f;
        ` 
        ||
        (props.rank === 2) &&
        css`
            color : #aaaaaa;
        `
        ||
        (props.rank === 3) &&
        css`
            color : #a5732a;
        `
    }
`;

const SalesAnalysisBody = (props) => {
    const userRdx = useSelector(state => state.user);

    const [productDetailSalesAnalysisModalOpen, setProductDetailSalesAnalysisModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const onSearchProductDetailSalesAnalysisModalOpen = (productId) => {
        setSelectedProductId(productId);
        setProductDetailSalesAnalysisModalOpen(true);
    }

    const onSearchProductDetailSalesAnalysisModalClose = () => {
        setProductDetailSalesAnalysisModalOpen(false);
    }

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
                                <span>매출</span>
                            </ItemHeader>
                        </HeaderContainer>
                        {props.salesAnalysisViewItems?.map((r, index) => {
                            return (
                                <ItemContainer key={'sales-analysis-item' + index} onClick={() => onSearchProductDetailSalesAnalysisModalOpen(r.salesProductId)}>
                                    <ItemData>
                                        <span>{index + 1} 위</span>
                                        {index < 3 && <RankIcon rank={index + 1}><MilitaryTechIcon /></RankIcon>}
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
                            )
                        })}
                    </DataBody>


                    <SalesAnalysisCommonModal
                        open={productDetailSalesAnalysisModalOpen}
                        onClose={() => onSearchProductDetailSalesAnalysisModalClose()}
                        maxWidth={'md'}
                        fullWidth={true}
                    >
                        <ProductDetailSalesAnalysisComponent
                            salesAnalysisViewItems={props.salesAnalysisViewItems}
                            selectedProductId={selectedProductId}
                            selectedStoreInfoState={props.selectedStoreInfoState}

                            close={() => onSearchProductDetailSalesAnalysisModalClose()}
                        ></ProductDetailSalesAnalysisComponent>
                    </SalesAnalysisCommonModal>
                </Container>
            }
        </>
    )
}

export default withRouter(SalesAnalysisBody);