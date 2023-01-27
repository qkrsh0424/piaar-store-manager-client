import { TextFieldWrapper } from "../ChannelSelector.styled";

export default function TextFieldView() {
    return (
        <TextFieldWrapper>
            <div>
                <span>* 검색 기간 내에 해당 상품이 판매된 스토어가 조회됩니다. </span>
            </div>
            <div>
                <span>* 판매스토어를 선택해 상품별 판매 데이터를 확인할 수 있으며, </span>
                <span>선택된 스토어들을 비교할 수 있습니다. </span>
            </div>
            <div>
                <span>* 상품만 선택한 경우, 해당 상품에 포함된 모든 옵션의 판매 데이터를 확인할 수 있습니다. </span>
            </div>
        </TextFieldWrapper>
    )
}