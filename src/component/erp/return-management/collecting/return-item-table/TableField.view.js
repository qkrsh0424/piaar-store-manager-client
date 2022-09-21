import { useEffect, useRef } from 'react';
import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import { TableFieldWrapper } from './ReturnItemTable.styled';
import SortButton from '../../../../module/button/SortButton'
import ResizableTh from '../../../../module/table/ResizableTh';

function TableHead({
    viewHeader, selectedMatchCode
}) {
    return (
        <thead>
            <tr>
                <th
                    className="fixed-header"
                    width={50}
                >
                    선택
                </th>
                {viewHeader?.headerDetail.details?.map((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={200}
                        >
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                            >
                                <div>
                                    {r.customCellName}
                                </div>
                                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint={r.matchedColumnName}
                                    ></SortButton>
                                </div>
                            </div>
                            {(HIGHLIGHT_FIELDS.includes(r.matchedColumnName) || r.matchedColumnName === selectedMatchCode) &&
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: '#b9c2e1' }}></div>
                            }
                        </ResizableTh>
                    )
                })}
                <th
                    className="fixed-header fixed-col-right"
                    style={{ zIndex: 12, boxShadow: '0.5px -0.5px 0 0 #e0e0e0 inset' }}
                    width={50}
                >
                    수정
                </th>
            </tr>
        </thead>
    );
}

const HIGHLIGHT_FIELDS = [
    'categoryName',
    'prodDefaultName',
    'prodManagementName',
    'optionDefaultName',
    'optionManagementName',
    'optionStockUnit'
];

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
                ref={props.tableScrollRef}
            >
                <table cellSpacing="0">
                    <TableHead
                        viewHeader={props.viewHeader}
                        selectedMatchCode={props.selectedMatchCode}
                    />
                    <tbody>
                        {props.returnItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                            let checked = props.isCheckedOne(r1.id);
                            let isOutOfStock = r1.optionStockUnit !== null && r1.optionStockUnit <= 0;
                            return (
                                <tr
                                    key={`row-${rowIndex}`}
                                    className={`${checked && 'tr-active'} ${isOutOfStock && 'tr-highlight'}`}
                                    onClick={(e) => props.onActionCheckReturnItem(e, r1)}
                                >
                                    <td style={{ cursor: 'pointer' }}>
                                        <input type='checkbox' checked={checked} onChange={(e) => props.onActionCheckReturnItem(e, r1)}></input>
                                    </td>
                                    {props.viewHeader?.headerDetail.details?.map(r2 => {
                                        let isOrderHeader = (r2.matchedColumnName).startsWith('order_');
                                        let matchedColumnName = isOrderHeader ? r2.matchedColumnName.substr(6) : r2.matchedColumnName;

                                        if(isOrderHeader) {     // 출고 데이터
                                            if (matchedColumnName === 'createdAt' || matchedColumnName === 'salesAt' || matchedColumnName === 'releaseAt' || matchedColumnName === 'channelOrderDate') {
                                                return (
                                                    <td key={`col-order-${matchedColumnName}`}>{r1.erpOrderItem[matchedColumnName] ? dateToYYYYMMDDhhmmss(r1.erpOrderItem[matchedColumnName]) : ""}</td>
                                                )
                                            }
                                            return (
                                                <td 
                                                    key={`col-order-${matchedColumnName}`}
                                                    className={`${(matchedColumnName === 'receiver' && r1[`duplicationUser`]) ? 'user-duplication' : ''}`}
                                                >
                                                    {r1.erpOrderItem[matchedColumnName]}
                                                </td>
                                            )
                                        }else {     // 반품 데이터
                                            if (matchedColumnName === 'createdAt' || matchedColumnName === 'holdAt' || matchedColumnName === 'collectAt' || matchedColumnName === 'collectCompleteAt'
                                                || matchedColumnName === 'returnCompleteAt' || matchedColumnName === 'returnRejectAt') {
                                                return (
                                                    <td key={`col-${matchedColumnName}`}>{r1[matchedColumnName] ? dateToYYYYMMDDhhmmss(r1[matchedColumnName]) : ""}</td>
                                                )
                                            }
                                            return (
                                                <td key={`col-${matchedColumnName}`}>
                                                    {r1[matchedColumnName]}
                                                </td>
                                            )
                                        }
                                    })}
                                    <td className='fixed-col-right'>
                                        <button
                                            type='button'
                                            className='fix-button-el'
                                            onClick={(e) => props.onActionOpenFixItemModal(e, r1)}
                                        >
                                            <img
                                                src={'/assets/icon/edit_black_icon.png'}
                                                className='fix-button-icon'
                                                alt=""
                                            ></img>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        <InfiniteScrollObserver
                            elementTagType={'tr'}
                            totalSize={props.returnItemList?.length}
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
            </div>
        </TableFieldWrapper>
    );
}