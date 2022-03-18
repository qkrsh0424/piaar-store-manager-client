import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import { dateToYYMMDD } from '../../handler/dateHandler';


const Container = styled.div`
`;

const DataContainer = styled.div`
	overflow: hidden;

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

const TitleGroup = styled.div`
    padding-top: 2%;
    font-weight: 700;
    font-size: 1.2rem;
`;

const DateSelector = styled.button`
    border-radius: 4px;
    /* background-color: rgb(0 64 255 / 20%); */
    background-color: rgb(185 190 211);
    border: 1px solid transparent;
    text-align: center;
    width: 300px;
    display: inline;
    padding: 3px;
    height: auto;
    font-weight: 400;
    transition: 0.25s;

    &:hover {
        background-color: rgb(185 190 211 / 40%);
    }

    @media only screen and (max-width:992px){
        width: 100%;
        margin: 3px;
    }
`;

const DateSelectControl = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 80px);
    float: right;

    @media only screen and (max-width:992px){
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
    }
`;

const DataControlBox = styled.div`
    display: inline;
`;

const DateRangeBtn = styled.button`
    border: 1px solid transparent;
    /* background-color: rgb(0 64 255 / 20%); */
    background-color: rgb(185 190 211);
    padding: 3px 10px;
    margin: 2px;
    border-radius: 4px;
    transition: 0.25s;

    &:hover {
        background-color: rgb(185 190 211 / 40%);
    }

    &:active {
        background-color: rgb(185 190 211 / 60%);
    }
`;

const SelectMenu = styled.select`
    padding: 5px 0px;
    border: 1px solid #e1e1e1;
    text-align: center;
    display: inline-block;
    transition: 0.25s;

    &:focus{
        outline: none;
    }

    @media only screen and (max-width: 992px) {
        width: 100%;
    }
`;

const SelectGroupTitle = styled.div`
    padding: 3px;
    font-weight: 600;
    font-size: 1.1rem;
`;

const SelectGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    padding: 3px;

    @media only screen and (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

const SelectWrappper = styled.div`
    padding: 30px 0;
`;

const SalesAnalysisDataControlBar = (props) => {
    return (
        <Container>
            <TitleGroup>
                <div>피아르 판매 랭킹</div>
            </TitleGroup>
            <DataContainer>
                <div>
                    <SelectWrappper>
                        <SelectGroupTitle>랭킹 기준 설정</SelectGroupTitle>
                        <SelectGroup>
                            {/* 스토어 select */}
                            <SelectMenu onChange={(e) => props.storeDropdownControl().onChangeStoreValue(e)}>
                                <option value='total'>스토어 전체</option>
                                <option value='naver'>네이버</option>
                                <option value='coupang'>쿠팡</option>
                            </SelectMenu>

                            {/* 카테고리 select */}
                            <SelectMenu onChange={(e) => props.storeDropdownControl().onChangeCategoryValue(e)}>
                                <option value='total'>카테고리 전체</option>
                                {props.productCategoryList?.map((r, idx) => {
                                    return (
                                        <option key={'analysis-product-cateogry-idx' + idx} name='categoryName' value={r.name}>{r.name}</option>
                                    )
                                })}
                            </SelectMenu>

                            {/* 랭킹 기준 select */}
                            <SelectMenu onChange={(e) => props.storeDropdownControl().onChangeCriterionValue(e)}>
                                <option value='unit'>수량</option>
                                <option value='revenue'>수익</option>
                            </SelectMenu>
                        </SelectGroup>
                    </SelectWrappper>
                    <DataControlBox>
                        <DateSelector type="button" onClick={() => props.dateRangePickerControl().open()}><EventAvailableTwoToneIcon fontSize="small" color="action" />
                            {dateToYYMMDD(props.selectedDateRangeState?.startDate)} ~ {dateToYYMMDD(props.selectedDateRangeState?.endDate)}
                        </DateSelector>
                    </DataControlBox>
                    <DateSelectControl>
                        <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, 0, -3)}>3일</DateRangeBtn>
                        <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, 0, -7)}>1주</DateRangeBtn>
                        <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, 0, -14)}>2주</DateRangeBtn>
                        <DateRangeBtn type="button" onClick={() => props.dateRangePickerControl().setSelectedPeriod(0, -1, 0)}>한달</DateRangeBtn>
                    </DateSelectControl>
                </div>
            </DataContainer>
        </Container>
    )
}

export default withRouter(SalesAnalysisDataControlBar);