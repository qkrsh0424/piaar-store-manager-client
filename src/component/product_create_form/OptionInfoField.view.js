import { OptionInfoWrapper } from "./ProductCreateForm.styled";
import AddIcon from '@mui/icons-material/Add';

export default function OptionInfoFieldView(props) {
    return (
        <OptionInfoWrapper>
            {props.optionDataList?.map((optionData, index) => {
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
                                            <input type='text' value={optionData.code} name='code' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
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
                                            <input type='text' value={optionData.defaultCny} name='defaultCny' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                        <td>
                                            <input type='text' value={optionData.defaultKrw} name='defaultKrw' onChange={(e) => props.onChangeOptionInputValue(e, optionData.id)}></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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