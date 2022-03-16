import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import { dateToYYMMDD } from '../../handler/dateHandler';


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
    grid-template-columns: repeat(7, 10% 20% 20% 20% 10% 10% 10%);
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
    grid-template-columns: repeat(7, 10% 20% 20% 20% 10% 10% 10%);
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

const TitleGroup = styled.div`
    padding: 2% 5%;
    font-weight: 700;
    font-size: 1.2rem;
`;

const DateSelector = styled.button`
    margin: 3px;
    border-radius: 4px;
    background-color: rgb(0 64 255 / 20%);
    border: 1px solid transparent;
    text-align: center;
    float: right;
    width: 300px;
    display: inline;
    padding: 3px 0px;
    height: auto;
    font-weight: 400;
    transition: 0.25s;

    &:hover {
        background-color: rgb(0 64 255 / 40%);
    }

    @media only screen and (max-width:992px){
        width: 100%;
    }
`;

const DateSelectControl = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 13%);

    @media only screen and (max-width:992px){
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
    }
`;

const DateRangeBtn = styled.button`
    border: none;
    background-color: rgb(0 64 255 / 25%);
    padding: 3px 10px;
    margin: 3px;
    border-radius: 5px;
    transition: 0.25s;

    &:hover {
        background-color: rgb(0 64 255 / 40%);
    }
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
                        <DateSelector type="button" onClick={() => props.dateRangePickerControl().open()}><EventAvailableTwoToneIcon fontSize="small" color="action" /> 
                            {dateToYYMMDD(props.selectedDateRangeState?.startDate)} ~ {dateToYYMMDD(props.selectedDateRangeState?.endDate)}
                        </DateSelector>
                        <DateSelectControl>
                            <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, -1, 0)}>1개월</DateRangeBtn>
                            <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, -3, 0)}>3개월</DateRangeBtn>
                            <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, -6, 0)}>6개월</DateRangeBtn>
                            <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(-1, 0, 0)}>1년</DateRangeBtn>
                        </DateSelectControl>
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
                                    <span>네이버 판매 수량</span>
                                </ItemHeader>
                                <ItemHeader>
                                    <span>쿠팡 판매 수량</span>
                                </ItemHeader>
                                <ItemHeader>
                                    <span>총 판매 수량</span>
                                </ItemHeader>
                            </HeaderContainer>
                            {props.salesAnalysisItems?.map((r, index) => {
                                return (
                                    <div key={'sales-analysis-item' + index}>
                                        <ItemContainer>
                                            <ItemData>
                                                <span>{index + 1} 위</span>
                                            </ItemData>
                                            {/* <ImageWrapper>
                                                <ImageBox>
                                                    {r.salesProdImageUrl ?
                                                        <ImageEl src={r.salesProdImageUrl} title={r.imageFileName} />
                                                        :
                                                        <ImageEl src='/images/icon/no-image.jpg' title='no-image' />
                                                    }
                                                </ImageBox>
                                            </ImageWrapper> */}
                                            <ItemData className="">
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
                                            <ItemData>
                                                <span>{r.totalSalesUnit}</span>
                                            </ItemData>
                                        </ItemContainer>
                                    </div>
                                )
                            })}
                        </DataBody>
                    </DataContainer>
                </Container>
            }
        </>
    )
}

export default withRouter(SalesAnalysisBody);