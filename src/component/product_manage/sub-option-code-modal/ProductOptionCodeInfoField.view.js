import { ProductOptionCodeInfoWrapper } from "./SubOptionCodeModal.styled";

const ProductOptionCodeInfoFieldView = (props) => {
    return (
        <ProductOptionCodeInfoWrapper>
            <div className='info-group'>
                <div className='info-name'>옵션관리코드</div>
                <div>{props.optionData.code}</div>
            </div>
            <div className='info-group'>
                <div className='info-name'>옵션명</div>
                <div>{props.optionData.defaultName}</div>
            </div>
            <div className='info-group'>
                <div className='info-name'>옵션설명</div>
                <div>{props.optionData.managementName}</div>
            </div>
        </ProductOptionCodeInfoWrapper>
    )
}

export default ProductOptionCodeInfoFieldView;
