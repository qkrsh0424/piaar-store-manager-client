import { ProductInfoInputWrapper } from "./ProductCreateForm.styled";

export default function CodeInfoFieldView(props) {
    return (
         <ProductInfoInputWrapper>
            <div className="group-title">상품 식별번호</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">상품코드</span>
                    </div>
                    <input type="text" className='form-control' name='code' value={props.createProductData.code} disabled/>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">제조번호</span>
                    </div>
                    <input type="text" className='form-control' name='manufacturingCode' value={props.createProductData.manufacturingCode} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">상품관리번호</span>
                    </div>
                    <input type="text" className='form-control' name='managementNumber' value={props.createProductData.managementNumber} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}