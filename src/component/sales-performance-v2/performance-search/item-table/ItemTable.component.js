import { getSelectedHeaderFields } from "../../../../static-data/erp/staticData";
import { Container } from "./ItemTable.styled";
import TableFieldView from "./view/TableField.view";

// 판매성과 그래프 or 테이블 클릭시 - 발주 내역 헤더
const headerFields = [
    'channelOrderDate',
    'prodName',
    'optionName',
    'unit',
    'receiver',
    'receiverContact1',
    'salesChannel',
    'price',
    'deliveryCharge',
    'optionCode',
    'releaseAt',
    'salesAt',
    'categoryName',
    'prodDefaultName',
    'optionDefaultName',
    'salesPrice'
]

const headerDetails = getSelectedHeaderFields(headerFields);

export default function ItemTableComponent(props) {
    return (
        <Container>
            <TableFieldView
                items={props.itemPages?.content}
                headerDetails={headerDetails}
            />
        </Container>
    )
}