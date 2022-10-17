import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { TitleSelectorWrapper } from "./ControlBar.styled"

export default function TitleSelectorFieldView(props) {
    return (
        <TitleSelectorWrapper>
            <div className="selector">
                {/* <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ width: '100%', height: '43px' }}>
                        <InputLabel id="storage-title-select-id" sx={{ top: '-5px' }}>엑셀 형식 선택</InputLabel>
                        <Select
                            labelId="storage-title-select-id"
                            id="storage-title-select"
                            value={props.selectedTranslatorHeader?.id || ''}
                            label="storage-title-selector"
                            onChange={props.onChangeSelectedHeaderTitle}
                            defaultValue=''
                            sx={{ height: '43px' }}
                        >
                            {props.excelTranslatorViewData?.map((data, idx) => {
                                return (
                                    <MenuItem key={'excel_translator_title' + idx} value={data.id} sx={{ display: 'flex', padding: '5px 10px', justifyContent: 'space-around' }}>
                                        <span>{data.uploadHeaderTitle}</span>
                                        <span><ChevronRightIcon /></span>
                                        <span>{data.downloadHeaderTitle}</span>
                                        <span>{'(헤더:' + data.rowStartNumber + ')'}</span>
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box> */}
                <select
                    className='select-item'
                    value={props.selectedTranslatorHeader?.id || ''}
                    onChange={props.onChangeSelectedHeaderTitle}
                >
                    <option value=''>엑셀형식 선택</option>
                    {props.excelTranslatorViewData?.map((data, idx) => {
                        return (
                            <option
                                key={'excel_translator_title' + idx}
                                value={data.id}
                            >
                                <span>{data.uploadHeaderTitle}</span>
                                <span>{' > '}</span>
                                <span>{data.downloadHeaderTitle}</span>
                                <span>{'(헤더:' + data.rowStartNumber + ')'}</span>
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="button-box">
                <button type="button" onClick={props.onCreateTranslatorHeaderModalOpen}><AddIcon /></button>
                <button type="button" onClick={props.onModifyTranslatorHeaderModalOpen}><EditIcon /></button>
                <button
                    type="button"
                    onClick={props.onActionDeleteTranslatorHeader}
                    disabled={props.disabledBtn}
                >
                    <DeleteForeverIcon />
                </button>
                <button type="button" onClick={props.onActionOpenExcelTranslatorFormControlModal}>
                    <img className='invert-icon' src='./assets/icon/setting_black_icon.png' />
                </button>
            </div>
        </TitleSelectorWrapper>
    )
}