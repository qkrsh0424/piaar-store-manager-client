import { TableFieldWrapper } from "./ProductSalesAnalysisModal.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0">
                    <colgroup>
                        <col width="10%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="fixed-header" width='100'>통합순위</th>
                            <th className="fixed-header" width='100'>상품명</th>
                            <th className="fixed-header" width='100'>옵션명</th>
                            <th className="fixed-header" width='100'>옵션코드</th>
                            <th className="fixed-header" width='100'>판매 수량</th>
                            <th className="fixed-header" width='100'>매출</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.prodDetailRankList?.map((r, index) => {
                            return (
                                <tr key={'prod-sales-analysis' + index}>
                                    <td>
                                        <span>{r.optionRank} 위</span>
                                    </td>
                                    <td>
                                        <span>{r.salesProdManagementName}</span>
                                    </td>
                                    <td>
                                        <span>{r.salesOptionManagementName}</span>
                                    </td>
                                    <td>
                                        <span>{r.salesOptionCode}</span>
                                    </td>
                                    <td>
                                        <span>{r[props.searchInfoState?.storeSalesUnit]}</span>
                                    </td>
                                    <td>
                                        <span>{(r.salesOptionPrice * r[props.searchInfoState?.storeSalesUnit])?.toLocaleString()}원</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="total-info">
                <div>수량 합계: {props.prodTotalSales?.totalUnit} 개</div>
                <div>매출 합계: {props.prodTotalSales?.totalRevenue} 원</div>
            </div>
        </TableFieldWrapper>
    )
}