import { ProductInfoInputWrapper } from "./ModifyProductModal.styled";

export default function DefaultInfoFieldView(props) {
    return (
        <ProductInfoInputWrapper>
            <div className="group-title">상품 이미지</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            상품명
                            <i className="icon-must" aria-label="필수항목"></i>
                        </span>
                    </div>
                    <input type="text" className='form-control' name='defaultName' 
                        value={props.modifyProductData.defaultName ?? ''}
                        onChange={(e) => props.onChangeProductInputValue(e)}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            관리상품명
                            <i className="icon-must" aria-label="필수항목"></i>
                        </span>
                    </div>
                    <input type="text" className='form-control' name='managementName'
                        value={props.modifyProductData.managementName ?? ''}
                        onChange={(e) => props.onChangeProductInputValue(e)}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            메모
                        </span>
                    </div>
                    <input type="text" className='form-control' name='memo'
                        value={props.modifyProductData.memo ?? ''} 
                        onChange={(e) => props.onChangeProductInputValue(e)}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            구매링크
                        </span>
                    </div>
                    <input type="text" className='form-control' name='purchaseUrl'
                        value={props.modifyProductData.purchaseUrl ?? ''} 
                        onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            기본매입총합계 <span className="small">(매입가격 + 매입운송비용 + 관부가세 + 기타비용)</span>
                        </span>
                    </div>
                    <input type="number" className='form-control' name='defaultTotalPurchasePrice'
                        value={props.modifyProductData.defaultTotalPurchasePrice ?? ''}
                        onChange={(e) => props.onChangeProductInputValue(e)} />
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}