import React from "react";
import { dateToYYMMDDhhmmss } from "../../../../utils/dateFormatUtils";
import { StockStatusFieldWrapper } from "./SearchProductReceiveAndReleaseModal.styled";

export default function ReleaseStatusTableFieldView(props) {
    return (
        <StockStatusFieldWrapper>
            <table className="table table-sm" stlye={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        <th className='fixed-header' scope="col" width='100'>출고일시</th>
                        <th className='fixed-header' scope="col" width='100'>상품명</th>
                        <th className='fixed-header' scope="col" width='100'>옵션명</th>
                        <th className='fixed-header' scope="col" width='100'>옵션코드</th>
                        <th className='fixed-header' scope="col" width='50' style={{ color: '#292be4' }}>출고량</th>
                        <th className='fixed-header' scope="col" width='100'>출고메모</th>
                        <th className='fixed-header' scope="col" width='100'>출고지</th>
                    </tr>
                </thead>

                <tbody style={{ borderTop: 'none'}}>
                    {props.optionReleaseStatus?.length === 0 && <tr><td colSpan={7}>출고 내역이 없습니다.</td></tr>}
                    {props.optionReleaseStatus?.map((r, idx) => {
                        let tdBackgroundColor = (idx % 2 === 1) ? '#f7f7f7' : '#ffffff';

                        return (
                            <React.Fragment key={idx}>
                                <tr style={{ backgroundColor: tdBackgroundColor }}>
                                    <td>
                                        {dateToYYMMDDhhmmss(r.productRelease.createdAt)}
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
                                        {r.productRelease.releaseUnit}
                                    </td>
                                    <td>
                                        {r.productRelease.memo}
                                    </td>
                                    <td>
                                        {r.productOption.releaseLocation}
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