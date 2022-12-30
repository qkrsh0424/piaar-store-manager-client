import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../BestItemGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            <div className='half-type-graph graph-wrapper'>
                {props.payAmountGraphData && props.graphOption &&
                    <Chart
                        data={createGraphData(props.payAmountGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
            <div className='half-type-graph graph-wrapper'>
                {props.unitGraphData && props.graphOption &&
                    <Chart
                        data={createGraphData(props.unitGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}