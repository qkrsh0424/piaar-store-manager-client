import { ProductInfoInputWrapper } from "./ModifyProductModal.styled";

export default function ImportInfoFieldView(props) {
    return (
         <ProductInfoInputWrapper>
            <div className="group-title">수입 정보</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">HS CODE</span>
                    </div>
                    <input type="text" className='form-control' name='hsCode' value={props.modifyProductData.hsCode ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">STYLE</span>
                    </div>
                    <input type="text" className='form-control' name='style'value={props.modifyProductData.style ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">관세율</span>
                    </div>
                    <input type="text" className='form-control' name='tariffRate' value={props.modifyProductData.tariffRate ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}