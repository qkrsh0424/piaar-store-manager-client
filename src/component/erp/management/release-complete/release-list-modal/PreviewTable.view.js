import React from 'react';
import { staticReleaseListHeaderDetails } from '../../../../../static-data/staticData';
import { PreviewTableWrapper, TableBox } from './ReleaseListModal.styled';

const Colgroup = ({  }) => {
    return (
        <colgroup>
            <col width={'50px'}></col>
            {staticReleaseListHeaderDetails.map((r, index) => {
                return (
                    <col key={index} width={'200px'}></col>
                );
            })}

        </colgroup>
    );
}

const TableHead = ({ }) => {
    return (
        <thead>
            <tr>
                <th className="fixed-header" scope="col">#</th>
                {staticReleaseListHeaderDetails.map((r, index) => {
                    return (
                        <th key={index} className="fixed-header" scope="col">{r.originCellName}</th>
                    )
                })}
            </tr>
        </thead>
    );
}

const TableBody = ({ releaseItemList }) => {
    return (
        <tbody>
            {releaseItemList.map((r1, r1Index) => {
                return (
                    <React.Fragment key={r1Index}>
                        <tr>
                            <td style={{ background: '#d1d1d1', fontSize: '13px', fontWeight: '700' }}>
                                {r1Index + 1}
                            </td>
                            {staticReleaseListHeaderDetails.map(r3 => {
                                return (
                                    <td key={r3.matchedColumnName}>{r1[r3.matchedColumnName]}</td>
                                )
                            })}
                        </tr>
                    </React.Fragment>
                )
            })}
        </tbody>
    );
}
const PreviewTableView = (props) => {
    return (
        <PreviewTableWrapper>
            <TableBox>
                <table cellSpacing="0">
                    <Colgroup></Colgroup>
                    <TableHead></TableHead>
                    <TableBody
                        viewHeader={props.viewHeader}
                        releaseItemList={props.releaseItemList}
                    ></TableBody>
                </table>
            </TableBox>
        </PreviewTableWrapper>
    );
}
export default PreviewTableView;