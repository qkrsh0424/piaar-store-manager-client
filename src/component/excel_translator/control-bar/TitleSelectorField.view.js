import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { TitleSelectorWrapper } from "./ControlBar.styled"

export default function TitleSelectorFieldView(props) {
    return (
        <TitleSelectorWrapper>
            <div className="selector">
                <div>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <InputLabel id="storage-title-select-id">엑셀 형식 선택</InputLabel>
                            <Select
                                labelId="storage-title-select-id"
                                id="storage-title-select"
                                value={props.selectedHeaderTitleState?.id || ''}
                                label="storage-title-selector"
                                onChange={(e) => props.onChangeSelectedHeaderTitle(e)}
                                defaultValue=''
                            >
                                {props.excelTranslatorHeaderList?.map((data, idx) => {
                                    return (
                                        <MenuItem key={'excel_translator_title' + idx} value={data.id}>
                                            {data.uploadHeaderTitle + ' > ' + data.downloadHeaderTitle + ' (' + data.rowStartNumber + ')'}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => props.onCreateTranslatorHeaderTitleModalOpen()}><AddIcon /></button>
                <button type="button" onClick={() => props.onModifyTranslatorHeaderTitleModalOpen()}><EditIcon /></button>
                <button type="button" onClick={(e) => props.onActionDeleteTranslatorHeaderTitle(e)}><DeleteForeverIcon /></button>
            </div>
        </TitleSelectorWrapper>
    )
}