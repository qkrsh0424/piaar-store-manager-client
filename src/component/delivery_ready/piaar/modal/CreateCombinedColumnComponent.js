import { useEffect, useReducer, useState } from "react";
import styled, { css } from "styled-components";

import Checkbox from '@material-ui/core/Checkbox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ReplayIcon from '@mui/icons-material/Replay';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

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

const DataControlBox = styled.div`
    width: 100%;
    padding: 2%;
`;

const FormLabelGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const initialCreateCombinedColumnState = null;

const createCombinedColumnStateReducer = (state, action) => {
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

const CreateCombinedColumnComponent = (props) => {
    const [createCombinedColumnState, dispatchCreateCombinedColumnState] = useReducer(createCombinedColumnStateReducer, initialCreateCombinedColumnState);
    const [checkedCellNumberListOfCombinedColumn, setCheckedCellNumberListOfCombinedColumn] = useState([]);
    const [orderStatusExcelList, setOrderStatusExcelList] = useState(null);


    useEffect(() => {
        function setOrderData() {
            let orderData = props.excelOrderList?.filter(rowData => rowData.releasedYn === "y");
            
            setOrderStatusExcelList(orderData);
        }

        setOrderData();
    }, [props.excelOrderList]);

    useEffect(() => {
        function getViewHeader() {
            // 저장된 view header가 없다면
            if (!props.viewHeaderDetailList) {
                return;
            }

            props.viewHeaderDetailList.viewHeaderDetail.details.map(r => {
                if(r.mergeYn === 'y') {
                    checkedCellNumberListOfCombinedColumn.push(r.cellNumber);
                }
            });

            dispatchCreateCombinedColumnState({
                type: 'INIT_DATA',
                payload: props.viewHeaderDetailList
            });
        }

        getViewHeader();
    }, []);

    useEffect(() => {
        function setCreateCombinedColumnState() {
            if(!createCombinedColumnState){
                return;
            }
            
            let newDetails = createCombinedColumnState.viewHeaderDetail.details.map(r => {
                if (checkedCellNumberListOfCombinedColumn.includes(r.cellNumber)) {
                    return {
                        ...r,
                        mergeYn: 'y'
                    }
                } else {
                    return {
                        ...r,
                        mergeYn: 'n'
                    }
                }
            });

            dispatchCreateCombinedColumnState({
                type: 'SET_HEADER_DETAIL_DATA',
                payload: newDetails
            })
        }

        setCreateCombinedColumnState();
    }, [checkedCellNumberListOfCombinedColumn]);

    const _storeCombinedColumnData = async (e) => {
        e.preventDefault();
        await props._onSubmitCombinedColumnDataControl(createCombinedColumnState);
        
        if(props.combinedDeliveryTargetBoardState === 'receiver') {
            await props.changeReleasedDataToCombinedDeliveryControl();
        }else if(props.combinedDeliveryTargetBoardState === 'receiverAndProdInfo'){
            await props.changeReleasedDataToUnitCombinedDeliveryControl();
        }
    }

    const _resetViewExcelFormDetail =  async (e) => {
        e.preventDefault();

        dispatchCreateCombinedColumnState({
            type: 'INIT_DATA',
            payload: props.viewHeaderDetailList
        });

        let checkedCellNumberLi = props.viewHeaderDetailList?.viewHeaderDetail?.details.filter(r => r.mergeYn === 'y').map(r => r.cellNumber);
        setCheckedCellNumberListOfCombinedColumn(checkedCellNumberLi);
    }

    const _checkAllOfCombinedColumnData = () => {
        if (_isCheckedAllOfCombinedColumnData()) {
            setCheckedCellNumberListOfCombinedColumn([]);
        } else {
            let columnCellNumberList = createCombinedColumnState.viewHeaderDetail.details.filter(r => r.matchedColumnName !== 'unit');
            columnCellNumberList = columnCellNumberList.map(r => r.cellNumber);
            setCheckedCellNumberListOfCombinedColumn(columnCellNumberList);
        }
    }

    const _isCheckedAllOfCombinedColumnData = () => {
        if (createCombinedColumnState?.viewHeaderDetail.details?.length) {
            let columnCellNumberList = createCombinedColumnState.viewHeaderDetail.details.filter(r => r.matchedColumnName !== 'unit');
            columnCellNumberList = columnCellNumberList.map(r => r.cellNumber).sort(function (a, b){
                return a - b;
            })

            checkedCellNumberListOfCombinedColumn.sort(function (a, b) {
                return a - b;
            });

            return JSON.stringify(columnCellNumberList) === JSON.stringify(checkedCellNumberListOfCombinedColumn);
        } else return false;
    }

    const _isCheckedOfCombinedColumnData = (cellNumber) => {                        
        return checkedCellNumberListOfCombinedColumn.includes(cellNumber);
    }

    const _checkOneLiOfCombinedColumnData = (cellNumber) => {
        if (checkedCellNumberListOfCombinedColumn.includes(cellNumber)) {
            let checkedColumnList = checkedCellNumberListOfCombinedColumn.filter(r => r !== cellNumber);
            setCheckedCellNumberListOfCombinedColumn(checkedColumnList);
        } else {
            let checkedColumnList = checkedCellNumberListOfCombinedColumn.concat(cellNumber);
            setCheckedCellNumberListOfCombinedColumn(checkedColumnList);
        }
    }

    const _onChangeCombinedDeliveryItemRadioButtons = (e) => {
        props._onChangeCombinedDeliveryItemBoardControl(e.target.value);
    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => _storeCombinedColumnData(e)}>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>병합 항목 설정</GroupTitle>
                                <ControlBox>
                                    <ResetBtn onClick={(e) => _resetViewExcelFormDetail(e)}><ReplayIcon /></ResetBtn>
                                    <CreateBtn type='submit'><AddTaskIcon /></CreateBtn>
                                </ControlBox>
                            </ItemHeaderWrapper>
                        </ItemWrapper>
                    </ItemContainer>
                    <BodyContainer>
                        <DataControlBox>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={props.combinedDeliveryTargetBoardState}
                                    onChange={(e) => _onChangeCombinedDeliveryItemRadioButtons(e)}
                                >
                                    <FormLabelGroup>
                                        <FormControlLabel value="receiver" control={<Radio />} label="'수령인' 묶음 [ 병합 항목 X ]" />
                                        <FormControlLabel value="receiverAndProdInfo" control={<Radio />} label="'수령인+상품명+옵션명' 묶음 [ 병합 항목 O ]" />
                                    </FormLabelGroup>
                                </RadioGroup>
                            </FormControl>
                        </DataControlBox>

                        <BodyWrapper hidden={props.combinedDeliveryTargetBoardState === 'receiverAndProdInfo' ? false : true}>
                            <InfoText>* 병합된 항목 중 구분자로 나열할 데이터 항목을 선택해주세요.</InfoText>
                            <AllCheckBox>
                                <span>전체 선택</span>
                                <Checkbox
                                    size="small"
                                    color="primary"
                                    inputProps={{ 'aria-label': '전체 미출고 데이터 선택' }}
                                    onChange={() => _checkAllOfCombinedColumnData()} checked={_isCheckedAllOfCombinedColumnData()}
                                />
                            </AllCheckBox>
                            <CreateContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0rem' }}>
                                    <thead>
                                        <tr>
                                            {createCombinedColumnState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                return (
                                                    <HeaderTh key={'piaar_view_excel_header_idx' + idx} className="large-cell" scope="col">
                                                        {data.matchedColumnName === 'unit' ?
                                                            <Checkbox
                                                                color="default"
                                                                size="small"
                                                                disabled
                                                            />
                                                        :
                                                        <Checkbox
                                                            color="default"
                                                            size="small"
                                                            inputProps={{ 'aria-label': '뷰 데이터 선택' }}
                                                            onClick={() => _checkOneLiOfCombinedColumnData(data.cellNumber)}
                                                            checked={_isCheckedOfCombinedColumnData(data.cellNumber)}
                                                        />
                                                        }
                                                    </HeaderTh>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        <tr height="45">
                                            {createCombinedColumnState?.viewHeaderDetail?.details?.map((data, idx) => {
                                                if (data.matchedColumnName === 'unit') {
                                                    return (
                                                        <BodyTd key={'view_excel_data_detail_idx' + idx}
                                                            disabled
                                                        >
                                                            <span>{idx + 1}. {data.cellValue}</span>
                                                        </BodyTd>
                                                    )
                                                }
                                                return (
                                                    <BodyTd key={'view_excel_data_detail_idx' + idx}
                                                        onClick={() => _checkOneLiOfCombinedColumnData(data.cellNumber)}
                                                        checked={_isCheckedOfCombinedColumnData(data.cellNumber)}
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
                    </BodyContainer>
                </form>
            </Container>
        </>
    )
}

export default CreateCombinedColumnComponent;
