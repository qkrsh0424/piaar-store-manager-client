import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';

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
        width: 100%;
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

    & .xsmall-cell {
        width: 50px;
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

const DataControlBox = styled.div`
    
`;

const ChangeBtn = styled.button`

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

const DeliveryReadyOrderStatusPiaarBody = (props) => {
    const userRdx = useSelector(state => state.user);

    const [createPiaarViewHeaderDetailModalOpen, setCreatePiaarViewHeaderDetailModalOpen] = useState(false);
    const [createViewHeaderDetailState, dispatchCreateViewHeaderDetailState] = useReducer(createViewHeaderDetailStateReducer, initialCreateViewHeaderDetailState);
    const [piaarDefaultHeaderListState, dispatchPiaarDefaultHeaderListState] = useReducer(piaarDefaultHeaderListStateReducer, initialPiaarDefaultHeaderListState);
    const [checkedViewHeaderCellNumberList, setCheckedViewHeaderCellNumberList] = useState([]);
    const [checkedOrderStatusDataIdList, setCheckedOrderStatusDataIdList] = useState([]);
    const [orderStatusExcelList, setOrderStatusExcelList] = useState(null);

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

    useEffect(() => {
        function setOrderData() {
            let orderData = props.excelOrderList?.filter(rowData => rowData.soldYn === "n");
            
            setOrderStatusExcelList(orderData);
        }

        setOrderData();
    }, [props.excelOrderList]);

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

    const orderExcelControl = () => {
        return {
            piaarOrderStatusExcelData: function () {
                return {
                    checkAll: function () {
                        if (this.isCheckedAll()) {
                            setCheckedOrderStatusDataIdList([]);
                        } else {
                            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id);

                            setCheckedOrderStatusDataIdList(checkedIdList);
                        }
                    },
                    isCheckedAll: function () {
                        if (orderStatusExcelList?.length) {
                            let checkedIdList = orderStatusExcelList?.map(rowData => rowData.id).sort();

                            checkedOrderStatusDataIdList.sort();

                            return JSON.stringify(checkedIdList) === JSON.stringify(checkedOrderStatusDataIdList);
                        } else return false;
                    },
                    isChecked: function (dataId) {
                        return checkedOrderStatusDataIdList.includes(dataId);
                    },
                    checkOneLi: function (dataId) {
                        if (checkedOrderStatusDataIdList.includes(dataId)) {
                            let checkedIdList = checkedOrderStatusDataIdList.filter(r => r !== dataId);
                            setCheckedOrderStatusDataIdList(checkedIdList);
                        } else {
                            let checkedIdList = checkedOrderStatusDataIdList.concat(dataId);
                            setCheckedOrderStatusDataIdList(checkedIdList);
                        }
                    },
                    chageOrderDataToSold: async function () {
                        if(!checkedOrderStatusDataIdList.length){
                            alert('선택된 데이터가 없습니다.');
                            return;
                        } 

                        let orderData = orderStatusExcelList?.filter(rowData => {
                            if(checkedOrderStatusDataIdList.includes(rowData.id)){
                                return {
                                    ...rowData,
                                    soldYn: "y"
                                }
                            }
                        });

                        setCheckedOrderStatusDataIdList([]);
                        await props.changeOrderDataToSoldControl(orderData);
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
                    <div>
                        <BoardContainer>
                            {(props.viewHeaderDetailList?.viewHeaderDetail.details.length > 0) &&
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <HeaderTh className="fixed-header xsmall-cell" scope="col">
                                                <Checkbox
                                                    size="small"
                                                    color="primary"
                                                    inputProps={{ 'aria-label': '주문 데이터 전체 선택' }}
                                                    onChange={() => orderExcelControl().piaarOrderStatusExcelData().checkAll()}
                                                    checked={orderExcelControl().piaarOrderStatusExcelData().isCheckedAll()}
                                                />
                                            </HeaderTh>
                                            {props.viewHeaderDetailList?.viewHeaderDetail.details.map((data, idx) => {
                                                return (
                                                    <HeaderTh key={'piaar_excel_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                        <span>{data.cellValue}</span>
                                                    </HeaderTh>
                                                )
                                            })}
                                        </tr>
                                    </thead>

                                    <tbody style={{ border: 'none' }}>

                                        {orderStatusExcelList?.map((data, idx) => {
                                            return (
                                                <BodyTr
                                                    key={'upload_exel_data_idx' + idx}
                                                >
                                                    <BodyTd className="col">
                                                        <Checkbox
                                                            color="default"
                                                            size="small"
                                                            inputProps={{ 'aria-label': '주문 데이터 선택' }}
                                                            onClick={() => orderExcelControl().piaarOrderStatusExcelData().checkOneLi(data.id)}
                                                            checked={orderExcelControl().piaarOrderStatusExcelData().isChecked(data.id)}
                                                        />
                                                    </BodyTd>
                                                    {props.viewHeaderDetailList?.viewHeaderDetail.details.map((detailData, detailIdx) => {
                                                        return (
                                                            <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col"
                                                                onClick={() => orderExcelControl().piaarOrderStatusExcelData().checkOneLi(data.id)}
                                                                checked={orderExcelControl().piaarOrderStatusExcelData().isChecked(data.id)}
                                                            >
                                                                <span>{data[detailData.matchedColumnName]}</span>
                                                            </BodyTd>
                                                        )
                                                    })}
                                                </BodyTr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }
                        </BoardContainer>

                        <DataControlBox>
                            <ChangeBtn type="button" onClick={() => orderExcelControl().piaarOrderStatusExcelData().chageOrderDataToSold()}>판매 처리</ChangeBtn>
                        </DataControlBox>
                    </div>
                    
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