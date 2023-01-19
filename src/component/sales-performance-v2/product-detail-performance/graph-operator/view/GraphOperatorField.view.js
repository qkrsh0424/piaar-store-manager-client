import { GraphOperatorFieldWrapper } from "../GraphOperator.styled";
import { FormControlLabel, Switch } from "@mui/material";

export default function GraphOperatorFieldView (props) {
    return (
        <GraphOperatorFieldWrapper>
            <div className='button-box'>
                <button
                    className={`button-el data-control-btn ${props.searchDataControl === 'product' ? 'checked' : ''}`}
                    onClick={(e) => props.onActionChangeSearchDataControl(e)}
                    value='product'
                >
                    상품별
                </button>
                <button
                    className={`button-el data-control-btn ${props.searchDataControl === 'option' ? 'checked' : ''}`}
                    onClick={(e) => props.onActionChangeSearchDataControl(e)}
                    value='option'
                >
                    옵션별
                </button>
            </div>
            <div className="common-box">
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
            </div>
        </GraphOperatorFieldWrapper>
    )
}