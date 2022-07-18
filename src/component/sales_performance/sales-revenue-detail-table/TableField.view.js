import React from "react";
import { dateToYYYYMMDD, getDayName } from "../../../utils/dateFormatUtils";
import { TableFieldWrapper } from "./SalesRevenueDetailTable.styled";

const Colgroup = ({  }) => {
    return (
        <colgroup>
            <col width={'50'}></col>
            <col width={'200'}></col>
            <col width={'80'}></col>
            <col width={'200'}></col>
            <col width={'200'}></col>
            <col width={'150'}></col>
            <col width={'150'}></col>
            <col width={'150'}></col>
            <col width={'300'}></col>
            <col width={'300'}></col>
            <col width={'300'}></col>
        </colgroup>
    );
}

const TableHead = ({ }) => {
    return (
        <thead>
            <tr>
                <th className="fixed-header" scope="col">#</th>
                <th className="fixed-header" scope="col">날짜</th>
                <th className="fixed-header" scope="col">요일</th>
                <th className="fixed-header" scope="col">총 판매 건 / 주문 건</th>
                <th className="fixed-header" scope="col">총 판매 수량 / 주문 수량</th>
                <th className="fixed-header" scope="col">미판매 수량</th>
                <th className="fixed-header" scope="col">주문 건 당 주문 수량</th>
                <th className="fixed-header" scope="col">판매 건 당 판매 수량</th>
                <th className="fixed-header" scope="col">총 주문 매출액</th>
                <th className="fixed-header" scope="col">총 판매 매출액</th>
                <th className="fixed-header" scope="col">미판매 예상 매출액</th>
            </tr>
        </thead>
    );
}

const TableBody = ({ tableData }) => {
    return (
        <tbody>
            {tableData.map((r1, r1Index) => {
                if (r1Index === 0) {
                    return (
                        <React.Fragment key={r1Index}>
                            <tr className='first-tr'>
                                <td>전체</td>
                                <td>{r1.key}</td>
                                <td>{r1.key}</td>
                                <td>{r1.sales + '건 / ' + r1.order}건</td>
                                <td>{r1.salesUnit + '개 / ' + r1.unit}개</td>
                                <td>{r1.unit - r1.salesUnit}개</td>
                                <td>{r1.order ? (r1.unit / r1.order).toFixed(2) : 0}</td>
                                <td>{r1.sales ? (r1.salesUnit / r1.sales).toFixed(2) : 0}</td>
                                <td>{r1.revenue?.toLocaleString()}원</td>
                                <td>{r1.salesRevenue?.toLocaleString()}원</td>
                                <td>{(r1.revenue - r1.salesRevenue)?.toLocaleString()}원</td>
                            </tr>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment key={r1Index}>
                            <tr>
                                <td>{r1Index}</td>
                                <td>{dateToYYYYMMDD(r1.key)}</td>
                                <td>{getDayName(r1.key)}</td>
                                <td>{r1.sales + '건 / ' + r1.order}건</td>
                                <td>{r1.salesUnit + '개 / ' + r1.unit}개</td>
                                <td>{r1.unit - r1.salesUnit}개</td>
                                <td>{r1.order ? (r1.unit / r1.order).toFixed(2) : 0}</td>
                                <td>{r1.sales ? (r1.salesUnit / r1.sales).toFixed(2) : 0}</td>
                                <td>{r1.revenue?.toLocaleString()}원</td>
                                <td>{r1.salesRevenue?.toLocaleString()}원</td>
                                <td>{(r1.revenue - r1.salesRevenue)?.toLocaleString()}원</td>
                            </tr>
                        </React.Fragment>
                    )
                }
            })}
        </tbody>
    );
}
const TableFieldView = (props) => {
    return (
        <TableFieldWrapper>
            <table cellSpacing="0" width='100%'>
                <Colgroup></Colgroup>
                <TableHead></TableHead>
                <TableBody
                    tableData={props.tableData}
                ></TableBody>
            </table>
        </TableFieldWrapper>
    );
}
export default TableFieldView;