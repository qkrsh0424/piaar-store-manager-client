import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const DataContainer = styled.div`
    padding-bottom: 50px;
    height:auto;
    background-color: rgba(122, 123, 218, 0.125);

    & .fixed-header {
        position: sticky;
        top: -1px;
        z-index:10;
        background-color: #f3f3f3;
    }
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const Form = styled.form`
    display: inline;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const DownloadBtn = styled.button`
    font-size: 16px;
    padding: 6px;
    margin: 4px;
    color: #444;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: none;
    transition: opacity 0.1s linear;
    padding: 7px 25px;
    background-color: rgba(132,149,201,0.7);
    color: white;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    padding: 7px 25px;
    margin: 4px;
    text-align: center;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    transition: opacity 0.1s linear;
    background-color: rgb(178, 179, 221);

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const Input = styled.input`
    font-size: 20px;
    width: 100%;
    display: none;
`;

const TableContainer = styled.div`
    margin: 0 20px;
    height: 50vh;
	overflow: hidden;
    font-size: 14px;
    
    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }
    
    & .small-cell {
        width: 50px;
        padding: 0;
    }

    & .medium-cell {
        width:90px;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

     & .changeable-cell {
        background-color: #eaeaea;
     }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const BoardContainer = styled.div`
    height: 80%;
    margin-bottom: 10px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;
`;

const BoardTitle = styled.div`
    font-size: large;
    color: rgba(000, 102, 153, 0.9);
    display: inline-block;
    width: 100%;
    padding: 20px 30px;

    @media only screen and (max-width:576px){
        font-size: 16px;
    }
    
    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
    border-bottom: 1px solid #a7a7a740;

    transition: opacity 0.2s linear;

    & .changeable-info {
        &:hover{
            opacity: 0.8;
            cursor: pointer;
            background-color: #9bb6d170;
        }
    }
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const DataLen = styled.span`
    font-size: 13px;
    margin: 0 15px;
    color: rgba(000, 102, 153, 0.9);
`;

const OrderRegistrationNaverBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <DataContainer>
                    <BoardTitle>
                        <span><b>네이버 대량 등록 엑셀 다운로드</b></span>
                    </BoardTitle>
                    <TableContainer>
                        <UploadBar>
                            <div>
                                <Form>
                                    <ControlLabel htmlFor="hansan-upload">한산 엑셀 업로드</ControlLabel>
                                    <Input id="hansan-upload" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().hansanExcelList().upload(e)} />
                                </Form>
                                <DataLen>[ 항목 : {props.orderRegistrationHansanList ? props.orderRegistrationHansanList.length : 0}개 ]</DataLen>
                            </div>
                            <div>
                                <Form onSubmit={(e) => props.__handleEventControl().hansanExcelList().download(e)}>
                                    <DownloadBtn type="submit">한산-네이버 발주등록 다운</DownloadBtn>
                                </Form>
                            </div>
                        </UploadBar>
                        <BoardContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>수령인</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>옵션명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header small-cell" scope="col">
                                            <span>수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>송장번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>옵션관리코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>상품주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>총 상품주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>플랫폼명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header changeable-cell" scope="col">
                                            <span>배송방식</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header changeable-cell" scope="col">
                                            <span>택배사</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header xlarge-cell" scope="col">
                                            <span>주소</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>전화번호</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.orderRegistrationHansanList?.map((data, hansanDataIdx) => {
                                        return (
                                            <BodyTr
                                                key={'hansanExcelList' + hansanDataIdx}
                                            >
                                                <BodyTd className="col">
                                                    <span>{data.receiver}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionInfo}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.unit}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.transportNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.orderNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionManagementCode}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodOrderNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.allProdOrderNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.platformName}</span>
                                                </BodyTd>
                                                <BodyTd className="col changeable-info" 
                                                    onClick={(e) => props.__handleEventControl().orderRegistrationInfo().open(e, data)}
                                                    >
                                                    <span>{data.transportType}</span>
                                                </BodyTd>
                                                <BodyTd className="col changeable-info" 
                                                    onClick={(e) => props.__handleEventControl().orderRegistrationInfo().open(e, data)}
                                                    >
                                                    <span>{data.deliveryService}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.destination}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.receiverContact1}</span>
                                                </BodyTd>
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </BoardContainer>
                    </TableContainer>

                    <TableContainer>
                        <UploadBar>
                            <div>
                                <Form>
                                    <ControlLabel htmlFor="received-tailo-upload">테일로 엑셀 업로드</ControlLabel>
                                    <Input id="received-tailo-upload" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().tailoExcelList().upload(e)} />
                                </Form>
                                <DataLen>[ 항목 : {props.orderRegistrationTailoList ? props.orderRegistrationTailoList.length : 0}개 ]</DataLen>
                            </div>
                            <div>
                                <Form onSubmit={(e) => props.__handleEventControl().tailoExcelList().download(e)}>
                                    <DownloadBtn type="submit">테일로-네이버 발주등록 다운</DownloadBtn>
                                </Form>
                            </div>
                        </UploadBar>
                        <BoardContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>수령인</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>노스노스 고유코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>상품상세</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header small-cell" scope="col">
                                            <span>수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>송장번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>상품별메모1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>상품별메모3</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>관리메모3</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header changeable-cell" scope="col">
                                            <span>배송방식</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header changeable-cell" scope="col">
                                            <span>택배사</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header xlarge-cell" scope="col">
                                            <span>주소</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>전화번호</span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.orderRegistrationTailoList?.map((data, tailoDataIdx) => {
                                        return (
                                            <BodyTr
                                                key={'tailoExcelList' + tailoDataIdx}
                                            >
                                                <BodyTd className="col">
                                                    <span>{data.receiver}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodUniqueCode}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.salesProdName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.unit}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.transportNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.orderNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodMemo1}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodMemo3}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.managementMemo3}</span>
                                                </BodyTd>
                                                <BodyTd className="col changeable-info" onClick={(e) => props.__handleEventControl().orderRegistrationInfo().open(e, data)}>
                                                    <span>{data.transportType}</span>
                                                </BodyTd>
                                                <BodyTd className="col changeable-info" onClick={(e) => props.__handleEventControl().orderRegistrationInfo().open(e, data)}>
                                                    <span>{data.deliveryService}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.destination1}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.receiverContact1}</span>
                                                </BodyTd>
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </BoardContainer>
                    </TableContainer>
                </DataContainer>
            }
        </>
    )
}

export default OrderRegistrationNaverBody;