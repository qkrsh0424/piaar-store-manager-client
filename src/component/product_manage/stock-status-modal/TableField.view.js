import { dateToYYMMDDhhmmss } from "../../../utils/dateFormatUtils"
import { TableFieldWrapper } from "./StockStatusModal.styled"

export default function TableFieldView(props) {
    return(
        <TableFieldWrapper>
            <div className="status-box">
                <span className="receive-box">입고</span>
                <span className="release-box">출고</span>
            </div>
            <div>
                <li className="input-group">
                    <div className="form-control form-title">
                        <span>입출고 날짜</span>
                    </div>
                    <div className="form-control form-title">
                        <span>입출고 개수</span>
                    </div>
                    <div className="form-control form-title status-memo">
                        <span>메모</span>
                    </div>
                    <div className="form-control form-title">
                        <span>재고현황</span>
                    </div>
                </li>

                <div className="data-container">
                    {props.stockStatusListData?.map((data) => {
                        return (
                            <li
                                key={data.id}
                                className={data.releaseUnit ? 'release-list' : 'receive-list'}
                            >
                                <div>
                                    <span>
                                        {dateToYYMMDDhhmmss(data.createdAt)}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        {data.receiveUnit ? `+` + data.receiveUnit : `-` + data.releaseUnit}
                                    </span>
                                </div>
                                <div className="status-memo" onClick={(e) => props.onActionOpenModifyMemoModal(e, data)}>
                                    <span>
                                        {data.memo}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        {data.currentStock}
                                    </span>
                                </div>
                            </li>
                        )
                    })}
                </div>
            </div>
        </TableFieldWrapper>
    )
}