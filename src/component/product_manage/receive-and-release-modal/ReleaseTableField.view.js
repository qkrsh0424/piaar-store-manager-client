import { dateToYYMMDDhhmmss } from '../../../utils/dateFormatUtils';

import { TableFieldWrapper } from "./ReceiveAndReleaseModal.styled"

export default function ReleaseTableFieldView(props) {
    return (
        <TableFieldWrapper>
            <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                    <tr className="fixed-header receive-header">
                        <th scope="col">
                            <span>출고날짜</span>
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
                            <span>출고개수</span>
                        </th>
                        <th scope="col" className="large-cell">
                            <span>출고메모</span>
                        </th>
                        <th scope="col">
                            <span>출고지</span>
                        </th>
                    </tr>
                </thead>

                <tbody style={{ border: 'none' }}>
                    {props.optionReleaseStatusData?.map((data, idx) => {
                        return (
                            <tr
                                key={'option_receive_status_idx' + idx}
                            >
                                <td className="col">
                                    <span>
                                        {dateToYYMMDDhhmmss(data.release.createdAt)}
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
                                        -{data.release.releaseUnit}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.release.memo}
                                    </span>
                                </td>
                                <td className="col">
                                    <span>
                                        {data.option.releaseLocation}
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