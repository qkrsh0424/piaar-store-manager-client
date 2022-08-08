import React from "react";
import { TableFieldWrapper } from "./OptionStockCycle.styled";

const Colgroup = ({  }) => {
    return (
        <colgroup>
            <col width={'80'}></col>
            <col width={'100'}></col>
            <col width={'100'}></col>
            <col width={'100'}></col>
            <col width={'100'}></col>
        </colgroup>
    );
}

const TableHead = ({ }) => {
    return (
        <thead>
            <tr>
                <th className="fixed-header" scope="col">유형</th>
                <th className="fixed-header" scope="col">W4</th>
                <th className="fixed-header" scope="col">W3</th>
                <th className="fixed-header" scope="col">W2</th>
                <th className="fixed-header" scope="col">W1</th>
            </tr>
        </thead>
    );
}

const tableItem = [
    {
        "rowName": "구매",
        "rowMatchItem": "receiveForW"
    },
    {
        "rowName": "판매",
        "rowMatchItem": "releaseForW"
    },
    {
        "rowName": "재고",
        "rowMatchItem": "stockForW"
    },
    {
        "rowName": "재고 주기",
        "rowMatchItem": "cycleForW"
    }
]

const CYCLE_VIEW_WEEK = 4;

const TableBody = ({ cycleData, outOfStockIdList }) => {
    return (
        <tbody>
            {tableItem.map(item => {
                return (
                    <tr key={item.rowMatchItem}>
                        <td className='fixed-col'>{item.rowName}</td>
                        {[...Array(CYCLE_VIEW_WEEK)].map((r, idx) => {
                            let isOutOfStock = (idx === 3 && item.rowMatchItem === 'cycleForW' && outOfStockIdList.includes(cycleData.optionId));
                            return(
                                <td key={'stock-cycle-idx' + idx}
                                    className={`${isOutOfStock && 'highlight-text'}`}
                                >
                                    {cycleData[item.rowMatchItem + (4 - idx)]}
                                </td>
                            )
                        })}
                    </tr>
                )
            })
        }
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
                    cycleData={props.cycleData}
                    outOfStockIdList={props.outOfStockIdList}
                    addOutOfStockList={props.addOutOfStockList}
                ></TableBody>
            </table>
        </TableFieldWrapper>
    );
}
export default TableFieldView;