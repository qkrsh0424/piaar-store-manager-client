import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../PayAmountDayOfWeekGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            <div className='graph-wrapper'>
                {props.salesGraphData && props.graphOption &&
                    <Chart
                        data={createGraphData(props.salesGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}