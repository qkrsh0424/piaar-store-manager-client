import React, { useEffect, useReducer } from 'react';
import styled from "styled-components";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';

import { CreateFormFieldWrapper } from './CreateDownloadHeaderDetailModal.styled';

export default function DownloadHeaderDetailFormFieldView(props) {
    return (
        <CreateFormFieldWrapper>
            <form onSubmit={(e) => props.onActionStoreDownloadHeaderForm(e)}>
                <div>
                    <div className="header-field">
                        <div>다운로드 엑셀 유형 등록</div>
                        <button type='submit'><AddTaskIcon /></button>
                    </div>
                </div>
                <div className="header-detail-box">
                    {props.updateDownloadHeaderForm?.downloadHeaderDetail?.details.map((downloadHeader, idx) => {
                        return (
                            <React.Fragment key={downloadHeader.id}>
                                <div className="data-wrapper">
                                    <div className="delete-box">
                                        <button type="button" onClick={(e) => props.onActionDeleteCell(e, downloadHeader.id)}><CancelIcon type="button" sx={{ fontSize: 33 }} /></button>
                                    </div>
                                    <div className="detail-list">
                                        <div className="form-selector">
                                            <div>{idx + 1}.</div>
                                            <div style={{ width: '100%' }}>
                                                <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="header-select-id" size="small">Title</InputLabel>
                                                        <Select
                                                            labelId="header-select-id"
                                                            id="header-select"
                                                            label="header-selector"
                                                            value={props.isChecked(downloadHeader.id) || downloadHeader.targetCellNumber === -1 ? '고정값' : props.getUploadHeaderName(downloadHeader.targetCellNumber)}
                                                            sx={{ height: 40 }}
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
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        </div>
                                        <div className="arrow-img"><ArrowForwardIosIcon /></div>
                                        <div className="download-form-info">
                                            <div>
                                                <div>설정 헤더명<i className="icon-must" aria-label="필수항목"></i></div>
                                                <input type="text" name='headerName' placeholder='다운로드 엑셀 항목명' onChange={(e) => props.onChangeInputValue(e, downloadHeader.id)} value={downloadHeader.headerName} required></input>
                                            </div>
                                            <div>
                                                <div>고정값 여부</div>
                                                <div>
                                                    <Checkbox
                                                        onClick={(e) => props.checkOne(e, downloadHeader.id)}
                                                        checked={props.isChecked(downloadHeader.id)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>고정값</div>
                                                <input type="text" name='fixedValue' placeholder='엑셀 고정 값' 
                                                    onChange={(e) => props.onChangeInputValue(e, downloadHeader.id)} 
                                                    disabled={!props.isChecked(downloadHeader.id)}
                                                    value={downloadHeader.fixedValue || ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="add-btn-box">
                    <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }}
                        onClick={(e) => props.onActionAddFormCell(e)}
                    />
                </div>
            </form>
        </CreateFormFieldWrapper>
    )
}