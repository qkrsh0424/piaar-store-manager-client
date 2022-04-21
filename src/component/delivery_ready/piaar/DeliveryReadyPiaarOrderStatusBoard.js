import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
// import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';


const Container = styled.div`
    padding: 0 2%;
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

const DeliveryReadyPiaarOrderStatusBoard = (props) => {
    const userRdx = useSelector(state => state.user);

    const [checkedOrderStatusDataIdList, setCheckedOrderStatusDataIdList] = useState([]);
    const [orderStatusExcelList, setOrderStatusExcelList] = useState(null);

    useEffect(() => {
        function setOrderData() {
            let orderData = props.excelOrderList?.filter(rowData => rowData.soldYn === "n");
            
            setOrderStatusExcelList(orderData);
        }

        setOrderData();
    }, [props.excelOrderList]);

    const _checkAllOfOrderData = () => {
        if (_isCheckedAllOfOrderData()) {
            setCheckedOrderStatusDataIdList([]);
        } else {
            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id);

            setCheckedOrderStatusDataIdList(checkedIdList);
        }
    }

    const _isCheckedAllOfOrderData = () => {
        if (orderStatusExcelList?.length) {
            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id).sort();

            checkedOrderStatusDataIdList.sort();

            return JSON.stringify(checkedIdList) === JSON.stringify(checkedOrderStatusDataIdList);
        } else return false;
    }

    const _isCheckedOfOrderData = (dataId) => {
        return checkedOrderStatusDataIdList.includes(dataId);
    }

    const _checkOneOfOrderDataLi = (dataId) => {
        if (checkedOrderStatusDataIdList.includes(dataId)) {
            let checkedIdList = checkedOrderStatusDataIdList.filter(r => r !== dataId);
            setCheckedOrderStatusDataIdList(checkedIdList);
        } else {
            let checkedIdList = checkedOrderStatusDataIdList.concat(dataId);
            setCheckedOrderStatusDataIdList(checkedIdList);
        }
    }

    const _chageOrderDataToSold = async () => {
        if(!checkedOrderStatusDataIdList.length){
            alert('선택된 데이터가 없습니다.');
            return;
        } 

        let orderData = orderStatusExcelList?.filter(rowData => {
            if(checkedOrderStatusDataIdList.includes(rowData.id)){
                return {
                    ...rowData,
                    soldYn: "y"
                }
            }
        });

        setCheckedOrderStatusDataIdList([]);
        await props.changeOrderDataToSoldControl(orderData);
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
                                                    onChange={() => _checkAllOfOrderData()}
                                                    checked={_isCheckedAllOfOrderData()}
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
                                                            inputProps={{ 'aria-label': '주문 데이터 선택' }}
                                                            onClick={() => _checkOneOfOrderDataLi(data.id)}
                                                            checked={_isCheckedOfOrderData(data.id)}
                                                        />
                                                    </BodyTd>
                                                    {props.viewHeaderDetailList?.viewHeaderDetail.details.map((detailData, detailIdx) => {
                                                        return (
                                                            <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col"
                                                                onClick={() => _checkOneOfOrderDataLi(data.id)}
                                                                checked={_isCheckedOfOrderData(data.id)}
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
                            <ChangeBtn type="button" onClick={() => _chageOrderDataToSold()}>판매 처리</ChangeBtn>
                        </DataControlBox>
                </Container>
            }
        </>
    );
}
export default DeliveryReadyPiaarOrderStatusBoard;