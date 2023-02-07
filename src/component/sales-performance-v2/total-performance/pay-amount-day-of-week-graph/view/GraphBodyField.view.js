import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../PayAmountDayOfWeekGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            <div className='half-type-graph graph-wrapper'>
                {props.totalGraphData && props.graphOption &&
                    <Chart
                        data={createGraphData(props.totalGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
            <div className='half-type-graph graph-wrapper'>
                {props.totalWeeklyGraphData && props.graphOption &&
                    <Chart
                        data={createGraphData(props.totalWeeklyGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}