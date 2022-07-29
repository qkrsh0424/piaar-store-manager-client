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
            <col width={'100'}></col>
            <col width={'100'}></col>
            <col width={'100'}></col>
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
                <th className="fixed-header" scope="col">W1</th>
                <th className="fixed-header" scope="col">W2</th>
                <th className="fixed-header" scope="col">W3</th>
                <th className="fixed-header" scope="col">W4</th>
                <th className="fixed-header" scope="col">W5</th>
                <th className="fixed-header" scope="col">W6</th>
                <th className="fixed-header" scope="col">W7</th>
                <th className="fixed-header" scope="col">W8</th>
                <th className="fixed-header" scope="col">W9</th>
                <th className="fixed-header" scope="col">W10</th>
                <th className="fixed-header" scope="col">T</th>
            </tr>
        </thead>
    );
}

const week = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11'];
const tableItem = [
    {
        "rowName": "구매",
        "rowMatchItem": "receive"
    },
    {
        "rowName": "판매",
        "rowMatchItem": "release"
    },
    {
        "rowName": "재고",
        "rowMatchItem": "stock"
    },
    {
        "rowName": "재고 주기",
        "rowMatchItem": "cycle"
    }
]

const TableBody = ({ cycleData, outOfStockIdList }) => {
    return (
        <tbody>
            {tableItem.map(item => {
                return (
                    <tr key={item.rowMatchItem}>
                        <td className='fixed-col'>{item.rowName}</td>
                        {week?.map((r, idx) => {
                            let stockCycle = cycleData.stockCycle[week[idx]][item.rowMatchItem];
                            return (
                                <td 
                                    key={`stock_cycle_idx` + idx}
                                    className={`${week[idx] === 'W10' && item.rowMatchItem === 'cycle' 
                                        && outOfStockIdList.includes(cycleData.option.id) && 'highlight-text'}`}
                                >
                                    {stockCycle}
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