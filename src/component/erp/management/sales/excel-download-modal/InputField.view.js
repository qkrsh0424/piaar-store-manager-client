import { InputFieldWrapper } from "./ExcelDownloadModal.styled";

const InputFieldView = (props) => {
    return (
        <>
            <InputFieldWrapper>
                <div>다운로드 엑셀 명 : </div>
                <input
                    type='text'
                    className='input-el'
                    onChange={props.onChangeDownloadExcelFileName}
                    value={props.downloadExcelFileName || ''}
                />
            </InputFieldWrapper>
        </>
    );
}
export default InputFieldView;