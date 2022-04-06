import { OptionInfoInputWrapper } from "./CreateProductOptionModal.styled";

export default function OptionInfoFormFieldView(props) {
    return (
        <OptionInfoInputWrapper>
            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            옵션명
                            <i className="icon-must" aria-label="필수항목"></i>
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='defaultName'
                        value={props.createOption.defaultName}
                        onChange={(e) => props.onChangeInputValue(e)}
                        required
                    />

                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            관리옵션명
                            <i className="icon-must" aria-label="필수항목"></i>
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='managementName'
                        value={props.createOption.managementName}
                        onChange={(e) => props.onChangeInputValue(e)}
                        required
                    />

                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            관리코드
                            <i className="icon-must" aria-label="필수항목"></i>
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='code'
                        value={props.createOption.code}
                        onChange={(e) => props.onChangeInputValue(e)}
                        required
                    />

                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            노스노스 고유코드
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='nosUniqueCode'
                        value={props.createOption.nosUniqueCode}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            판매가
                        </span>
                    </div>
                    <input
                        type="number"
                        className='form-control'
                        name='salesPrice'
                        value={props.createOption.salesPrice}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            매입총합계
                        </span>
                    </div>
                    <input
                        type="number"
                        className='form-control'
                        name='totalPurchasePrice'
                        value={props.createOption.totalPurchasePrice}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            재고수량
                        </span>
                    </div>
                    <input
                        type="number"
                        className='form-control'
                        name='stockUnit'
                        value={props.createOption.stockUnit}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            현재상태
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='status'
                        value={props.createOption.status}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            비고
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='memo'
                        value={props.createOption.memo}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            색상
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='color'
                        value={props.createOption.color}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            CNY
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='unitCny'
                        value={props.createOption.unitCny}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            KRW
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='unitKrw'
                        value={props.createOption.unitKrw}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
            </div>
        </OptionInfoInputWrapper>
    )
}