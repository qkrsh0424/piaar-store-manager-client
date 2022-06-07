import { BodyFieldWrapper, Container, HeadFieldWrapper } from "./CreateTranslatorHeaderModal.styled";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const __ext_generateExcelTranslatorHeader = () => {
    return {
        id: uuidv4(),
        uploadHeaderTitle: '',
        downloadHeaderTitle: '',
        uploadHeaderDetail: {
            details: []
        },
        downloadHeaderDetail: {
            details: []
        },
        rowStartNumber: 0
    }
}
const CreateTranslatorHeaderModalComponent = (props) => {
    const [excelTranslatorHeader, dispatchExcelTranslatorHeader] = useReducer(excelTranslatorHeaderReducer, __ext_generateExcelTranslatorHeader());

    const [disabledBtn, setDisabledBtn] = useState(false);

    const __excelTranslatorHeader = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchExcelTranslatorHeader({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                props.onSubmitCreateExcelTranslatorHeader(excelTranslatorHeader);
            }
        }
    }
    return (
        <Container>
            <form onSubmit={__excelTranslatorHeader.submit.confirm}>
                <HeadField
                    disabledBtn={disabledBtn}
                />
                <BodyField
                    excelTranslatorHeader={excelTranslatorHeader}
                    disabledBtn={disabledBtn}

                    onChangeValueOfName={__excelTranslatorHeader.change.valueOfName}
                />
            </form>
        </Container>
    )
}

export default CreateTranslatorHeaderModalComponent;

const initialExcelTranslatorHeader = null;

const excelTranslatorHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return initialExcelTranslatorHeader;
    }
}

function HeadField({
    disabledBtn
}) {
    return (
        <HeadFieldWrapper>
            <div className='title'>엑셀 유형 등록</div>
            <button
                className='submit-button'
                type='submit'
                disabled={disabledBtn}
            >
                <AddTaskIcon />
            </button>
        </HeadFieldWrapper>
    );
}

function BodyField({
    excelTranslatorHeader,
    onChangeValueOfName
}) {
    return (
        <BodyFieldWrapper>
            <div className="body-field">
                <div className="input-group mb-3">
                    <div><i className="icon-must" aria-label="필수항목"></i> 업로드 엑셀 이름</div>
                    <input type="text" name='uploadHeaderTitle'
                        value={excelTranslatorHeader?.uploadHeaderTitle || ''}
                        onChange={(e) => onChangeValueOfName(e)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <div><i className="icon-must" aria-label="필수항목"></i> 다운로드 엑셀 이름</div>
                    <input type="text" name='downloadHeaderTitle'
                        value={excelTranslatorHeader?.downloadHeaderTitle || ''}
                        onChange={(e) => onChangeValueOfName(e)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <div><i className="icon-must" aria-label="필수항목"></i> 데이터 시작 행 (헤더 번호)</div>
                    <input type="number" name='rowStartNumber'
                        value={excelTranslatorHeader?.rowStartNumber || ''}
                        onChange={(e) => onChangeValueOfName(e)}
                        placeholder="숫자를 입력하세요."
                        required
                    />
                </div>
            </div>
        </BodyFieldWrapper>
    );
}