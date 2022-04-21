import { TableFieldWrapper } from "./UploadDataTable.styled"
import { dateToYYMMDDhhmmss } from "../../../utils/dateFormatUtils"

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                    <tr>
                        {props.uploadedExcelHeaderDataState?.map((data, idx) => {
                            return (
                                <th key={'upload_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                    <span>{data.colData}</span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody style={{ border: 'none' }}>
                    {props.uploadedExcelDataState?.map((data, idx) => {
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
            </table>
        </TableFieldWrapper>
    )
}