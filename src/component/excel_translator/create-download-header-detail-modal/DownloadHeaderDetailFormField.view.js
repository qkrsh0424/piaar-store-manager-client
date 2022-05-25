import React, { useEffect, useReducer } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { CreateFormFieldWrapper } from './CreateDownloadHeaderDetailModal.styled';

export default function DownloadHeaderDetailFormFieldView(props) {
    return (
        <CreateFormFieldWrapper>
            <form onSubmit={(e) => props.onActionStoreDownloadHeaderForm(e)}>
                <div>
                    <div className="header-field">
                        <div>다운로드 엑셀 양식 설정</div>
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
                                        <div className="header-detail-box">
                                            <div className="grid-box fixed-header">
                                                <div className="header-title"></div>
                                                <div className="header-title">순서</div>
                                                <div className="header-title">헤더명</div>
                                                <div className="header-title">필드값</div>
                                                <div className="header-title">고정값 여부</div>
                                                <div className="header-title">고정값</div>
                                                <div className="header-title">삭제</div>
                                            </div>
                                            <div>
                                                {props.updateDownloadHeaderForm?.downloadHeaderDetail?.details.map((downloadHeader, idx) => {
                                                    return (
                                                        <Draggable
                                                            key={downloadHeader.id}
                                                            draggableId={downloadHeader.id}
                                                            index={idx}
                                                        >
                                                            {(provided => (
                                                                <div className="grid-box"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div>
                                                                        <MoveDownIcon />
                                                                    </div>
                                                                    <div>
                                                                        <span>{idx + 1}.</span>
                                                                    </div>
                                                                    <div>
                                                                        <input type="text" name='headerName' placeholder='다운로드 엑셀 항목명' onChange={(e) => props.onChangeInputValue(e, downloadHeader.id)} value={downloadHeader.headerName} required></input>
                                                                    </div>
                                                                    <div className="form-selector">
                                                                        <div style={{ width: '100%' }}>
                                                                            <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
                                                                                <Select
                                                                                    labelId="header-select-id"
                                                                                    id="header-select"
                                                                                    label="header-selector"
                                                                                    value={props.isChecked(downloadHeader.id) || downloadHeader.targetCellNumber === -1 ? '고정값' : props.getUploadHeaderName(downloadHeader.targetCellNumber)}
                                                                                    sx={{ height: 40, width: '100%' }}
                                                                                    onChange={(e) => props.onActionSelectUploadHeader(e, downloadHeader.id)}
                                                                                    disabled={props.isChecked(downloadHeader.id)}
                                                                                >
                                                                                    {props.updateDownloadHeaderForm?.uploadHeaderDetail?.details.map((headerTitle, idx2) => {
                                                                                        return (
                                                                                            <MenuItem key={'excel_translator_upload_header_name' + idx2} value={parseInt(headerTitle.cellNumber)}
                                                                                            >{headerTitle.headerName}</MenuItem>
                                                                                        )
                                                                                    })}
                                                                                    <MenuItem value={'고정값'} hidden>고정값</MenuItem>
                                                                                </Select>
                                                                            </Box>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onClick={(e) => props.checkOne(e, downloadHeader.id)}
                                                                                checked={props.isChecked(downloadHeader.id)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <input type="text" name='fixedValue' placeholder='엑셀 고정 값'
                                                                            onChange={(e) => props.onChangeInputValue(e, downloadHeader.id)}
                                                                            disabled={!props.isChecked(downloadHeader.id)}
                                                                            value={downloadHeader.fixedValue || ''} />
                                                                    </div>
                                                                    <div className="delete-box">
                                                                        <button type="button" onClick={(e) => props.onActionDeleteCell(e, downloadHeader.id)}><CancelIcon type="button" sx={{ fontSize: 23 }} /></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Draggable>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <div className="add-btn-box">
                    <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }} className="add-btn-icon"
                        onClick={(e) => props.onActionAddFormCell(e)}
                    />
                </div>
            </form>
        </CreateFormFieldWrapper>
    )
}