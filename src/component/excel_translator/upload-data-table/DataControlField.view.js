import { ControlFieldWrapper } from "./UploadDataTable.styled"

export default function DataControlFieldView(props) {
    return (
        <ControlFieldWrapper>
            <span>업로드 엑셀 헤더 및 데이터</span>
            <div className="control-box">
                <button type="button" className="upload-header-excel-download" onClick={(e) => props.onActionDownloadExcelForm(e)} disabled={!(props.selectedHeaderTitleState?.uploadHeaderDetail.details.length)}>양식 다운로드</button>
                <button type="button" onClick={(e) => props.onCreateTranslatorUploadHeaderDetailModalOpen(e)}>양식 설정</button>
            </div>
        </ControlFieldWrapper>
    )
}