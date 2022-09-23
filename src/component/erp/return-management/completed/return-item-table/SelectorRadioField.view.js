import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { SelectorRadioFieldWrapper } from "./ReturnItemTable.styled";

export default function SelectorRadioFieldView(props) {
    return (
        <SelectorRadioFieldWrapper>
            <div>
                <RadioGroup
                    row
                    value={props.selectedMatchCode || 'releaseOptionCode'}
                    onChange={props.onChangeSelectedMatchCode}
                >
                    <FormControlLabel
                        value='optionCode'
                        control={<Radio size="small" disabled />} 
                        label={
                            <Box component="div">
                                <span className={`${props.selectedMatchCode === 'optionCode' ? 'highlight' : ''} radio-label`}>
                                    [피아르 옵션코드]
                                </span>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value='releaseOptionCode'
                        control={<Radio size="small" />} 
                        label={
                            <Box component="div">
                                <span className='highlight radio-label'>
                                    [출고 옵션코드]
                                </span>
                            </Box>
                        }
                    />
                </RadioGroup>
            </div>
        </SelectorRadioFieldWrapper>
    );
}