import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    /* background-color: rgba(122, 123, 218, 0.125); */
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    margin-right: 20px;

    @media only screen and (max-width:992px){
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    width: 240px;
    padding: 10px;
    margin: 4px;
    color: white;
    text-align: center;
    vertical-align: middle;
    background-color: #2C73D2;
    border-radius: 20px;
    transition: opacity 0.1s linear;
    
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
    
    @media only screen and (max-width:992px){
        width: 100%;
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

const ControlBtn = styled.button`
    font-size: 16px;
    font-weight: 600;
    width: 240px;
    padding: 10px;
    margin: 4px;
    color: white;
    vertical-align: middle;
    background-color: #2C73D2;
    border-radius: 20px;
    border: none;
    transition: opacity 0.1s linear;

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

    @media only screen and (max-width:992px){
        width: 100%;
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
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    /* padding: 1%; */

    & .fiexed-header {
        position: sticky;
        top: -1px;
        background: #309FFF;
        color: white;
        z-index:10;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell{
        width: 500px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #efefef80;
`;

const PageControlBtn = styled.button`
    display: inline;
    margin-left: auto;
    font-size: 14px;
    vertical-align: middle;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: #2C73D2;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 12px;
    }
`;

const DeliveryReadyUploadPiaarBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container className="mt-3">
                    <UploadBar>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input">피아르 엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.uploadExcelDataControl(e)}/>
                        </Form>
                        <Form onSubmit={(e) => props.storeExcelDataControl(e)}>
                            <ControlBtn type="submit">피아르 엑셀 파일 저장</ControlBtn>
                        </Form>
                        <PageControlBtn type="button" onClick={() => props.moveViewPageControl()}>발주서 다운로드 <KeyboardArrowRightIcon /></PageControlBtn>
                    </UploadBar>
                    <TableContainer>
                        <table className="table table-sm" style={{tableLayout: 'fixed'}}>
                            <thead>
                            <tr>
                                {props.piaarExcelHeaderListState?.uploadDetail.details.map((data, index) => {
                                    return (
                                        <HeaderTh key={'piaar_excel_header_idx' + index} className="fiexed-header large-cell" scope="col">{data.cellValue}</HeaderTh>
                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                                {props.excelData?.map((rowData, rowIndex) => {
                                    return (
                                        <BodyTr key={'piaar_excel_data_row_idx' + rowIndex}>
                                            <BodyTd>{rowData.uniqueCode}</BodyTd>
                                            <BodyTd>{rowData.orderNumber1}</BodyTd>
                                            <BodyTd>{rowData.orderNumber2}</BodyTd>
                                            <BodyTd>{rowData.orderNumber3}</BodyTd>
                                            <BodyTd>{rowData.prodName}</BodyTd>
                                            <BodyTd>{rowData.optionName}</BodyTd>
                                            <BodyTd>{rowData.unit}</BodyTd>
                                            <BodyTd>{rowData.receiver}</BodyTd>
                                            <BodyTd>{rowData.receiverContact1}</BodyTd>
                                            <BodyTd>{rowData.receiverContact2}</BodyTd>
                                            <BodyTd>{rowData.destination}</BodyTd>
                                            <BodyTd>{rowData.zipCode}</BodyTd>
                                            <BodyTd>{rowData.transportType}</BodyTd>
                                            <BodyTd>{rowData.deliveryMessage}</BodyTd>
                                            <BodyTd>{rowData.prodUniqueNumber1}</BodyTd>
                                            <BodyTd>{rowData.prodUniqueNumber2}</BodyTd>
                                            <BodyTd>{rowData.optionUniqueNumber1}</BodyTd>
                                            <BodyTd>{rowData.optionUniqueNumber2}</BodyTd>
                                            <BodyTd>{rowData.prodCode}</BodyTd>
                                            <BodyTd>{rowData.optionCode}</BodyTd>
                                            <BodyTd>{rowData.managementMemo1}</BodyTd>
                                            <BodyTd>{rowData.managementMemo2}</BodyTd>
                                            <BodyTd>{rowData.managementMemo3}</BodyTd>
                                            <BodyTd>{rowData.managementMemo4}</BodyTd>
                                            <BodyTd>{rowData.managementMemo5}</BodyTd>
                                            <BodyTd>{rowData.managementMemo6}</BodyTd>
                                            <BodyTd>{rowData.managementMemo7}</BodyTd>
                                            <BodyTd>{rowData.managementMemo8}</BodyTd>
                                            <BodyTd>{rowData.managementMemo9}</BodyTd>
                                            <BodyTd>{rowData.managementMemo10}</BodyTd>
                                            <BodyTd>{rowData.managementMemo11}</BodyTd>
                                            <BodyTd>{rowData.managementMemo12}</BodyTd>
                                            <BodyTd>{rowData.managementMemo13}</BodyTd>
                                            <BodyTd>{rowData.managementMemo14}</BodyTd>
                                            <BodyTd>{rowData.managementMemo15}</BodyTd>
                                            <BodyTd>{rowData.managementMemo16}</BodyTd>
                                            <BodyTd>{rowData.managementMemo17}</BodyTd>
                                            <BodyTd>{rowData.managementMemo18}</BodyTd>
                                            <BodyTd>{rowData.managementMemo19}</BodyTd>
                                            <BodyTd>{rowData.managementMemo20}</BodyTd>
                                        </BodyTr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container>
            }
        </>
    );
}

export default DeliveryReadyUploadPiaarBody;