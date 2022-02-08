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
    background-color: rgba(122, 123, 218, 0.125);
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    margin-right: 20px;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    width: 240px;
    padding: 6px;
    margin: 4px;
    color: #444;
    text-align: center;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    transition: opacity 0.1s linear;
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

const ControlBtn = styled.button`
    font-size: 16px;
    width: 240px;
    padding: 6px;
    margin: 4px;
    color: #444;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: none;
    transition: opacity 0.1s linear;
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
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    
    & .fiexed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
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
    color: #555;
    vertical-align: middle;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: rgba(122, 123, 218);
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
                            <ControlLabel htmlFor="upload-file-input"><b>피아르</b> 엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e)}/>
                        </Form>
                        <Form onSubmit={(e) => props.__handleEventControl().storeExcelData().submit(e)}>
                            <ControlBtn type="submit"><b>피아르</b> 엑셀 파일 저장</ControlBtn>
                        </Form>
                        <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().deliveryReadyView()}>발주서 다운로드 <KeyboardArrowRightIcon /></PageControlBtn>
                    </UploadBar>
                    <TableContainer>
                        <table className="table table-sm" style={{tableLayout: 'fixed' }}>
                            <thead>
                            <tr>
                                <HeaderTh className="fiexed-header" scope="col">피아르 고유번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">주문번호1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">주문번호2</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">주문번호3</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">상품명</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">옵션명</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수량</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인명</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">전화번호1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">전화번호2</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">주소</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">우편번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">배송방식</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">배송메세지</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">상품고유번호1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">상품고유번호2</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">옵션고유번호1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">옵션고유번호12</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">피아르 상품코드</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">피아르 옵션코드</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모2</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모3</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모4</HeaderTh>
                                <HeaderTh className="fiexed-headeㄱ" scope="col">관리메모5</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모6</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모7</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모8</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모9</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모10</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모11</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모12</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모13</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모14</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모15</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모16</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모17</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모18</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모19</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">관리메모20</HeaderTh>
                            </tr>
                        </thead>
                        <tbody>
                            {props.excelData?.map((data, index) => {
                                return (
                                    <BodyTr
                                        key={'subitem' + index}
                                    >
                                        <BodyTd className="col">{data.uniqueCode}</BodyTd>
                                        <BodyTd className="col">{data.orderNumber1}</BodyTd>
                                        <BodyTd className="col">{data.orderNumber2}</BodyTd>
                                        <BodyTd className="col">{data.orderNumber3}</BodyTd>
                                        <BodyTd className="col">{data.prodName}</BodyTd>
                                        <BodyTd className="col">{data.optionName}</BodyTd>
                                        <BodyTd className="col">{data.unit}</BodyTd>
                                        <BodyTd className="col">{data.receiver}</BodyTd>
                                        <BodyTd className="col">{data.receiverContact1}</BodyTd>
                                        <BodyTd className="col">{data.receiverContact2}</BodyTd>
                                        <BodyTd className="col">{data.destination}</BodyTd>
                                        <BodyTd className="col">{data.zipCode}</BodyTd>
                                        <BodyTd className="col">{data.transportType}</BodyTd>
                                        <BodyTd className="col">{data.deliveryMessage}</BodyTd>
                                        <BodyTd className="col">{data.prodUniqueNumber1}</BodyTd>
                                        <BodyTd className="col">{data.prodUniqueNumber2}</BodyTd>
                                        <BodyTd className="col">{data.optionUniqueNumber1}</BodyTd>
                                        <BodyTd className="col">{data.optionUniqueNumber2}</BodyTd>
                                        <BodyTd className="col">{data.prodCode}</BodyTd>
                                        <BodyTd className="col">{data.optionCode}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo1}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo2}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo3}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo4}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo5}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo6}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo7}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo8}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo9}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo10}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo11}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo12}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo13}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo14}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo15}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo16}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo17}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo18}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo19}</BodyTd>
                                        <BodyTd className="col">{data.managementMemo20}</BodyTd>


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