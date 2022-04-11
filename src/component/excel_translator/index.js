import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';
import ControlBarComponent from './control-bar/ControlBar.component';
import UploadDataTableComponent from './upload-data-table/UploadDataTable.component';
import { dateToYYMMDDhhmmss } from './../../handler/dateHandler'

const Container = styled.div`
    background: linear-gradient(to bottom right,#f0fffa,#839edfad);
    padding-bottom: 100px;
`;

class TranslatedData {
    constructor() {
        this.id = uuidv4();
        this.translatedData = {
            details: []
        };
    }

    toJSON() {
        return {
            id: this.id,
            translatedData: this.translatedData,
        }
    }
}

const ExcelTranslatorComponent = () => {

    const [excelTranslatorHeaderList, setExcelTranslatorHeaderList] = useState(null);
    const [uploadedExcelData, setUploadedExcelData] = useState(null);

    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);
    const [isObjectSubmitted, setIsObjectSubmitted] = useState({
        createdHeader: false,
        createdUploadHeader: false,
        createdDownloadHeader: false
    });

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(async () => {
        await __reqSearchExcelTranslatorHeader();
    }, [])

    useEffect(async () => {
        if (dataChangedTrigger) {
            await __reqSearchExcelTranslatorHeader();
        }
        setDataChangedTrigger(false);
    }, [dataChangedTrigger]);

    const __reqSearchExcelTranslatorHeader = async () => {
        await excelTranslatorDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setExcelTranslatorHeaderList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqCreateExcelTranslatorHeaderTitle = async (headerTitle) => {
        await excelTranslatorDataConnect().postOne(headerTitle)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('저장되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            });
    }

    const __reqModifyExcelTranslatorHeaderTitle = async (headerTitle) => {
        await excelTranslatorDataConnect().putOne(headerTitle)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('수정되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            });
    }

    const __reqDeleteExcelTranslatorHeaderTitle = async (headerId) => {
        await excelTranslatorDataConnect().deleteOne(headerId)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('삭제되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            });
    }

    const __reqUploadExcelFile = async (formData) => {
        await excelTranslatorDataConnect().postFile(formData)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    console.log(res.data.data);
                    setUploadedExcelData(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            })
    }

    const __reqDownloadUploadHeaderDetails = async (headerTitle, uploadedDetails) => {
        await excelTranslatorDataConnect().downloadUploadedHeaderDetails(uploadedDetails)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                let date = dateToYYMMDDhhmmss(new Date());

                link.setAttribute('download', '[' + date + ']' + headerTitle + ' 형식 다운로드.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const __reqCreateUploadHeaderDetails = async (uploadHeaderDetails) => {
        await excelTranslatorDataConnect().createUploadHeaderDetail(uploadHeaderDetails)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('완료되었습니다.');
                    setDataChangedTrigger(true);
                    setUploadedExcelData(null);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            })
    }

    const _onSubmit_createTranslatorHeaderTitle = async (headerTitle) => {
        if(!isObjectSubmitted.createdHeader) {
            onActionOpenBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdHeader: true
            });

            await __reqCreateExcelTranslatorHeaderTitle(headerTitle);

            onActionCloseBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdHeader: false
            });
        }
    }

    const _onSubmit_modifyTranslatorHeaderTitle = async (headerTitle) => {
        await __reqModifyExcelTranslatorHeaderTitle(headerTitle);
    }

    const _onAction_deleteTranslatorHeaderTitle = async (headerId) => {
        await __reqDeleteExcelTranslatorHeaderTitle(headerId);
    }

    const _onSubmit_uploadExcelFile = async (formData) => {
        if (!isObjectSubmitted.createdUploadHeader) {
            onActionOpenBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdUploadHeader: true
            });

            await __reqUploadExcelFile(formData);

            onActionCloseBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdUploadHeader: false
            });
        }
    }

    const _onAction_downloadUploadHeaderDetails =  async (headerTitle, uploadHeaderDetails) => {
        onActionOpenBackdrop();
        await __reqDownloadUploadHeaderDetails(headerTitle, uploadHeaderDetails);
        onActionCloseBackdrop();
    }
    
    const _onSubmit_createUploadHeaderDetails = async (uploadHeaderDetails) => {
        onActionOpenBackdrop();
        await __reqCreateUploadHeaderDetails(uploadHeaderDetails);
        onActionCloseBackdrop();
    }

    return (
        <Container>
            <ControlBarComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                _onSubmit_createTranslatorHeaderTitle={(headerTitle) => _onSubmit_createTranslatorHeaderTitle(headerTitle)}
                _onSubmit_modifyTranslatorHeaderTitle={(headerTitle) => _onSubmit_modifyTranslatorHeaderTitle(headerTitle)}
                _onAction_deleteTranslatorHeaderTitle={(headerId) => _onAction_deleteTranslatorHeaderTitle(headerId)}
                _onSubmit_uploadExcelFile={(formData) => _onSubmit_uploadExcelFile(formData)}
            ></ControlBarComponent>

            <UploadDataTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                uploadedExcelData={uploadedExcelData}

                _onAction_downloadUploadHeaderDetails={(headerTitle, uploadHeaderDetails) => _onAction_downloadUploadHeaderDetails(headerTitle, uploadHeaderDetails)}
                _onSubmit_createUploadHeaderDetails={(uploadHeaderDetails) => _onSubmit_createUploadHeaderDetails(uploadHeaderDetails)}
            ></UploadDataTableComponent>

            {/* <DownloadExcelTableComponent></DownloadExcelTableComponent> */}
        </Container>
    )
}

export default ExcelTranslatorComponent;