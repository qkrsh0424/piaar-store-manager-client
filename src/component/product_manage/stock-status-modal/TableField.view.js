import { dateToYYMMDDhhmmss } from "../../../utils/dateFormatUtils"
import { TableFieldWrapper } from "./StockStatusModal.styled"

export default function TableFieldView(props) {
    return(
        <TableFieldWrapper>
            <div className="status-box">
                <span className="receive-box">입고</span>
                <span className="release-box">출고</span>
            </div>
            <div className='table-container'>
                <table className='table table-sm' style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="fixed-header">
                            <th scope='col' width='250'>
                                <span>입출고 날짜</span>
                            </th>
                            <th scope='col' width='150'>
                                <span>입출고 개수</span>
                            </th>
                            <th scope='col' width='300' className='status-memo'>
                                <span>메모</span>
                            </th>
                            <th scope='col' width='150'>
                                <span>재고현황</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="data-container">
                        {props.stockStatusListData?.map((data) => {
                            return (
                                <tr
                                    key={data.id}
                                    className={data.releaseUnit ? 'release-list' : 'receive-list'}
                                >
                                    <td>
                                        <span>
                                            {dateToYYMMDDhhmmss(data.createdAt)}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {data.receiveUnit ? `+` + data.receiveUnit : `-` + data.releaseUnit}
                                        </span>
                                    </td>
                                    <td className="status-memo" onClick={(e) => props.onActionOpenModifyMemoModal(e, data)}>
                                        <span>
                                            {data.memo}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {data.currentStock}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}