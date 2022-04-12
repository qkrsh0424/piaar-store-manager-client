import { TableFieldWrapper } from "./DownloadDataTable.styled"

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper className="download-header-table">
            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                    <tr>
                        {props.selectedHeaderTitleState?.downloadHeaderDetail?.details.map((data, idx) => {
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