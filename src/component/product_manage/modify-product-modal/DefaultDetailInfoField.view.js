import { ProductInfoInputWrapper } from "./ModifyProductModal.styled";

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
                    <input type="number" className='form-control' name='defaultWidth' value={props.modifyProductData.defaultWidth ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            SIZE_세로(cm)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultLength' value={props.modifyProductData.defaultLength ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            SIZE_높이(cm)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultHeight' value={props.modifyProductData.defaultHeight ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            내품수량
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultQuantity' value={props.modifyProductData.defaultQuantity ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            무게(kg)
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultWeight' value={props.modifyProductData.defaultWeight ?? ''} onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}