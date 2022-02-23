import React, { useEffect, useReducer, useState } from "react";
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

const CombinedDeliveryTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
    color: #2C73D2;
    font-weight: 600;
`;

const PiaarCombinedDeliveryBoard = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <BoardTitle>
                        <span>'수령인+상품명+옵션명' 합배송 데이터</span>
                    </BoardTitle>
                    <BoardContainer>
                        {(props.viewHeaderDetailList?.viewHeaderDetail.details.length > 0) &&
                            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header xsmall-cell" scope="col">
                                            #
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header xsmall-cell" scope="col">
                                            <Checkbox
                                                size="small"
                                                color="primary"
                                                inputProps={{ 'aria-label': '주문 데이터 전체 선택' }}
                                            // onChange={() => releasedExcelControl().piaarReleasedStatusExcelData().checkAll()}
                                            // checked={releasedExcelControl().piaarReleasedStatusExcelData().isCheckedAll()}
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
                                    {props.unitCombinedDeliveryItemList?.map((group, combinedIdx) => {
                                        return (
                                            <React.Fragment key={'combined_delivery_excel' + combinedIdx}>
                                                {group.combinedDeliveryItems?.map((data, idx) => {
                                                    return (
                                                        <BodyTr
                                                            key={'combined_delivery_exel_data_idx' + idx}
                                                        >
                                                            {idx === 0 &&
                                                                <CombinedDeliveryTd className="col" rowSpan={group.combinedDeliveryItems.length}>
                                                                    {combinedIdx + 1}.
                                                                </CombinedDeliveryTd>
                                                            }
                                                            <BodyTd className="col">
                                                                <Checkbox
                                                                    color="default"
                                                                    size="small"
                                                                    inputProps={{ 'aria-label': '합배송 데이터 선택' }}
                                                                // onClick={() => releasedExcelControl().piaarReleasedStatusExcelData().checkOneLi(data.id)}
                                                                // checked={releasedExcelControl().piaarReleasedStatusExcelData().isChecked(data.id)}
                                                                />
                                                            </BodyTd>
                                                            {props.viewHeaderDetailList?.viewHeaderDetail.details.map((detailData, detailIdx) => {
                                                                return (
                                                                    <BodyTd key={'combined_delivery_excel_data_detail_idx' + detailIdx} className="col"
                                                                    // onClick={() => releasedExcelControl().piaarReleasedStatusExcelData().checkOneLi(data.id)}
                                                                    // checked={releasedExcelControl().piaarReleasedStatusExcelData().isChecked(data.id)}
                                                                    >
                                                                        <span>{data[detailData.matchedColumnName]}</span>
                                                                    </BodyTd>
                                                                )
                                                            })}
                                                        </BodyTr>
                                                    )
                                                })}
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </BoardContainer>
                </Container>
            }
        </>
    );
}
export default withRouter(PiaarCombinedDeliveryBoard);