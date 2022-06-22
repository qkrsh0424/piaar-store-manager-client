import { SelectorFieldWrapper } from "./ViewHeaderSettingModal.styled";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function SelectorFieldView(props) {
    return (
        <SelectorFieldWrapper>
            <div className='flex-box'>
                <div className="selector-box">
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ width: '100%', height: '35px' }}>
                            <InputLabel id="title-select-id" sx={{ top: '-10px' }}>뷰 헤더 선택</InputLabel>
                            <Select
                                labelId="title-select-id"
                                id="title-select"
                                value={props.viewHeader?.id || ''}
                                label="title-selector"
                                onChange={props.onChangeSelectedViewHeaderTitle}
                                defaultValue=''
                                sx={{ height: '35px' }}
                            >
                                {props.viewHeaderTitleList?.map((data, idx) => {
                                    return (
                                        <MenuItem key={'header_title' + idx} value={data.id} sx={{ display: 'flex', padding: '5px 10px', justifyContent: 'space-around' }}>
                                            <span>{data.headerTitle}</span>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='flex-box'>
                    <button
                        type='button'
                        className='image-button-el'
                        onClick={props.onActionCreateViewHeader}
                    >
                        <img
                            className='image-button-icon'
                            src='/assets/icon/add_black_icon.png'
                            alt=""
                        ></img>
                    </button>
                    <button
                        type='button'
                        className='image-button-el'
                    // onClick={(e) => props.onActionDeleteDataOne(e, rowIndex)}
                    >
                        <img
                            className='image-button-icon'
                            src='/assets/icon/edit_black_icon.png'
                            alt=""
                        ></img>
                    </button>
                    <button
                        type='button'
                        className='image-button-el'
                        onClick={props.onActionDeleteSelectedViewHeader}
                    >
                        <img
                            className='image-button-icon'
                            src='/assets/icon/delete_black_icon.png'
                            alt=""
                        ></img>
                    </button>
                </div>
            </div>
            {props.createViewHeader &&
                <div className='flex-box'>
                    <input type='text'
                        name='headerTitle'
                        className='input-item'
                        value={props.createViewHeader.headerTitle}
                        onChange={props.onChangeViewHeaderTitle}
                        placeholder='뷰 헤더 이름'
                        required
                        />
                    <div className='flex-box'>
                        <Button 
                            element={'취소'}
                            onClick={props.onActionCancelCreateViewHeader}
                        />
                    </div>
                </div>
            }
        </SelectorFieldWrapper>
    );
}