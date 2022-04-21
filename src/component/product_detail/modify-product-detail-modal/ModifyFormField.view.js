import { CreateFormWrapper } from "./ModifyProductDetailModal.styled"

export default function ModifyFormFieldView(props) {
    return (
        <CreateFormWrapper>
            <form onSubmit={(e) => props.onActionModifyDetail(e)}>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                사이즈_가로(cm)
                                <i className="icon-must" aria-label="필수항목"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            className='form-control'
                            name='detailWidth'
                            value={props.modifyDetailData?.detailWidth ?? 0}
                            onChange={(e) => props.onChangeModifyDetailDataInputValue(e)}
                            required
                        />

                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                사이즈_세로(cm)
                                <i className="icon-must" aria-label="필수항목"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            className='form-control'
                            name='detailLength'
                            value={props.modifyDetailData?.detailLength ?? 0}
                            onChange={(e) => props.onChangeModifyDetailDataInputValue(e)}
                            required
                        />

                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                사이즈_높이(cm)
                                <i className="icon-must" aria-label="필수항목"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            className='form-control'
                            name='detailHeight'
                            value={props.modifyDetailData?.detailHeight ?? 0}
                            onChange={(e) => props.onChangeModifyDetailDataInputValue(e)}
                            required
                        />

                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                내품수량
                                <i className="icon-must" aria-label="필수항목"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            className='form-control'
                            name='detailQuantity'
                            value={props.modifyDetailData?.detailQuantity ?? 0}
                            onChange={(e) => props.onChangeModifyDetailDataInputValue(e)}
                            required
                        />

                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                무게(kg)
                                <i className="icon-must" aria-label="필수항목"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            className='form-control'
                            name='detailWeight'
                            value={props.modifyDetailData?.detailWeight ?? 0}
                            onChange={(e) => props.onChangeModifyDetailDataInputValue(e)}
                            required
                        />

                    </div>
                </div>
                <div className="submit-btn">
                    <button>등록</button>
                </div>
            </form>
        </CreateFormWrapper>
    )
}