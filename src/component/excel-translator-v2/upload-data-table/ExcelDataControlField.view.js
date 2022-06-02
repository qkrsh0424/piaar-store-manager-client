import { Container, DataControlFieldWrapper } from "./UploadDataTable.styled";

export default function ExcelDataControlFieldView(props) {
    return (
        <DataControlFieldWrapper>
            <form>
                <label htmlFor="upload-file-input">Upload</label>
                <input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.onActionUploadExcelFile(e)} />
            </form>
            <form onSubmit={(e) => props.onActionDownloadExcelFile(e)}>
                <button type="submit">Download</button>
            </form>
        </DataControlFieldWrapper>
    )
}