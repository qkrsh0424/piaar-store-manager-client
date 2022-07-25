import { TableFieldWrapper } from './ReleaseOptionCodeModal.styled';
import ResizableTh from '../../../../module/table/ResizableTh';

function TableHead({
}) {
    return (
        <thead>
            <tr>
                <ResizableTh
                    className="fixed-header"
                    width={250}
                >
                    상품명
                </ResizableTh>
                <ResizableTh
                    className="fixed-header"
                    width={200}
                >
                    옵션정보
                </ResizableTh>
                <ResizableTh
                    className="fixed-header"
                    width={150}
                >
                    피아르 옵션코드
                </ResizableTh>
                <ResizableTh
                    className="fixed-header"
                    width={150}
                >
                    출고 옵션코드
                </ResizableTh>
            </tr>
        </thead>
    );
}
export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='info-text'>* 선택된 데이터 정보</div>
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