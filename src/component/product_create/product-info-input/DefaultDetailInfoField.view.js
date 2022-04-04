import { ProductInfoInputWrapper } from "./ProductInfoInput.styled";

export default function DefaultDetailInfoFieldView(props) {
    return (
        <ProductInfoInputWrapper>
            <div className="group-title">상세 정보</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            SIZE_가로(cm)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultWidth' value={props.productData.defaultWidth} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            SIZE_세로(cm)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultLength' value={props.productData.defaultLength} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            SIZE_높이(cm)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultHeight' value={props.productData.defaultHeight} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            내품수량
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultQuantity' value={props.productData.defaultQuantity} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            무게(kg)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultWeight' value={props.productData.defaultWeight} onChange={(e) => props.onChangeInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}