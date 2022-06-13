import { TableFieldWrapper } from "./SubOptionCodeModal.styled";

const TableFieldView = (props) => {
    return (
        <TableFieldWrapper>
            <div className='table-container'>
                <table className='table table-sm' style={{ tableLayout: 'fixed' }}>
                    <thead className='body-container'>
                        <tr className='fixed-header'>
                            <th scope='col' width='150'>대체코드</th>
                            <th scope='col' width='250'>메모</th>
                            <th scope='col' width='50'>수정</th>
                            <th scope='col' width='50'>삭제</th>
                        </tr>
                    </thead>
                    <tbody className='data-container'>
                        {props.subOptionCode?.map((data) => {
                            return (
                                <tr
                                    key={'subOptionCodeIdx' + data.id}
                                    className='grid-box'
                                >
                                    <td>
                                        {data.subOptionCode}
                                    </td>
                                    <td>
                                        {data.memo}
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            className='button-el'
                                            onClick={(e) => props.onActionOpenModifySubOptionCodeModal(e, data.id)}
                                        >
                                            <img
                                                src={'/assets/icon/edit_black_icon.png'}
                                                className='button-icon'
                                                alt=""
                                            ></img>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            className='button-el'
                                            onClick={(e) => props.onActionDeleteSubOptionCode(e, data.id)}
                                        >
                                            <img
                                                src={'/assets/icon/delete_black_icon.png'}
                                                className='button-icon'
                                                alt=""
                                            ></img>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div
                className='add-box'
                onClick={(e) => props.onActionOpenCreateSubOptionCodeModal(e)}
            >
                <button
                    type='button'
                    className='button-el add-el'
                >
                    <img
                        src={'/assets/icon/add_icon.png'}
                        className='button-icon'
                        alt=""
                    ></img>
                </button>
            </div>
        </TableFieldWrapper>
    )
}

export default TableFieldView;