import { TableFieldWrapper } from './ReleaseListModal.styled';
import ResizableTh from '../../../../module/table/ResizableTh';
import { staticReleaseListHeaderDetails } from '../../../../../static-data/staticData';

function TableHead({
}) {
    return (
        <thead>
            <tr>
                {staticReleaseListHeaderDetails?.map((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={200}
                        >
                            {r.originCellName}
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
            <div
                className='table-box'
                ref={props.tableScrollRef}
            >
                <table cellSpacing="0">
                    <TableHead />
                    <tbody>
                        {props.checkedOrderItemList?.map((item, rowIndex) => {
                            return (
                                <tr key={`row-${rowIndex}`}>
                                    <td>
                                        {item.prodName}
                                    </td>
                                    <td>
                                        {item.optionName}
                                    </td>
                                    <td>
                                        {item.optionCode}
                                    </td>
                                    <td>
                                        {item.releaseOptionCode}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper >
    );
}