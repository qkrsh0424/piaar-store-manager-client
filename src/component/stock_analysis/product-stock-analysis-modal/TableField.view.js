import valueUtils from "../../../utils/valueUtils";
import { TableFieldWrapper } from "./ProductStockAnalysisModal.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0" width={'100%'}>
                    <colgroup>
                        <col width="50" />
                        <col width="150" />
                        <col width="150" />
                        <col width="150" />
                        <col width="100" />
                        <col width="100" />
                        <col width="120" />
                        <col width="120" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="fixed-header">순위</th>
                            <th className="fixed-header">상품명</th>
                            <th className="fixed-header">옵션명</th>
                            <th className="fixed-header">옵션코드</th>
                            <th className="fixed-header">매입총합계</th>
                            <th className="fixed-header">재고수량</th>
                            <th className="fixed-header">재고자산</th>
                            <th className="fixed-header">예상판매매출액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.prodDetailRankList?.map((r, index) => {
                            return (
                                <tr key={'prod-stock-analysis' + index}
                                    className={valueUtils.isRecentlyReleased(r.lastReleasedAt) ? '' : 'bad-stock'} // 최근 7일 동안의 출고 여부 확인
                                >
                                    <td>
                                        <span>{r.optionRank} 위</span>
                                    </td>
                                    <td>
                                        <span>{r.product.defaultName}</span>
                                    </td>
                                    <td>
                                        <span>{r.option.defaultName}</span>
                                    </td>
                                    <td>
                                        <span>{r.option.code}</span>
                                    </td>
                                    <td>
                                        <span>{(r.option.totalPurchasePrice)?.toLocaleString()}원</span>
                                    </td>
                                    <td>
                                        <span>{r.stockSumUnit}</span>
                                    </td>
                                    <td>
                                        <span>{(r.stockProperty)?.toLocaleString()}원</span>
                                    </td>
                                    <td>
                                        <span>{(r.estimatedSalesPrice)?.toLocaleString()}원</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="total-info">
                <div>재고 수량 합계: {props.prodTotalStock.totalStockSumUnit} 개</div>
                <div>재고 자산 합계: {(props.prodTotalStock.totalStockProperty)?.toLocaleString()} 원</div>
                <div>예상 판매 매출액 합계: {(props.prodTotalStock.totalEstimatedSalesPrice)?.toLocaleString()} 원</div>
            </div>
        </TableFieldWrapper>
    )
}