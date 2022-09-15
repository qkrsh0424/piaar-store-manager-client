import { OptionInfoInputWrapper, OptionPackageWrapper } from "./ModifyProductOptionModal.styled";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

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
                        value={props.modifyOption.defaultName ?? ''}
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
                        value={props.modifyOption.managementName ?? ''}
                        onChange={(e) => props.onChangeInputValue(e)}
                        required
                    />

                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            관리코드
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='code'
                        value={props.modifyOption.code ?? ''}
                        disabled
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
                        value={props.modifyOption.salesPrice ?? ''}
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
                        value={props.modifyOption.totalPurchasePrice ?? ''}
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
                        value={props.modifyOption.stockUnit ?? ''}
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
                        value={props.modifyOption.status ?? ''}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            출고지
                        </span>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        name='releaseLocation'
                        value={props.modifyOption.releaseLocation ?? ''}
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
                        value={props.modifyOption.memo ?? ''}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            안전재고 수량
                        </span>
                    </div>
                    <input
                        type="number"
                        className='form-control'
                        name='safetyStockUnit'
                        value={props.modifyOption.safetyStockUnit ?? ''}
                        onChange={(e) => props.onChangeInputValue(e)}
                    />
                </div>

                <OptionPackageWrapper>
                    <div>
                        <button type="button" className="create-btn"
                            onClick={() => props.onActionCreateOptionPackage()}
                        >옵션 패키지 추가</button>
                    </div>

                    {props.modifyOption.optionPackages && props.modifyOption.optionPackages.length > 0 && 
                        <div className="table-container">
                            <table className="table" style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" width='200'>패키지 구성 옵션</th>
                                        <th scope="col" width='100'>수량</th>
                                        <th scope="col" width='40'>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.modifyOption.optionPackages?.map((packageOption, index) => {
                                        return (
                                            <tr key={`option-package-list-index` + index}>
                                                <th>
                                                    <select className="selector-style" name="originOptionId" value={packageOption.originOptionId} onChange={(e) => props.onChangePackageInputValue(e, packageOption.id)}>
                                                        <option value=''>옵션선택</option>
                                                        {props.optionList?.map((option, index) => {
                                                            return (
                                                                <option key={`co-option-package-name-idx` + index} value={option.id}>{option.managementName} ({option.code})</option>
                                                            )
                                                        })}
                                                    </select>
                                                </th>
                                                <td>
                                                    <input type="number" name="packageUnit" onChange={(e) => props.onChangePackageInputValue(e, packageOption.id)} value={packageOption.packageUnit ?? ''} min="0" />
                                                </td>
                                                <td>
                                                    <button type="button" className="package-delete-btn" onClick={() => props.onActionDeleteOptionPackage(packageOption.id)}>
                                                        <DoDisturbOnOutlinedIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </OptionPackageWrapper>
            </div>
        </OptionInfoInputWrapper>
    )
}