import AddTaskIcon from '@mui/icons-material/AddTask';

import { HeaderFieldWrapper } from "./ModifyTranslatorHeaderTitleModal.styled"

export default function ModifyFormFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <form onSubmit={(e) => props.onActionModifyTranslatorHeaderTitle(e)}>
                <div>
                    <div>
                        <div className="header-field">
                            <div>엑셀 유형 등록</div>
                            <button type='submit'><AddTaskIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="body-field">
                    <div className="input-group mb-3">
                        <div><i className="icon-must" aria-label="필수항목"></i> 업로드 엑셀 이름</div>
                        <input type="text" name='uploadHeaderTitle'
                            value={props.excelTitleInfo?.uploadHeaderTitle || ''}
                            onChange={(e) => props.onChangeInputValue(e)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div><i className="icon-must" aria-label="필수항목"></i> 다운로드 엑셀 이름</div>
                        <input type="text" name='downloadHeaderTitle'
                            value={props.excelTitleInfo?.downloadHeaderTitle || ''}
                            onChange={(e) => props.onChangeInputValue(e)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div><i className="icon-must" aria-label="필수항목"></i> 데이터 시작 행 (헤더 번호)</div>
                        <input type="number" name='rowStartNumber'
                            value={props.excelTitleInfo?.rowStartNumber || ''}
                            onChange={(e) => props.onChangeInputValue(e)}
                            placeholder="숫자를 입력하세요."
                            required
                        />
                    </div>
                </div>
            </form>
        </HeaderFieldWrapper>
    )
}