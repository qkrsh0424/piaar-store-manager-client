import { useRef } from "react";
import { getDefaultDeliveryChargeReturnType } from "../../../../../static-data/erp/erpReturnItemStaticData";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import RequiredIcon from "../../../../module/icon/RequiredIcon";
import { ReturnRegistrationFormFieldWrapper, TableFieldWrapper } from "./CheckedOperator.styled";

const DEFAULT_DELIVERY_CHARGE_RETURN_TYPE = getDefaultDeliveryChargeReturnType();

function TableField({ viewHeader, orderItem, returnItemIndex }) {
    return (
        <TableFieldWrapper>
            <table>
                <thead>
                    <tr>
                        <th scope="col" width={30} style={{ color: 'var(--erp-main-color)' }}>[{returnItemIndex+1}]</th>
                        {viewHeader?.headerDetail.details?.map((r, index) => {
                            return (
                                <th
                                    key={index}
                                    scope="col"
                                    width={200}
                                >
                                    {r.customCellName}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {viewHeader?.headerDetail.details?.map(r2 => {
                            let matchedColumnName = r2.matchedColumnName;
                            if (matchedColumnName === 'createdAt' || matchedColumnName === 'salesAt' || matchedColumnName === 'releaseAt' || matchedColumnName === 'channelOrderDate') {
                                return (
                                    <td key={r2.cellNumber}>{orderItem[matchedColumnName] ? dateToYYYYMMDDhhmmss(orderItem[matchedColumnName]) : ""}</td>
                                )
                            } else if (matchedColumnName === 'optionCode') {
                                return (
                                    <td key={`col-${matchedColumnName}`}>{orderItem[matchedColumnName]}</td>
                                )
                            } else if (matchedColumnName === 'releaseOptionCode') {
                                return (
                                    <td key={`col-${matchedColumnName}`}>{orderItem[matchedColumnName]}</td>
                                )
                            } else if (matchedColumnName === 'optionStockUnit') {
                                return (
                                    <td key={`col-${matchedColumnName}`}>
                                        {orderItem.optionPackageYn === 'y' ?
                                            '세트상품'
                                            :
                                            orderItem[matchedColumnName]
                                        }
                                    </td>
                                )
                            }
                            return (
                                <td
                                    key={`col-${matchedColumnName}`}
                                >
                                    {orderItem[matchedColumnName]}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </TableFieldWrapper>
    )
}
export default function ReturnRegistrationFormFieldView(props) {
    
    const imageUploaderRef = useRef([]);

    const onActionOpenImageUploader = (idx) => {
        imageUploaderRef.current[idx].click();
    }

    return (
        props.returnRegistrationInfo &&
        <ReturnRegistrationFormFieldWrapper>
            <div className='info-text'>
                총 <span style={{ color: 'var(--erp-main-color)'}}>({props.returnRegistrationInfo?.length || 0})개</span>의 반품 데이터를 입력해주세요.
            </div>
            <div className='modal-content-box'>
                {props.returnRegistrationInfo?.map((r, idx) => {
                    let orderItem = props.checkedOrderItemList?.filter(item => item.id === r.erpReturnItem.erpOrderItemId)[0];
                    let returnItem = r.erpReturnItem;
                    let returnImages = r.returnImages;

                    return (
                        <div key={'return-registration-box' + idx} className='data-wrapper' style={{ minWidth: '500px', maxWidth: '500px' }}>
                            <div>
                                <TableField 
                                    viewHeader={props.viewHeader}
                                    orderItem={orderItem}
                                    returnItemIndex={idx}
                                />
                            </div>
                            <div className='info-wrapper'>
                                <div className='info-box'>
                                    <span className='input-title'>반품 택배사</span>
                                    <div className='input-value'>
                                        <input
                                            type='text'
                                            name='courier'
                                            value={returnItem?.courier || ''}
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                        />
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <span className='input-title'>반품 배송방식</span>
                                    <div className='input-value'>
                                        <input
                                            type='text'
                                            name='transportType'
                                            value={returnItem?.transportType || ''}
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                        />
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <span className='input-title'><RequiredIcon /> 반품배송비 입금방식</span>
                                    <div>
                                        <select
                                            className='select-item'
                                            name='deliveryChargeReturnType'
                                            value={returnItem?.deliveryChargeReturnType || ''}
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                        >
                                            <option value=''>선택</option>
                                            {DEFAULT_DELIVERY_CHARGE_RETURN_TYPE.map((r, idx) => {
                                                return (
                                                    <option key={'type-idx' + idx} value={r.typeName}>{r.typeName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <span className='input-title'>반품 입고지</span>
                                    <div className='input-value'>
                                        <input
                                            type='text'
                                            name='receiveLocation'
                                            value={returnItem?.receiveLocation || ''}
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                        />
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <div className='input-title'>
                                        <span className='input-title'><RequiredIcon /> 반품 요청사유</span>
                                    </div>
                                    <div>
                                        <select
                                            className='select-item'
                                            name='returnReasonType'
                                            value={returnItem?.returnReasonType || ''}
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                        >
                                            <option value=''>선택</option>
                                            {props.returnTypeList?.map(r => {
                                                return (
                                                    <option key={`return-type-idx` + r.cid} value={r.type}>{r.type}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <div className='input-title'>
                                        <span className='input-title'>반품 상세사유</span>
                                    </div>
                                    <div>
                                        <textarea
                                            className='text-input'
                                            name='returnReasonDetail'
                                            onChange={(e) => props.onChangeReturnItemValue(e, returnItem.erpOrderItemId)}
                                            value={returnItem?.returnReasonDetail || ''}
                                            placeholder={`반품요청 상세 사유를 입력해 주세요.\n(300자 이내)`}
                                        />
                                    </div>
                                </div>

                                <div className='info-box'>
                                    <div className='input-title'>
                                        <span className='input-title'>반품 상품 이미지</span>
                                    </div>
                                    <div className='upload-box'>
                                        <div>
                                            <button
                                                type='button'
                                                className='button-el'
                                                onClick={() => onActionOpenImageUploader(idx)}
                                            >이미지 등록</button>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={(e) => imageUploaderRef.current[idx] = e}
                                                onClick={(e) => e.target.value = ''}
                                                onChange={(e) => props.onActionUploadReturnProductImageFile(e, returnItem.erpOrderItemId)}
                                                multiple
                                            />
                                        </div>
                                        <span>({returnImages?.length || 0} 개)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </ReturnRegistrationFormFieldWrapper>
    )
}