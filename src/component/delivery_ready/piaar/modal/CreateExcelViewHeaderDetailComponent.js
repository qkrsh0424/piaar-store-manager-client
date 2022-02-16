import styled, { css } from "styled-components";

import Checkbox from '@material-ui/core/Checkbox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Container = styled.div`
`;

const ItemContainer = styled.div`
    border-bottom: 1px solid #a6a6a6;
`;

const ItemWrapper = styled.div`
    border-radius: 5px;
    /* display: flex; */
    width: 100%;
    display: flex;
`;

const ItemHeaderWrapper = styled.div`
    padding: 20px;
    overflow: auto;
    width: 100%;
    height: 100%;
    vertical-align: middle;
`;

const GroupTitle = styled.span`
    font-size: 1.3rem;
    font-weight: 700;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const InfoText = styled.span`
    font-size: 14px;
    padding: 10px;
    color: #2C73D2;
    text-align: left;
    display: block;
`;

const BodyContainer = styled.div`
    padding: 10px 20px;
    padding-bottom: 50px;
    min-height: 70vh;
    max-height: 70vh;
    background:white;
    display: grid;
    align-items: center;
    row-gap: 0.5rem;
`;

const CreateContainer = styled.div`
    overflow: auto;
    border-radius: 5px;
    border: 1px solid #2C73D2;
    align-items: center;
    justify-content: center;
    min-height: 12vh;
    /* max-height: 13vh; */
`;

const CreateBtn = styled.button`
    background: #2C73D2;
    color: white;
    border:none;
    margin: 0 10px;
    /* float: right; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.4s;

    & .button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
        background: #309FFF
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);
        background: #7DC2FF;
    }
`;

const ResetBtn = styled.button`
    background: #2C73D2;
    color: white;
    border:none;
    margin: 0 10px;
    /* float: right; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.4s;

    & .button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
        background: #309FFF
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);
        background: #7DC2FF;
    }
`;

const DataInputEl = styled.input`
    width: 90%;
    padding: 10px;
    border: 1px solid #00000000;
    color: white;
    border-bottom: 1px solid #ced4da;
    text-align: center;
    font-weight: 700;
    background-color: #309FFF;

    &:focus{
        outline: none;
    }
`;

const IndexChangeBtn = styled.span`
    color: white;

    &:hover{
        transform: scale(1.2);
        cursor: pointer;
        color: #2C73D2;
    }

    &:active{
        transition: 0s;
        transform: scale(1.2);
        color: #7DC2FF;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 250px;
    font-weight: 500;
    border-right: 1px solid #eee;
    font-size: 14px;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    font-weight: 700;
    border-right: 1px solid #a7a7a720;
    cursor: pointer;
    font-size: 14px;

    ${(props) => props.checked ?
        css`
            /* background-color: #9bb6d150; */
            background-color: #309fff38;
        `
        :
        css`
            &:hover{
                background: #9bb6d125;
            }
        `
    }
`;

const CustomHeaderTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 250px;
    border-right: 1px solid #eee;
    background-color: #309FFF;
    font-size: 14px;
`;

const HeaderDataBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    place-items: center;
`;

const AllCheckBox = styled.div`
    text-align: left;
    padding: 0px 10px;
    font-weight: 600;
`;

const BodyWrapper = styled.div`
    overflow-x: hidden;
    text-align: center;
`;

const ControlBox = styled.div`
    float: right;
`;

const CreateExcelViewHeaderDetailComponent = (props) => {
    return (
        <>
            <Container>
                <form onSubmit={(e) => props.storeViewExcelFormControl(e)}>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>view 엑셀 양식 설정</GroupTitle>
                                <ControlBox>
                                    <ResetBtn onClick={(e) => props.resetViewExcelFormControl(e)}><ReplayIcon /></ResetBtn>
                                    <CreateBtn type='submit'><AddTaskIcon /></CreateBtn>
                                </ControlBox>
                            </ItemHeaderWrapper>
                        </ItemWrapper>
                    </ItemContainer>
                    <BodyContainer>
                        <BodyWrapper>
                            <InfoText>* 주문 현황에서 확인할 데이터 항목을 선택해주세요.</InfoText>
                            <AllCheckBox>
                                <span>전체 선택</span>
                                <Checkbox
                                    size="small"
                                    color="primary"
                                    inputProps={{ 'aria-label': '전체 미출고 데이터 선택' }}
                                    onChange={() => props.checkAllHeaderControl()} checked={props.isCheckedAllHeaderControl()}
                                />
                            </AllCheckBox>
                            <CreateContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0rem' }}>
                                    <thead>
                                        <tr>
                                            {props.piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <HeaderTh key={'piaar_view_excel_header_idx' + idx} className="large-cell" scope="col">
                                                        <Checkbox
                                                            color="default"
                                                            size="small"
                                                            inputProps={{ 'aria-label': '뷰 데이터 선택' }}
                                                            onClick={() => props.checkOneHeaderControl(data.cellNumber)}
                                                            checked={props.isCheckedHeaderControl(data.cellNumber)}
                                                        />
                                                    </HeaderTh>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        <tr height="45">
                                            {props.piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <BodyTd key={'view_excel_data_detail_idx' + idx}
                                                        onClick={() => props.checkOneHeaderControl(data.cellNumber)}
                                                        checked={props.isCheckedHeaderControl(data.cellNumber)}
                                                    >
                                                        <span>{idx + 1}. {data.cellValue}</span>
                                                    </BodyTd>
                                                )
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </CreateContainer>
                        </BodyWrapper>

                        <BodyWrapper>
                            <div><ArrowDownwardIcon /></div>
                        </BodyWrapper>
                        
                        <BodyWrapper>
                            <InfoText>* 선택한 양식의 헤더명과 순서를 변경할 수 있습니다.</InfoText>
                            <CreateContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0rem' }}>
                                    <thead>
                                        <tr>
                                            {props.createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <HeaderTh key={'piaar_origin_excel_header_idx' + idx} className="large-cell" scope="col">
                                                        기존 항목 번호 : {data.cellNumber + 1}
                                                    </HeaderTh>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        <tr height="60">
                                            {props.createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <CustomHeaderTd key={'custom_view_excel_data_detail_idx' + idx}>
                                                        <HeaderDataBox>
                                                            <IndexChangeBtn onClick={(e) => props.moveHeaderFormUpControl(e, data.id)}>
                                                                <ChevronLeftIcon />
                                                            </IndexChangeBtn>
                                                            <DataInputEl type="text" name='cellValue' placeholder='엑셀 항목명' onChange={(e) => props.onChangeInputHeaderDetailControl(e, data.id)} value={data.cellValue || ''} required></DataInputEl>
                                                            <IndexChangeBtn onClick={(e) => props.moveHeaderFormDownControl(e, data.id)}>
                                                                <ChevronRightIcon />
                                                            </IndexChangeBtn>
                                                        </HeaderDataBox>
                                                    </CustomHeaderTd>
                                                )
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </CreateContainer>
                        </BodyWrapper>
                    </BodyContainer>
                </form>
            </Container>
        </>
    )
}

export default CreateExcelViewHeaderDetailComponent;