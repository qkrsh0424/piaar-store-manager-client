import { TableFieldWrapper } from "./DownloadHeaderTable.styled"

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper className="download-header-table">
            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%', marginBottom: '0', minHeight: '30px' }}>
                <thead>
                    <tr>
                        {props.selectedTranslatorHeader?.downloadHeaderDetail?.details?.map((data, idx) => {
                            return (
                                <th key={'download_header_idx' + idx} className="fixed-header large-cell" scope="col">
                                    <span>{idx + 1}. </span><span>{data.headerName}</span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
            </table>
        </TableFieldWrapper>
    )
}