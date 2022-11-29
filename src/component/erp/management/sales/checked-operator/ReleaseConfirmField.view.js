import ResizableTh from "../../../../module/table/ResizableTh";
import { ReleaseConfirmFieldWrapper, TableFieldWrapper } from "./CheckedOperator.styled";

export default function ReleaseConfirmFieldView(props) {
    return (
        <ReleaseConfirmFieldWrapper>
            <div className='info-text'>
                <div>
                    <span>* 현재 피아르 상품 & 옵션 매칭 코드는 </span>
                    <span className='highlight'>{props.selectedMatchCode === 'optionCode' ? '[피아르 옵션코드]' : '[출고 옵션코드]'}</span>
                    <span>입니다.</span>
                </div>
                <div>* [출고 부족 수량]을 확인해주세요.</div>
                <div> * 패키지 상품을 체크해 출고부족 수량을 확인하세요.</div>
            </div>
            <div>
                <PackageOptionTableFieldView
                    releaseItem={props.releasePackageTableItem}
                    selectedMatchCode={props.selectedMatchCode}
                    onActionCheckPackageOrderItem={props.onActionCheckPackageOrderItem}
                    isCheckedPackageItem={props.isCheckedPackageItem}
                    isCheckedPackageItemAll={props.isCheckedPackageItemAll}
                    onActionCheckPackageItemAll={props.onActionCheckPackageItemAll}

                />
                <TableFieldView
                    releaseItem={props.releaseTableItem}
                    selectedMatchCode={props.selectedMatchCode}
                />
            </div>
            <div>[ {props.checkedOrderItemLength || 0} ] 건의 데이터를 출고 전환 하시겠습니까?</div>
        </ReleaseConfirmFieldWrapper>
    )
}

function PackageOptionTableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-info'>
                <div className='table-label'>패키지 상품</div>
            </div>
            <div className='table-box' style={{ height: '170px' }}>
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th className='fixed-header' width={50}>
                                <input
                                    type='checkbox'
                                    style={{ cursor: 'pointer' }}
                                    checked={props.isCheckedPackageItemAll()}
                                    onChange={() => props.onActionCheckPackageItemAll()}
                                />
                            </th>
                            <ResizableTh className='fixed-header' width={150}><span className='highlight'>{props.selectedMatchCode === 'optionCode' ? '피아르 옵션코드' : '출고 옵션코드'}</span></ResizableTh>
                            <ResizableTh className='fixed-header' width={180}>$피아르 상품명</ResizableTh>
                            <ResizableTh className='fixed-header' width={180}>$피아르 옵션명</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>총 출고전환 수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>$재고수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100} style={{ color: '#ff4949' }}>[출고부족 수량]</ResizableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {props.releaseItem?.map((r, idx) => {
                            let checked = props.isCheckedPackageItem(r.code);

                            return (
                                <tr
                                    key={'release-item-idx' + idx}
                                    className={`${checked && 'tr-active'}`}
                                    onClick={(e) => props.onActionCheckPackageOrderItem(e, r)}
                                >
                                    <td className='fixed-header' width={100}>
                                        <input
                                            type='checkbox'
                                            checked={checked}
                                            onChange={(e) => props.onActionCheckPackageOrderItem(e, r)}
                                        />
                                    </td>
                                    <td>{r.code}</td>
                                    <td>{r.prodDefaultName}</td>
                                    <td>{r.optionDefaultName}</td>
                                    <td>{r.unit}</td>
                                    <td>세트상품</td>
                                    <td>세트상품</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}

function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-info'>
                <div className='table-label'>일반 상품</div>
            </div>
            <div className='table-box'>
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <ResizableTh className='fixed-header' width={150}><span className='highlight'>피아르 옵션코드</span></ResizableTh>
                            <ResizableTh className='fixed-header' width={200}>$피아르 상품명</ResizableTh>
                            <ResizableTh className='fixed-header' width={200}>$피아르 옵션명</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>총 출고전환 수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100}>$재고수량</ResizableTh>
                            <ResizableTh className='fixed-header' width={100} style={{color: '#ff4949'}}>[출고부족 수량]</ResizableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {props.releaseItem?.map((r, idx) => {
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
                                        {r.optionStockUnit}
                                    </td>
                                    <td className={`${isOutOfStock && 'td-highlight'}`}>
                                        {isOutOfStock && Math.abs(r.optionStockUnit - r.unit)}
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
