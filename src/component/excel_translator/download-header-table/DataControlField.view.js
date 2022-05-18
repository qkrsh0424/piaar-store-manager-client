import { ControlFieldWrapper } from "./DownloadDataTable.styled"

export default function DataControlFieldView(props) {
    return (
        <ControlFieldWrapper>
            <span>다운로드 엑셀 헤더 및 데이터</span>
            <div className="control-box">
                <form className="download-header-upload-btn">
                    <label htmlFor="download-header-file-input" className="form-label">양식 업로드</label>
                    <input id="download-header-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.onActionUploadDownloadHeaderFormExcelFile(e)} />
                </form>
                <button type="button" className="header-modify-btn" onClick={(e) => props.onCreateTranslatorDownloadHeaderDetailModalOpen(e)}>양식 설정</button>
            </div>
        </ControlFieldWrapper>
    )
}