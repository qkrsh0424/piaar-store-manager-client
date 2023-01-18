import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import ResizableTh from "../../../../module/table/ResizableTh";
import { TableFieldWrapper } from "../ItemTable.styled";

function TableHead({ headerDetails }) {
    return (
        <thead>
            <tr>
                {headerDetails?.map((r, idx) => {
                    return (
                        <ResizableTh
                            key={idx}
                            className='fixed-header'
                            scope='col'
                            width={200}
                        >
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                            >
                                <div>{r.originCellName}</div>
                            </div>
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0">
                    <TableHead
                        headerDetails={props.headerDetails}
                    />
                    <tbody>
                        {props.items?.map((r, rowIndex) => {
                            return (
                                <tr key={`row-${rowIndex}`}>
                                    {props.headerDetails?.map(r2 => {
                                        if (r2.matchedColumnName === 'channelOrderDate' || r2.matchedColumnName === 'releaseAt' || r2.matchedColumnName === 'salesAt') {
                                            return (
                                                <td key={`col-${r2.matchedColumnName}`}>{r[r2.matchedColumnName] ? dateToYYYYMMDDhhmmss(r[r2.matchedColumnName]) : ""}</td>
                                            )
                                        } else {
                                            return (
                                                <td key={`col-${r2.matchedColumnName}`}>{r[r2.matchedColumnName]}</td>
                                            )
                                        }
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}