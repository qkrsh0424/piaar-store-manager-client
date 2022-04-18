import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
// import { withRouter } from 'react-router';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';
import ControlBarComponent from './control-bar/ControlBar.component';
import UploadDataTableComponent from './upload-data-table/UploadDataTable.component';
import { dateToYYMMDDhhmmss } from './../../utils/dateFormatUtils'
import DownloadDataTableComponent from './download-header-table/DownloadDataTable.component';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
    let params = queryString.parse(location.search);

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

    useEffect(() => {
        async function fetchInit(){
            await __reqSearchExcelTranslatorHeader();
        }
        fetchInit();
    }, [])

    useEffect(() => {
        async function searchHeader() {
            if (dataChangedTrigger) {
                await __reqSearchExcelTranslatorHeader();
            }
            setDataChangedTrigger(false);
        }
        searchHeader();
    }, [dataChangedTrigger]);

    useEffect(() => {
        if(!params.headerId) {
            return;
        }

        setUploadedExcelData(null);
    }, [params.headerId])

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
                    setUploadedExcelData(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.message);
            })
    }

    const __reqDownloadExcelFile = async (headerTitle, translatedDetails) => {
        await excelTranslatorDataConnect().downloadTranslatedExcelFile(translatedDetails)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                let date = dateToYYMMDDhhmmss(new Date());

                link.setAttribute('download', '[' + date + ']' + headerTitle + ' 다운로드.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                console.log(err);
            });
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
                let res = err.response;
                alert(res?.data?.message);
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

    const __reqCreateDownloadHeaderDetails = async (downloadHeaderDetails) => {
        await excelTranslatorDataConnect().createDownloadHeaderDetails(downloadHeaderDetails)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('저장되었습니다.');
                    setDataChangedTrigger(true);
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

    const _onSubmit_downloadExcelFile = async (headerTitle, downloadHeaderDetail) => {
        // 다운로드 양식으로 변경
        let excelData = downloadHeaderDetail.map(r => {
            return uploadedExcelData.map((data, idx) => {
                if (idx === 0) {
                    // 다운로드 헤더 이름 설정
                    let details = {
                        colData: r.headerName,
                        cellType: 'String'
                    }
                    return details;
                } else {
                    // 고정값 컬럼이라면
                    if (r.targetCellNumber === -1) {
                        let details = {
                            colData: r.fixedValue,
                            cellType: 'String'
                        };
                        return details;
                    } else {
                        return data.uploadedData.details[r.targetCellNumber];
                    }
                }
            });
        });

        // dto로 변경
        let translatedDetail = excelData.map(r => {
            let data = new TranslatedData().toJSON();
            data.translatedData.details = r;
            return data;
        })

        if(!isObjectSubmitted.createdDownloadHeader) {
            onActionOpenBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdDownloadHeader: true
            });

            await __reqDownloadExcelFile(headerTitle, translatedDetail);

            onActionCloseBackdrop();
            setIsObjectSubmitted({
                ...isObjectSubmitted,
                createdDownloadHeader: false
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

    const _onSubmit_storeDownloadHeaderDetail = async (downloadHeaderDetails) => {
        onActionOpenBackdrop();
        await __reqCreateDownloadHeaderDetails(downloadHeaderDetails);
        onActionCloseBackdrop();
    }

    return (
        <Container>
            <ControlBarComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                uploadedExcelData={uploadedExcelData}

                _onSubmit_createTranslatorHeaderTitle={(headerTitle) => _onSubmit_createTranslatorHeaderTitle(headerTitle)}
                _onSubmit_modifyTranslatorHeaderTitle={(headerTitle) => _onSubmit_modifyTranslatorHeaderTitle(headerTitle)}
                _onAction_deleteTranslatorHeaderTitle={(headerId) => _onAction_deleteTranslatorHeaderTitle(headerId)}
                _onSubmit_uploadExcelFile={(formData) => _onSubmit_uploadExcelFile(formData)}
                _onSubmit_downloadExcelFile={(title, details) => _onSubmit_downloadExcelFile(title, details)}
            ></ControlBarComponent>

            <UploadDataTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                uploadedExcelData={uploadedExcelData}

                _onAction_downloadUploadHeaderDetails={(headerTitle, uploadHeaderDetails) => _onAction_downloadUploadHeaderDetails(headerTitle, uploadHeaderDetails)}
                _onSubmit_createUploadHeaderDetails={(uploadHeaderDetails) => _onSubmit_createUploadHeaderDetails(uploadHeaderDetails)}
            ></UploadDataTableComponent>

            <DownloadDataTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                _onSubmit_storeDownloadHeaderDetail={(downloadHeaderDetails) => _onSubmit_storeDownloadHeaderDetail(downloadHeaderDetails)}
            ></DownloadDataTableComponent>
        </Container>
    )
}

export default ExcelTranslatorComponent;