import { TableFieldWrapper } from "./ExcelTranslatorSearchModal.styled"

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='form-header-box'>
                <div className='form-header-title'>업로드 엑셀 양식 : <span className='title-name'>{props.selectedExcelTranslator.uploadHeaderTitle}</span></div>
                <div className="table-box">
                    <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0', minHeight: '30px' }}>
                        <thead>
                            <tr>
                                {props.selectedExcelTranslator.uploadHeaderDetail?.details?.map((data, idx) => {
                                    return (
                                        <th key={'download_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                            <span>{idx + 1}. </span><span>{data.headerName}</span>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

            <div className='form-header-box'>
                <div className='form-header-title'>다운로드 엑셀 양식 : <span className='title-name'>{props.selectedExcelTranslator.downloadHeaderTitle || '피아르'}</span></div>
                <div className="table-box">
                    <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0', minHeight: '30px' }}>
                        <thead>
                            <tr>
                                <th><span>헤더명</span></th>
                                {props.selectedExcelTranslator.downloadHeaderDetail?.details?.map((data, idx) => {
                                    return (
                                        <th key={'download_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                            <span>{idx + 1}. </span><span>{data.headerName}</span>
                                        </th>
                                    )
                                })}
                                {!props.selectedExcelTranslator &&
                                    props.allowedFields?.map((defaultDetail, idx) => {
                                        return (
                                            <th key={'default_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                                <span>{defaultDetail.originCellName}</span>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>참고 데이터</span></td>
                                {props.selectedExcelTranslator.downloadHeaderDetail?.details?.map((downloadHeader, idx) => {
                                    return (
                                        <>
                                            {parseInt(downloadHeader.targetCellNumber) !== -1 &&
                                                <td key={'download_header_detail_idx' + idx} className="large-cell" scope="col">
                                                    {props.selectedExcelTranslator.uploadHeaderDetail.details.map((uploadHeader) => {
                                                        if (uploadHeader.cellNumber === downloadHeader.targetCellNumber) {
                                                            return (
                                                                <>
                                                                    <div>{uploadHeader.headerName}</div>
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            }
                                            {parseInt(downloadHeader.targetCellNumber) === -1 &&
                                                <td key={'download_header_detail_idx' + idx} className="large-cell" scope="col">
                                                    <span style={{color: '#f00'}}>고정값 : </span> <span>{downloadHeader.fixedValue}</span>
                                                </td>
                                            }
                                        </>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </TableFieldWrapper>
    )
}