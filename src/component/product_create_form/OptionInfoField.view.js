import { OptionInfoWrapper, OptionPackageWrapper } from "./ProductCreateForm.styled";
import AddIcon from '@mui/icons-material/Add';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

export default function OptionInfoFieldView(props) {
    return (
        <OptionInfoWrapper>
            {props.createOptionList?.map((optionData, index) => {
                return (
                    <div key={`create_product_otpion_idx` + index} className="data-container">
                        <div>
                            <button type='button' className='btn btn-outline-danger btn-sm option-delete-btn' onClick={() => props.onActionDeleteOptionData(optionData.id)}>X</button>
                        </div>
                        <div>
                            <div className="image-delete-box">
                                <input type="file" accept="image/*"
                                    id={`i_pm_cb_po_uploader_${optionData.id}`}
                                    onClick={(e) => e.target.value = ''}
                                    onChange={(e) => props.onActionUploadOptionImageFile(e, optionData.id)}
                                    className="hidden-input"
                                />
                                {optionData.imageUrl &&
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary delete-btn"
                                            type="button"
                                            onClick={() => props.onActionDeleteOptionImageFile(optionData.id)}
                                        >
                                            삭제</button>
                                    </div>
                                }
                            </div>
                            <div className="image-wrapper">
                                <div className="image-box">
                                    {optionData.imageUrl ?
                                        <img name='imageFile' type="file" src={optionData.imageUrl} title={optionData.imageFileName}
                                            onClick={() => props.onActionClickOptionImageButton(optionData.id)}
                                        />
                                        :
                                        <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image'
                                            onClick={() => props.onActionClickOptionImageButton(optionData.id)}
                                        />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="table-container">
                            <table className="table" style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" width='50'>#</th>
                                        <th scope="col" width='200'>옵션명 <i className="icon-must" aria-label="필수항목"></i></th>
                                        <th scope="col" width='200'>관리옵션명 <i className="icon-must" aria-label="필수항목"></i></th>
                                        <th scope="col" width='200'>관리코드 <i className="icon-must" aria-label="필수항목"></i></th>
                                        <th scope="col" width='200'>노스노스 고유코드</th>
                                        <th scope="col" width='200'>판매가</th>
                                        <th scope="col" width='200'>매입총합계</th>
                                        <th scope="col" width='200'>상태</th>
                                        <th scope="col" width='200'>비고</th>
                                        <th scope="col" width='200'>색상</th>
                                        <th scope="col" width='200'>CNY</th>
                                        <th scope="col" width='200'>KRW</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <th scope="row">
                                            {index + 1}
                                        </th>
                                        <td>
                                            <input type='text' value={optionData.defaultName} name='defaultName' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.managementName} name='managementName' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.code} name='code' disabled></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.nosUniqueCode} name='nosUniqueCode' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='number' value={optionData.salesPrice} name='salesPrice' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='number' value={optionData.totalPurchasePrice} name='totalPurchasePrice' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.status} disabled></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.memo} name='memo' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.color} name='color' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.unitCny} name='unitCny' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.unitKrw} name='unitKrw' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <OptionPackageWrapper>
                            <div>
                                <button type="button" className="create-btn" onClick={() => props.onActionCreateOptionPackage(optionData.id)}>옵션 패키지 추가</button>
                            </div>

                            {optionData.optionPackages &&
                                <div className="table-container">
                                    <table className="table" style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col" width='200'>패키지 구성 옵션</th>
                                                <th scope="col" width='100'>구성 수량</th>
                                                <th scope="col" width='40'>삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {optionData.optionPackages?.map((packageOption, index) => {
                                                return (
                                                    <tr key={`option-package-list-index` + index}>
                                                        <th>
                                                            <select className="selector-style" name="originOptionId" onChange={(e) => props.onChangePackageInputValue(e, optionData.id, packageOption.id)}>
                                                                <option>옵션선택</option>
                                                                {props.optionList?.map((option, index) => {
                                                                    return (
                                                                        <option key={`cp-option-package-code-idx` + index} value={option.id}>{option.managementName} ({option.code})</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </th>
                                                        <td>
                                                            <input type="number" name="packageUnit" onChange={(e) => props.onChangePackageInputValue(e, optionData.id, packageOption.id)} value={packageOption.packageUnit ?? ''} min="0" />

                                                        </td>
                                                        <td>
                                                            <button type="button" className="package-delete-btn" onClick={() => props.onActionDeleteOptionPackage(optionData.id, packageOption.id)}><DoDisturbOnOutlinedIcon /></button>
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
                )
            })}

            <div className="option-add-box">
                <button type='button' className='btn btn-sm btn-outline-secondary option-add-btn'
                    onClick={() => props.onActionCreateProductOption()}
                >
                    <AddIcon />
                </button>
            </div>
        </OptionInfoWrapper>
    )
}