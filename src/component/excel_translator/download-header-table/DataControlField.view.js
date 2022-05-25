import { ControlFieldWrapper } from "./DownloadHeaderTable.styled"
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function DataControlFieldView(props) {
    return (
        <ControlFieldWrapper>
            <div className='flex-box'>
                <div>다운로드 엑셀 헤더</div>
                <div className='excel-download' onClick={(e) => props.onActionDownloadExcelForm(e)}>
                    <FileDownloadIcon />
                </div>
            </div>
            <div className="control-box">
                <form className="header-upload-btn">
                    <label htmlFor="download-header-file-input" className="form-label">양식 업로드</label>
                    <input id="download-header-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.onActionUploadDownloadHeaderFormExcelFile(e)} />
                </form>
                <button type="button" className="header-modify-btn" onClick={(e) => props.onCreateTranslatorDownloadHeaderDetailModalOpen(e)}>양식 설정</button>
            </div>
        </ControlFieldWrapper>
    )
}