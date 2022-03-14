import React, { useEffect, useState } from "react";

import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';

const Container = styled.div`
    padding: 0 2%;
`;

const BoardTitle = styled.div`
    font-size: 20px;
    /* color: rgba(000, 102, 153, 0.9); */
    font-weight: 700;
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: center;
    padding: 20px 10px;

    @media only screen and (max-width: 992px){
        grid-template-columns: 1fr;
        row-gap: 10px;
    }
    
    @media only screen and (max-width:576px){
        font-size: 16px;
    }

    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const DataOptionBox = styled.span`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 10px;

    & .upload-header-excel-download {
        background: #609FFF;;
        border: 1px solid #7DC2FF;

        &:hover{
            cursor: pointer;
            transition: 0.2s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        &:disabled{
            background: #d3d3d388;
            cursor: not-allowed;
            border: none;
        }
    }

    @media only screen and (max-width: 992px) {
        padding: 1% 0%;
        column-gap: 20px;
    }
`;

const HeaderFormControlBtn = styled.button`
    padding: 10px;
    background:  #2C73D2;;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border:1px solid  #7DC2FF;;
    border-radius: 20px;
    float: right;
    width: 240px;
    border: none;


    @media only screen and (max-width: 992px){
        display: inline-block;
        padding: 4px;
        width: 100%;
    }

    @media only screen and (max-width:576px ){
        padding: 0;
    }

    &:hover{
        cursor: pointer;
        transition: 0.2s;
        transform: scale(1.05);
        background: #7DC2FF;
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);
    }
`;

const BoardContainer = styled.div`
    min-height: 60vh;
    max-height: 60px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 1px 1px 10px #a9b3d599;
    /* border: 2px solid #2C73D2; */

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #309FFF;
        color: white;
        /* border-bottom: 2px solid #2C73D2;
        border-right: 2px solid #2C73D2; */
        z-index:10;
        padding: 2px;
        font-size: 16px;

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    & .xsmall-cell {
        width: 50px;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #eee;
`;

const BodyTr = styled.tr`
    border-bottom: 1px solid #a7a7a740;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const DataControlBox = styled.div`
    width: 100%;
    display: grid;
    padding: 2% 0;
`;

const ChangeBtn = styled.button`
    border-radius: 5px;
    color: white;
    font-weight: 600;
    background-color: #2C73D2;
    border: 1px solid #2C73D2;
    padding: 0.5% 0;
    width:calc(50% - 100px);
`;


const DeliveryReadyPiaarReleasedStatusBoard = (props) => {
    const userRdx = useSelector(state => state.user);

    const [checkedReleasedStatusDataIdList, setCheckedReleasedStatusDataIdList] = useState([]);
    const [orderStatusExcelList, setOrderStatusExcelList] = useState(null);


    useEffect(() => {
        function setOrderData() {
            let orderData = props.excelOrderList?.filter(rowData => rowData.releasedYn === "y");
            
            setOrderStatusExcelList(orderData);
        }

        setOrderData();
    }, [props.excelOrderList]);

    const _checkAllOfReleasedData = () => {
        if (_isCheckedAllOfReleasedData()) {
            setCheckedReleasedStatusDataIdList([]);
        } else {
            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id);

            setCheckedReleasedStatusDataIdList(checkedIdList);
        }
    }

    const _isCheckedAllOfReleasedData = () => {
        if (orderStatusExcelList?.length) {
            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id).sort();

            checkedReleasedStatusDataIdList.sort();

            return JSON.stringify(checkedIdList) === JSON.stringify(checkedReleasedStatusDataIdList);
        } else return false;
    }

    const _isCheckedOfReleasedData = (dataId) => {
        return checkedReleasedStatusDataIdList.includes(dataId);
    }

    const _checkOneLiOfReleasedData = (dataId) => {
        if (checkedReleasedStatusDataIdList.includes(dataId)) {
            let checkedIdList = checkedReleasedStatusDataIdList.filter(r => r !== dataId);
            setCheckedReleasedStatusDataIdList(checkedIdList);
        } else {
            let checkedIdList = checkedReleasedStatusDataIdList.concat(dataId);
            setCheckedReleasedStatusDataIdList(checkedIdList);
        }
    }

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <BoardContainer>
                        {(props.viewHeaderDetailList?.viewHeaderDetail.details.length > 0) &&
                            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header xsmall-cell" scope="col">
                                            <Checkbox
                                                size="small"
                                                color="primary"
                                                inputProps={{ 'aria-label': '주문 데이터 전체 선택' }}
                                                onChange={() => _checkAllOfReleasedData()}
                                                checked={_isCheckedAllOfReleasedData()}
                                            />
                                        </HeaderTh>
                                        {props.viewHeaderDetailList?.viewHeaderDetail.details.map((data, idx) => {
                                            return (
                                                <HeaderTh key={'piaar_excel_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                    <span>{data.cellValue}</span>
                                                </HeaderTh>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody style={{ border: 'none' }}>

                                    {orderStatusExcelList?.map((data, idx) => {
                                        return (
                                            <BodyTr
                                                key={'upload_exel_data_idx' + idx}
                                            >
                                                <BodyTd className="col">
                                                    <Checkbox
                                                        color="default"
                                                        size="small"
                                                        inputProps={{ 'aria-label': '출고 데이터 선택' }}
                                                        onClick={() => _checkOneLiOfReleasedData(data.id)}
                                                        checked={_isCheckedOfReleasedData(data.id)}
                                                    />
                                                </BodyTd>
                                                {props.viewHeaderDetailList?.viewHeaderDetail.details.map((detailData, detailIdx) => {
                                                    return (
                                                        <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col"
                                                            onClick={() => _checkOneLiOfReleasedData(data.id)}
                                                            checked={_isCheckedOfReleasedData(data.id)}
                                                        >
                                                            <span>{data[detailData.matchedColumnName]}</span>
                                                        </BodyTd>
                                                    )
                                                })}
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </BoardContainer>
                    
                    <DataControlBox>
                        <ChangeBtn type="button" onClick={() => props._onCreateCombinedColumnModalOpen(checkedReleasedStatusDataIdList)}>합배송 처리</ChangeBtn>
                    </DataControlBox>
                </Container>
            }
        </>
    );
}
export default withRouter(DeliveryReadyPiaarReleasedStatusBoard);