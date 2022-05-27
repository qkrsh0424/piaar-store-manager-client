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
import CustomCheckbox from '../../module/checkbox/CustomCheckbox';

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
                    <DragDropContext onDragEnd={(result) => props.onChangeOrder(result)}>
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
                                            {props.downloadHeaderDetails.map((downloadHeader, idx) => {
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
                                                                    <input type="text" name='headerName' placeholder='다운로드 엑셀 항목명' onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)} value={downloadHeader.headerName} required></input>
                                                                </div>
                                                                <div className="form-selector">
                                                                    <select
                                                                        value={downloadHeader.targetCellNumber}
                                                                        name='targetCellNumber'
                                                                        onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)}
                                                                        disabled={parseInt(downloadHeader.targetCellNumber) === -1}

                                                                        style={{
                                                                            width: '100%'
                                                                        }}
                                                                    >
                                                                        {parseInt(downloadHeader.targetCellNumber) !== -1 &&
                                                                            <>
                                                                                {props.uploadHeaderDetails.map((headerTitle, idx2) => {
                                                                                    return (
                                                                                        <option
                                                                                            key={'excel_translator_upload_header_name' + idx2}
                                                                                            value={parseInt(headerTitle.cellNumber)}
                                                                                        >
                                                                                            {headerTitle.headerName}
                                                                                        </option>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                        }
                                                                        <option value={-1}>고정값</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <CustomCheckbox
                                                                            checked={parseInt(downloadHeader.targetCellNumber) === -1 && true}
                                                                            onChange={(e) => props.onChangeFixedValueUsage(e, downloadHeader.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <input type="text" name='fixedValue' placeholder='엑셀 고정 값'
                                                                        onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)}
                                                                        disabled={!(parseInt(downloadHeader.targetCellNumber) === -1)}
                                                                        value={downloadHeader.fixedValue || ''} />
                                                                </div>
                                                                <div className="delete-box">
                                                                    <button type="button" onClick={() => props.onActionDeleteCell(downloadHeader.id)}><CancelIcon type="button" sx={{ fontSize: 23 }} /></button>
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
                <div className="add-btn-box">
                    <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }} className="add-btn-icon"
                        onClick={props.onActionAddCell}
                    />
                </div>
            </form>
        </CreateFormFieldWrapper>
    )
}