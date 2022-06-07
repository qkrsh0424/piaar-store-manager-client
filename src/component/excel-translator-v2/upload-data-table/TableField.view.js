import { TableFieldWrapper } from "./UploadDataTable.styled"
import { dateToYYMMDDhhmmss } from "../../../utils/dateFormatUtils"

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            {props.selectedTranslatorHeader &&
                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                    <thead>
                        <tr>
                            {props.selectedTranslatorHeader?.uploadHeaderDetail?.details?.map((data, idx) => {
                                return (
                                    <th key={'upload_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                        <span>{data.headerName}</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    {props.uploadedExcelData && props.uploadedExcelData.length > 0 &&
                        <tbody style={{ border: 'none' }}>
                            {props.uploadedExcelData?.slice(1)?.map((data, idx) => {
                                return (
                                    <tr
                                        key={'upload_exel_data_idx' + idx}
                                    >
                                        {data.uploadedData.details.map((detailData, detailIdx) => {
                                            return (
                                                <td key={'upload_excel_data_detail_idx' + detailIdx} className="col">
                                                    <span>{detailData.cellType === 'Date' ? dateToYYMMDDhhmmss(detailData.colData) : detailData.colData}</span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    }
                </table>
            }

            {!props.selectedTranslatorHeader &&
                (
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: '500',
                            marginTop: '50px'
                        }}
                    >
                        엑셀 형식을 먼저 선택해 주세요.
                    </div>
                )
            }
            {props.selectedTranslatorHeader?.uploadHeaderDetail.details.length <= 0 &&
                (
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: '500',
                            marginTop: '50px'
                        }}
                    >
                        업로드 엑셀 양식을 먼저 선택해 주세요.
                    </div>
                )
            }
        </TableFieldWrapper>
    )
}