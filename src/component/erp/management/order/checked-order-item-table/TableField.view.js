import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import ResizableTh from '../../../../module/table/ResizableTh';
import { TableFieldWrapper } from './CheckedOrderItemTable.styled';

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <ResizableTh
                                className="fixed-header"
                                width={50}
                            >
                                선택
                            </ResizableTh>
                            {props.viewHeader?.headerDetail.details?.map((r, index) => {
                                return (
                                    <ResizableTh
                                        key={index}
                                        className="fixed-header"
                                        scope="col"
                                        width={200}
                                    >
                                        {r.customCellName}
                                    </ResizableTh>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.checkedOrderItemList &&
                            <>
                                {props.checkedOrderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                                    let checked = props.isCheckedOne(r1.id)
                                    let isOutOfStock = r1.optionStockUnit !== null && r1.optionStockUnit <= 0;
                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={`${isOutOfStock && 'tr-highlight'}`}
                                            onClick={(e) => props.onActionCheckOrderItem(e, r1)}
                                        >
                                            <td style={{ cursor: 'pointer' }}>
                                                <input type='checkbox' checked={checked} onChange={(e) => props.onActionCheckOrderItem(e, r1)}></input>
                                            </td>
                                            {props.viewHeader?.headerDetail.details?.map(r2 => {
                                                let matchedColumnName = r2.matchedColumnName;
                                                if (matchedColumnName === 'createdAt' || matchedColumnName === 'salesAt' || matchedColumnName === 'releaseAt' || matchedColumnName === 'channelOrderDate') {
                                                    return (
                                                        <td key={matchedColumnName}>{r1[matchedColumnName] ? dateToYYYYMMDDhhmmss(r1[matchedColumnName]) : ""}</td>
                                                    )
                                                }
                                                return (
                                                    <td key={matchedColumnName}
                                                        className={`${r2.matchedColumnName === 'receiver' && r1[`duplicationUser`] && 'user-duplication'}`}
                                                    >
                                                        {r1[matchedColumnName]}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )

                                })}
                                <InfiniteScrollObserver
                                    elementTagType={'tr'}
                                    totalSize={props.checkedOrderItemList.length}
                                    startOffset={0}
                                    endOffset={props.viewSize}
                                    fetchData={props.onActionfetchMoreOrderItems}
                                    loadingElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            로딩중...
                                        </td>
                                    }
                                    endElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            마지막 데이터 입니다.
                                        </td>
                                    }
                                />
                            </>
                        }
                    </tbody>
                </table>
                {/* <InfiniteScrollObserver
                    elementTagType={'div'}
                    totalSize={props.checkedOrderItemList.length}
                    startOffset={0}
                    endOffset={props.viewSize}
                    fetchData={props.onActionfetchMoreOrderItems}
                    loadingElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            로딩중...
                        </p>
                    }
                    endElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            마지막 데이터 입니다.
                        </p>
                    }
                /> */}
            </div>
        </TableFieldWrapper>
    );
}