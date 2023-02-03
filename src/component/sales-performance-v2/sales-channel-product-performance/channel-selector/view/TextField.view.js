import { TextFieldWrapper } from "../ChannelSelector.styled";

export default function TextFieldView() {
    return (
        <TextFieldWrapper>
            <div>
                <span>* 선택된 상품의 판매 스토어가 조회됩니다. </span>
            </div>
            <div>
                <span>* 판매스토어를 선택해 상품별 판매 데이터를 확인할 수 있으며, </span>
                <span>스토어간 비교할 수 있습니다. </span>
            </div>
        </TextFieldWrapper>
    )
}