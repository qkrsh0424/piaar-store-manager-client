import React from "react";
import { dateToYYYYMMDD, getDayName } from "../../../utils/dateFormatUtils";
import { TableFieldWrapper } from "./SalesPerformanceGraph.styled";

const Colgroup = ({  }) => {
    return (
        <colgroup>
            <col width={'5%'}></col>
            <col width={'15%'}></col>
            <col width={'7%'}></col>
            <col width={'15%'}></col>
            <col width={'15%'}></col>
            <col width={'15%'}></col>
            <col width={'25%'}></col>
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
                <th className="fixed-header" scope="col">총 주문건수</th>
                <th className="fixed-header" scope="col">총 주문수량</th>
                <th className="fixed-header" scope="col">주문건수 당 주문수량</th>
                <th className="fixed-header" scope="col">총 매출액</th>
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
                                <td>{r1.order}건</td>
                                <td>{r1.unit}개</td>
                                <td>{r1.order ? (r1.unit / r1.order).toFixed(2) : 0}</td>
                                <td>{r1.revenue?.toLocaleString()}원</td>
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
                                <td>{r1.order}건</td>
                                <td>{r1.unit}개</td>
                                <td>{r1.order ? (r1.unit / r1.order).toFixed(2) : 0}</td>
                                <td>{r1.revenue?.toLocaleString()}원</td>
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