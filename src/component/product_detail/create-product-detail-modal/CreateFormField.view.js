import { CreateFormWrapper } from "./CreateProductDetailModal.styled"

export default function CreateFormFieldView(props) {
    return (
        <CreateFormWrapper>
            <form onSubmit={(e) => props.onActionCreateDetail(e)}>
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
                            value={props.createDetailData?.detailWidth ?? 0}
                            onChange={(e) => props.onChangeCreateDetailDataInputValue(e)}
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
                            value={props.createDetailData?.detailLength ?? 0}
                            onChange={(e) => props.onChangeCreateDetailDataInputValue(e)}
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
                            value={props.createDetailData?.detailHeight ?? 0}
                            onChange={(e) => props.onChangeCreateDetailDataInputValue(e)}
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
                            value={props.createDetailData?.detailQuantity ?? 0}
                            onChange={(e) => props.onChangeCreateDetailDataInputValue(e)}
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
                            value={props.createDetailData?.detailWeight ?? 0}
                            onChange={(e) => props.onChangeCreateDetailDataInputValue(e)}
                            required
                        />

                    </div>
                </div>
                <div>
                    <button>등록</button>
                </div>
            </form>
        </CreateFormWrapper>
    )
}