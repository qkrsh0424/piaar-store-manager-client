import { TableFieldWrapper, RankIcon } from "./RankTable.styled"
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import valueUtils from "../../../utils/valueUtils";
import SortButton from "../../module/button/SortButton";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='total-stock-property'>
                <span className='total-stock-info'>총 재고수량: {props.totalStockInfo?.totalStockSumUnit}개</span>
                <span className='total-stock-info'>총 재고자산: {(props.totalStockInfo?.totalStockProperty)?.toLocaleString()}원</span>
                <span className='total-stock-info'>총 예상판매매출액: {(props.totalStockInfo?.totalEstimatedSalesPrice)?.toLocaleString()}원</span>
            </div>
            <div className='table-box'>
                <table cellSpacing="0" width="100%">
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
                            <th className="fixed-header">
                                <div>순위</div>
                            </th>
                            <th className="fixed-header">
                                <div>상품명</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='product.defaultName'
                                    ></SortButton>
                                </div>
                            </th>
                            <th className="fixed-header">
                                <div>옵션명</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='option.defaultName'
                                    ></SortButton>
                                </div>
                            </th>
                            <th className="fixed-header">
                                <div>옵션코드</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='option.code'
                                    ></SortButton>
                                </div>
                            </th>
                            <th className="fixed-header">
                                <div>매입총합계</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='option.totalPurchasePrice'
                                    ></SortButton>
                                </div>    
                            </th>
                            <th className="fixed-header">
                                <div>재고수량</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='stockSumUnit'
                                    ></SortButton>
                                </div>    
                            </th>
                            <th className="fixed-header">
                                <div>재고자산</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='stockProperty'
                                    ></SortButton>
                                </div>  
                            </th>
                            <th className="fixed-header">
                                <div>예상판매매출액</div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint='estimatedSalesPrice'
                                    ></SortButton>
                                </div>  
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.stockAnalysisViewList?.map((r, index) => {
                            return (
                                <tr key={'stock-analysis-item' + index}
                                    className={valueUtils.isRecentlyReleased(r.lastReleasedAt) ? 'bad-stock' : ''} // 최근 1달 동안의 출고 여부 확인
                                    onClick={() => props.onActionOpenProductStockAnalysisModal(r.product.id)}
                                >
                                    <td>
                                        <span>{index + 1} 위</span>
                                        {index < 3 && <RankIcon rank={index + 1}><MilitaryTechIcon /></RankIcon>}
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
        </TableFieldWrapper>
    )
}