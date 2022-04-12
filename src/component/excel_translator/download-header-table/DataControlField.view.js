import { ControlFieldWrapper } from "./DownloadDataTable.styled"

export default function DataControlFieldView(props) {
    return (
        <ControlFieldWrapper>
            <span className="table-title">다운로드 엑셀 헤더 및 데이터</span>
            <div className="control-box">
                <button type="button" onClick={(e) => props.onCreateTranslatorDownloadHeaderDetailModalOpen(e)}>양식 설정</button>
            </div>
        </ControlFieldWrapper>
    )
}