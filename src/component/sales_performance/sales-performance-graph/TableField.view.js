import React from "react";
import { getDayName } from "../../../utils/dateFormatUtils";
import { TableFieldWrapper } from "./SalesPerformanceGraph.styled";

const Colgroup = ({  }) => {
    return (
        <colgroup>
            <col width={'100x'}></col>
            <col width={'200x'}></col>
            <col width={'200px'}></col>
            <col width={'250px'}></col>
            <col width={'250px'}></col>
            <col width={'300px'}></col>
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
                <th className="fixed-header" scope="col">총 매출액</th>
            </tr>
        </thead>
    );
}

const TableBody = ({ tableData }) => {
    return (
        <tbody>
            {tableData.map((r1, r1Index) => {
                return (
                    <React.Fragment key={r1Index}>
                        <tr>
                            <td>{r1Index + 1}</td>
                            <td>{r1.key}</td>
                            <td>{getDayName(r1.key)}</td>
                            <td>{r1.order}</td>
                            <td>{r1.unit}</td>
                            <td>{r1.revenue}</td>
                        </tr>
                    </React.Fragment>
                )
            })}
        </tbody>
    );
}
const TableFieldView = (props) => {
    return (
        <TableFieldWrapper>
            <table cellSpacing="0">
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