import { useEffect, useReducer, useState } from "react";
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import PiaarExcelViewCommonModal from "./modal/PiaarExcelViewCommonModal";
import CreateExcelViewHeaderDetailComponent from "./modal/CreateExcelViewHeaderDetailComponent";

const Container = styled.div`
    padding: 0 2%;
`;

const BoardTitle = styled.div`
    font-size: large;
    /* color: rgba(000, 102, 153, 0.9); */
    font-weight: 600;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    padding: 10px;

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
    grid-template-columns: 1fr 1fr;
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
    padding: 2%;
    background:  #609FFF;;
    color: white;
    font-size: 1em;
    font-weight: 500;
    border:1px solid  #7DC2FF;;
    border-radius: 20px;
    float: right;

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
    box-shadow: 1px 1px 15px #a9b3d599;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #7DC2FF;
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
    border-right: 1px solid #609FFF;
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

const initialCreateViewHeaderDetailState = null;

const createViewHeaderDetailStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_HEADER_DETAIL_DATA':
            return {
                ...state,
                headerDetails: action.payload
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const DeliveryReadyOrderStatusPiaarBody = (props) => {
    const userRdx = useSelector(state => state.user);

    const [createPiaarViewHeaderDetailModalOpen, setCreatePiaarViewHeaderDetailModalOpen] = useState(false);
    const [createViewHeaderDetailState, dispatchCreateViewUploadHeaderDetailState] = useReducer(createViewHeaderDetailStateReducer, initialCreateViewHeaderDetailState);


    const onCreatePiaarViewHeaderDetailModalOpen = () => {
        setCreatePiaarViewHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorUploadHeaderDetailModalClose = () => {
        setCreatePiaarViewHeaderDetailModalOpen(false);
    }

    const excelFormControl = () => {
        return {
            piaarViewExcelForm: function () {
                return {
                    open: function (e) {
                        e.preventDefault();
                        onCreatePiaarViewHeaderDetailModalOpen();

                        dispatchCreateViewUploadHeaderDetailState({
                            type: 'INIT_DATA',
                            payload: props.piaarCustomizedHeaderListState
                        });
                    },
                    close: function () {
                        onCreateTranslatorUploadHeaderDetailModalClose()
                    },
                    // storeUploadedExcelHeaderDetail: async function (e) {
                    //     e.preventDefault();

                    //     let uploadedHeader = createUploadHeaderDetailState.uploadedData;

                    //     let uploadDetails = uploadedHeader.details.map((r, idx) => {
                    //         let data = new UploadHeaderDetail().toJSON();
                    //         data = {
                    //             ...data,
                    //             cellNumber: idx,
                    //             headerName: r.headerName || r.colData,
                    //             cellType: r.cellType
                    //         };

                    //         return data;
                    //     });

                    //     let excelHeader = {
                    //         ...selectedHeaderTitleState,
                    //         uploadHeaderDetail: {
                    //             ...selectedHeaderTitleState.uploadHeaderDetail,
                    //             details: uploadDetails
                    //         }
                    //     };

                    //     dispatchSelectedHeaderTitleState({
                    //         type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
                    //         payload: uploadDetails
                    //     });

                    //     await props.createUploadHeaderDetailsControl(excelHeader);

                    //     onCreateTranslatorUploadHeaderDetailModalClose();
                    // },
                    onChangeInputValue: function (e, detailId) {
                        e.preventDefault();

                        let newDetails = createViewHeaderDetailState?.headerDetails?.map(r=>{
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

                        dispatchCreateViewUploadHeaderDetailState({
                            type: 'SET_HEADER_DETAIL_DATA',
                            payload: newDetails
                        });
                    },
                    // deleteCell: function (e, uploadHeaderId) {
                    //     e.preventDefault();

                    //     let newDetails = createUploadHeaderDetailState.uploadedData.details.filter(r => r.id !== uploadHeaderId);

                    //     dispatchCreateUploadHeaderDetailState({
                    //         type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
                    //         payload: newDetails
                    //     });
                    // },
                    // addCell: function (e) {
                    //     e.preventDefault();

                    //     let newDetail = {
                    //         id: uuidv4(),
                    //         colData: '',
                    //         cellType: 'String'
                    //     }

                    //     dispatchCreateUploadHeaderDetailState({
                    //         type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
                    //         payload: createUploadHeaderDetailState.uploadedData.details.concat(newDetail)
                    //     });
                    // },
                    // moveUp: function (e, detailId) {
                    //     e.preventDefault();

                    //     let targetIdx = -1;

                    //     createUploadHeaderDetailState.uploadedData.details.forEach((detail, idx) => {
                    //         if(detail.id === detailId) {
                    //             targetIdx = idx;
                    //             return;
                    //         }
                    //     });
                    
                    //     this.changeArrayControl(targetIdx, parseInt(targetIdx)-1);
                    // },
                    // moveDown: function (e, detailId) {
                    //     e.preventDefault();

                    //     let targetIdx = -1;

                    //     createUploadHeaderDetailState.uploadedData.details.forEach((detail, idx) => {
                    //         if(detail.id === detailId) {
                    //             targetIdx = idx;
                    //             return;
                    //         }
                    //     });
                    
                    //     this.changeArrayControl(targetIdx, parseInt(targetIdx)+1);
                    // },
                    // changeArrayControl: function (targetIdx, moveValue) {
                    //     if(!(createUploadHeaderDetailState.uploadedData.details.length > 1)) return;
                        
                    //     let newPosition = parseInt(moveValue);
                    //     if(newPosition < 0 || newPosition >= createUploadHeaderDetailState.uploadedData.details.length) return;

                    //     let headerDetailList = createUploadHeaderDetailState.uploadedData.details;
                    //     let target = headerDetailList.splice(targetIdx, 1)[0];
                    //     headerDetailList.splice(newPosition, 0, target);

                    //     dispatchCreateUploadHeaderDetailState({
                    //         type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
                    //         payload: headerDetailList
                    //     })
                    // },
                    // download: async function (e){
                    //     e.preventDefault();

                    //     props.loadingControl().open();

                    //     let downloadDetail = selectedHeaderTitleState.uploadHeaderDetail.details.map(r => {
                    //         return {
                    //             ...r,
                    //             colData: r.headerName
                    //         }
                    //     });

                    //     await props.downloadUploadHeaderDetailsControl(selectedHeaderTitleState.uploadHeaderTitle, downloadDetail);
                    //     props.loadingControl().close();
                    // }
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
                            <HeaderFormControlBtn type="button" className="upload-header-excel-download" 
                                // onClick={(e) => excelFormControl().piaarViewExcelForm().download(e)} disabled={!selectedHeaderTitleState?.uploadHeaderDetail.details.length}
                                >양식 다운로드</HeaderFormControlBtn>
                            <HeaderFormControlBtn type="button" onClick={(e) => excelFormControl().piaarViewExcelForm().open(e)}>양식 설정</HeaderFormControlBtn>
                        </DataOptionBox>
                    </BoardTitle>

                    <BoardContainer>
                        <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    {props.piaarCustomizedHeaderListState?.headerDetails?.map((data, idx) => {
                                        return (
                                            <HeaderTh key={'piaar_excel_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                <span>{data.cellName}</span>
                                            </HeaderTh>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody style={{ border: 'none' }}>
                                {/* {uploadedExcelDataState?.map((data, idx) => {
                                    return (
                                        <BodyTr
                                            key={'upload_exel_data_idx' + idx}
                                        >
                                            {data.uploadedData.details.map((detailData, detailIdx) => {
                                                return (
                                                    <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col">
                                                        <span>{detailData.cellType === 'Date' ? dateToYYMMDDhhmmss(detailData.colData) : detailData.colData}</span>
                                                    </BodyTd>
                                                )
                                            })}
                                        </BodyTr>
                                    )
                                })} */}
                            </tbody>
                        </table>
                    </BoardContainer>

                    {/* Create Piaar View Header Form Modal */}
                    <PiaarExcelViewCommonModal
                        open={createPiaarViewHeaderDetailModalOpen}
                        onClose={() => excelFormControl().piaarViewExcelForm().close()}
                        maxWidth={'xs'}
                        fullWidth={true}
                    >
                        <CreateExcelViewHeaderDetailComponent
                            createViewHeaderDetailState={createViewHeaderDetailState}

                            onChangeInputHeaderDetailControl={(e, detailId) => excelFormControl().piaarViewExcelForm().onChangeInputValue(e, detailId)}
                        >
                        </CreateExcelViewHeaderDetailComponent>
                        
                    </PiaarExcelViewCommonModal>

                </Container>
            }
        </>
    );
}
export default withRouter(DeliveryReadyOrderStatusPiaarBody);