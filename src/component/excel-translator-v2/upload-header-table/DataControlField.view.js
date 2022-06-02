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
            <button type="button" className="header-modify-btn" onClick={(e) => props.onCreateTranslatorUploadHeaderDetailModalOpen(e)}>양식 설정</button>
        </ControlFieldWrapper>
    )
}