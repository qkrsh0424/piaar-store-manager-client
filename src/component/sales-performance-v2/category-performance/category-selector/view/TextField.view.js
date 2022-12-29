import { TextFieldWrapper } from "../CategorySelector.styled";

export default function TextFieldView() {
    return (
        <TextFieldWrapper>
            <div>
                <span>* 검색 기간 내에 등록된 판매스토어가 조회됩니다. </span>
            </div>
            <div>
                <span>* 판매스토어를 선택해 구체 데이터를 확인할 수 있으며, </span>
                <span>선택된 스토어들을 비교할 수 있습니다. </span>
            </div>
        </TextFieldWrapper>
    )
}