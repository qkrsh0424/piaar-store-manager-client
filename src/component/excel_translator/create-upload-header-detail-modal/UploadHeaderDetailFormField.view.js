import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CreateFormFieldWrapper } from './CreateUploadHeaderDetailModal.styled';

export default function UploadHeaderDetailFormFieldView(props) {
    return (
        <CreateFormFieldWrapper>
            <form onSubmit={(e) => props.onActionStoreUploadHeaderForm(e)}>
                <div>
                    <div className="header-field">
                        <div>엑셀 양식 저장</div>
                        <button type='submit'><AddTaskIcon /></button>
                    </div>
                </div>
                <div className="header-detail-box">
                    <div className="detail-list">
                        {props.createUploadHeaderDetailState?.uploadedData.details?.map((data, idx) => {
                            return (
                                <div key={'create_header_detail_idx' + idx} className="input-group mb-3 list-group">
                                    <div className="data-text">
                                        <div>
                                            <div onClick={(e) => props.onActionMoveHeaderFormUp(e, data.id)}>
                                                <ExpandLessIcon />
                                            </div>
                                            <div onClick={(e) => props.onActionMoveHeaderFormDown(e, data.id)}>
                                                <ExpandMoreIcon />
                                            </div>
                                        </div>
                                        <span>{idx + 1}.</span>
                                        <input type="text" name='headerName' placeholder='업로드 엑셀 항목명' onChange={(e) => props.onChangeUploadHeaderDetail(e, data.id)} value={data.headerName || data.colData || ''} required />
                                    </div>
                                    <div className="delete-box">
                                        <CancelIcon type="button" sx={{ fontSize: 33 }}
                                            onClick={(e) => props.onActionDeleteFormCell(e, data.id)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="add-btn-box">
                        <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }}
                            onClick={(e) => props.onActionAddFormCell(e)}
                        />
                    </div>
                </div>
            </form>
        </CreateFormFieldWrapper>
    )
}