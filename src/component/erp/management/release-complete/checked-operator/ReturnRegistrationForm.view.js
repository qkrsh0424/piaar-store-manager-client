import { ReturnRegistrationFormFieldWrapper } from "./CheckedOperator.styled";

export default function ReturnRegistrationFormFieldView(props) {
    return (
        <ReturnRegistrationFormFieldWrapper>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>반품 택배사</th>
                            <th>반품 배송방식</th>
                            <th>반품배송비 입금방식</th>
                            <th>반품배송비 입고지</th>
                            <th>반품 요청사유</th>
                            <th>반품 상세사유</th>
                            <th>반품 상품 이미지</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.returnRegistrationInfo?.map((r, idx) => {
                            return (
                                <tr
                                    key={`return-registration-info-idx` + idx}
                                >
                                    <td>{r.erpReturnItem?.courier || ''}</td>
                                    <td>{r.erpReturnItem?.transportType || ''}</td>
                                    <td>{r.erpReturnItem?.deliveryChargeReturnType || ''}</td>
                                    <td>{r.erpReturnItem?.receiveLocation || ''}</td>
                                    <td>{r.erpReturnItem?.receiveLocation || ''}</td>
                                    <td>{r.erpReturnItem?.returnReasonType || ''}</td>
                                    <td>{r.erpReturnItem?.returnReasonDetail || ''}</td>
                                    <td>({r.returnImages?.length || 0} 개)</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </ReturnRegistrationFormFieldWrapper>
    )
}