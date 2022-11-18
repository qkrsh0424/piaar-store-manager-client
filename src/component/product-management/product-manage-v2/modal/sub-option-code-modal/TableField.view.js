import ResizableTh from "../../../../module/table/ResizableTh";
import { TableFieldWrapper } from "./SubOptionCodeModal.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <table className='table table-sm' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <ResizableTh className='fixed-header' scope='col' width={50}>번호</ResizableTh>
                        <ResizableTh className='fixed-header' scope='col' width={150}>대체코드</ResizableTh>
                        <ResizableTh className='fixed-header' scope='col' width={250}>메모</ResizableTh>
                        <ResizableTh className='fixed-header' scope='col' width={50}>수정</ResizableTh>
                        <ResizableTh className='fixed-header' scope='col' width={50}>삭제</ResizableTh>
                    </tr>
                </thead>
                <tbody style={{ borderTop: 'none' }}>
                    {props.subOptionCodes?.map((data, idx) => {
                        if (props.modifyingSubOption?.id === data.id)
                            return (
                                <ModifyingSubOptionInput
                                    itemIdx={idx}
                                    data={props.modifyingSubOption}
                                    onChangeInputValue={props.onChangeSubOptionInputValue}
                                    onSubmitCreateOrModifyData={props.onSubmitModifySubOptionData}
                                    onActionDeleteData={props.onActionDeleteSubOptionData}
                                />
                            )
                        return (
                            <tr
                                key={'sub-option-code-idx' + idx}
                            >
                                <td>{idx + 1}.</td>
                                <td className='sub-option-code'>{data.subOptionCode}</td>
                                <td>{data.memo}</td>
                                <td>
                                    <button
                                        type='button'
                                        className='button-el'
                                        onClick={() => props.onChangeSelectedModifyingSubOption(data.id)}
                                    >
                                        <img
                                            src='/assets/icon/edit_default_888888.svg'
                                            style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                            alt=""
                                            loading='lazy'
                                            className='link-img'
                                        ></img>
                                    </button>
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
                    {!props.subOptionCodes.some(r => r.id === props.modifyingSubOption?.id) && props.modifyingSubOption &&
                        <ModifyingSubOptionInput 
                            itemIdx={props.subOptionCodes.length}
                            data={props.modifyingSubOption}
                            onChangeInputValue={props.onChangeSubOptionInputValue}
                            onSubmitCreateOrModifyData={props.onSubmitCreateSubOptionData}
                            onActionDeleteData={props.onActionDeleteModifyingSubOptionData}
                        />
                    }
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

function ModifyingSubOptionInput({ itemIdx, data, onChangeInputValue, onSubmitCreateOrModifyData, onActionDeleteData }) {
    return (
        <tr>
            <td>{itemIdx + 1}. </td>
            <td className='sub-option-code'>
                <div>
                    <input
                        type='text'
                        className='input-el'
                        name='subOptionCode'
                        value={data.subOptionCode}
                        onChange={(e) => onChangeInputValue(e)}
                        autoFocus
                    />
                </div>
            </td>
            <td>
                <div>
                    <input
                        type='text'
                        className='input-el'
                        name='memo'
                        value={data.memo}
                        onChange={(e) => onChangeInputValue(e)}
                    />
                </div>
            </td>
            <td>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => onSubmitCreateOrModifyData()}
                >
                    <img
                        src='/assets/icon/done_outline_2c73d2.svg'
                        style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                        alt=""
                        loading='lazy'
                        className='link-img'
                    ></img>
                </button>
            </td>
            <td>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => onActionDeleteData(data.id)}
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
}