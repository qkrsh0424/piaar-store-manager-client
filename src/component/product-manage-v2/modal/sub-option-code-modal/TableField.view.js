import { TableFieldWrapper } from "./SubOptionCodeModal.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <table className='table table-sm' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr className='fixed-header'>
                        <th scope='col' width='50'>번호</th>
                        <th scope='col' width='150'>대체코드</th>
                        <th scope='col' width='250'>메모</th>
                        <th scope='col' width='50'>수정</th>
                        <th scope='col' width='50'>삭제</th>
                    </tr>
                </thead>
                <tbody style={{ borderTop: 'none' }}>
                    {props.subOptionCodes?.map((data, idx) => {
                        let isModifying = (props.modifyingSubOptionCodeId === data.id);
                        
                        return (
                            <tr
                                key={'sub-option-code-idx' + idx}
                            >
                                <td>
                                    {idx+1}.
                                </td>
                                <td className='sub-option-code'>
                                    {isModifying ? 
                                        <div>
                                            <input
                                                type='text'
                                                className='input-el'
                                                name='subOptionCode'
                                                value={data.subOptionCode}
                                                onChange={(e) => props.onChangeSubOptionInputValue(e, data.id)}
                                            />
                                        </div>
                                        :
                                        <div>{data.subOptionCode}</div>
                                    }
                                </td>
                                <td>
                                    {isModifying ? 
                                        <div>
                                            <input
                                                type='text'
                                                className='input-el'
                                                name='memo'
                                                value={data.memo}
                                                onChange={(e) => props.onChangeSubOptionInputValue(e, data.id)}
                                            />
                                        </div>
                                        :
                                        <div>{data.memo}</div>
                                    }
                                </td>
                                <td>
                                    {isModifying ?
                                        <button
                                            type='button'
                                            className='button-el'
                                            onClick={() => props.onSubmitCreateOrModifySubOption(data.id)}
                                        >
                                            <img
                                                src='/assets/icon/done_outline_2c73d2.svg'
                                                style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                alt=""
                                                loading='lazy'
                                                className='link-img'
                                            ></img>
                                        </button>
                                        :
                                        <button
                                            type='button'
                                            className='button-el'
                                            onClick={() => props.onActionModifySubOption(data.id)}
                                        >
                                            <img
                                                src='/assets/icon/edit_default_888888.svg'
                                                style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                                alt=""
                                                loading='lazy'
                                                className='link-img'
                                            ></img>
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        className='button-el'
                                        onClick={() => props.onActionDeleteSubOptionData(data.id)}
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
                    {props.subOptionCodes.length === 0 &&
                        <tr>
                            <td colSpan={5}>대체코드가 존재하지 않습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
        </TableFieldWrapper>
    )
}