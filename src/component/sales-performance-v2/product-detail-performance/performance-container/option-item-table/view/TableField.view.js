import React from "react";
import { toPriceUnitFormat } from "../../../../../../utils/numberFormatUtils";
import { TableFieldWrapper } from "../OptionItemTable.styled";

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th className='fixed-header' scope='col' width={70}>#</th>
                <th className='fixed-header' scope='col' width={150}>상품명</th>
                <th className='fixed-header' scope='col' width={200}>옵션명</th>
                <th className='fixed-header' scope='col' width={150}>판매매출</th>
                <th className='fixed-header' scope='col' width={100}>판매 수량</th>
                <th className='fixed-header' scope='col' width={150}>미판매 매출</th>
                <th className='fixed-header' scope='col' width={100}>미판매 수량</th>
            </tr>
        </thead>
    )
}

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-wrapper'>
                <table className='table'>
                    <TableHead />
                    <tbody style={{ borderTop: 'none' }}>
                        {props.tableData?.map((r, idx) => {
                            let tdBackgroundColor = (idx % 2 === 1) ? '#f7f7f7' : '#ffffff';
                            let rowSpanSize = r.performance.length + 1;

                            return (
                                <React.Fragment key={idx}>
                                    <tr
                                        style={{ fontWeight: '600', backgroundColor: tdBackgroundColor, borderBottom: '1px solid rgb(224 224 224)' }}
                                        className='rowSpan'
                                    >
                                        <td
                                            rowSpan={rowSpanSize}
                                        >
                                            [{idx+1}]
                                        </td>
                                        <td
                                            rowSpan={rowSpanSize}
                                            style={{ borderRight: '1px solid rgb(224 224 224)', backgroundColor: tdBackgroundColor }}
                                        >
                                            {r.productDefaultName}
                                        </td>
                                    </tr>
                                    {r.performance?.map((r2, idx2) => {
                                        return (
                                            <tr
                                                key={'option-data-idx' + idx2}
                                                className='item-tr'
                                            >
                                                <td>{r2.optionDefaultName}</td>
                                                <td>{toPriceUnitFormat(r2.salesPayAmount)}</td>
                                                <td>{r2.salesUnit}</td>
                                                <td>{toPriceUnitFormat(r2.orderPayAmount - r2.salesPayAmount)}</td>
                                                <td>{r2.orderUnit - r2.salesUnit}</td>
                                            </tr>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}