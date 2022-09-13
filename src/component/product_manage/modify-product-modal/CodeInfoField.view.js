import { ProductInfoInputWrapper } from "./ModifyProductModal.styled";

export default function CodeInfoFieldView(props) {
    return (
         <ProductInfoInputWrapper>
            <div className="group-title">상품 식별번호</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">상품코드</span>
                    </div>
                    <input type="text" className='form-control' name='code' value={props.modifyProductData.code ?? ''} disabled/>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">제조번호</span>
                    </div>
                    <input type="text" className='form-control' name='manufacturingCode' value={props.modifyProductData.manufacturingCode ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">상품관리번호</span>
                    </div>
                    <input type="text" className='form-control' name='managementNumber' value={props.modifyProductData.managementNumber ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}