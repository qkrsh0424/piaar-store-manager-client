import styled from "styled-components";
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';

const Container = styled.div`
`;

const ItemContainer = styled.div`
`;

const ItemWrapper = styled.div`
    /* background:white; */
    border-radius: 5px;
`;

const ItemHeaderWrapper = styled.div`
    align-items: center;
    padding: 20px;
    overflow: auto;
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
`;

const GroupTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    /* padding:15px; */

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const InfoText = styled.span`
    font-size: 14px;
    padding: 20px;
    color: #2C73D2;
`;

const DataText = styled.div`
    font-size: 1rem;
    font-weight: 500;
    display: grid;
    grid-template-columns: 1fr 1fr 5fr;
    border: 1px solid #609FFF;
    padding: 2%;
    background-color: white;
    border-radius: 30px;
    align-items: center;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const BodyContainer = styled.div`
    padding: 10px;
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
    /* background-color: #7DC2FF; */
    background:white;
    overflow-x: hidden;
`;

const CreateHeaderInfo = styled.div`
    display: grid;
    grid-template-columns: 90% 5%;
    column-gap: 10px;
    padding: 3px 10px;
    text-align: center;
    align-items: center;
`;

const CreateContainer = styled.div`
    /* background-color: #7DC2FF88; */
    height: 45vh;
    overflow: auto;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #2C73D2;
    /* background-color: #7DC2FF; */
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
    border-bottom: 1px solid #ced4da;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const DeleteBox = styled.div`
    text-align: right;
    width: 100%;
`;

const DeleteBtn = styled.span`
    color: #2C73D2;
    margin-bottom: 5px;
    transition: 0.2s;

    &:hover{
        transform: scale(1.1);
        cursor: pointer;
        color: #309FFF;

    }

    &:active{
        transform: scale(1.05);

        color: #7DC2FF;
    }
`;

const IndexChangeBtn = styled.div`
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

const CreateExcelViewHeaderDetailComponent = (props) => {
    return (
        <>
            <Container>
                <form onSubmit={(e) => props.storeViewExcelFormControl(e)}>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>엑셀 양식 저장</GroupTitle>
                                <CreateBtn onClick={(e) => props.resetViewExcelFormControl(e)}><ReplayIcon /></CreateBtn>
                                <CreateBtn type='submit'><AddTaskIcon /></CreateBtn>
                                {/* TODO :: 초기화버튼 생성해야 함 */}
                            </ItemHeaderWrapper>
                            <InfoText>* 주문 현황에서 확인할 데이터를 설정해주세요.</InfoText>
                        </ItemWrapper>
                    </ItemContainer>
                    <BodyContainer>
                        <CreateContainer>
                            {props.createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
                                return (
                                    <CreateHeaderInfo key={'create_view_header_detail_idx' + idx} className="input-group mb-3">
                                        <DataText>
                                            <div>
                                                <IndexChangeBtn onClick={(e) => props.moveHeaderFormUpControl(e, data.id)}>
                                                    <ExpandLessIcon />
                                                </IndexChangeBtn>
                                                <IndexChangeBtn onClick={(e) => props.moveHeaderFormDownControl(e, data.id)}>
                                                    <ExpandMoreIcon />
                                                </IndexChangeBtn>
                                            </div>
                                            <span>{idx + 1}.</span>
                                            <DataInputEl type="text" name='cellValue' placeholder='엑셀 항목명' onChange={(e) => props.onChangeInputHeaderDetailControl(e, data.id)} value={data.cellValue || ''} required></DataInputEl>
                                        </DataText>
                                        <DeleteBox>
                                            <DeleteBtn>
                                                <CancelIcon type="button" sx={{ fontSize: 33 }}
                                                    onClick={(e) => props.deleteCellControl(e, data.id)}
                                                />
                                            </DeleteBtn>
                                        </DeleteBox>
                                    </CreateHeaderInfo>
                                )
                            })}
                        </CreateContainer>
                    </BodyContainer>
                </form>
            </Container>
        </>
    )
}

export default CreateExcelViewHeaderDetailComponent;