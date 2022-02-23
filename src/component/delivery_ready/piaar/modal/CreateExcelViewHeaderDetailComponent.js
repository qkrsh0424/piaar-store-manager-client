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

const DELIVERY_READY_PIAAR_HEADER_SIZE = 46;

const deliveryReadyPiaarHeaderName = [
    {
        "headerName" : "피아르 고유번호",
        "matchedColumnName" : "uniqueCode"
    },
    {
        "headerName" : "주문번호1",
        "matchedColumnName" : "orderNumber1"
    },
    {
        "headerName" : "주문번호2",
        "matchedColumnName" : "orderNumber2"
    },
    {
        "headerName" : "주문번호3",
        "matchedColumnName" : "orderNumber3"
    },
    {
        "headerName" : "상품명",
        "matchedColumnName" : "prodName"
    },
    {
        "headerName" : "옵션명",
        "matchedColumnName" : "optionName"
    },
    {
        "headerName" : "수량",
        "matchedColumnName" : "unit"
    },
    {
        "headerName" : "수취인명",
        "matchedColumnName" : "receiver"
    },
    {
        "headerName" : "전화번호1",
        "matchedColumnName" : "receiverContact1"
    },
    {
        "headerName" : "전화번호2",
        "matchedColumnName" : "receiverContact2"
    },
    {
        "headerName" : "주소",
        "matchedColumnName" : "destination"
    },
    {
        "headerName" : "우편번호",
        "matchedColumnName" : "zipCode"
    },
    {
        "headerName" : "배송방식",
        "matchedColumnName" : "transportType"
    },
    {
        "headerName" : "배송메세지",
        "matchedColumnName" : "deliveryMessage"
    },
    {
        "headerName" : "상품고유번호1",
        "matchedColumnName" : "prodUniqueNumber1"
    },
    {
        "headerName" : "상품고유번호2",
        "matchedColumnName" : "prodUniqueNumber2"
    },
    {
        "headerName" : "옵션고유번호1",
        "matchedColumnName" : "optionUniqueNumber1"
    },
    {
        "headerName" : "옵션고유번호2",
        "matchedColumnName" : "optionUniqueNumber2"
    },
    {
        "headerName" : "피아르 상품코드",
        "matchedColumnName" : "prodCode"
    },
    {
        "headerName" : "피아르 옵션코드",
        "matchedColumnName" : "optionCode"
    },
    {
        "headerName" : "관리메모1",
        "matchedColumnName" : "managementMemo1"
    },
    {
        "headerName" : "관리메모2",
        "matchedColumnName" : "managementMemo2"
    },
    {
        "headerName" : "관리메모3",
        "matchedColumnName" : "managementMemo3"
    },
    {
        "headerName" : "관리메모4",
        "matchedColumnName" : "managementMemo4"
    },
    {
        "headerName" : "관리메모5",
        "matchedColumnName" : "managementMemo5"
    },
    {
        "headerName" : "관리메모6",
        "matchedColumnName" : "managementMemo6"
    },
    {
        "headerName" : "관리메모7",
        "matchedColumnName" : "managementMemo7"
    },
    {
        "headerName" : "관리메모8",
        "matchedColumnName" : "managementMemo8"
    },
    {
        "headerName" : "관리메모9",
        "matchedColumnName" : "managementMemo9"
    },
    {
        "headerName" : "관리메모10",
        "matchedColumnName" : "managementMemo10"
    },
    {
        "headerName" : "관리메모11",
        "matchedColumnName" : "managementMemo11"
    },
    {
        "headerName" : "관리메모12",
        "matchedColumnName" : "managementMemo12"
    },
    {
        "headerName" : "관리메모13",
        "matchedColumnName" : "managementMemo13"
    },
    {
        "headerName" : "관리메모14",
        "matchedColumnName" : "managementMemo14"
    },
    {
        "headerName" : "관리메모15",
        "matchedColumnName" : "managementMemo15"
    },
    {
        "headerName" : "관리메모16",
        "matchedColumnName" : "managementMemo16"
    },
    {
        "headerName" : "관리메모17",
        "matchedColumnName" : "managementMemo17"
    },
    {
        "headerName" : "관리메모18",
        "matchedColumnName" : "managementMemo18"
    },
    {
        "headerName" : "관리메모19",
        "matchedColumnName" : "managementMemo19"
    },
    {
        "headerName" : "관리메모20",
        "matchedColumnName" : "managementMemo20"
    },
    {
        "headerName" : "*카테고리명",
        "matchedColumnName" : "categoryName"
    },
    {
        "headerName" : "*상품명",
        "matchedColumnName" : "prodDefaultName"
    },
    {
        "headerName" : "*상품관리명",
        "matchedColumnName" : "prodManagementName"
    },
    {
        "headerName" : "*옵션명",
        "matchedColumnName" : "optionDefaultName"
    },
    {
        "headerName" : "*옵션관리명",
        "matchedColumnName" : "optionManagementName"
    },
    {
        "headerName" : "*재고수량",
        "matchedColumnName" : "optionStockUnit"
    }
];

const initialPiaarDefaultHeaderListState = null;

const piaarDefaultHeaderListStateReducer = (state, action) => {
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
    const [piaarDefaultHeaderListState, dispatchPiaarDefaultHeaderListState] = useReducer(piaarDefaultHeaderListStateReducer, initialPiaarDefaultHeaderListState);
    const [checkedViewHeaderCellNumberList, setCheckedViewHeaderCellNumberList] = useState([]);

    // 피아르 기본 엑셀 양식 설정
    useEffect(() => {
        function fetchInit() {
            let deliveryReadyPiaarCustomizedHeaderList = [];

            // 피아르 엑셀 헤더 생성
            for(var i = 0; i < DELIVERY_READY_PIAAR_HEADER_SIZE; i++) {
                let data = new DeliveryReadyPiaarHeader().toJSON();
                data = {
                    ...data.viewHeaderDetail.details,
                    id: uuidv4(),
                    cellNumber : i,
                    cellValue : deliveryReadyPiaarHeaderName[i].headerName,
                    matchedColumnName : deliveryReadyPiaarHeaderName[i].matchedColumnName,
                    cellSize: 'default',
                    mergeYn: 'n'
                }

                deliveryReadyPiaarCustomizedHeaderList.push({...data});
            }

            let defaultViewHeader = new DeliveryReadyPiaarHeader();
            defaultViewHeader = {
                ...defaultViewHeader,
                viewHeaderDetail: {
                    details : deliveryReadyPiaarCustomizedHeaderList
                }
            };

            dispatchPiaarDefaultHeaderListState({
                type: 'INIT_DATA',
                payload: defaultViewHeader
            });
        }

        fetchInit();
    }, []);

    useEffect(() => {
        function getViewHeader() {
            // 저장된 view header가 없다면 default값을 넣자
            if (!piaarDefaultHeaderListState) {
                return;
            }

            if (!(props.viewHeaderDetailList && props.viewHeaderDetailList.viewHeaderDetail.details.length)) {
                dispatchCreateViewHeaderDetailState({
                    type: 'INIT_DATA',
                    payload: new DeliveryReadyPiaarHeader().toJSON()
                });
            } else {
                dispatchCreateViewHeaderDetailState({
                    type: 'INIT_DATA',
                    payload: props.viewHeaderDetailList
                });

                let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.map(viewHeader => {
                    let data = piaarDefaultHeaderListState?.viewHeaderDetail?.details.filter(defaultHeader => defaultHeader.cellNumber === viewHeader.cellNumber)[0];
                    return data.cellNumber;
                });

                setCheckedViewHeaderCellNumberList(checkedCellNumberLi);
            }
        }

        getViewHeader();
    }, [piaarDefaultHeaderListState]);

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
            let headerCellNumberList = piaarDefaultHeaderListState.viewHeaderDetail.details.map(r => r.cellNumber);
            setCheckedViewHeaderCellNumberList(headerCellNumberList);

            dispatchCreateViewHeaderDetailState({
                type: 'SET_HEADER_DETAIL_DATA',
                payload: piaarDefaultHeaderListState.viewHeaderDetail.details
            });
        }
    }

    const _isCheckedAllOfViewHeaderData = () => {
        if (piaarDefaultHeaderListState && piaarDefaultHeaderListState?.viewHeaderDetail.details.length) {
            let headerCellNumberList = piaarDefaultHeaderListState.viewHeaderDetail.details.map(r => r.cellNumber).sort(function (a, b) {
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

            let headerData = piaarDefaultHeaderListState?.viewHeaderDetail?.details.filter(r => r.cellNumber === cellNumber)[0];
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
                                            {piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
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
                                            {piaarDefaultHeaderListState?.viewHeaderDetail?.details?.map((data, idx) => {
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