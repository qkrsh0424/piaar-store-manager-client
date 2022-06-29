import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import SortButton from '../../../../module/button/SortButton';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import ResizableTh from '../../../../module/table/ResizableTh';
import { TableFieldWrapper } from './OrderItemTable.styled';

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

function TableHead({
    viewHeader
}) {
    return (
        <thead>
            <tr>
                <ResizableTh
                    className="fixed-header fixed-col-left"
                    style={{ zIndex: '12' }}
                    width={80}
                >
                    재고 반영
                </ResizableTh>
                <ResizableTh
                    className="fixed-header"
                    width={50}
                >
                    선택
                </ResizableTh>
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
                            {HIGHLIGHT_FIELDS.includes(r.matchedColumnName) &&
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: '#e1d7b9' }}></div>
                            }
                        </ResizableTh>
                    )
                })}
                <ResizableTh
                    className="fixed-header fixed-col-right"
                    style={{ zIndex: 12 }}
                    width={50}
                >
                    수정
                </ResizableTh>
            </tr>
        </thead>
    );
}

const HIGHLIGHT_FIELDS = [
    'releaseOptionCode',
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
                    />
                    <tbody>
                        {props.orderItemList &&
                            <>
                                {props.orderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                                    let checked = props.isCheckedOne(r1.id)
                                    let isOutOfStock = r1.optionStockUnit !== null && r1.optionStockUnit <= 0;
                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={`${checked && 'tr-active'} ${isOutOfStock && 'tr-highlight'}`}
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
                                                        <td key={r2.cellNumber}>{r1[matchedColumnName] ? dateToYYYYMMDDhhmmss(r1[matchedColumnName]) : ""}</td>
                                                    )
                                                }
                                                return (
                                                    <td key={r2.cellNumber}
                                                        className={`${r2.matchedColumnName === 'receiver' && r1[`duplicationUser`] && 'user-duplication'}`}
                                                    >
                                                        {r1[matchedColumnName]}
                                                    </td>
                                                )
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
                                    totalSize={props.orderItemList.length}
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
                    totalSize={props.orderItemList.length}
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