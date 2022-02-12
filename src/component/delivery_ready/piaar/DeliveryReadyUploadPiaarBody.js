import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

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
                                {props.piaarCustomizedHeaderListState?.map((data, index) => {
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
                                            {rowData.uploadDetail?.details.map((data, index) => {
                                                return (
                                                    <BodyTd key={'piaar_excel_data_idx' + index} className="col">{data.cellValue}</BodyTd>
                                                )
                                            })}
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