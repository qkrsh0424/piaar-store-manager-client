import { dateToYYMMDDhhmmss } from '../../../utils/dateFormatUtils';

import { TableFieldWrapper } from "./ReceiveAndReleaseModal.styled"

export default function ReceiveTableFieldView(props) {
    return (
        <TableFieldWrapper>
            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                    <tr className="fixed-header receive-header">
                        <th scope="col">
                            <span>입고날짜</span>
                        </th>
                        <th scope="col">
                            <span>상품명</span>
                        </th>
                        <th scope="col">
                            <span>옵션명</span>
                        </th>
                        <th scope="col">
                            <span>옵션관리코드</span>
                        </th>
                        <th scope="col">
                            <span>입고개수</span>
                        </th>
                        <th scope="col" className="large-cell">
                            <span>입고메모</span>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ border: 'none' }}>
                    {props.optionReceiveStatusData?.map((data, idx) => {
                        return (
                            <tr
                                key={'option_receive_status_idx' + idx}
                            >
                                <td className="col">
                                    <span>
                                        {console.log(data.receive)}
                                        {dateToYYMMDDhhmmss(data.receive.createdAt)}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.product.defaultName}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.option.defaultName}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.option.code}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        +{data.receive.receiveUnit}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.receive.memo}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </TableFieldWrapper>
    )
}