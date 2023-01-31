import { GraphOperatorFieldWrapper } from "../GraphOperator.styled";
import { FormControlLabel, Switch } from "@mui/material";

export default function GraphOperatorFieldView (props) {
    return (
        <GraphOperatorFieldWrapper>
            <div>
                <FormControlLabel labelPlacement="start" control={<Switch checked={props.checkedSwitch} onChange={() => props.onActionChangeSwitch()} />} label="주문데이터 표시" />
            </div>
            {/* <div className='button-box'>
                <div>
                    <button
                        className={`button-el ${props.detailSearchValue?.orderByColumn === 'payAmount' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeOrderByColumn(e)}
                        value='payAmount'
                    >
                        매출 순
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.detailSearchValue?.orderByColumn === 'unit' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeOrderByColumn(e)}
                        value='unit'
                    >
                        수량 순
                    </button>
                </div>
            </div> */}
        </GraphOperatorFieldWrapper>
    )
}