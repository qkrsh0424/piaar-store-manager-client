import { TableFieldWrapper } from "./OptionPackageModal.styled";

export default function TableFieldView (props) {
    return (
        <TableFieldWrapper>
            <table className='table table-sm' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr className='fixed-header'>
                        <th scope='col' width='50'>번호</th>
                        <th scope='col' width='150'>구성옵션코드</th>
                        <th scope='col' width='150'>구성옵션명</th>
                        <th scope='col' width='50'>수량</th>
                        <th scope='col' width='50'>삭제</th>
                    </tr>
                </thead>
                <tbody style={{ borderTop: 'none' }}>
                    {props.optionPackages?.map((data, idx) => {
                        return (
                            <tr
                                key={'sub-option-code-idx' + idx}
                            >
                                <td>
                                    {idx + 1}.
                                </td>
                                <td>
                                    {data.originOptionCode}
                                </td>
                                <td>
                                    {data.originOptionDefaultName}
                                </td>
                                <td>
                                    <input type='number' className='input-el' name='packageUnit' onChange={(e) => props.onChangeValueOfName(e, data.id)} value={data.packageUnit} />
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        className='button-el'
                                        onClick={() => props.onActionDeleteOptionPackageData(data.id)}
                                    >
                                        <img
                                            src='/assets/icon/delete_default_ff3060.svg'
                                            style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                            alt=""
                                            loading='lazy'
                                            className='link-img'
                                        ></img>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {props.optionPackages?.length === 0 &&
                        <tr>
                            <td colSpan={5}>구성옵션이 존재하지 않습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
        </TableFieldWrapper>
    )
}
