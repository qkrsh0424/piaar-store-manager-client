import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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

class DeliveryReadyPiaarHeader {
    constructor() {
        this.id = uuidv4();
        this.viewHeaderDetail = {
            details: []
        };
    }

    toJSON() {
        return {
            id: this.id,
            viewHeaderDetail: this.viewHeaderDetail
        }
    }
}

const piaarDefaultHeaderList = [
    {
        "cellNumber" : 0,
        "cellValue" : "피아르 고유번호",
        "matchedColumnName" : "uniqueCode",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 1,
        "cellValue" : "주문번호1",
        "matchedColumnName" : "orderNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 2,
        "cellValue" : "주문번호2",
        "matchedColumnName" : "orderNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 3,
        "cellValue" : "주문번호3",
        "matchedColumnName" : "orderNumber3",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 4,
        "cellValue" : "상품명",
        "matchedColumnName" : "prodName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 5,
        "cellValue" : "옵션명",
        "matchedColumnName" : "optionName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 6,
        "cellValue" : "수량",
        "matchedColumnName" : "unit",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 7,
        "cellValue" : "수취인명",
        "matchedColumnName" : "receiver",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 8,
        "cellValue" : "전화번호1",
        "matchedColumnName" : "receiverContact1",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 9,
        "cellValue" : "전화번호2",
        "matchedColumnName" : "receiverContact2",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 10,
        "cellValue" : "주소",
        "matchedColumnName" : "destination",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 11,
        "cellValue" : "우편번호",
        "matchedColumnName" : "zipCode",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 12,
        "cellValue" : "배송방식",
        "matchedColumnName" : "transportType",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 13,
        "cellValue" : "배송메세지",
        "matchedColumnName" : "deliveryMessage",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 14,
        "cellValue" : "상품고유번호1",
        "matchedColumnName" : "prodUniqueNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 15,
        "cellValue" : "상품고유번호2",
        "matchedColumnName" : "prodUniqueNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 16,
        "cellValue" : "옵션고유번호1",
        "matchedColumnName" : "optionUniqueNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 17,
        "cellValue" : "옵션고유번호2",
        "matchedColumnName" : "optionUniqueNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 18,
        "cellValue" : "피아르 상품코드",
        "matchedColumnName" : "prodCode",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 19,
        "cellValue" : "피아르 옵션코드",
        "matchedColumnName" : "optionCode",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 20,
        "cellValue" : "관리메모1",
        "matchedColumnName" : "managementMemo1",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 21,
        "cellValue" : "관리메모2",
        "matchedColumnName" : "managementMemo2",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 22,
        "cellValue" : "관리메모3",
        "matchedColumnName" : "managementMemo3",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 23,
        "cellValue" : "관리메모4",
        "matchedColumnName" : "managementMemo4",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 24,
        "cellValue" : "관리메모5",
        "matchedColumnName" : "managementMemo5",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 25,
        "cellValue" : "관리메모6",
        "matchedColumnName" : "managementMemo6",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 26,
        "cellValue" : "관리메모7",
        "matchedColumnName" : "managementMemo7",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 27,
        "cellValue" : "관리메모8",
        "matchedColumnName" : "managementMemo8",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 28,
        "cellValue" : "관리메모9",
        "matchedColumnName" : "managementMemo9",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 29,
        "cellValue" : "관리메모10",
        "matchedColumnName" : "managementMemo10",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 30,
        "cellValue" : "관리메모11",
        "matchedColumnName" : "managementMemo11",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 31,
        "cellValue" : "관리메모12",
        "matchedColumnName" : "managementMemo12",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 32,
        "cellValue" : "관리메모13",
        "matchedColumnName" : "managementMemo13",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 33,
        "cellValue" : "관리메모14",
        "matchedColumnName" : "managementMemo14",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 34,
        "cellValue" : "관리메모15",
        "matchedColumnName" : "managementMemo15",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 35,
        "cellValue" : "관리메모16",
        "matchedColumnName" : "managementMemo16",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 36,
        "cellValue" : "관리메모17",
        "matchedColumnName" : "managementMemo17",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 37,
        "cellValue" : "관리메모18",
        "matchedColumnName" : "managementMemo18",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 38,
        "cellValue" : "관리메모19",
        "matchedColumnName" : "managementMemo19",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 39,
        "cellValue" : "관리메모20",
        "matchedColumnName" : "managementMemo20",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 40,
        "cellValue" : "*카테고리명",
        "matchedColumnName" : "categoryName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 41,
        "cellValue" : "*상품명",
        "matchedColumnName" : "prodDefaultName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 42,
        "cellValue" : "*상품관리명",
        "matchedColumnName" : "prodManagementName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 43,
        "cellValue" : "*옵션명",
        "matchedColumnName" : "optionDefaultName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 44,
        "cellValue" : "*옵션관리명",
        "matchedColumnName" : "optionManagementName",
        "mergeYn": "n"
    },
    {
        "cellNumber" : 45,
        "cellValue" : "*재고수량",
        "matchedColumnName" : "optionStockUnit",
        "mergeYn": "n"
    }
];

const initialCreateViewHeaderDetailState = null;

const createViewHeaderDetailStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return {...action.payload};
        case 'SET_HEADER_DETAIL_DATA':
            return {
                ...state,
                viewHeaderDetail: {
                    ...state.viewHeaderDetail,
                    details: action.payload
                }
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const CreateExcelViewHeaderDetailComponent = (props) => {
    const [createViewHeaderDetailState, dispatchCreateViewHeaderDetailState] = useReducer(createViewHeaderDetailStateReducer, initialCreateViewHeaderDetailState);
    const [checkedViewHeaderCellNumberList, setCheckedViewHeaderCellNumberList] = useState([]);

    useEffect(() => {
        function getViewHeader() {
            // 저장된 view header가 없다면 default값을 넣자
            if (!piaarDefaultHeaderList) {
                return;
            }

            if (!(props.viewHeaderDetailList?.viewHeaderDetail.details.length)) {
                let defaultData = {
                    id : uuidv4(),
                    viewHeaderDetail : {
                        details: []
                    }
                }
                
                dispatchCreateViewHeaderDetailState({
                    type: 'INIT_DATA',
                    payload: defaultData
                });
            } else {
                dispatchCreateViewHeaderDetailState({
                    type: 'INIT_DATA',
                    payload: props.viewHeaderDetailList
                });

                let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.map(viewHeader => {
                    let data = piaarDefaultHeaderList?.filter(defaultHeader => defaultHeader.cellNumber === viewHeader.cellNumber)[0];
                    return data.cellNumber;
                });

                setCheckedViewHeaderCellNumberList(checkedCellNumberLi);
            }
        }

        getViewHeader();
    }, [piaarDefaultHeaderList]);

    const _storeViewExcelFormDetail = async (e) => {
        e.preventDefault();
        await props._onSubmitPiaarCustomizedHeaderControl(createViewHeaderDetailState)
    }

    const _onChangeDetailInputValue = (e, detailId) => {
        e.preventDefault();

        let newDetails = createViewHeaderDetailState.viewHeaderDetail.details.map(r => {
            if (r.id === detailId) {
                return {
                    ...r,
                    [e.target.name]: e.target.value
                }
            } else {
                return {
                    ...r
                }
            }
        });

        dispatchCreateViewHeaderDetailState({
            type: 'SET_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    const _formOrderMoveForward = (e, detailId) => {
        e.preventDefault();

        let targetIdx = -1;
        createViewHeaderDetailState.viewHeaderDetail.details.forEach((data, idx) => {
            if(data.id === detailId) {
                targetIdx = idx;
                return;
            }
        });
    
        _changeArrayControl(targetIdx, parseInt(targetIdx)-1);
    }

    const _formOrderMoveBack = (e, detailId) => {
        e.preventDefault();

        let targetIdx = -1;
        createViewHeaderDetailState.viewHeaderDetail.details.forEach((data, idx) => {
            if(data.id === detailId) {
                targetIdx = idx;
                return;
            }
        });
    
        _changeArrayControl(targetIdx, parseInt(targetIdx)+1);
    }

    const _changeArrayControl = (targetIdx, moveValue) => {
        if(!(createViewHeaderDetailState.viewHeaderDetail.details.length > 1)) return;
        
        let newPosition = parseInt(moveValue);
        if(newPosition < 0 || newPosition >= createViewHeaderDetailState.viewHeaderDetail.details.length) return;

        let headerDetailList = createViewHeaderDetailState.viewHeaderDetail.details;
        let target = headerDetailList.splice(targetIdx, 1)[0];
        headerDetailList.splice(newPosition, 0, target);

        dispatchCreateViewHeaderDetailState({
            type: 'SET_HEADER_DETAIL_DATA',
            payload: headerDetailList
        });
    }

    const _resetViewExcelFormDetail =  async (e) => {
        e.preventDefault();

        dispatchCreateViewHeaderDetailState({
            type: 'INIT_DATA',
            payload: props.viewHeaderDetailList
        });

        let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.map(r => r.cellNumber);
        setCheckedViewHeaderCellNumberList(checkedCellNumberLi);
    }

    const _checkAllOfViewHeaderData = () => {
        if (_isCheckedAllOfViewHeaderData()) {
            setCheckedViewHeaderCellNumberList([]);

            dispatchCreateViewHeaderDetailState({
                type: 'INIT_DATA',
                payload: new DeliveryReadyPiaarHeader().toJSON()
            });
        } else {
            let headerCellNumberList = piaarDefaultHeaderList.map(r => r.cellNumber);
            setCheckedViewHeaderCellNumberList(headerCellNumberList);

            dispatchCreateViewHeaderDetailState({
                type: 'SET_HEADER_DETAIL_DATA',
                payload: piaarDefaultHeaderList
            });
        }
    }

    const _isCheckedAllOfViewHeaderData = () => {
        if (checkedViewHeaderCellNumberList) {
            let headerCellNumberList = piaarDefaultHeaderList.map(r => r.cellNumber).sort(function (a, b) {
                return a - b;
            });

            checkedViewHeaderCellNumberList.sort(function (a, b) {
                return a - b;
            });

            return JSON.stringify(headerCellNumberList) === JSON.stringify(checkedViewHeaderCellNumberList);
        } else return false;
    }

    const _isCheckedOfViewHeaderData = (cellNumber) => {                        
        return checkedViewHeaderCellNumberList.includes(cellNumber);
    }

    const _checkOneOfViewHeaderDataLi = (cellNumber) => {
        let checkedData = [];

        if (checkedViewHeaderCellNumberList.includes(cellNumber)) {
            let checkedCellNumberLi = checkedViewHeaderCellNumberList.filter(r => r !== cellNumber);
            setCheckedViewHeaderCellNumberList(checkedCellNumberLi);

            checkedData = createViewHeaderDetailState?.viewHeaderDetail?.details?.filter(r => r.cellNumber !== cellNumber);

            setCheckedViewHeaderCellNumberList(checkedViewHeaderCellNumberList.filter(r => r !== cellNumber));
        } else {
            let checkedCellNumberLi = checkedViewHeaderCellNumberList.concat(cellNumber);
            setCheckedViewHeaderCellNumberList(checkedCellNumberLi);

            let headerData = piaarDefaultHeaderList?.filter(r => r.cellNumber === cellNumber)[0];
            checkedData = createViewHeaderDetailState?.viewHeaderDetail?.details.concat(headerData);
            // cellNumber에 따른 정렬
            checkedData.sort(function (a, b) {
                return a.cellNumber - b.cellNumber
            });
        }
        
        dispatchCreateViewHeaderDetailState({
            type: 'SET_HEADER_DETAIL_DATA',
            payload: checkedData
        });
    }


    return (
        <>
            <Container>
                <form onSubmit={(e) => _storeViewExcelFormDetail(e)}>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>view 엑셀 양식 설정</GroupTitle>
                                <ControlBox>
                                    <ResetBtn onClick={(e) => _resetViewExcelFormDetail(e)}><ReplayIcon /></ResetBtn>
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
                                    onChange={() => _checkAllOfViewHeaderData()} checked={_isCheckedAllOfViewHeaderData()}
                                />
                            </AllCheckBox>
                            <CreateContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0rem' }}>
                                    <thead>
                                        <tr>
                                            {piaarDefaultHeaderList?.map((data, idx) => {
                                                return (
                                                    <HeaderTh key={'piaar_view_excel_header_idx' + idx} className="large-cell" scope="col">
                                                        <Checkbox
                                                            color="default"
                                                            size="small"
                                                            inputProps={{ 'aria-label': '뷰 데이터 선택' }}
                                                            onClick={() => _checkOneOfViewHeaderDataLi(data.cellNumber)}
                                                            checked={_isCheckedOfViewHeaderData(data.cellNumber)}
                                                        />
                                                    </HeaderTh>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        <tr height="45">
                                            {piaarDefaultHeaderList?.map((data, idx) => {
                                                return (
                                                    <BodyTd key={'view_excel_data_detail_idx' + idx}
                                                        onClick={() => _checkOneOfViewHeaderDataLi(data.cellNumber)}
                                                        checked={_isCheckedOfViewHeaderData(data.cellNumber)}
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
                                            {createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
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
                                            {createViewHeaderDetailState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <CustomHeaderTd key={'custom_view_excel_data_detail_idx' + idx}>
                                                        <HeaderDataBox>
                                                            <IndexChangeBtn onClick={(e) => _formOrderMoveForward(e, data.id)}>
                                                                <ChevronLeftIcon />
                                                            </IndexChangeBtn>
                                                            <DataInputEl type="text" name='cellValue' placeholder='엑셀 항목명' onChange={(e) => _onChangeDetailInputValue(e, data.id)} value={data.cellValue || ''} required></DataInputEl>
                                                            <IndexChangeBtn onClick={(e) => _formOrderMoveBack(e, data.id)}>
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