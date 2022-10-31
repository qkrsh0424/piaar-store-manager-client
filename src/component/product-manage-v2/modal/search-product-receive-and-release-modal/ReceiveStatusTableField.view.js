import React from "react";
import { dateToYYMMDDhhmmss } from "../../../../utils/dateFormatUtils";
import { StockStatusFieldWrapper } from "./SearchProductReceiveAndReleaseModal.styled";

export default function ReceiveStatusTableFieldView(props) {
    return (
        <StockStatusFieldWrapper>
            <table className="table table-sm" stlye={{ tableLayout: 'fixed', backgroundColor: 'white', width: '100%' }}>
                <thead>
                    <tr>
                        <th className='fixed-header' scope="col" width='150'>입고일시</th>
                        <th className='fixed-header' scope="col" width='150'>상품명</th>
                        <th className='fixed-header' scope="col" width='150'>옵션명</th>
                        <th className='fixed-header' scope="col" width='150'>옵션코드</th>
                        <th className='fixed-header' scope="col" width='100' style={{ color: '#292be4' }}>입고량</th>
                        <th className='fixed-header' scope="col" width='150'>입고메모</th>
                    </tr>
                </thead>

                <tbody style={{ borderTop: 'none'}}>
                    {props.optionReceiveStatus?.length === 0 && <tr><td colSpan={6}>입고 내역이 없습니다.</td></tr>}
                    {props.optionReceiveStatus?.map((r, idx) => {
                        let tdBackgroundColor = (idx % 2 === 1) ? '#f7f7f7' : '#ffffff';

                        return (
                            <React.Fragment key={idx}>
                                <tr style={{ backgroundColor: tdBackgroundColor }}>
                                    <td>
                                        {dateToYYMMDDhhmmss(r.productReceive.createdAt)}
                                    </td>
                                    <td>
                                        {r.product.defaultName}
                                    </td>
                                    <td>
                                        {r.productOption.defaultName}
                                    </td>
                                    <td>
                                        {r.productOption.code}
                                    </td>
                                    <td>
                                        {r.productReceive.receiveUnit}
                                    </td>
                                    <td>
                                        {r.productReceive.memo}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}

                </tbody>
            </table>
        </StockStatusFieldWrapper>
    )
}