import { TextFieldWrapper } from "../OptionSelector.styled";

export default function TextFieldView() {
    return (
        <TextFieldWrapper>
            <div>
                <span>* 선택된 상품의 모든 옵션이 조회됩니다. </span>
            </div>
            <div>
                <span>* 옵션을 선택해 상품의 옵션별 성과를 확인할 수 있습니다. </span>
            </div>
        </TextFieldWrapper>
    )
}