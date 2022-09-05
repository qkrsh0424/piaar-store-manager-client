import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import ResizableTh from '../../../../module/table/ResizableTh';
import { TableFieldWrapper } from './CheckedOrderItemTable.styled';

function CorrectIcon() {
    return (
        <img
            src='/assets/icon/correct_icon.png'
            style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            alt=""
            loading='lazy'
        ></img>
    );
}

function FailedIcon() {
    return (
        <img
            src='/assets/icon/failed_icon.png'
            style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            alt=""
            loading='lazy'
        ></img>
    );
}

function ReturnIcon({ isReturned }) {
    if (isReturned === 'y') {
        return (
            <img
                src='/assets/icon/return_color_icon.png'
                style={{ width: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                alt=""
                loading='lazy'
            ></img>
        )
    } else {
        return (
            <img
                src='/assets/icon/return_black_icon.png'
                style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                alt=""
                loading='lazy'
            ></img>
        )
    }
}

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th
                                className="fixed-header fixed-col-left"
                                style={{ zIndex: '12', boxShadow: '-0.5px -0.5px 0 0 #e0e0e0 inset' }}
                                width={80}
                            >
                                재고 반영
                            </th>
                            <th
                                className="fixed-header"
                                width={50}
                            >
                                선택
                            </th>
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
                            <th
                                className="fixed-header fixed-col-right"
                                style={{ zIndex: 12, boxShadow: '0.5px -0.5px 0 0 #e0e0e0 inset' }}
                                width={55}
                            >
                                반품됨
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.checkedOrderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                            let checked = props.isCheckedOne(r1.id)
                            let isOutOfStock = r1.optionStockUnit !== null && r1.optionStockUnit <= 0;
                            return (
                                <tr
                                    key={rowIndex}
                                    className={`${isOutOfStock && 'tr-highlight'}`}
                                    onClick={(e) => props.onActionCheckOrderItem(e, r1)}
                                >
                                    <td className={`fixed-col-left`}>
                                        {r1.stockReflectYn === 'y' &&
                                            <CorrectIcon />
                                        }
                                        {r1.stockReflectYn === 'n' &&
                                            <FailedIcon />
                                        }
                                    </td>
                                    <td style={{ cursor: 'pointer' }}>
                                        <input type='checkbox' checked={checked} onChange={(e) => props.onActionCheckOrderItem(e, r1)}></input>
                                    </td>
                                    {props.viewHeader?.headerDetail.details?.map(r2 => {
                                        let matchedColumnName = r2.matchedColumnName;
                                        if (matchedColumnName === 'createdAt' || matchedColumnName === 'salesAt' || matchedColumnName === 'releaseAt' || matchedColumnName === 'channelOrderDate') {
                                            return (
                                                <td key={`col-${matchedColumnName}`}>{r1[matchedColumnName] ? dateToYYYYMMDDhhmmss(r1[matchedColumnName]) : ""}</td>
                                            )
                                        } else if (matchedColumnName === 'optionCode') {
                                            return (
                                                <td key={`col-${matchedColumnName}`} className='td-highlight' onClick={(e) => props.onActionOpenOptionCodeModal(e, r1.id)}>{r1[matchedColumnName]}</td>
                                            )
                                        } else if (matchedColumnName === 'releaseOptionCode') {
                                            return (
                                                <td key={`col-${matchedColumnName}`} className='td-highlight' onClick={(e) => props.onActionOpenReleaseOptionCodeModal(e, r1.id)}>{r1[matchedColumnName]}</td>
                                            )
                                        }
                                        return (
                                            <td key={`col-${matchedColumnName}`}
                                                className={`${r2.matchedColumnName === 'receiver' && r1[`duplicationUser`] && 'user-duplication'}`}
                                            >
                                                {r1[matchedColumnName]}
                                            </td>
                                        )
                                    })}
                                    <td className='fixed-col-right'>
                                        {r1.returnYn === 'y' &&
                                            <ReturnIcon isReturned={r1.returnYn} />
                                        }
                                        {r1.returnYn === 'n' &&
                                            <ReturnIcon isReturned={r1.returnYn} />
                                        }
                                    </td>
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