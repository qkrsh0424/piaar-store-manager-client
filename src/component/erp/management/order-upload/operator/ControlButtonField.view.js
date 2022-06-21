import { ControlButtonFieldWrapper } from "./Operator.styled";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Button({ element, onClick, style }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='button'
                onClick={() => onClick()}
                style={style}
            >{element}</button>
        </div>
    );
}

export default function ControlButtonFieldView(props) {
    return (
        <ControlButtonFieldWrapper>
            <div className='flex-box flex-wrap'>
                <div>엑셀 헤더 양식 : </div>
                <div className='flex-box selector-box'>
                    <select
                        className='select-item'
                        value={props.selectedExcelTranslator?.id || ''}
                        onChange={props.onChangeExcelTranslator}
                    >
                        <option value=''>피아르</option>
                        {props.excelTranslatorData?.map(r => {
                            return (
                                <option key={r.id} value={r.id}>
                                    {`${r.uploadHeaderTitle} > ${r.downloadHeaderTitle} (헤더: ${r.rowStartNumber})`}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                        <Button
                            element={'양식 확인'}
                            onClick={props.onActionOpenExcelTranslatorSearchModal}
                        ></Button>
                    </div>
                </div>
            </div>
            <div className='flex-box flex-wrap' style={{ justifyContent: 'space-between' }}>
                <div className='flex-box'>
                    <Button
                        element={'단건 등록'}
                        onClick={props.onActionOpenSingleAddModal}
                    ></Button>
                    <Button
                        element={'엑셀 대량 등록'}
                        onClick={props.onActionOpenFileUploader}
                    ></Button>
                    <Button
                        element={'엑셀 양식 다운'}
                        onClick={props.onActionDownloadSampleForm}
                    ></Button>
                </div>
                <div className='flex-box'>
                    <Button
                        element={'데이터 저장'}
                        onClick={props.onActionSaveExcelData}
                        style={{ background: '#2C73D2', border: '1px solid #2C73D2', color: 'white' }}
                    ></Button>
                </div>
            </div>
        </ControlButtonFieldWrapper>
    );
}