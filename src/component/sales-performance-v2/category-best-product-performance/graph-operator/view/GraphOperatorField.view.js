import { GraphOperatorFieldWrapper } from "../GraphOperator.styled";
import { FormControlLabel, Switch } from "@mui/material";

export default function GraphOperatorFieldView (props) {
    return (
        <GraphOperatorFieldWrapper>
            <div>
                <FormControlLabel labelPlacement="start" control={<Switch checked={props.checkedSwitch} onChange={() => props.onActionChangeSwitch()} />} label="주문데이터 표시" />
            </div>
        </GraphOperatorFieldWrapper>
    )
}