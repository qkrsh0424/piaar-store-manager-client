import { GraphOperatorFieldWrapper } from "../GraphOperator.styled";
import { FormControlLabel, Switch } from "@mui/material";

export default function GraphOperatorFieldView (props) {
    return (
        <GraphOperatorFieldWrapper>
            <div>
                <FormControlLabel labelPlacement="start" control={<Switch checked={props.checkedSwitch} onChange={() => props.onActionChangeSwitch()} />} label="주문데이터 표시" />
            </div>
            <div className='button-box'>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'date' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='date'
                    >
                        일
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'week' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='week'
                    >
                        주
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'month' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='month'
                    >
                        월
                    </button>
                </div>
            </div>
        </GraphOperatorFieldWrapper>
    )
}