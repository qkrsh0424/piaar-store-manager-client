import { useState, useEffect, useReducer } from 'react';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';

import { Container, HeaderContainer } from './ControlBar.styled';
import TitleSelectorFieldView from './TitleSelectorField.view';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateTranslatorHeaderTitleModalComponent from '../create-translator-header-title-modal/CreateTranslatorHeaderTitleModal.component';
import ModifyTranslatorHeaderTitleComponent from '../modify-translator-header-title-modal/ModifyTranslatorHeaderTitleModal.component';
import ExcelDataControlFieldView from './ExcelDataControlField.view';

class ExcelTranslatorHeader {
    constructor() {
        this.id = uuidv4();
        this.uploadHeaderTitle = '';
        this.downloadHeaderTitle = '';
        this.uploadHeaderDetail = {
            details: []
        };
        this.downloadHeaderDetail = {
            details: []
        };
        this.rowStartNumber = 0;
    }

    toJSON() {
        return {
            id: this.id,
            uploadHeaderTitle: this.uploadHeaderTitle,
            downloadHeaderTitle: this.downloadHeaderTitle,
            uploadHeaderDetail: this.uploadHeaderDetail,
            downloadHeaderDetail: this.downloadHeaderDetail,
            rowStartNumber: this.rowStartNumber
        }
    }
}

const ControlBarComponent = (props) => {
    let pathname = props.location.pathname;
    let params = queryString.parse(props.location.search);

    const [excelTitleInfo, dispatchExcelTitleInfo] = useReducer(excelTitleInfoReducer, initialExcelTitle);
    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
    const [createTranslatorHeaderTitleModalOpen, setCreateTranslatorHeaderTitleModalOpen] = useState(false);
    const [modifyTranslatorHeaderTitleModalOpen, setModifyTranslatorHeaderTitleModalOpen] = useState(false);

    useEffect(() => {
        if (!props.excelTranslatorHeaderList) {
            return;
        }

        if(!params.headerId) {
            dispatchSelectedHeaderTitleState({
                type: 'CLEAR'
            });
            return;
        }

        let headerId = params.headerId;
        let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

        dispatchSelectedHeaderTitleState({
            type: 'INIT_DATA',
            payload: headerTitleState
        });
    }, [params.headerId, props.excelTranslatorHeaderList])

    const onChangeSelectedHeaderTitle = (e) => {
        e.preventDefault();

        let selectedHeader = props.excelTranslatorHeaderList.filter(r => r.id === e.target.value)[0];

        props.history.replace({
            pathname: pathname,
            search: `?${queryString.stringify({
                ...params,
                headerId: selectedHeader.id
            })}`
        })
    }

    const onCreateTranslatorHeaderTitleModalOpen = () => {
        setCreateTranslatorHeaderTitleModalOpen(true);
        dispatchExcelTitleInfo({
            type: 'CLEAR'
        })
    }

    const onCreateTranslatorHeaderTitleModalClose = () => {
        setCreateTranslatorHeaderTitleModalOpen(false);
    }

    const onModifyTranslatorHeaderTitleModalOpen = () => {
        if(!selectedHeaderTitleState){
            alert('엑셀 형식을 먼저 선택해주세요.');
            return;
        }

        setModifyTranslatorHeaderTitleModalOpen(true);

        dispatchExcelTitleInfo({
            type: 'INIT_DATA',
            payload: {
                downloadHeaderTitle: selectedHeaderTitleState.downloadHeaderTitle,
                uploadHeaderTitle: selectedHeaderTitleState.uploadHeaderTitle,
                rowStartNumber: selectedHeaderTitleState.rowStartNumber
            }
        });
    }

    const onModifyTranslatorHeaderTitleModalClose = () => {
        setModifyTranslatorHeaderTitleModalOpen(false);
    }

    const onChangeInputValue = (e) => {
        dispatchExcelTitleInfo({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    const onActionCreateTranslatorHeaderTitle = async (e) => {
        e.preventDefault();

        // 엑셀 타이틀 정보 설정 (업로드 타이틀, 다운로드 타이틀, 데이터 시작 행)
        let excelHeader = new ExcelTranslatorHeader().toJSON();
        excelHeader = {
            ...excelHeader,
            uploadHeaderTitle: excelTitleInfo.uploadHeaderTitle,
            downloadHeaderTitle: excelTitleInfo.downloadHeaderTitle,
            rowStartNumber: excelTitleInfo.rowStartNumber
        }
        
        await props._onSubmit_createTranslatorHeaderTitle(excelHeader);
        
        // 새로 생성된 타이틀 형식이 선택되도록 설정.
        props.history.replace({
            pathname: pathname,
            search: `?${queryString.stringify({
                ...params,
                headerId: excelHeader.id
            })}`
        })

        onCreateTranslatorHeaderTitleModalClose();
    }

    const onActionModifyTranslatorHeaderTitle = async (e) => {
        e.preventDefault();

        // 엑셀 타이틀 정보 설정 (업로드 타이틀, 다운로드 타이틀, 데이터 시작 행)
        let excelHeader = new ExcelTranslatorHeader().toJSON();
        excelHeader = {
            ...excelHeader,
            id: selectedHeaderTitleState.id,
            uploadHeaderTitle: excelTitleInfo.uploadHeaderTitle,
            downloadHeaderTitle: excelTitleInfo.downloadHeaderTitle,
            rowStartNumber: excelTitleInfo.rowStartNumber
        }

        await props._onSubmit_modifyTranslatorHeaderTitle(excelHeader);
        onModifyTranslatorHeaderTitleModalClose();
    }

    const onActionDeleteTranslatorHeaderTitle = async (e) => {
        e.preventDefault();

        if (!selectedHeaderTitleState) {
            alert('삭제하려는 엑셀 형식을 먼저 선택해주세요.');
            return;
        }

        await props._onAction_deleteTranslatorHeaderTitle(selectedHeaderTitleState.id);

        props.history.replace({
            pathname: pathname
        });
    }
    
    const onActionUploadExcelFile = async (e) => {
        e.preventDefault();

        // 헤더 타이틀을 선택하지 않은 경우
        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        }

        // 파일을 선택하지 않은 경우
        if (e.target.files.length === 0) return;

        let addFiles = e.target.files;

        var uploadedFormData = new FormData();
        uploadedFormData.append('file', addFiles[0]);
        uploadedFormData.append(
            "dto",
            new Blob([JSON.stringify(selectedHeaderTitleState)], { type: "application/json" })
        );

        await props._onSubmit_uploadExcelFile(uploadedFormData);
    }

    const onActionDownloadExcelFile = async (e) => {
        e.preventDefault();

        if (!props.uploadedExcelData) {
            alert('엑셀 파일을 먼저 업로드 해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.uploadHeaderDetail.details.length > 0)) {
            alert('업로드 엑셀 양식을 설정해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.downloadHeaderDetail.details.length > 0)) {
            alert('다운로드 엑셀 양식을 설정해주세요.');
            return;
        }

        await props._onSubmit_downloadExcelFile(selectedHeaderTitleState.downloadHeaderTitle, selectedHeaderTitleState.downloadHeaderDetail.details);

    }
    return (
        <Container>
            <HeaderContainer>
                <TitleSelectorFieldView
                    excelTranslatorHeaderList={props.excelTranslatorHeaderList}
                    selectedHeaderTitleState={selectedHeaderTitleState}

                    onChangeSelectedHeaderTitle={(e) => onChangeSelectedHeaderTitle(e)}
                    onCreateTranslatorHeaderTitleModalOpen={() => onCreateTranslatorHeaderTitleModalOpen()}
                    onCreateTranslatorHeaderTitleModalClose={() => onCreateTranslatorHeaderTitleModalClose()}
                    onModifyTranslatorHeaderTitleModalOpen={() => onModifyTranslatorHeaderTitleModalOpen()}
                    onModifyTranslatorHeaderTitleModalClose={() => onModifyTranslatorHeaderTitleModalClose()}
                    onActionDeleteTranslatorHeaderTitle={(e) => onActionDeleteTranslatorHeaderTitle(e)}
                ></TitleSelectorFieldView>

                <ExcelDataControlFieldView
                    onActionUploadExcelFile={(e) => onActionUploadExcelFile(e)}
                    onActionDownloadExcelFile={(e) => onActionDownloadExcelFile(e)}
                ></ExcelDataControlFieldView>
            </HeaderContainer>

            {/* ExcelTranslatorHeader Create Modal */}
            <CommonModalComponent
                open={createTranslatorHeaderTitleModalOpen}
                onClose={() => onCreateTranslatorHeaderTitleModalClose()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateTranslatorHeaderTitleModalComponent
                    excelTitleInfo={excelTitleInfo}

                    onChangeInputValue={(e) => onChangeInputValue(e)}
                    onActionCreateTranslatorHeaderTitle={(e) => onActionCreateTranslatorHeaderTitle(e)}
                ></CreateTranslatorHeaderTitleModalComponent>
            </CommonModalComponent>

            <CommonModalComponent
                open={modifyTranslatorHeaderTitleModalOpen}
                onClose={() => onModifyTranslatorHeaderTitleModalClose()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <ModifyTranslatorHeaderTitleComponent
                    excelTitleInfo={excelTitleInfo}

                    onChangeInputValue={(e) => onChangeInputValue(e)}
                    onActionModifyTranslatorHeaderTitle={(e) => onActionModifyTranslatorHeaderTitle(e)}
                ></ModifyTranslatorHeaderTitleComponent>
            </CommonModalComponent>
        </Container>
    )
}
export default withRouter(ControlBarComponent);

const initialExcelTitle = null;
const initialSelectedHeaderTitleState = null;

const excelTitleInfoReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const selectedHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}