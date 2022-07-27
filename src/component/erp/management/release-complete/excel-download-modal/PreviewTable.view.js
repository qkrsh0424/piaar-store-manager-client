import React from 'react';
import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import { PreviewTableWrapper, TableBox } from './ExcelDownloadModal.styled';

const HIGHLIGHT_FIELDS = [
    'categoryName',
    'prodDefaultName',
    'prodManagementName',
    'optionDefaultName',
    'optionManagementName',
    'optionStockUnit'
];

const Colgroup = ({ viewHeader }) => {
    return (
        <colgroup>
            <col width={'50px'}></col>
            <col width={'50px'}></col>
            {viewHeader.headerDetail.details.map((r, index) => {
                return (
                    <col key={index} width={'200px'}></col>
                );
            })}

        </colgroup>
    );
}

const TableHead = ({ viewHeader, selectedMatchCode }) => {
    return (
        <thead>
            <tr>
                <th className="fixed-header" scope="col">#</th>
                <th className="fixed-header" scope="col">선택</th>
                {viewHeader.headerDetail.details.map((r, index) => {
                    return (
                        <th key={index} className="fixed-header" scope="col">
                            <div>{r.customCellName}</div>
                            {(HIGHLIGHT_FIELDS.includes(r.matchedColumnName) || r.matchedColumnName === selectedMatchCode) &&
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: '#b9c2e1' }}></div>
                            }
                        </th>
                    )
                })}
            </tr>
        </thead>
    );
}

const TableBody = ({ viewHeader, downloadOrderItemList, isCheckedItem, _onAction_checkItem }) => {
    return (
        <tbody>
            {downloadOrderItemList.map((r1, r1Index) => {
                return (
                    <React.Fragment key={r1Index}>
                        <tr>
                            <td
                                rowSpan={r1.collections.length + 1}
                                style={{ background: '#d1d1d1', fontSize: '13px', fontWeight: '700' }}
                            >
                                {r1Index + 1}
                            </td>
                        </tr>
                        {r1.collections?.map((r2, r2Index) => {
                            let checked = isCheckedItem(r2);
                            return (
                                <tr
                                    key={r2.id}
                                >
                                    <td
                                        style={{ background: '#d1d1d1' }}
                                    >
                                        <input
                                            type='checkbox'
                                            className='checkbox-item'
                                            checked={checked}
                                            onChange={() => _onAction_checkItem(r2)}
                                        ></input>
                                    </td>
                                    {viewHeader?.headerDetail.details.map(r3 => {
                                        let matchedColumnName = r3.matchedColumnName;
                                        if (matchedColumnName === 'createdAt' || matchedColumnName === 'salesAt' || matchedColumnName === 'releaseAt' || matchedColumnName === 'channelOrderDate') {
                                            return (
                                                <td key={matchedColumnName}>{r2[matchedColumnName] ? dateToYYYYMMDDhhmmss(r2[matchedColumnName]) : ""}</td>
                                            )
                                        }
                                        return (
                                            <td key={matchedColumnName}>{r2[matchedColumnName]}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </React.Fragment>
                );
            })}
        </tbody>
    );
}
const PreviewTableView = (props) => {
    return (
        <PreviewTableWrapper>
            <TableBox>
                <table cellSpacing="0">
                    <Colgroup
                        viewHeader={props.viewHeader}
                    ></Colgroup>
                    <TableHead
                        viewHeader={props.viewHeader}
                        selectedMatchCode={props.selectedMatchCode}
                    ></TableHead>
                    <TableBody
                        viewHeader={props.viewHeader}
                        downloadOrderItemList={props.downloadOrderItemList}
                        isCheckedItem={props.isCheckedItem}

                        _onAction_checkItem={props._onAction_checkItem}
                    ></TableBody>
                </table>
            </TableBox>
        </PreviewTableWrapper>
    );
}
export default PreviewTableView;