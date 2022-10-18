import { SelectorFieldWrapper } from "./ViewHeaderSettingModal.styled";

export default function SelectorFieldView(props) {
    return (
        <SelectorFieldWrapper>
            <div className='flex-box'>
                <div className="selector-box">
                    {/* <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ width: '100%', height: '35px' }}>
                            <InputLabel id="title-select-id" sx={{ top: '-10px' }} name='headerTitle'>뷰 헤더 선택</InputLabel>
                            <Select
                                labelId="title-select-id"
                                id="title-select"
                                value={props.viewHeader?.id || ''}
                                label="title-selector"
                                onChange={props.onChangeSelectedViewHeaderTitle}
                                defaultValue=''
                                sx={{ height: '35px' }}
                            >
                                {props.viewHeaderList?.map((data, idx) => {
                                    return (
                                        <MenuItem key={'order_header_title' + idx} value={data.id} sx={{ display: 'flex', padding: '5px 10px', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <span>{data.headerTitle}</span>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box> */}
                    <select
                        className='select-item'
                        value={props.viewHeader?.id || ''}
                        onChange={props.onChangeSelectedViewHeaderTitle}
                    >
                        <option value=''>뷰헤더 선택</option>
                        {props.viewHeaderList?.map((data, idx) => {
                            return (
                                <option key={'registration_header_title' + idx} value={data.id}>
                                    <span>{data.headerTitle}</span>
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='flex-box selector-control-box'>
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
        </SelectorFieldWrapper>
    );
}