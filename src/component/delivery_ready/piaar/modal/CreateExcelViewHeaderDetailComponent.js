import styled from "styled-components";

import Checkbox from '@material-ui/core/Checkbox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Container = styled.div`
`;

const ItemContainer = styled.div`
`;

const ItemWrapper = styled.div`
    border-radius: 5px;
`;

const ItemHeaderWrapper = styled.div`
    align-items: center;
    padding: 20px;
    padding-bottom: 10px;
    overflow: auto;
    display: grid;
    grid-template-columns: 90% 5% 5%;
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const InfoText = styled.span`
    font-size: 14px;
    padding: 20px;
    color: #2C73D2;
`;

const BodyContainer = styled.div`
    padding: 20px 15px;
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
    background:white;
    overflow-x: hidden;
    display: grid;
    grid-template-rows: 10% 30% 10% 20%;
    row-gap: 30px;
    
`;

const ArrowBox = styled.div`
    text-align: center;
`;

const CreateContainer = styled.div`
    overflow: auto;
    border-radius: 5px;
    border: 1px solid #2C73D2;
    align-items: center;
    justify-content: center;
`;

const CreateBtn = styled.button`
    background: #2C73D2;
    color: white;
    border:none;
    margin: 0 auto;
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

const DeleteBtn = styled.span`
    position: absolute;
    left: 100px;
    top: -4px;
    transition: 0.1s;
    color: #ffffff;

    &:hover{
        transform: scale(1.05);
        cursor: pointer;
        color: #ff6565;

    }

    &:active{
        transform: scale(1.05);
        color: red;
    }
`;

const IndexChangeBtn = styled.span`
    color: white;

    &:hover{
        transform: scale(1.2);
        cursor: pointer;
        color: #309FFF;
    }

    &:active{
        transition: 0s;
        transform: scale(1.2);
        color: #7DC2FF;
    }
`;

const HeaderControlBox = styled.div`
    /* position: relative;
    display: inline; */
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 250px;
    border-right: 1px solid #eee;
`;

const HeaderForm = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 250px;
    border-right: 1px solid #eee;
    background-color: #309FFF;
    color: white;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const CustomHeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 250px;
    border-right: 1px solid #eee;
    background-color: #309FFF;
`;

const HeaderDataBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    place-items: center;
`;

const AllCheckBox = styled.div`
    text-align: left;
    padding: 10px;
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
                                <CreateBtn onClick={(e) => props.resetViewExcelFormControl(e)}><ReplayIcon /></CreateBtn>
                                <CreateBtn type='submit'><AddTaskIcon /></CreateBtn>
                            </ItemHeaderWrapper>
                            <InfoText>* 주문 현황에서 확인할 데이터 항목을 설정해주세요.</InfoText>
                        </ItemWrapper>
                    </ItemContainer>
                    <BodyContainer>
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
                            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                    <tr>
                                        {props.piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
                                            return (
                                                <HeaderTh key={'piaar_view_excel_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                    <Checkbox
                                                        color="default"
                                                        size="small"
                                                        inputProps={{ 'aria-label': '뷰 데이터 선택' }}
                                                        onClick={() => props.checkOneHeaderControl(data.id)}
                                                        checked={props.isCheckedHeaderControl(data.id)}
                                                    />
                                                </HeaderTh>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody style={{ border: 'none' }}>
                                    {props.piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
                                        return (
                                            <BodyTd key={'view_excel_data_detail_idx' + idx}>
                                                <span>{idx + 1}. {data.cellValue}</span>
                                            </BodyTd>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </CreateContainer>
                        <ArrowBox>
                            <ArrowDownwardIcon />
                        </ArrowBox>
                        <CreateContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                    {props.createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
                                        return (
                                            <CustomHeaderTh key={'view_excel_data_detail_idx' + idx}>
                                                <HeaderDataBox>
                                                    <IndexChangeBtn onClick={(e) => props.moveHeaderFormUpControl(e, data.id)}>
                                                        <ChevronLeftIcon />
                                                    </IndexChangeBtn>
                                                    <DataInputEl type="text" name='cellValue' placeholder='엑셀 항목명' onChange={(e) => props.onChangeInputHeaderDetailControl(e, data.id)} value={data.cellValue || ''} required></DataInputEl>
                                                    <IndexChangeBtn onClick={(e) => props.moveHeaderFormDownControl(e, data.id)}>
                                                        <ChevronRightIcon />
                                                    </IndexChangeBtn>
                                                </HeaderDataBox>
                                            </CustomHeaderTh>
                                        )
                                    })}
                                </thead>
                                <tbody></tbody>
                            </table>
                        </CreateContainer>
                    </BodyContainer>
                </form>
            </Container>
        </>
    )
}

export default CreateExcelViewHeaderDetailComponent;