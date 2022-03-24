import { TableFieldWrapper } from "./RankTable.styled"
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0">
                    <colgroup>
                        <col width={'300px'}></col>
                        <col width={'300px'}></col>
                        <col width={'300px'}></col>
                        <col width={'300px'}></col>
                        <col width={'300px'}></col>
                        <col width={'300px'}></col>
                    </colgroup>
                    <thead className="table-header-container">
                        <tr>
                            <th className="fixed-header">통합순위</th>
                            <th className="fixed-header">상품명</th>
                            <th className="fixed-header">옵션명</th>
                            <th className="fixed-header">옵션코드</th>
                            <th className="fixed-header">판매 수량</th>
                            <th className="fixed-header">매출</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.salesAnalysisViewItems?.map((r, index) => {
                            return (
                                <tr key={'sales-analysis-item' + index}
                                    className="table-body-container"
                                    // onClick={() => onSearchProductDetailSalesAnalysisModalOpen(r.salesProductId)}
                                >
                                    <td>
                                        <span>{index + 1} 위</span>
                                        {index < 3 && <span rank={index + 1} className="medal-icon"><MilitaryTechIcon /></span>}
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
                                        <span>{(r.salesOptionPrice * r[props.searchInfoState?.storeSalesUnit]).toLocaleString()}원</span>
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