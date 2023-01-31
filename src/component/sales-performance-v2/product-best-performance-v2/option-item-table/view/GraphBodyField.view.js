import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../OptionItemTable.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            <div className='half-type-graph graph-wrapper'>
            {/* <div className='graph-wrapper'> */}
                {props.payAmountGraphData && props.priceGraphOption &&
                    <Chart
                        data={createGraphData(props.payAmountGraphData)}
                        options={createGraphOption(props.priceGraphOption)}
                    />
                }
            </div>
            <div className='half-type-graph graph-wrapper'>
            {/* <div className='graph-wrapper'> */}
                {props.unitGraphData && props.unitGraphOption &&
                    <Chart
                        data={createGraphData(props.unitGraphData)}
                        options={createGraphOption(props.unitGraphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}