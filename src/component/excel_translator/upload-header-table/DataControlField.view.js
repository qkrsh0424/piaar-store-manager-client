import { ControlFieldWrapper } from "./UploadHeaderTable.styled"
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function DataControlFieldView(props) {
    return (
        <ControlFieldWrapper>
            <div className='flex-box'>
                <div>업로드 엑셀 헤더</div>
                <div className='excel-download' onClick={(e) => props.onActionDownloadExcelForm(e)}>
                    <FileDownloadIcon />
                </div>
            </div>
            <div className="control-box">
                <form className="header-upload-btn">
                    <label htmlFor="upload-header-file-input" className="form-label">양식 업로드</label>
                    <input id="upload-header-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.onActionUploadUploadHeaderFormExcelFile(e)} />
                </form>
                <button type="button" className="header-modify-btn" onClick={(e) => props.onCreateTranslatorUploadHeaderDetailModalOpen(e)}>양식 설정</button>
            </div>
        </ControlFieldWrapper>
    )
}