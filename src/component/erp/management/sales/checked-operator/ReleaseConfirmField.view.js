import ResizableTh from "../../../../module/table/ResizableTh";
import { ReleaseConfirmFieldWrapper, TableFieldWrapper } from "./CheckedOperator.styled";

export default function ReleaseConfirmFieldView({ releaseConfirmItem, selectedMatchCode, checkedOrderItemLength, isMergePackageOptionStockUnit, onActionMergePackageOptionStockUnit}) {
    return (
        <ReleaseConfirmFieldWrapper>
            <div className='info-text'>
                <div>
                    <span>* 현재 피아르 상품 & 옵션 매칭 코드는 </span>
                    <span className='highlight'>{selectedMatchCode === 'optionCode' ? '[피아르 옵션코드]' : '[출고 옵션코드]'}</span>
                    <span>입니다.</span>
                </div>
                <div>* [출고 부족 수량]을 확인해주세요.</div>
            </div>
            {/* <div className='checkbox-group'>
                <input
                    type='checkbox'
                    checked={isMergePackageOptionStockUnit}
                    onChange={() => onActionMergePackageOptionStockUnit()}
                />
                <div>세트상품 수량 병합</div>
            </div> */}
            <TableFieldView releaseConfirmItem={releaseConfirmItem} selectedMatchCode={selectedMatchCode}></TableFieldView>
            <div>[ {checkedOrderItemLength || 0} ] 건의 데이터를 출고 전환 하시겠습니까?</div>
        </ReleaseConfirmFieldWrapper>
    )
}

function TableFieldView({releaseConfirmItem, selectedMatchCode}) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <ResizableTh className='fixed-header' width={200}><span className='highlight'>{selectedMatchCode === 'optionCode' ? '피아르 옵션코드' : '출고 옵션코드'}</span></ResizableTh>
                            <ResizableTh className='fixed-header' width={200}>$피아르 상품명</ResizableTh>
                            <ResizableTh className='fixed-header' width={200}>$피아르 옵션명</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>총 출고전환 수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>$재고수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100} style={{color: '#ff4949'}}>[출고부족 수량]</ResizableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {releaseConfirmItem?.map((r, idx) => {
                            let isOutOfStock = r.optionStockUnit != null && (r.optionStockUnit - r.unit < 0);
                            return (
                                <tr
                                    key={'release-item-idx' + idx}
                                    className={`${isOutOfStock && 'tr-highlight'}`}
                                >
                                    <td>{r.code}</td>
                                    <td>{r.prodDefaultName}</td>
                                    <td>{r.optionDefaultName}</td>
                                    <td>{r.unit}</td>
                                    <td>
                                        {r.optionPackageYn === 'y' ? '세트상품' : r.optionStockUnit}
                                    </td>
                                    <td className={`${isOutOfStock && 'td-highlight'}`}>
                                        {r.optionPackageYn === 'y' ? '세트상품' : isOutOfStock && Math.abs(r.optionStockUnit - r.unit)}
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