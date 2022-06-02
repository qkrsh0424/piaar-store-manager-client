import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';
import ControlBarComponent from './control-bar/ControlBar.component';
import UploadDataTableComponent from './upload-data-table/UploadDataTable.component';
import { dateToYYMMDDhhmmss } from '../../utils/dateFormatUtils'
import DownloadHeaderTableComponent from './download-header-table/DownloadHeaderTable.component';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadHeaderTableComponent from './upload-header-table/UploadHeaderTable.component';

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
    const navigate = useNavigate();
    let pathname = location.pathname;
    let params = queryString.parse(location.search);

    const [excelTranslatorHeaderList, setExcelTranslatorHeaderList] = useState(null);
    const [uploadedExcelData, setUploadedExcelData] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            await __excelTranslatorHeaderList.req.fetch();
        }
        fetchInit();
    }, [location]);

    useEffect(() => {
        setUploadedExcelData(null);
    }, [location, excelTranslatorHeaderList]);

    const __excelTranslatorHeaderList = {
        req: {
            fetch: async () => {
                await excelTranslatorDataConnect().searchList()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelTranslatorHeaderList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    });
            },
            create: async (body) => {
                await excelTranslatorDataConnect().postOne(body)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    });
            },
            modify: async (body) => {
                await excelTranslatorDataConnect().putOne(body)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('수정되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    });
            },
            delete: async (headerId) => {
                await excelTranslatorDataConnect().deleteOne(headerId)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('삭제되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    });
            },
            updateUploadHeaderDetails: async (uploadHeaderDetails) => {
                await excelTranslatorDataConnect().createUploadHeaderDetail(uploadHeaderDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('완료되었습니다.');
                            setUploadedExcelData(null);
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            },
            updateDownloadHeaderDetails: async (downloadHeaderDetails) => {
                await excelTranslatorDataConnect().createDownloadHeaderDetails(downloadHeaderDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            },
            downloadExcelFormSample: async (title, headerDetails) => {
                await excelTranslatorDataConnect().downloadUploadedHeaderDetails(headerDetails)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDDhhmmss(new Date());

                        link.setAttribute('download', '[' + date + ']' + title + ' 형식 다운로드.xlsx');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            create: async (body) => {
                onActionOpenBackdrop();

                await __excelTranslatorHeaderList.req.create(body);

                navigate(
                    {
                        pathname: pathname,
                        search: `?${queryString.stringify({
                            ...params,
                            headerId: body.id
                        })}`
                    },
                    {
                        replace: true
                    }
                )
                onActionCloseBackdrop();
            },
            modify: async (body) => {
                onActionOpenBackdrop();
                await __excelTranslatorHeaderList.req.modify(body);
                await __excelTranslatorHeaderList.req.fetch();
                onActionCloseBackdrop();
            },
            delete: async (headerId) => {
                onActionOpenBackdrop();
                await __excelTranslatorHeaderList.req.delete(headerId);

                navigate(
                    {
                        pathname: pathname
                    },
                    {
                        replace: true
                    }
                )

                onActionCloseBackdrop();
            },
            updateUploadHeaderDetails: async (uploadHeaderDetails) => {
                onActionOpenBackdrop();
                await __excelTranslatorHeaderList.req.updateUploadHeaderDetails(uploadHeaderDetails);
                await __excelTranslatorHeaderList.req.fetch();
                onActionCloseBackdrop();
            },
            updateDownloadHeaderDetails: async (downloadHeaderDetails) => {
                onActionOpenBackdrop();
                await __excelTranslatorHeaderList.req.updateDownloadHeaderDetails(downloadHeaderDetails);
                await __excelTranslatorHeaderList.req.fetch();
                onActionCloseBackdrop();
            }
        },
        action: {
            downloadExcelFormSample: async (title, headerDetails) => {
                onActionOpenBackdrop();
                await __excelTranslatorHeaderList.req.downloadExcelFormSample(title, headerDetails);
                onActionCloseBackdrop();
            }
        }
    }

    const __uploadedExcelData = {
        req: {
            uploadExcelFile: async (formData) => {
                await excelTranslatorDataConnect().postFile(formData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setUploadedExcelData(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            },
            downloadExcelFile: async (title, details) => {
                await excelTranslatorDataConnect().downloadTranslatedExcelFile(details)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        let date = dateToYYMMDDhhmmss(new Date());

                        link.setAttribute('download', '[' + date + ']' + title + ' 다운로드.xlsx');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    });
            }
        },
        action: {
            uploadExcelFile: async (formData) => {
                onActionOpenBackdrop();
                await __uploadedExcelData.req.uploadExcelFile(formData);
                onActionCloseBackdrop();
            },
            downloadExcelFile: async (title, details) => {
                onActionOpenBackdrop();
                // 다운로드 양식으로 변경
                let excelData = details.map(r => {
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
                let translatedDetails = excelData.map(r => {
                    let data = new TranslatedData().toJSON();
                    data.translatedData.details = r;
                    return data;
                })

                await __uploadedExcelData.req.downloadExcelFile(title, translatedDetails);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <Container>
            <ControlBarComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                onSubmitCreateTranslatorHeader={(body) => __excelTranslatorHeaderList.submit.create(body)}
                onSubmitModifyExcelTranslatorHeader={(body) => __excelTranslatorHeaderList.submit.modify(body)}
                onSubmitDeleteExcelTranslatorHeader={(headerId) => __excelTranslatorHeaderList.submit.delete(headerId)}
            />

            <UploadHeaderTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                onSubmitUpdateUploadHeaderDetails={(uploadHeaderDetails) => __excelTranslatorHeaderList.submit.updateUploadHeaderDetails(uploadHeaderDetails)}
                onActionDownloadExcelForm={(headerTitle, uploadHeaderDetails) => __excelTranslatorHeaderList.action.downloadExcelFormSample(headerTitle, uploadHeaderDetails)}
            />

            <DownloadHeaderTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                onSubmitUpdateDownloadHeaderDetails={(downloadHeaderDetails) => __excelTranslatorHeaderList.submit.updateDownloadHeaderDetails(downloadHeaderDetails)}
                onActionDownloadExcelForm={(headerTitle, uploadHeaderDetails) => __excelTranslatorHeaderList.action.downloadExcelFormSample(headerTitle, uploadHeaderDetails)}
            />

            <UploadDataTableComponent
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                uploadedExcelData={uploadedExcelData}

                onActionUploadExcelFile={(formData) => __uploadedExcelData.action.uploadExcelFile(formData)}
                onActionDownloadExcelFile={(title, details) => __uploadedExcelData.action.downloadExcelFile(title, details)}
            />

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ExcelTranslatorComponent;