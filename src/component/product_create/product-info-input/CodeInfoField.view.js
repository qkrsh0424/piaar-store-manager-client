import { ProductInfoInputWrapper } from "./ProductInfoInput.styled";

export default function CodeInfoFieldView(props) {
    return (
         <ProductInfoInputWrapper>
            <div className="group-title">상품 식별번호</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">상품코드</span>
                    </div>
                    <input type="text" className='form-control' name='code' value={props.productData.code} onChange={(e) => props.onChangeInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">제조번호</span>
                    </div>
                    <input type="text" className='form-control' name='manufacturingCode' value={props.productData.manufacturingCode} onChange={(e) => props.onChangeInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">네이버 상품번호</span>
                    </div>
                    <input type="text" className='form-control' name='naverProductCode' value={props.productData.naverProductCode} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}