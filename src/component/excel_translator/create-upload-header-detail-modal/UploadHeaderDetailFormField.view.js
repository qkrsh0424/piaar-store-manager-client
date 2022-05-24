import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { CreateFormFieldWrapper } from './CreateUploadHeaderDetailModal.styled';

export default function UploadHeaderDetailFormFieldView(props) {
    return (
        <CreateFormFieldWrapper>
            <form onSubmit={(e) => props.onActionStoreUploadHeaderForm(e)}>
                <div>
                    <div className="header-field">
                        <div>업로드 엑셀 양식 등록</div>
                        <button type='submit'><AddTaskIcon /></button>
                    </div>
                </div>
                <div>
                    <div className="data-wrapper">
                        <DragDropContext onDragEnd={(result) => props.onChangeDetailsOrder(result)}>
                            <Droppable droppableId={uuidv4()}>
                                {provided => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className="detail-list">
                                            {props.createUploadHeaderDetailState?.uploadHeaderDetail?.details.map((uploadHeader, idx) => {
                                                return (
                                                    <Draggable
                                                        key={uploadHeader.id}
                                                        draggableId={uploadHeader.id}
                                                        index={idx}
                                                    >
                                                        {(provided => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div key={'create_header_detail_idx' + idx} className="mb-3 list-group">
                                                                    <div className="data-text">
                                                                        <div>
                                                                            <MoveDownIcon />
                                                                        </div>
                                                                        <span>{idx + 1}.</span>
                                                                        <input type="text" name='headerName' placeholder='업로드 엑셀 항목명' onChange={(e) => props.onChangeUploadHeaderDetail(e, uploadHeader.id)} value={uploadHeader.headerName || uploadHeader.colData || ''} required />
                                                                    </div>
                                                                    <div className="delete-box">
                                                                        <CancelIcon type="button" sx={{ fontSize: 33 }}
                                                                            onClick={(e) => props.onActionDeleteFormCell(e, uploadHeader.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <div className="add-btn-box">
                    <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }} className="add-btn"
                        onClick={(e) => props.onActionAddFormCell(e)}
                    />
                </div>
            </form >
        </CreateFormFieldWrapper >
    )
}