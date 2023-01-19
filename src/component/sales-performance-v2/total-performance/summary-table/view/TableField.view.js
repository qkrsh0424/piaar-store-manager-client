import { dateToYYYYMMDD, getDayName } from "../../../../../utils/dateFormatUtils";
import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import { TableFieldWrapper } from "../SummaryTable.styled";

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th className='fixed-header' scope='col' width={70}>#</th>
                <th className='fixed-header' scope='col' width={150}>날짜</th>
                <th className='fixed-header' scope='col' width={70}>요일</th>
                <th className='fixed-header' scope='col' width={200}>총 주문매출</th>
                <th className='fixed-header' scope='col' width={200}>총 판매매출</th>
                <th className='fixed-header' scope='col' width={200}>미판매 예상 매출액</th>
                <th className='fixed-header' scope='col' width={200}>총 판매 / 주문 건</th>
                <th className='fixed-header' scope='col' width={200}>총 판매 / 주문 수량</th>
                <th className='fixed-header' scope='col' width={200}>미판매 수량</th>
            </tr>
        </thead>
    )
}
export default function TableFieldView (props) {
    return (
        <TableFieldWrapper>
            <div className='table-wrapper'>
                <table width='100%'>
                    <TableHead></TableHead>
                    <tbody>
                        {props.totalSummarySumData &&
                            <tr className='first-tr'>
                                <td>전체</td>
                                <td>전체</td>
                                <td>전체</td>
                                <td className='highlight-td'>{toPriceUnitFormat(props.totalSummarySumData.orderPayAmount)}</td>
                                <td className='highlight-td' style={{ color: 'var(--erp-main-color)' }}>{toPriceUnitFormat(props.totalSummarySumData.salesPayAmount)}</td>
                                <td className='highlight-td' style={{ color: '#ff3060' }}>{toPriceUnitFormat(props.totalSummarySumData.unsalesPayAmount)}</td>
                                <td>{props.totalSummarySumData.salesRegistration} / {props.totalSummarySumData.orderRegistration} 건</td>
                                <td>{props.totalSummarySumData.salesUnit} / {props.totalSummarySumData.orderUnit} 개</td>
                                <td>{props.totalSummarySumData.unsalesUnit} 개</td>
                            </tr>
                        }
                        {props.summaryTableData?.map((r, idx) => {
                            return (
                                <tr key={'table-tr-idx' + idx}>
                                    <td>{idx+1}</td>
                                    <td>{dateToYYYYMMDD(r.datetime)}</td>
                                    <td>{getDayName(r.datetime)}</td>
                                    <td className='highlight-td'>{toPriceUnitFormat(r.orderPayAmount)}</td>
                                    <td className='highlight-td' style={{ color: 'var(--erp-main-color)' }}>{toPriceUnitFormat(r.salesPayAmount)}</td>
                                    <td className='highlight-td' style={{ color: '#ff3060' }}>{toPriceUnitFormat(r.unsalesPayAmount)}</td>
                                    <td>{r.salesRegistration} / {r.orderRegistration} 건</td>
                                    <td>{r.salesUnit} / {r.orderUnit} 개</td>
                                    <td>{r.unsalesUnit} 개</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}