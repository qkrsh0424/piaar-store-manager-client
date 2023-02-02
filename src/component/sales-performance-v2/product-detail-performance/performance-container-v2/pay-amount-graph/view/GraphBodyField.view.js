import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../PayAmountGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            {props.totalPayAmountGraphData && props.totalPayAmountGraphOption &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.totalPayAmountGraphData)}
                        options={createGraphOption(props.totalPayAmountGraphOption)}
                    />
                </div>
            }
        </GraphBodyFieldWrapper>
    )
}