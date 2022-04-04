import { ProductInfoInputWrapper } from "./ProductInfoInput.styled";

export default function ImportInfoFieldView(props) {
    return (
         <ProductInfoInputWrapper>
            <div className="group-title">수입 정보</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">HS CODE</span>
                    </div>
                    <input type="text" className='form-control' name='hsCode' value={props.productData.hsCode} onChange={(e) => props.onChangeInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">STYLE</span>
                    </div>
                    <input type="text" className='form-control' name='style'value={props.productData.style} onChange={(e) => props.onChangeInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">관세율</span>
                    </div>
                    <input type="text" className='form-control' name='tariffRate' value={props.productData.tariffRate} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}