import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import PiaarExcelViewCommonModal from "./modal/PiaarExcelViewCommonModal";
import CreateExcelViewHeaderDetailComponent from "./modal/CreateExcelViewHeaderDetailComponent";


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

const DataOptionBox = styled.span`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 10px;

    & .upload-header-excel-download {
        background: #609FFF;;
        border: 1px solid #7DC2FF;

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

        &:disabled{
            background: #d3d3d388;
            cursor: not-allowed;
            border: none;
        }
    }

    @media only screen and (max-width: 992px) {
        padding: 1% 0%;
        column-gap: 20px;
    }
`;

const HeaderFormControlBtn = styled.button`
    padding: 10px;
    background:  #2C73D2;;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border:1px solid  #7DC2FF;;
    border-radius: 20px;
    float: right;
    width: 240px;
    border: none;


    @media only screen and (max-width: 992px){
        display: inline-block;
        padding: 4px;
    }

    @media only screen and (max-width:576px ){
        padding: 0;
    }

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

// const DELIVERY_READY_PIAAR_HEADER_SIZE = 40;
const DELIVERY_READY_PIAAR_HEADER_SIZE = 46;

const deliveryReadyPiaarHeaderName = [
    '피아르 고유번호',
    '주문번호1',
    '주문번호2',
    '주문번호3',
    '상품명',
    '옵션명',
    '수량',
    '수취인명',
    '전화번호1',
    '전화번호2',
    '주소',
    '우편번호',
    '배송방식',
    '배송메세지',
    '상품고유번호1',
    '상품고유번호2',
    '옵션고유번호1',
    '옵션고유번호2',
    '피아르 상품코드',
    '피아르 옵션코드',
    '관리메모1',
    '관리메모2',
    '관리메모3',
    '관리메모4',
    '관리메모5',
    '관리메모6',
    '관리메모7',
    '관리메모8',
    '관리메모9',
    '관리메모10',
    '관리메모11',
    '관리메모12',
    '관리메모13',
    '관리메모14',
    '관리메모15',
    '관리메모16',
    '관리메모17',
    '관리메모18',
    '관리메모19',
    '관리메모20',
    '*카테고리명', '*상품명', '*상품관리명', '*옵션명', '*옵션관리명', '*재고수량'
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
const initialViewExcelDataState = null;

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

const viewExcelDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const DeliveryReadyOrderStatusPiaarBody = (props) => {
    const userRdx = useSelector(state => state.user);

    const [createPiaarViewHeaderDetailModalOpen, setCreatePiaarViewHeaderDetailModalOpen] = useState(false);
    const [createViewHeaderDetailState, dispatchCreateViewHeaderDetailState] = useReducer(createViewHeaderDetailStateReducer, initialCreateViewHeaderDetailState);
    const [piaarDefaultHeaderListState, dispatchPiaarDefaultHeaderListState] = useReducer(piaarDefaultHeaderListStateReducer, initialPiaarDefaultHeaderListState);
    const [viewExcelDataState, dispatchViewExcelDataState] = useReducer(viewExcelDataStateReducer, initialViewExcelDataState);
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
                    cellValue : deliveryReadyPiaarHeaderName[i],
                    cellSize: 'default'
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

    // Get Piaar View Excel Data
    useEffect(() => {
        if(!(props.viewHeaderDetailList && props.viewHeaderDetailList.viewHeaderDetail.details.length)){
            dispatchViewExcelDataState({
                type: 'CLEAR'
            });
        }
        
        if (!(props.viewHeaderDetailList && props.excelOrderList)) {
            return;
        }

        if (props.viewHeaderDetailList.viewHeaderDetail.details.length) {

            let data = props.excelOrderList.map(viewData => {
                return viewData.uploadDetail.details.filter(viewDataDetail => 
                    props.viewHeaderDetailList.viewHeaderDetail.details.filter(viewHeader => viewHeader.cellNumber === viewDataDetail.cellNumber)[0]
                )
            });

            dispatchViewExcelDataState({
                type: 'INIT_DATA',
                payload: data
            });
            return;
        }
    }, [props.viewHeaderDetailList, props.excelOrderList]);

    const onCreatePiaarViewHeaderDetailModalOpen = () => {
        setCreatePiaarViewHeaderDetailModalOpen(true);
    }

    const onCreatePiaarViewHeaderDetailModalClose = () => {
        setCreatePiaarViewHeaderDetailModalOpen(false);
    }

    const excelFormControl = () => {
        return {
            piaarViewExcelForm: function () {
                return {
                    open: function (e) {
                        e.preventDefault();
                        onCreatePiaarViewHeaderDetailModalOpen();

                        // 저장된 view header가 없다면 default값을 넣자
                        if(!(props.viewHeaderDetailList && props.viewHeaderDetailList.viewHeaderDetail.details.length)){
                            dispatchCreateViewHeaderDetailState({
                                type: 'INIT_DATA',
                                payload: new DeliveryReadyPiaarHeader().toJSON()
                            });
                        }else{
                            dispatchCreateViewHeaderDetailState({
                                type: 'INIT_DATA',
                                payload: props.viewHeaderDetailList
                            });

                            // TODO :: return 값 배열로 만들기
                            let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.map(viewHeader => {
                                let data = piaarDefaultHeaderListState?.viewHeaderDetail?.details.filter(defaultHeader => defaultHeader.cellNumber === viewHeader.cellNumber)[0];
                                return data.cellNumber;
                            });

                            setCheckedViewHeaderCellNumberList(checkedCellNumberLi);
                        }
                    },
                    close: function () {
                        onCreatePiaarViewHeaderDetailModalClose();
                        setCheckedViewHeaderCellNumberList([]);
                    },
                    storeViewExcelFormDetail: async function (e) {
                        e.preventDefault();

                        // 저장된 view header가 없다면 새로 생성, 있다면 수정
                        if(!props.viewHeaderDetailList){
                            await props.createPiaarCustomizedHeaderControl(createViewHeaderDetailState);
                        }else{
                            await props.changePiaarCutomizedHeaderControl(createViewHeaderDetailState);
                        }
                        await props.getViewExcelHeaderDetailControl();

                        onCreatePiaarViewHeaderDetailModalClose();
                    },
                    onChangeInputValue: function (e, detailId) {
                        e.preventDefault();

                        let newDetails = createViewHeaderDetailState.viewHeaderDetail.details.map(r=>{
                            if(r.id === detailId){
                                return {
                                    ...r,
                                    [e.target.name] : e.target.value
                                }
                            }else{
                                return {
                                    ...r
                                }
                            }
                        });

                        dispatchCreateViewHeaderDetailState({
                            type: 'SET_HEADER_DETAIL_DATA',
                            payload: newDetails
                        });
                    },
                    moveUp: function (e, detailId) {
                        e.preventDefault();

                        let targetIdx = -1;
                        createViewHeaderDetailState.viewHeaderDetail.details.forEach((data, idx) => {
                            if(data.id === detailId) {
                                targetIdx = idx;
                                return;
                            }
                        });
                    
                        this.changeArrayControl(targetIdx, parseInt(targetIdx)-1);
                    },
                    moveDown: function (e, detailId) {
                        e.preventDefault();

                        let targetIdx = -1;
                        createViewHeaderDetailState.viewHeaderDetail.details.forEach((data, idx) => {
                            if(data.id === detailId) {
                                targetIdx = idx;
                                return;
                            }
                        });
                    
                        this.changeArrayControl(targetIdx, parseInt(targetIdx)+1);
                    },
                    changeArrayControl: function (targetIdx, moveValue) {
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
                    },
                    resetViewExcelFormDetail: async function (e) {
                        e.preventDefault();

                        dispatchCreateViewHeaderDetailState({
                            type: 'INIT_DATA',
                            payload: props.viewHeaderDetailList
                        });

                        let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.map(r => r.cellNumber);

                        setCheckedViewHeaderCellNumberList(checkedCellNumberLi);
                    },
                    checkAll: function () {
                        if (this.isCheckedAll()) {
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
                    },
                    isCheckedAll: function () {
                        if (piaarDefaultHeaderListState && piaarDefaultHeaderListState?.viewHeaderDetail.details.length) {
                            let headerCellNumberList = piaarDefaultHeaderListState.viewHeaderDetail.details.map(r => r.cellNumber).sort(function (a, b) {
                                return a - b;
                            });

                            checkedViewHeaderCellNumberList.sort(function (a, b) {
                                return a - b;
                            });

                            return JSON.stringify(headerCellNumberList) === JSON.stringify(checkedViewHeaderCellNumberList);
                        } else return false;
                    },
                    isChecked: function (cellNumber) {                        
                        return checkedViewHeaderCellNumberList.includes(cellNumber);
                    },
                    checkOneLi: function (cellNumber) {
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
                }
            }
        }
    }

    return (
        <>
            {userRdx.isLoading === false &&
                <Container>
                    <BoardTitle>
                        <span>피아르 주문 현황 데이터</span>
                        <DataOptionBox>
                            <HeaderFormControlBtn type="button" onClick={(e) => excelFormControl().piaarViewExcelForm().open(e)}>view 양식 설정</HeaderFormControlBtn>
                        </DataOptionBox>
                    </BoardTitle>

                    <BoardContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    {props.viewHeaderDetailList?.viewHeaderDetail?.details?.map((data, idx) => {
                                        return (
                                            <HeaderTh key={'piaar_excel_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                <span>{data.cellValue}</span>
                                            </HeaderTh>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody style={{ border: 'none' }}>
                                {viewExcelDataState?.map((data, idx) => {
                                    return (
                                        <BodyTr
                                            key={'upload_exel_data_idx' + idx}
                                        >
                                            {data.map((detailData, detailIdx) => {
                                                return (
                                                    <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col">
                                                        <span>{detailData.cellValue}</span>
                                                    </BodyTd>
                                                )
                                            })}
                                        </BodyTr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </BoardContainer>
                    
                    {/* Create Piaar View Header Form Modal */}
                    <PiaarExcelViewCommonModal
                        open={createPiaarViewHeaderDetailModalOpen}
                        onClose={() => excelFormControl().piaarViewExcelForm().close()}
                        maxWidth={'lg'}
                        fullWidth={true}
                    >
                        <CreateExcelViewHeaderDetailComponent
                            createViewHeaderDetailState={createViewHeaderDetailState}
                            piaarDefaultHeaderListState={piaarDefaultHeaderListState}

                            onChangeInputHeaderDetailControl={(e, detailId) => excelFormControl().piaarViewExcelForm().onChangeInputValue(e, detailId)}
                            deleteCellControl={(e, detailId) => excelFormControl().piaarViewExcelForm().deleteCell(e, detailId)}
                            storeViewExcelFormControl={(e) => excelFormControl().piaarViewExcelForm().storeViewExcelFormDetail(e)}
                            resetViewExcelFormControl={(e) => excelFormControl().piaarViewExcelForm().resetViewExcelFormDetail(e)}
                            moveHeaderFormUpControl={(e, detailId) => excelFormControl().piaarViewExcelForm().moveUp(e, detailId)}
                            moveHeaderFormDownControl={(e, detailId) => excelFormControl().piaarViewExcelForm().moveDown(e, detailId)}
                            checkOneHeaderControl={(headerId) => excelFormControl().piaarViewExcelForm().checkOneLi(headerId)}
                            isCheckedHeaderControl={(headerId) => excelFormControl().piaarViewExcelForm().isChecked(headerId)}
                            checkAllHeaderControl={() => excelFormControl().piaarViewExcelForm().checkAll()}
                            isCheckedAllHeaderControl={() => excelFormControl().piaarViewExcelForm().isCheckedAll()}
                        >
                        </CreateExcelViewHeaderDetailComponent>
                        
                    </PiaarExcelViewCommonModal>

                </Container>
            }
        </>
    );
}
export default withRouter(DeliveryReadyOrderStatusPiaarBody);