import { TableTitleFieldWrapper } from "../OptionItemTable.styled";

export default function TableTitleFieldView(props) {
    return (
        <TableTitleFieldWrapper>
            <div>
                <div className='table-title'>[옵션 성과]</div>
                <div className='table-info-text'>
                    <span>조회된 상품의 모든 옵션판매 데이터를 표시합니다. </span>
                </div>
            </div>
        </TableTitleFieldWrapper>
    )
}